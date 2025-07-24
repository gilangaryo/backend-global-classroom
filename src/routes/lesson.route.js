import { Router } from 'express';
import * as LessonController from '../lesson/lesson.controller.js';
import { validate } from '../middleware/validate.js';
import { LessonSchema, LessonUpdateSchema, LessonStatusSchema } from '../schemas/lesson.schema.js';

const router = Router();

router.get('/', LessonController.getAllLessons);
router.get('/:id', LessonController.getLessonByItemId);
router.post('/', validate(LessonSchema), LessonController.createLesson);
router.put('/:id', validate(LessonUpdateSchema), LessonController.updateLesson);
router.delete('/:id', LessonController.deleteLesson);
router.patch('/status/:id', validate(LessonStatusSchema), LessonController.updateStatus);

export default router;
