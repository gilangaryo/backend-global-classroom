import * as LessonRepository from './lesson.repository.js';
import slugify from 'slugify';

export const getAllLessons = async () => {
    return await LessonRepository.findAll();
};

export const getLessonById = async (id) => {
    return await LessonRepository.findById(id);
};

export const createLesson = async (data) => {
    let slug = data.slug;
    if (!slug && data.title) {
        slug = slugify(data.title, { lower: true, strict: true });
    }
    return await LessonRepository.create({ ...data, slug });
};

export const updateLesson = async (id, data) => {
    return await LessonRepository.update(id, data);
};

export const deleteLesson = async (id) => {
    return await LessonRepository.remove(id);
};
