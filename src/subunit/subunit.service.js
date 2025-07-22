import * as SubunitRepository from './subunit.repository.js';
import { makeSlug } from '../utils/slug.js';

export const getAllSubunits = async () => {
    return await SubunitRepository.findAll();
};

export const getSubunitByItemId = async (itemId) => {
    return await SubunitRepository.findByItemId(itemId);
};

export const createSubunit = async (data) => {
    const subunitData = { ...data, slug: makeSlug(data.title) };
    return await SubunitRepository.create(subunitData);
};

export const updateSubunit = async (itemId, data) => {
    const existing = await SubunitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    let subunitData = { ...data };
    if (data.title) subunitData.slug = makeSlug(data.title);
    return await SubunitRepository.update(itemId, subunitData);
};

export const deleteSubunit = async (itemId) => {
    const existing = await SubunitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    return await SubunitRepository.remove(itemId);
};

export const updateStatus = async (itemId, data) => {
    const existing = await SubunitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Subunit not found');
        err.status = 404;
        throw err;
    }
    return await SubunitRepository.updateStatus(itemId, data.isActive);
};
