import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.lesson.findMany({
        include: { unit: true, subunit: true },
    });
};

export const findByItemId = async (itemId) => {
    return prisma.lesson.findUnique({
        where: { itemId },
        include: { unit: true, subunit: true },
    });
};

export const create = async (data) => {
    return prisma.lesson.create({ data });
};

export const update = async (itemId, data) => {
    return prisma.lesson.update({
        where: { itemId },
        data,
    });
};

export const remove = async (itemId) => {
    return prisma.lesson.delete({
        where: { itemId },
    });
};

export const updateStatus = async (itemId, status) => {
    return prisma.lesson.update({
        where: { itemId },
        data: { isActive: status },
    });
};
