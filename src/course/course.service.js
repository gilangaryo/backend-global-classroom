import * as CourseRepository from './course.repository.js';
import { makeSlug } from '../utils/slug.js';
import { validateData } from '../middleware/validateData.js';
import { CourseSchema } from '../schemas/course.schema.js';


export const getAllCourses = async () => {
    return await CourseRepository.findAll();
};

export const getCourseByItemId = async (itemId) => {
    return await CourseRepository.findByItemId(itemId);
};

export const createCourse = async (data) => {
    const validData = validateData(CourseSchema, data);
    let slug = makeSlug(validData.title);


    validData.slug = slug;

    return CourseRepository.create({ ...validData });
};

export const updateCourse = async (itemId, data) => {
    const validData = validateData(CourseSchema, data);

    return await CourseRepository.update(itemId, validData);
};

export const deleteCourse = async (itemId) => {
    return await CourseRepository.remove(itemId);
};

export const updateStatus = async (itemId, data) => {

    if (typeof data.isActive !== 'boolean') {
        throw new Error('isActive field must be a boolean');
    }
    const status = data.isActive

    return await CourseRepository.updateStatus(itemId, status);
};