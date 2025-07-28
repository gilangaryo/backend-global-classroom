import * as ProductRepository from './product.repository.js';

export const validateProducts = async (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) {
        const err = new Error('Invalid or empty items array provided for validation.');
        err.status = 400;
        throw err;
    }

    const productsFromDb = await ProductRepository.findValidatedProducts(items);
    const activeProducts = productsFromDb.filter(product => product.isActive === true);
    return activeProducts;
};