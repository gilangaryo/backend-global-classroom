import * as UnitService from './unit.service.js';

export const getAllUnits = async (req, res, next) => {
    try {
        const units = await UnitService.getAllUnits();
        if (!units || units.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Units is empty'
            });
        }
        res.json({
            status: 'success',
            data: units,
            message: 'All units fetched'
        });
    } catch (error) {
        next(error);
    }
};

export const getUnitByItemId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const unit = await UnitService.getUnitByItemId(id);
        if (!unit) return res.status(404).json({ status: 'error', message: 'Unit not found' });
        res.json({ status: 'success', data: unit });
    } catch (error) {
        next(error);
    }
};

export const createUnit = async (req, res, next) => {
    try {
        const data = req.body;
        const unit = await UnitService.createUnit(data);
        res.status(201).json({
            status: 'success',
            data: unit,
            message: 'Unit created'
        });
    } catch (error) {
        next(error);
    }
};

export const updateUnit = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const unit = await UnitService.updateUnit(id, data);
        res.json({ status: 'success', data: unit });
    } catch (error) {
        next(error);
    }
};

export const deleteUnit = async (req, res, next) => {
    try {
        const id = req.params.id;
        await UnitService.deleteUnit(id);
        res.status(204).json({ status: 'success' });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const unit = await UnitService.updateStatus(id, data);
        res.json({
            status: 'success',
            data: unit,
            message: 'Unit status updated'
        });
    } catch (error) {
        next(error);
    }
};
