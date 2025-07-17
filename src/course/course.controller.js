import * as CourseService from './course.service.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseService.getAllCourses();
        res.json({ status: 'success', data: courses, message: 'All courses fetched' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await CourseService.getCourseById(id);
        if (!course) return res.status(404).json({ status: 'error', message: 'Course not found' });
        res.json({ status: 'success', data: course, message: 'Course found' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await CourseService.createCourse(data);
        res.status(201).json({ status: 'success', data: course, message: 'Course created' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const course = await CourseService.updateCourse(id, data);
        res.json({ status: 'success', data: course, message: 'Course updated' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        await CourseService.deleteCourse(id);
        res.status(204).json({ status: 'success', message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

