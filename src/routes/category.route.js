import { Router } from 'express';
import * as CategoryController from '../category/category.controller.js';
// import { authMiddleware } from '../middleware/authMiddleware.js'; // Optional: Protect endpoints

const router = Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.remove);

export default router;
