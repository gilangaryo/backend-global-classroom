import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.unit.findMany({
        include: { lessons: true, subunits: true },
    });
};

export const findByItemId = async (itemId) => {
    return prisma.unit.findUnique({
        where: { itemId },
        include: { lessons: true, subunits: true },
    });
};

export const create = async (data) => {
    return prisma.unit.create({ data });
};

export const update = async (itemId, data) => {
    return prisma.unit.update({
        where: { itemId },
        data,
    });
};

export const remove = async (itemId) => {
    return prisma.unit.delete({
        where: { itemId },
    });
};

export const updateStatus = async (itemId, status) => {
    return prisma.unit.update({
        where: { itemId },
        data: { isActive: status },
    });
};