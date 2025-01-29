import { Router } from "express";
import { acceptQuote, cancelDelivery, createDelivery, createQuote, getStatus } from "../controller/deliveryController.js";

const router=Router();

router.post('/createdelivery',createDelivery);
router.get('/getstatus',getStatus);
router.post('/createquote',createQuote);
router.post('/acceptquote',acceptQuote);
router.put('/canceldelivery',cancelDelivery);

// webhooks route


export default router;