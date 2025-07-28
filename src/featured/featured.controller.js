import {
    getFeaturedResources as getFeaturedResourcesService,
    getSuggestionsService,
    getBundlesByLessonIdService
} from './featured.service.js';

export async function getFeaturedResources(req, res) {
    try {
        const data = await getFeaturedResourcesService();

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No featured resources found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data,
            message: 'Featured resources fetched successfully',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch featured resources',
        });
    }
}

export async function getsuggestions(req, res) {
    try {
        const data = await getSuggestionsService();

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No suggestions found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data,
            message: 'Suggestions fetched successfully',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch suggestions',
        });
    }
}


export async function getBundles(req, res) {
    try {
        const { lessonId } = req.query;

        if (!lessonId) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing lessonId query parameter',
            });
        }

        const data = await getBundlesByLessonIdService(lessonId);

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No bundles found for this lesson',
            });
        }

        return res.status(200).json({
            status: 'success',
            data,
            message: 'Bundles fetched successfully',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch bundles',
        });
    }
}