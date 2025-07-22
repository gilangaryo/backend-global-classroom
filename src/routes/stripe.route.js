import express from 'express';
import { createCheckoutSession } from '../stripe/stripe.controller.js';
import stripeWebhook from '../stripe/webhook.js';

const router = express.Router();
router.use('/', stripeWebhook);
router.post('/checkout', createCheckoutSession);
export default router;
