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
            tags: {
                include: {
                    tag: true
                }
            },
            category: true
        }
    });
};


export const findById = async (id) => {
    return prisma.course.findUnique({
        where: { id: Number(id) },
        include: { units: true, tags: true, category: true },
    });
};

export const create = async (data) => {
    return prisma.course.create({ data });
};

export const update = async (id, data) => {
    return prisma.course.update({
        where: { id: Number(id) },
        data,
    });
};

export const remove = async (id) => {
    return prisma.course.delete({
        where: { id: Number(id) },
    });
};
