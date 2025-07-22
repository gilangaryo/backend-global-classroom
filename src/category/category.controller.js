import * as CategoryService from './category.service.js';

export const getAll = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json({ status: 'success', data: categories });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        res.json({ status: 'success', data: category });
    } catch (err) {
        res.status(404).json({ status: 'error', message: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.createCategory(name);
        res.status(201).json({ status: 'success', data: category });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.updateCategory(req.params.id, name);
        res.json({ status: 'success', data: category });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        await CategoryService.deleteCategory(req.params.id);
        res.json({ status: 'success', message: 'Category deleted' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
