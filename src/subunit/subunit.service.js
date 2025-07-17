import * as SubunitRepository from './subunit.repository.js';

export const getAllSubunits = async () => {
    return await SubunitRepository.findAll();
};

export const getSubunitById = async (id) => {
    return await SubunitRepository.findById(id);
};

export const createSubunit = async (data) => {
    return await SubunitRepository.create(data);
};

export const updateSubunit = async (id, data) => {
    return await SubunitRepository.update(id, data);
};

export const deleteSubunit = async (id) => {
    return await SubunitRepository.remove(id);
};
