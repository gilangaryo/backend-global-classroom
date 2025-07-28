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

export const findAllWithPagination = async ({ courseId, search, skip, take, page }) => {
    const where = {
        AND: [],
    };

    if (search) {
        where.AND.push({
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ],
        });
    }

    if (courseId) {
        where.AND.push({ courseId });
    }

    const [data, totalItems] = await Promise.all([
        prisma.unit.findMany({
            where,
            skip,
            take,
            include: { lessons: true, subunits: true },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.unit.count({ where }),
    ]);

    return {
        data,
        page,
        totalItems,
        totalPages: Math.ceil(totalItems / take),
    };
};
