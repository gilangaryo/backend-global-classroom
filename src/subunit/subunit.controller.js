import * as SubunitService from './subunit.service.js';

export const getAllSubunits = async (req, res) => {
    try {
        const subunits = await SubunitService.getAllSubunits();
        res.json({ status: 'success', data: subunits });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getSubunitById = async (req, res) => {
    try {
        const id = req.params.id;
        const subunit = await SubunitService.getSubunitById(id);
        if (!subunit) return res.status(404).json({ status: 'error', message: 'Subunit not found' });
        res.json({ status: 'success', data: subunit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createSubunit = async (req, res) => {
    try {
        const data = req.body;
        const subunit = await SubunitService.createSubunit(data);
        res.status(201).json({ status: 'success', data: subunit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateSubunit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const subunit = await SubunitService.updateSubunit(id, data);
        res.json({ status: 'success', data: subunit });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteSubunit = async (req, res) => {
    try {
        const id = req.params.id;
        await SubunitService.deleteSubunit(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

