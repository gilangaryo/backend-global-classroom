import {
    fetchProductsBatch,
    saveCheckoutSession,
    createStripeCheckoutSessionInRepo,
} from './stripe.repository.js';

export async function createCheckoutSessionService({ userId, email, firstName, lastName, country, items }) {
    const safeItems = [];
    if (Array.isArray(items)) {
        safeItems.push(...items);
    } else {
        safeItems.push(items);
    }

    if (!safeItems.length) {
        throw new Error('Items required');
    }

    const products = await fetchProductsBatch(safeItems);
    if (!products.length) {
        throw new Error('Products not found');
    }

    const session = await createStripeCheckoutSessionInRepo({ products, email });

    await saveCheckoutSession({
        stripeSessionId: session.id,
        status: 'PENDING',
        amount: products.reduce((sum, p) => sum + p.price / 100, 0),
        items: products.map(p => ({
            itemType: p.itemType,
            id: p.id,
            title: p.title,
            price: p.price / 100,
            imageUrl: p.imageUrl,
            digitalUrl: p.digitalUrl,
        })),
        customerEmail: email,
        customerFirstName: firstName,
        customerLastName: lastName,
        customerCountry: country,
        userId: userId || null,
    });

    return {
        status: 'success',
        url: session.url,
        sessionId: session.id,
    };
}
