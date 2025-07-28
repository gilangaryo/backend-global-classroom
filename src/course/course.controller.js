import * as CourseService from './course.service.js';

export const getAllCourses = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const result = await CourseService.getAllCoursesWithPagination({ page, limit, search });

        res.json({
            status: 'success',
            data: result.data,
            pagination: {
                page: result.page,
                totalPages: result.totalPages,
                totalItems: result.totalItems,
            },
            message: 'Courses fetched with pagination',
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};


export const getCourseByItemId = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await CourseService.getCourseByItemId(id);
        if (!course || course.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Courses not found'
            });
        }
        res.json({
            status: 'success',
            data: course,
            message: 'All courses fetched'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await CourseService.createCourse(data);
        res.status(201).json({
            status: 'success',
            data: course,
            message: 'Course created'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error', message: error.message,
            stack: error.stack
        });
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

export const updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const course = await CourseService.updateStatus(id, data);
        res.json({
            status: 'success',
            data: course,
            message: 'Course status updated'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
