import { Router } from 'express';
import * as SubunitController from '../subunit/subunit.controller.js';

const router = Router();

router.get('/', SubunitController.getAllSubunits);
router.get('/:id', SubunitController.getSubunitById);
router.post('/', SubunitController.createSubunit);
router.put('/:id', SubunitController.updateSubunit);
router.delete('/:id', SubunitController.deleteSubunit);

export default router;
