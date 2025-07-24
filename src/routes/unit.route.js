import { Router } from 'express';
import * as UnitController from '../unit/unit.controller.js';
import { validate } from '../middleware/validate.js';
import { UnitSchema, UnitStatusSchema } from '../schemas/unit.schema.js';

const router = Router();

router.get('/', UnitController.getAllUnits);
router.get('/:id', UnitController.getUnitByItemId);
router.post('/', validate(UnitSchema), UnitController.createUnit);
router.put('/:id', validate(UnitSchema), UnitController.updateUnit);
router.delete('/:id', UnitController.deleteUnit);
router.patch('/status/:id', validate(UnitStatusSchema), UnitController.updateStatus);

export default router;
