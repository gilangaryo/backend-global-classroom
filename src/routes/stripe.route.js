import express from 'express';
import { createCheckoutSession } from '../stripe/stripe.controller.js';

const router = express.Router();

router.post('/checkout', createCheckoutSession);

export default router;
