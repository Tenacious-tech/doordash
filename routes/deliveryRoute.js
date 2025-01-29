import { Router } from "express";
import { acceptQuote, cancelDelivery, createDelivery, createQuote, getStatus } from "../controller/deliveryController.js";
import { webhook } from "../controller/webhookController.js";

const router=Router();

router.post('/createdelivery',createDelivery);
router.get('/getstatus',getStatus);
router.post('/createquote',createQuote);
router.post('/acceptquote',acceptQuote);
router.put('/canceldelivery',cancelDelivery);

// webhooks route
router.post('/webhook',webhook);

export default router;
