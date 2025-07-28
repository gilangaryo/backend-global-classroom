import prisma from '../prisma/client.js';

export const findValidatedProducts = async (items) => {
    const idsByType = {
        COURSE: [],
        UNIT: [],
        SUBUNIT: [],
        LESSON: [],
    };
    items.forEach(item => {
        if (idsByType[item.type]) {
            idsByType[item.type].push(item.id);
        }
    });

    const promises = [];

    if (idsByType.COURSE.length > 0) {
        promises.push(
            prisma.course.findMany({ where: { id: { in: idsByType.COURSE } } })
                .then(results => results.map(item => ({ ...item, productType: 'COURSE' }))) // Tambahkan kembali tipe produk
        );
    }
    if (idsByType.UNIT.length > 0) {
        promises.push(
            prisma.unit.findMany({ where: { id: { in: idsByType.UNIT } } })
                .then(results => results.map(item => ({ ...item, productType: 'UNIT' })))
        );
    }
    if (idsByType.SUBUNIT.length > 0) {
        promises.push(
            prisma.subunit.findMany({ where: { id: { in: idsByType.SUBUNIT } } })
                .then(results => results.map(item => ({ ...item, productType: 'SUBUNIT' })))
        );
    }
    if (idsByType.LESSON.length > 0) {
        promises.push(
            prisma.lesson.findMany({ where: { id: { in: idsByType.LESSON } } })
                .then(results => results.map(item => ({ ...item, productType: 'LESSON' })))
        );
    }

    const resultsByGroup = await Promise.all(promises);

    const validatedProducts = [].concat(...resultsByGroup);

    return validatedProducts;
};