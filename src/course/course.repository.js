import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.course.findMany({
        include: {
            units: {
                include: {
                    subunits: true,
                    lessons: true
                }
            },
            category: true
        }
    });
};


export const findByItemId = async (itemId) => {
    return prisma.course.findUnique({
        where: { itemId: itemId },
        include: { units: true, category: true },
    });
};

export const create = async (data) => {
    return prisma.course.create({ data });
};

export const update = async (itemId, data) => {
    return prisma.course.update({
        where: { itemId: itemId },
        data,
    });
};

export const remove = async (itemId) => {
    return prisma.course.delete({
        where: { itemId: itemId },
    });
};

export const updateStatus = async (itemId, status) => {
    return prisma.course.update({
        where: { itemId: itemId },
        data: { isActive: status },
    });
};

