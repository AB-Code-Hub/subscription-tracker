import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createSubscription, getAllSubscriptions, getSubscriptionDetails, getUserSubscriptions } from "../controllers/subscripiton.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions)

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => res.send({ title: "Update Subscription" }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: "Delete Subscription" }))

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions )

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: "Cancel Subscription" }))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: "Get Upcoming renewals" }))

export default subscriptionRouter;