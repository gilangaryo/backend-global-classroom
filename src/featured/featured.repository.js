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
