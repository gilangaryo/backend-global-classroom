import { Router } from 'express';
import * as UnitController from '../unit/unit.controller.js';
import { validate } from '../middleware/validate.js';
import { UnitSchema, UnitStatusSchema } from '../schemas/unit.schema.js';

const router = Router();

router.get('/', UnitController.getAllUnits);
router.get('/:itemId', UnitController.getUnitByItemId);
router.post('/', validate(UnitSchema), UnitController.createUnit);
router.put('/:itemId', validate(UnitSchema), UnitController.updateUnit);
router.delete('/:itemId', UnitController.deleteUnit);
router.patch('/status/:itemId', validate(UnitStatusSchema), UnitController.updateStatus);

export default router;
