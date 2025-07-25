import express from 'express';
import { addToCart, getCart, removeFromCart } from '../cart/cart.controller.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/', getCart);
router.delete('/:productId', removeFromCart);

export default router;
