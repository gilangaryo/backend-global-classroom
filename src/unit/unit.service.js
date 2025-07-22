import * as UnitRepository from './unit.repository.js';
import { makeSlug } from '../utils/slug.js';
import { validateData } from '../middleware/validateData.js';
import { UnitSchema } from '../schemas/unit.schema.js';
export const getAllUnits = async () => {
    return await UnitRepository.findAll();
};

export const getUnitByItemId = async (itemId) => {
    return await UnitRepository.findByItemId(itemId);
};

export const createUnit = async (data) => {
    const validData = validateData(UnitSchema, data);
    let slug = makeSlug(validData.title);
    validData.slug = slug;
    return await UnitRepository.create({ ...validData });
};

export const updateUnit = async (itemId, data) => {
    const existing = await UnitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    return await UnitRepository.update(itemId, data);
};

export const deleteUnit = async (itemId) => {
    const existing = await UnitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    return await UnitRepository.remove(itemId);
};

export const updateStatus = async (itemId, data) => {
    const existing = await UnitRepository.findByItemId(itemId);
    if (!existing) {
        const err = new Error('Unit not found');
        err.status = 404;
        throw err;
    }
    if (typeof data.isActive !== 'boolean') {
        throw new Error('isActive field must be a boolean');
    }
    const status = data.isActive

    return await UnitRepository.updateStatus(itemId, status);
};