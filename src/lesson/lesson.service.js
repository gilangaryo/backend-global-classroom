import * as LessonRepository from './lesson.repository.js';
import { makeSlug } from '../utils/slug.js';

// lesson.service.js
export const getAllLessons = async (filter = {}) => {
    return await LessonRepository.findAll(filter);
};


export const getLessonByItemId = async (id) => {
    return await LessonRepository.findByItemId(id);
};

export const createLesson = async (data) => {
    // Slugify title
    const lessonData = { ...data, slug: makeSlug(data.title) };
    return await LessonRepository.create(lessonData);
};

export const updateLesson = async (id, data) => {
    const existing = await LessonRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    let lessonData = { ...data };
    if (data.title) lessonData.slug = makeSlug(data.title);
    return await LessonRepository.update(id, lessonData);
};

export const deleteLesson = async (id) => {
    const existing = await LessonRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    return await LessonRepository.remove(id);
};

export const updateStatus = async (id, data) => {
    const existing = await LessonRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    return await LessonRepository.updateStatus(id, data.isActive);
};
