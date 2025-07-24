import prisma from '../prisma/client.js';

export const findAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
};

export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
};

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email },
    });
};

export const createUser = async (data) => {
    return prisma.user.create({ data });
};

export const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id: id },
        data,
    });
};

export const deleteUser = async (id) => {
    return prisma.user.delete({
        where: { id: id },
    });
};

export const findUserByRefreshToken = async (refreshToken) => {
    return prisma.user.findFirst({
        where: { refreshToken },
    });
};

export const updateUserRefreshToken = async (id, refreshToken) => {
    return prisma.user.update({
        where: { id },
        data: { refreshToken },
    });
};

export const clearUserRefreshToken = async (id) => {
    return prisma.user.update({
        where: { id },
        data: { refreshToken: null },
    });
};
