import { createCheckoutSessionService } from './stripe.service.js';

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { userId, email, firstName, lastName, country, items } = req.body;
        if (!email || !firstName || !lastName || !country || !items) {
            return res.status(400).json({ status: 'error', message: 'Missing required fields' });
        }
        const result = await createCheckoutSessionService({
            userId,
            email,
            firstName,
            lastName,
            country,
            items,
        });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
