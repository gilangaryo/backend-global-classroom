import * as CategoryRepository from './category.repository.js';

export const getAllCategories = async () => {
    return await CategoryRepository.findAll();
};

export const getCategoryById = async (id) => {
    const category = await CategoryRepository.findById(id);
    if (!category) throw new Error('Category not found');
    return category;
};

export const createCategory = async (name) => {
    // Optionally check if exists
    const exists = await CategoryRepository.findByName(name);
    if (exists) throw new Error('Category already exists');
    return await CategoryRepository.create({ name });
};

export const updateCategory = async (id, name) => {
    return await CategoryRepository.update(id, { name });
};

export const deleteCategory = async (id) => {
    return await CategoryRepository.remove(id);
};
