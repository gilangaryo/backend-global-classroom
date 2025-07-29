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
        where: { id },
        include: {
            units: {
                include: {
                    subunits: true,
                    lessons: true,
                },
            },
            category: true,
        },
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

export const findAllWithPagination = async ({ skip, take, search, page }) => {
    const whereClause = {
        AND: [
            // { isActive: true },
            search
                ? {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                }
                : {},
        ],
    };

    const [courses, totalItems] = await Promise.all([
        prisma.course.findMany({
            skip,
            take,
            where: whereClause,
            include: {
                units: {
                    include: {
                        subunits: true,
                        lessons: true,
                    },
                },
                category: true,
            },
        }),
        prisma.course.count({ where: whereClause }),
    ]);

    return {
        data: courses,
        page,
        totalItems,
        totalPages: Math.ceil(totalItems / take),
    };
};
