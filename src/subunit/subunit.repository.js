import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.subunit.findMany({
        include: { lessons: true, unit: true },
    });
};

export const findByItemId = async (itemId) => {
    return prisma.subunit.findUnique({
        where: { itemId },
        include: { lessons: true, unit: true },
    });
};

export const create = async (data) => {
    return prisma.subunit.create({ data });
};

export const update = async (itemId, data) => {
    return prisma.subunit.update({
        where: { itemId },
        data,
    });
};

export const remove = async (itemId) => {
    return prisma.subunit.delete({
        where: { itemId },
    });
};

export const updateStatus = async (itemId, status) => {
    return prisma.subunit.update({
        where: { itemId },
        data: { isActive: status },
    });
};
