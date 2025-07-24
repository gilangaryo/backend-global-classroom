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


export const findByItemId = async (id) => {
    return prisma.course.findUnique({
        where: { id: id },
        include: { units: true, category: true },
    });
};

export const create = async (data) => {
    return prisma.course.create({ data });
};

export const update = async (id, data) => {
    return prisma.course.update({
        where: { id: id },
        data,
    });
};

export const remove = async (id) => {
    return prisma.course.delete({
        where: { id: id },
    });
};

export const updateStatus = async (id, status) => {
    return prisma.course.update({
        where: { id: id },
        data: { isActive: status },
    });
};

