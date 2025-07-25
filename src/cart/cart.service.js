import * as CartRepo from './cart.repository.js';

export const addToCart = async ({ sessionId, productId, productType }) => {
    if (!productId || !productType) {
        const err = new Error('productId & productType harus diisi');
        err.status = 400;
        throw err;
    }

    const quantity = 1;

    return CartRepo.upsertCartItem({ sessionId, productId, productType, quantity });
};

export const getCart = async (sessionId) => {
    return CartRepo.findCartBySession(sessionId);
};

export const removeFromCart = async ({ sessionId, productId }) => {
    if (!productId) {
        const err = new Error('productId harus diisi');
        err.status = 400;
        throw err;
    }

    const existing = await CartRepo.findCartItem(sessionId, productId);
    if (!existing) {
        const err = new Error('Item tidak ditemukan di cart');
        err.status = 404;
        throw err;
    }

    return CartRepo.deleteCartItem(sessionId, productId);
};