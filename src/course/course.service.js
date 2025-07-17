import * as CourseRepository from './course.repository.js';

export const getAllCourses = async () => {
    return await CourseRepository.findAll();
};

export const getCourseById = async (id) => {
    return await CourseRepository.findById(id);
};

export const createCourse = async (data) => {
    return await CourseRepository.create(data);
};

export const updateCourse = async (id, data) => {
    return await CourseRepository.update(id, data);
};

export const deleteCourse = async (id) => {
    return await CourseRepository.remove(id);
};
