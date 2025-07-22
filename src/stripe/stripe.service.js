import { createCheckoutSessionInStripe } from './stripe.repository.js';

export const createStripeCheckoutSession = async ({ products }) => {
    return await createCheckoutSessionInStripe({ products });
};

