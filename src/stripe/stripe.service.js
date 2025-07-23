import { createCheckoutSessionInStripe } from './stripe.repository.js';

export const createStripeCheckoutSession = async ({ products, email }) => {
    return await createCheckoutSessionInStripe({ products, email });
};
