import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.category.findMany({ orderBy: { name: 'asc' } });
};

export const findById = async (id) => {
    return prisma.category.findUnique({ where: { id: Number(id) } });
};

export const findByName = async (name) => {
    return prisma.category.findUnique({ where: { name } });
};

export const create = async (data) => {
    return prisma.category.create({ data });
};

export const update = async (id, data) => {
    return prisma.category.update({ where: { id: Number(id) }, data });
};

export const remove = async (id) => {
    return prisma.category.delete({ where: { id: Number(id) } });
};
