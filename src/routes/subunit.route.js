import { Router } from 'express';
import * as SubunitController from '../subunit/subunit.controller.js';
import { validate } from '../middleware/validate.js';
import { SubunitSchema, SubunitUpdateSchema, SubunitStatusSchema } from '../schemas/subunit.schema.js';

const router = Router();

router.get('/', SubunitController.getAllSubunits);
router.get('/:itemId', SubunitController.getSubunitByItemId);
router.post('/', validate(SubunitSchema), SubunitController.createSubunit);
router.put('/:itemId', validate(SubunitUpdateSchema), SubunitController.updateSubunit);
router.delete('/:itemId', SubunitController.deleteSubunit);
router.patch('/status/:itemId', validate(SubunitStatusSchema), SubunitController.updateStatus);

export default router;
