import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSessionInStripe = async ({ products, email }) => {
    const line_items = products.map(p => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: p.title,
                images: p.imageUrl ? [p.imageUrl] : [],
                metadata: p.itemId ? { itemId: p.itemId } : undefined,
            },
            unit_amount: p.price,
        },
        quantity: 1,
    }));

    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: process.env.FRONTEND_SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.FRONTEND_CANCEL_URL,
        customer_email: email,
    });
};

export async function markCheckoutSessionPaid(sessionId) {
    return await prisma.checkoutSession.update({
        where: { stripeSessionId: sessionId },
        data: { status: 'PAID' },
    });
}

export async function markCheckoutSessionCancelled(sessionId) {
    return await prisma.checkoutSession.update({
        where: { stripeSessionId: sessionId },
        data: { status: 'CANCELLED' },
    });
}

export async function findCheckoutSession(sessionId) {
    return await prisma.checkoutSession.findUnique({
        where: { stripeSessionId: sessionId },
    });
}
