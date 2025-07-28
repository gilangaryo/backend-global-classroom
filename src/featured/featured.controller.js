import { getFeaturedResources as getFeaturedResourcesService } from './featured.service.js';

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
