import {
    getAllCourses,
    getAllUnits,
    getAllSubunits,
    getAllLessons,
} from './featured.repository.js';

function addType(items, type) {
    return items.map((item) => ({ ...item, type }));
}

export async function getFeaturedResources() {
    const [courses, units, subunits, lessons] = await Promise.all([
        getAllCourses(),
        getAllUnits(),
        getAllSubunits(),
        getAllLessons(),
    ]);

    const combined = [
        ...addType(courses, 'COURSE'),
        ...addType(units, 'UNIT'),
        ...addType(subunits, 'SUBUNIT'),
        ...addType(lessons, 'LESSON'),
    ];

    return combined
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);
}
