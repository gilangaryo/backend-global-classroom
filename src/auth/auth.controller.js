import * as AuthService from './auth.service.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        res.json({
            status: 'success',
            data: result,
            message: 'Login successfully',
        });
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: err.message,
        });
    }
};

export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await AuthService.register(email, password, name);
        res.status(201).json({
            status: 'success',
            data: user,
            message: 'Register successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new Error('Refresh token required');
        await AuthService.logout(refreshToken);
        res.json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }
};

