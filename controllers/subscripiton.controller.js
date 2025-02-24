import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

   const {workflowRunId} = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
            subscriptionId: subscription.id,
        },
        headers: {
            'content-type': 'application/json'
        },

        retries: 0,
    })

    res.status(201).json({ success: true, data:{ subscription,  workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Your are not the owner  of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscripiton = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscripiton });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const allSubscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: allSubscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscriptionsDetail = await Subscription.findById(req.params.id);

    if (!subscriptionsDetail) {
      const error = new Error("can not find subscription details");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscriptionsDetail });
  } catch (error) {
    next(error);
  }
};
