import * as UnitRepository from './unit.repository.js';

export const getAllUnits = async () => {
    return await UnitRepository.findAll();
};

export const getUnitById = async (id) => {
    return await UnitRepository.findById(id);
};

export const createUnit = async (data) => {
    return await UnitRepository.create(data);
};

export const updateUnit = async (id, data) => {
    return await UnitRepository.update(id, data);
};

export const deleteUnit = async (id) => {
    return await UnitRepository.remove(id);
};
