import { Router } from 'express';
import * as ProductController from '../product/product.controller.js';

const router = Router();

router.post('/products', ProductController.validateProducts);

export default router;