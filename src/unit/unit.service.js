import * as UnitRepository from './unit.repository.js';
import slugify from 'slugify';
export const getAllUnits = async () => {
    return await UnitRepository.findAll();
};

export const getUnitById = async (id) => {
    return await UnitRepository.findById(id);
};

export const createUnit = async (data) => {
    let slug = data.slug;
    if (!slug && data.title) {
        slug = slugify(data.title, { lower: true, strict: true });
    }
    return await UnitRepository.create({ ...data, slug });
};

export const updateUnit = async (id, data) => {
    return await UnitRepository.update(id, data);
};

export const deleteUnit = async (id) => {
    return await UnitRepository.remove(id);
};
