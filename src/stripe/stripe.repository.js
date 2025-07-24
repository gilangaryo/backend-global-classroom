import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import prisma from '../prisma/client.js';

export async function fetchProductsBatch(items) {
    const typeIds = {
        COURSE: [],
        UNIT: [],
        SUBUNIT: [],
        LESSON: [],
    };
    for (const i of items) typeIds[i.itemType]?.push(i.id);

    const [courses, units, subunits, lessons] = await Promise.all([
        typeIds.COURSE.length ? prisma.course.findMany({ where: { id: { in: typeIds.COURSE } } }) : [],
        typeIds.UNIT.length ? prisma.unit.findMany({ where: { id: { in: typeIds.UNIT } } }) : [],
        typeIds.SUBUNIT.length ? prisma.subunit.findMany({ where: { id: { in: typeIds.SUBUNIT } } }) : [],
        typeIds.LESSON.length ? prisma.lesson.findMany({ where: { id: { in: typeIds.LESSON } } }) : [],
    ]);
    const itemMap = {};
    for (const item of [...courses, ...units, ...subunits, ...lessons]) {
        itemMap[`${item.id}`] = item;
    }
    return items
        .map(({ id, itemType }) => {
            const item = itemMap[id];
            return item
                ? {
                    itemType,
                    id: item.id,
                    title: item.title,
                    price: Math.round(Number(item.price) * 100),
                    imageUrl: item.imageUrl,
                    digitalUrl: item.digitalUrl || null,
                }
                : null;
        })
        .filter(Boolean);
}

export async function createStripeCheckoutSessionInRepo({ products, email }) {
    const line_items = products.map(p => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: p.title,
                images: p.imageUrl ? [p.imageUrl] : [],
                metadata: p.id ? { id: p.id } : undefined,
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
}

export async function saveCheckoutSession(data) {
    return await prisma.checkoutSession.create({ data });
}

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
