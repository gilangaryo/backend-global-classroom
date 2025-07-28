import * as ProductService from './product.service.js';

export const validateProducts = async (req, res) => {
    try {
        const { items } = req.body;
        const validatedProducts = await ProductService.validateProducts(items);

        res.json({
            status: 'success',
            message: 'Products validated successfully',
            data: validatedProducts,
        });
    } catch (error) {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            status: 'error',
            message: error.message
        });
    }
};