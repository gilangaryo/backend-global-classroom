import prisma from '../prisma/client.js';

export async function getAllCourses() {
    return prisma.course.findMany({
        where: { isActive: true, deletedAt: null },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
        },
    });
}

export async function getAllUnits() {
    return prisma.unit.findMany({
        where: { isActive: true },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
        },
    });
}

export async function getAllSubunits() {
    return prisma.subunit.findMany({
        where: { isActive: true },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
        },
    });
}

export async function getAllLessons() {
    return prisma.lesson.findMany({
        where: { isActive: true },
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
        },
    });
}

export async function getSuggestions() {
    const [lessons, units, courses] = await Promise.all([
        prisma.lesson.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                imageUrl: true,
                createdAt: true,
                subunitId: true,
                unitId: true,
            },
        }),
        prisma.unit.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 2,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                imageUrl: true,
                createdAt: true,
                courseId: true,
            },
        }),
        prisma.course.findMany({
            where: { isActive: true, deletedAt: null },
            orderBy: { createdAt: 'desc' },
            take: 2,
            select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                imageUrl: true,
                createdAt: true,
            },
        }),
    ]);

    const mapped = [
        ...lessons.map(item => ({ ...item, type: 'LESSON' })),
        ...units.map(item => ({ ...item, type: 'UNIT' })),
        ...courses.map(item => ({ ...item, type: 'COURSE' })),
    ];

    return mapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBundleCourses() {
    return prisma.course.findMany({
        where: { isActive: true, deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
            price: true,
        },
    });
}

export async function getBundleUnits() {
    return prisma.unit.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            createdAt: true,
            price: true,
        },
    });
}

export async function getBundleByLessonId(lessonId) {
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        select: {
            id: true,
            unit: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    imageUrl: true,
                    createdAt: true,
                    price: true,
                    course: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            imageUrl: true,
                            createdAt: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });

    if (!lesson || !lesson.unit) return [];

    const bundle = [];

    if (lesson.unit) {
        bundle.push({
            ...lesson.unit,
            type: 'UNIT',
        });

        if (lesson.unit.course) {
            bundle.push({
                ...lesson.unit.course,
                type: 'COURSE',
            });
        }
    }

    return bundle;
}
