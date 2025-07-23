import Stripe from 'stripe';
import express from 'express';
import {
    markCheckoutSessionPaid,
    markCheckoutSessionCancelled,
    findCheckoutSession,
} from './stripe.repository.js';
import { sendProductAccessEmail } from '../utils/sendProductAccessEmail.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
    '/',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
            console.log('Stripe event received:', event.type);

            const session = event.data.object;
            let checkout;

            if (
                event.type === 'checkout.session.completed' ||
                event.type === 'checkout.session.async_payment_succeeded'
            ) {
                checkout = await findCheckoutSession(session.id);

                if (!checkout) {
                    console.error('CheckoutSession not found for stripeSessionId:', session.id);
                    return res.status(404).send('CheckoutSession not found');
                }

                await markCheckoutSessionPaid(session.id);

                try {
                    await sendProductAccessEmail({
                        to: checkout.customerEmail,
                        items: checkout.items,
                    });
                    console.log('Email sent to:', checkout.customerEmail);
                } catch (emailErr) {
                    console.error('Failed to send email:', emailErr);
                }
            }

            if (
                event.type === 'checkout.session.async_payment_failed' ||
                event.type === 'checkout.session.expired'
            ) {
                checkout = await findCheckoutSession(session.id);
                if (checkout) {
                    await markCheckoutSessionCancelled(session.id);
                    console.log('CheckoutSession marked as CANCELLED for', session.id);
                }
            }

            res.status(200).json({ received: true });
        } catch (err) {
            console.error('Webhook error:', err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
);

export default router;
