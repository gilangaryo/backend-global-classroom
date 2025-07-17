import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.unit.findMany({
        include: { lessons: true, subunits: true },
    });
};

export const findById = async (id) => {
    return prisma.unit.findUnique({
        where: { id: Number(id) },
        include: { lessons: true, subunits: true },
    });
};

export const create = async (data) => {
    return prisma.unit.create({ data });
};

export const update = async (id, data) => {
    return prisma.unit.update({
        where: { id: Number(id) },
        data,
    });
};

export const remove = async (id) => {
    return prisma.unit.delete({
        where: { id: Number(id) },
    });
};
