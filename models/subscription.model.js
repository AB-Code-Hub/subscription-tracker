import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 4,
      maxLength: 100,
    },

    price: {
      type: Number,
      required: [true, "Subscription price is rquired"],
      min: [0, "price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "INR", "SAR"],
      default: "INR",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "polotics",
        "other",
      ],
      required: [true, "Please select a category"],
    },

    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be  after the start date",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Auto calculate renewal date if missing

subscriptionSchema.pre("save", function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,

        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() +  renewalPeriods[this.frequency])
    }

    // Auto update  the status if renewal date passed
    if(this.renewalDate < new Date()){
      this.status  = 'expired';
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
