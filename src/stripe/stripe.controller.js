import { createStripeCheckoutSession } from './stripe.service.js';
import prisma from '../prisma/client.js';

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { userId, items } = req.body;
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Items required' });
        }

        const modelMap = {
            COURSE: prisma.course,
            UNIT: prisma.unit,
            SUBUNIT: prisma.subunit,
            LESSON: prisma.lesson
        };

        // Fetch semua produk
        const products = [];
        for (const { itemId, itemType } of items) {
            const model = modelMap[itemType];
            if (!model) continue;
            const item = await model.findUnique({ where: { itemId } });
            if (item) {
                products.push({
                    itemType,
                    itemId: item.itemId,
                    title: item.title,
                    price: Math.round(Number(item.price) * 100),
                    imageUrl: item.imageUrl,
                    digitalUrl: item.digitalUrl || null,
                });
            }
        }

        if (products.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Products not found' });
        }

        // Buat Stripe Checkout session untuk semua produk (line_items)
        const session = await createStripeCheckoutSession({ products });

        await prisma.checkoutSession.create({
            data: {
                stripeSessionId: session.id,
                status: 'PENDING',
                amount: products.reduce((sum, p) => sum + p.price / 100, 0),
                items: products.map(p => ({
                    itemType: p.itemType,
                    itemId: p.itemId,
                    title: p.title,
                    price: p.price / 100,
                    imageUrl: p.imageUrl,
                    digitalUrl: p.digitalUrl,
                })),
                customerEmail: req.body.email,
                customerFirstName: req.body.firstName,
                customerLastName: req.body.lastName,
                customerCountry: req.body.country,
            }
        });



        res.status(200).json({
            status: 'success',
            url: session.url,
            sessionId: session.id,
        });
    } catch (err) {
        next(err);
    }
};
