import Stripe from 'stripe';
import express from 'express';
import prisma from '../prisma/client.js';
import nodemailer from 'nodemailer';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const checkout = await prisma.checkoutSession.findUnique({
            where: { stripeSessionId: session.id }
        });

        if (!checkout) return res.status(404).send('CheckoutSession not found');

        await prisma.checkoutSession.update({
            where: { stripeSessionId: session.id },
            data: { status: 'PAID' }
        });

        const { customerEmail, items } = checkout;
        if (customerEmail && items) {
            const productList = items
                .map(item =>
                    item.digitalUrl
                        ? `<li><strong>${item.title}:</strong> <a href="${item.digitalUrl}">${item.digitalUrl}</a></li>`
                        : `<li><strong>${item.title}</strong> (Tidak ada link)</li>`
                )
                .join('');

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: `"Global Classroom" <${process.env.SMTP_USER}>`,
                to: customerEmail,
                subject: "Akses Digital Product Kamu",
                html: `
                    <h2>Terima kasih sudah membeli produk digital kami!</h2>
                    <p>Berikut daftar link akses digital product kamu:</p>
                    <ul>${productList}</ul>
                    <br>
                    <p>Salam,<br/>Global Classroom Team</p>
                `
            });
        }
    }

    res.status(200).json({ received: true });
});

export default router;
