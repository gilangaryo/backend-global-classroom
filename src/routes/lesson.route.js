import { Router } from 'express';
import * as LessonController from '../lesson/lesson.controller.js';
import { validate } from '../middleware/validate.js';
import { LessonSchema, LessonUpdateSchema, LessonStatusSchema } from '../schemas/lesson.schema.js';

const router = Router();

router.get('/', LessonController.getAllLessons);
router.get('/:itemId', LessonController.getLessonByItemId);
router.post('/', validate(LessonSchema), LessonController.createLesson);
router.put('/:itemId', validate(LessonUpdateSchema), LessonController.updateLesson);
router.delete('/:itemId', LessonController.deleteLesson);
router.patch('/status/:itemId', validate(LessonStatusSchema), LessonController.updateStatus);

export default router;
