import {createRequire} from 'module'
import dayjs from 'dayjs';
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

import Subscription from '../models/subscription.model.js';
import { sendReminderEmial } from '../utlis/send-email.js';
import { now } from 'mongoose';

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve( async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscription ||  subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate)

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stoping workflow.`)
        return;
    }

    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }

        if(dayjs().isSame(reminderDate, 'day')){

            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }

    }
})


const fetchSubscription = async (context, subscripitonId) => {
    return  await context.run('get Subscription', async () => {
        return await Subscription.findById(subscripitonId).populate('user', "name of email")
    })
}


const sleepUntilReminder = async (context, label, date) => {
    console.log(`sleeping until ${label} reminder at ${date}`)
    await context.sleepUntil(label, date.toDate())
}


const  triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        await sendReminderEmial({
            to: subscription.user.email,
            type: label,
            subscription,

        })
    })
}