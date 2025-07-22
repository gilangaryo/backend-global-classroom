import * as SubunitRepository from './subunit.repository.js';
import slugify from 'slugify';

export const getAllSubunits = async () => {
    return await SubunitRepository.findAll();
};

export const getSubunitById = async (id) => {
    return await SubunitRepository.findById(id);
};

export const createSubunit = async (data) => {
    let slug = data.slug;
    if (!slug && data.title) {
        slug = slugify(data.title, { lower: true, strict: true });
    }
    return await SubunitRepository.create({ ...data, slug });
};

export const updateSubunit = async (id, data) => {
    return await SubunitRepository.update(id, data);
};

export const deleteSubunit = async (id) => {
    return await SubunitRepository.remove(id);
};
