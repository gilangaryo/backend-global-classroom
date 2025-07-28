import * as UnitRepository from './unit.repository.js';
import { makeSlug } from '../utils/slug.js';
import { validateData } from '../middleware/validateData.js';
import { UnitSchema } from '../schemas/unit.schema.js';
export const getAllUnits = async (filter = {}) => {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    return await UnitRepository.findAllWithPagination({ ...filter, skip, take: limit, page });
};

export const getUnitByItemId = async (id) => {
    return await UnitRepository.findByItemId(id);
};

export const createUnit = async (data) => {
    const validData = validateData(UnitSchema, data);
    let slug = makeSlug(validData.title);
    validData.slug = slug;
    return await UnitRepository.create({ ...validData });
};

export const updateUnit = async (id, data) => {
    const existing = await UnitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    return await UnitRepository.update(id, data);
};

export const deleteUnit = async (id) => {
    const existing = await UnitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    return await UnitRepository.remove(id);
};

export const updateStatus = async (id, data) => {
    const existing = await UnitRepository.findByItemId(id);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    if (typeof data.isActive !== 'boolean') {
        throw new Error('isActive field must be a boolean');
    }
    const status = data.isActive

    return await UnitRepository.updateStatus(id, status);
};