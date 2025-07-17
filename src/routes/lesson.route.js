import { Router } from 'express';
import * as LessonController from '../lesson/lesson.controller.js';

const router = Router();

router.get('/', LessonController.getAllLessons);
router.get('/:id', LessonController.getLessonById);
router.post('/', LessonController.createLesson);
router.put('/:id', LessonController.updateLesson);
router.delete('/:id', LessonController.deleteLesson);

export default router;
