import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js"
import { accountEmail, transporter } from "../config/nodeMailer.js";


export const  sendReminderEmial = async ({to, type, subscription}) => {
    
    if(!to || !type) throw new Error("Missing required parameters")

        const template = emailTemplates.find((t) => t.label === type);

        if(!template) throw new Error("invalid email type")

            const mailInfo = {
                userName: subscription.user.name,
                subscriptionName: subscription.name,
                renewalDate: dayjs(subscription.renewalDate).format('D MMM, YYYY'),
                planName: subscription.name,
                price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
                paymentMethod: subscription.paymentMethod,

            }


            const message = template.generateBody(mailInfo)
            const subject = template.generateSubject(mailInfo)

            const mailOptions = {
                from: accountEmail,
                to: to,
                subject: subject,
                html: message,

            }


            transporter.sendMail(mailOptions, (error, info) => {
                if(error) return console.log("Error in sending email", error)

                    console.log("Email sent: ",  info.response)
            })
}