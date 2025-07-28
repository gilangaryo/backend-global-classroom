import {
    getAllCourses,
    getAllUnits,
    getAllSubunits,
    getAllLessons,
    getSuggestions,
    getBundleUnits,
    getBundleByLessonId
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

export async function getSuggestionsService() {
    const data = await getSuggestions();
    return data.slice(0, 6);
}

export async function getBundlesService() {
    const [courses, units] = await Promise.all([
        getBundleCourses(), // Ambil 1 course terbaru
        getBundleUnits(),   // Ambil 1 unit terbaru
    ]);

    const combined = [
        ...units.map(item => ({ ...item, type: 'UNIT' })),
        ...courses.map(item => ({ ...item, type: 'COURSE' })),
    ];

    return combined;
}


export async function getBundlesByLessonIdService(lessonId) {
    return await getBundleByLessonId(lessonId);
}
