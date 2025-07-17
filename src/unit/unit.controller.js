import * as UnitService from './unit.service.js';

export const getAllUnits = async (req, res) => {
    try {
        const units = await UnitService.getAllUnits();
        res.json({ status: 'success', data: units });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getUnitById = async (req, res) => {
    try {
        const id = req.params.id;
        const unit = await UnitService.getUnitById(id);
        if (!unit) return res.status(404).json({ status: 'error', message: 'Unit not found' });
        res.json({ status: 'success', data: unit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createUnit = async (req, res) => {
    try {
        const data = req.body;
        const unit = await UnitService.createUnit(data);
        res.status(201).json({ status: 'success', data: unit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateUnit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const unit = await UnitService.updateUnit(id, data);
        res.json({ status: 'success', data: unit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteUnit = async (req, res) => {
    try {
        const id = req.params.id;
        await UnitService.deleteUnit(id);
        res.status(204).json({ status: 'success' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

