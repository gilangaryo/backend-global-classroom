import * as LessonService from './lesson.service.js';

// lesson.controller.js
export const getAllLessons = async (req, res, next) => {
    try {
        // parseInt jika ada
        const filter = {
            courseId: req.query.courseId || undefined,
            unitId: req.query.unitId || undefined,
            subunitId: req.query.subunitId || undefined,
            search: req.query.search,
        };
        const lessons = await LessonService.getAllLessons(filter);
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Lessons is empty'
            });
        }
        res.json({
            status: 'success',
            data: lessons,
            message: 'All lessons fetched'
        });
    } catch (error) {
        next(error);
    }
};



export const getLessonByItemId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lesson = await LessonService.getLessonByItemId(id);
        if (!lesson) return res.status(404).json({ status: 'error', message: 'Lesson not found' });
        res.json({ status: 'success', data: lesson });
    } catch (error) {
        next(error);
    }
};

export const createLesson = async (req, res, next) => {
    try {
        const lesson = await LessonService.createLesson(req.body);
        res.status(201).json({
            status: 'success',
            data: lesson,
            message: 'Lesson created'
        });
    } catch (error) {
        next(error);
    }
};

export const updateLesson = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lesson = await LessonService.updateLesson(id, req.body);
        res.json({ status: 'success', data: lesson });
    } catch (error) {
        next(error);
    }
};

export const deleteLesson = async (req, res, next) => {
    try {
        const id = req.params.id;
        await LessonService.deleteLesson(id);
        res.status(204).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const lesson = await LessonService.updateStatus(id, req.body);
        res.json({
            status: 'success',
            data: lesson,
            message: 'Lesson status updated'
        });
    } catch (error) {
        next(error);
    }
};
