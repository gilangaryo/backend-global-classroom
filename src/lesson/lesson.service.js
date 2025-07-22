import * as LessonRepository from './lesson.repository.js';
import { makeSlug } from '../utils/slug.js';

export const getAllLessons = async () => {
    return await LessonRepository.findAll();
};

export const getLessonByItemId = async (itemId) => {
    return await LessonRepository.findByItemId(itemId);
};

export const createLesson = async (data) => {
    // Slugify title
    const lessonData = { ...data, slug: makeSlug(data.title) };
    return await LessonRepository.create(lessonData);
};

export const updateLesson = async (itemId, data) => {
    const existing = await LessonRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    let lessonData = { ...data };
    if (data.title) lessonData.slug = makeSlug(data.title);
    return await LessonRepository.update(itemId, lessonData);
};

export const deleteLesson = async (itemId) => {
    const existing = await LessonRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    return await LessonRepository.remove(itemId);
};

export const updateStatus = async (itemId, data) => {
    const existing = await LessonRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Lesson not found');
        err.status = 404;
        throw err;
    }
    return await LessonRepository.updateStatus(itemId, data.isActive);
};
