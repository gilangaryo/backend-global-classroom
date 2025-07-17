import { Router } from 'express';
import * as UnitController from '../unit/unit.controller.js';

const router = Router();

router.get('/', UnitController.getAllUnits);
router.get('/:id', UnitController.getUnitById);
router.post('/', UnitController.createUnit);
router.put('/:id', UnitController.updateUnit);
router.delete('/:id', UnitController.deleteUnit);

export default router;
