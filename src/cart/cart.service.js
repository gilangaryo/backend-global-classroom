import * as CartRepo from './cart.repository.js';

export const addToCart = async ({ sessionId, productId, productType, quantity }) => {
    if (!productId || !productType || !quantity || quantity <= 0) {
        const err = new Error('Field tidak valid pada request');
        err.status = 400;
        throw err;
    }

    return await CartRepo.upsertCartItem(sessionId, productId, productType, quantity);
};

export const getCart = async (sessionId) => {
    return await CartRepo.findCartBySession(sessionId);
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

    return await CartRepo.deleteCartItem(sessionId, productId);
};