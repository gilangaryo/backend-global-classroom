import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.lesson.findMany({
        include: {
            unit: true,
            subunit: true,
        },
    });
};

export const findById = async (id) => {
    return prisma.lesson.findUnique({
        where: { id: Number(id) },
        include: {
            unit: true,
            subunit: true,
        },
    });
};

export const create = async (data) => {
    return prisma.lesson.create({ data });
};

export const update = async (id, data) => {
    return prisma.lesson.update({
        where: { id: Number(id) },
        data,
    });
};

export const remove = async (id) => {
    return prisma.lesson.delete({
        where: { id: Number(id) },
    });
};
