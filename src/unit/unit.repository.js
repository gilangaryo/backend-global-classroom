import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.unit.findMany({
        include: { lessons: true, subunits: true },
    });
};

export const findByItemId = async (id) => {
    return prisma.unit.findUnique({
        where: { id },
        include: { lessons: true, subunits: true },
    });
};

export const create = async (data) => {
    return prisma.unit.create({ data });
};

export const update = async (id, data) => {
    return prisma.unit.update({
        where: { id },
        data,
    });
};

export const remove = async (id) => {
    return prisma.unit.delete({
        where: { id },
    });
};

export const updateStatus = async (id, status) => {
    return prisma.unit.update({
        where: { id },
        data: { isActive: status },
    });
};