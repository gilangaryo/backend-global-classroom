import { Router } from 'express';
import * as CourseController from '../course/course.controller.js';
import { validate } from '../middleware/validate.js';
import { CourseSchema } from '../schemas/course.schema.js';
const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:itemId', CourseController.getCourseByItemId);
router.post('/', validate(CourseSchema), CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch('/status/:itemId', CourseController.updateStatus);

export default router;
