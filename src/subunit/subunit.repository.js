import prisma from '../prisma/client.js';

export const findAll = async () => {
    return prisma.subunit.findMany({
        include: {
            lessons: true,
            unit: true,
        },
    });
};

export const findById = async (id) => {
    return prisma.subunit.findUnique({
        where: { id: Number(id) },
        include: {
            lessons: true,
            unit: true,
        },
    });
};

export const create = async (data) => {
    return prisma.subunit.create({ data });
};

export const update = async (id, data) => {
    return prisma.subunit.update({
        where: { id: Number(id) },
        data,
    });
};

export const remove = async (id) => {
    return prisma.subunit.delete({
        where: { id: Number(id) },
    });
};
