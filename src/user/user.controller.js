import * as AuthService from './user.service.js';

export const profile = async (req, res) => {
    try {
        const user = await AuthService.getProfile(req.user.id);
        res.json({
            status: 'success',
            data: user,
            message: 'User profile retrieved',
        });
    } catch (err) {
        res.status(404).json({ status: 'error', message: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await AuthService.getAllUsers();
        res.json({ status: 'success', data: users });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updated = await AuthService.updateProfile(req.user.id, req.body);
        res.json({ status: 'success', data: updated, message: 'Profile updated' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await AuthService.deleteUserById(req.user.id);
        res.json({ status: 'success', message: 'Account deleted' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
