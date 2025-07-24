import { Router } from 'express';
import * as SubunitController from '../subunit/subunit.controller.js';
import { validate } from '../middleware/validate.js';
import { SubunitSchema, SubunitUpdateSchema, SubunitStatusSchema } from '../schemas/subunit.schema.js';

const router = Router();

router.get('/', SubunitController.getAllSubunits);
router.get('/:id', SubunitController.getSubunitByItemId);
router.post('/', validate(SubunitSchema), SubunitController.createSubunit);
router.put('/:id', validate(SubunitUpdateSchema), SubunitController.updateSubunit);
router.delete('/:id', SubunitController.deleteSubunit);
router.patch('/status/:id', validate(SubunitStatusSchema), SubunitController.updateStatus);

export default router;
