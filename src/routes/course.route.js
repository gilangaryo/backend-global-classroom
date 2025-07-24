import { Router } from 'express';
import * as CourseController from '../course/course.controller.js';
import { validate } from '../middleware/validate.js';
import { CourseSchema, CourseStatusSchema } from '../schemas/course.schema.js';
const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseByItemId);
router.post('/', validate(CourseSchema), CourseController.createCourse);
router.put('/:id', validate(CourseSchema), CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch('/status/:id', CourseController.updateStatus);

export default router;
