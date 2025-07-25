import * as CartService from './cart.service.js';

export const addToCart = async (req, res, next) => {
    try {
        const data = await CartService.addToCart({
            sessionId: req.session_id,
            productId: req.body.productId,
            productType: req.body.productType,
        });

        res.json({ status: 'success', data });
    } catch (err) {
        next(err);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const data = await CartService.getCart(req.session_id);
        res.json({ status: 'success', data });
    } catch (err) {
        next(err);
    }
};

export const removeFromCart = async (req, res, next) => {
    try {
        await CartService.removeFromCart({
            sessionId: req.session_id,
            productId: req.params.productId,
        });

        res.json({ status: 'success', message: 'Item removed from cart' });
    } catch (err) {
        next(err);
    }
};
