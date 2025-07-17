import * as LessonRepository from './lesson.repository.js';

export const getAllLessons = async () => {
    return await LessonRepository.findAll();
};

export const getLessonById = async (id) => {
    return await LessonRepository.findById(id);
};

export const createLesson = async (data) => {
    return await LessonRepository.create(data);
};

export const updateLesson = async (id, data) => {
    return await LessonRepository.update(id, data);
};

export const deleteLesson = async (id) => {
    return await LessonRepository.remove(id);
};
