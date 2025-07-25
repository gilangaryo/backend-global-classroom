import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const upsertCartItem = ({ sessionId, productId, productType, quantity }) => {
    return prisma.cart.upsert({
        where: { sessionId_productId: { sessionId, productId } },
        update: {
            quantity: quantity,
        },
        create: {
            sessionId,
            productId,
            productType,
            quantity,
        },
    })
}

export const findCartBySession = (sessionId) => {
    return prisma.cart.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'desc' },
    })
}

export const findCartItem = (sessionId, productId) => {
    return prisma.cart.findUnique({
        where: { sessionId_productId: { sessionId, productId } },
    })
}

export const deleteCartItem = (sessionId, productId) => {
    return prisma.cart.delete({
        where: { sessionId_productId: { sessionId, productId } },
    })
}
