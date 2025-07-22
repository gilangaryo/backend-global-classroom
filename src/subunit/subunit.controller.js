import * as SubunitService from './subunit.service.js';

export const getAllSubunits = async (req, res, next) => {
    try {
        const subunits = await SubunitService.getAllSubunits();
        if (!subunits || subunits.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Subunits is empty'
            });
        }
        res.json({
            status: 'success',
            data: subunits,
            message: 'All subunits fetched'
        });
    } catch (error) {
        next(error);
    }
};

export const getSubunitByItemId = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const subunit = await SubunitService.getSubunitByItemId(itemId);
        if (!subunit) return res.status(404).json({ status: 'error', message: 'Subunit not found' });
        res.json({ status: 'success', data: subunit });
    } catch (error) {
        next(error);
    }
};

export const createSubunit = async (req, res, next) => {
    try {
        // req.body SUDAH valid dari middleware!
        const subunit = await SubunitService.createSubunit(req.body);
        res.status(201).json({
            status: 'success',
            data: subunit,
            message: 'Subunit created'
        });
    } catch (error) {
        next(error);
    }
};

export const updateSubunit = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const subunit = await SubunitService.updateSubunit(itemId, req.body);
        res.json({ status: 'success', data: subunit });
    } catch (error) {
        next(error);
    }
};

export const deleteSubunit = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        await SubunitService.deleteSubunit(itemId);
        res.status(204).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req, res, next) => {
    try {
        const itemId = req.params.itemId;
        const subunit = await SubunitService.updateStatus(itemId, req.body);
        res.json({
            status: 'success',
            data: subunit,
            message: 'Subunit status updated'
        });
    } catch (error) {
        next(error);
    }
};
