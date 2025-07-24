import * as SubunitRepository from './subunit.repository.js';
import { makeSlug } from '../utils/slug.js';

export const getAllSubunits = async () => {
    return await SubunitRepository.findAll();
};

export const getSubunitByItemId = async (id) => {
    return await SubunitRepository.findByItemId(id);
};

export const createSubunit = async (data) => {
    const subunitData = { ...data, slug: makeSlug(data.title) };
    return await SubunitRepository.create(subunitData);
};

export const updateSubunit = async (id, data) => {
    const existing = await SubunitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    let subunitData = { ...data };
    if (data.title) subunitData.slug = makeSlug(data.title);
    return await SubunitRepository.update(id, subunitData);
};

export const deleteSubunit = async (id) => {
    const existing = await SubunitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    return await SubunitRepository.remove(id);
};

export const updateStatus = async (id, data) => {
    const existing = await SubunitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    return await SubunitRepository.updateStatus(id, data.isActive);
};
