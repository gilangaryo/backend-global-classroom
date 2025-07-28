import prisma from '../prisma/client.js';

// lesson.repository.js
export const findAll = async (filter = {}) => {
    let where = {};

    if (filter.courseId) {
        where.unit = { courseId: filter.courseId };
    }
    if (filter.unitId) {
        where.unitId = filter.unitId;
    }
    if (filter.subunitId) {
        where.subunitId = filter.subunitId;
    }
    if (filter.search) {
        where.OR = [
            { title: { contains: filter.search, mode: 'insensitive' } },
            { description: { contains: filter.search, mode: 'insensitive' } },
        ];
    }

    return prisma.lesson.findMany({
        where,
        include: { unit: true, subunit: true },
    });
};



export const findByItemId = async (id) => {
    return prisma.lesson.findUnique({
        where: { id },
        include: { unit: true, subunit: true },
    });
};

export const create = async (data) => {
    return prisma.lesson.create({ data });
};

export const update = async (id, data) => {
    return prisma.lesson.update({
        where: { id },
        data,
    });
};

export const remove = async (id) => {
    return prisma.lesson.delete({
        where: { id },
    });
};

export const updateStatus = async (id, status) => {
    return prisma.lesson.update({
        where: { id },
        data: { isActive: status },
    });
};

export const findAllWithPagination = async ({ courseId, unitId, subunitId, search, skip, take, page }) => {
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

    if (unitId) {
        where.AND.push({ unitId });
    }

    if (subunitId) {
        where.AND.push({ subunitId });
    }

    if (courseId) {
        where.AND.push({
            unit: { courseId },
        });
    }

    const [data, totalItems] = await Promise.all([
        prisma.lesson.findMany({
            where,
            skip,
            take,
            include: {
                unit: true,
                subunit: true,
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.lesson.count({ where }),
    ]);

    return {
        data,
        page,
        totalItems,
        totalPages: Math.ceil(totalItems / take),
    };
};
