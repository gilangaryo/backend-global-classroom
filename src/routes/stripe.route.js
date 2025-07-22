import express from 'express';
import { createCheckoutSession } from '../stripe/stripe.controller.js';
import stripeWebhook from '../stripe/webhook.js';

const router = express.Router();

router.post('/checkout', createCheckoutSession);
router.use('/api/stripe/webhook', stripeWebhook);
export default router;
