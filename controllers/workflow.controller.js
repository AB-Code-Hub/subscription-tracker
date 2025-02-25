import {createRequire} from 'module'
import dayjs from 'dayjs';
const require = createRequire(import.meta.url)
const {serve} = require('@upstash/workflow/express')

import Subscription from '../models/subscription.model.js';

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

        await triggerReminder(context, `Reminder ${daysBefore} days before`)
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


const  triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`)
    })
}