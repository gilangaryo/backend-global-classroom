import * as CourseRepository from './course.repository.js';
import { makeSlug } from '../utils/slug.js';
import { validateData } from '../middleware/validateData.js';
import { CourseSchema } from '../schemas/course.schema.js';


export const getAllCourses = async () => {
    return await CourseRepository.findAll();
};

export const getCourseByItemId = async (id) => {
    return await CourseRepository.findByItemId(id);
};

export const createCourse = async (data) => {
    const validData = validateData(CourseSchema, data);
    let slug = makeSlug(validData.title);
    validData.slug = slug;
    return CourseRepository.create({ ...validData });
};

export const updateCourse = async (id, data) => {
    const existing = await CourseRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Course not found');
        err.status = 404;
        throw err;
    }
    const validData = validateData(CourseSchema, data);

    return await CourseRepository.update(id, validData);
};

export const deleteCourse = async (id) => {
    const existing = await CourseRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Course not found');
        err.status = 404;
        throw err;
    }
    return await CourseRepository.remove(id);
};

export const updateStatus = async (id, data) => {
    const existing = await CourseRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Course not found');
        err.status = 404;
        throw err;
    }
    if (typeof data.isActive !== 'boolean') {
        throw new Error('isActive field must be a boolean');
    }
    const status = data.isActive

    return await CourseRepository.updateStatus(id, status);
};