import * as LessonService from './lesson.service.js';

export const getAllLessons = async (req, res) => {
    try {
        const data = await LessonService.getAllLessons();
        return res.json({
            status: 'success',
            data,
            message: 'All lessons fetched',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getLessonById = async (req, res) => {
    try {
        const id = req.params.id;
        const lesson = await LessonService.getLessonById(id);
        if (!lesson) return res.status(404).json({
            status: 'error',
            message: 'Lesson not found',
        });
        return res.json({
            status: 'success',
            data: lesson,
            message: 'Lesson found',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const createLesson = async (req, res) => {
    try {
        const data = req.body;
        const lesson = await LessonService.createLesson(data);
        return res.status(201).json({
            status: 'success',
            data: lesson,
            message: 'Lesson created',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const updateLesson = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const lesson = await LessonService.updateLesson(id, data);
        return res.json({
            status: 'success',
            data: lesson,
            message: 'Lesson updated',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const id = req.params.id;
        await LessonService.deleteLesson(id);
        return res.status(204).json({
            status: 'success',
            message: 'Lesson deleted',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

