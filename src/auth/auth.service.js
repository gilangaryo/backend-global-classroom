import * as AuthRepository from './auth.repository.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const login = async (email, password) => {
    console.log('Email:', email, 'Password:', password);

    const user = await AuthRepository.findUserByEmail(email);
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
    await AuthRepository.updateUserRefreshToken(user.id, refreshToken);

    return {
        token,
        refreshToken,
        user: { id: user.id, email: user.email, name: user.name }
    };
};


export const register = async (email, password, name) => {
    if (!email || !password || !name) {
        throw new Error('Email, password, and name are required');
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        throw new Error('Invalid email address');
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
    const existingUser = await AuthRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = await AuthRepository.createUser({ email, password, name });
    return newUser;
};

export const logout = async (refreshToken) => {
    console.log('Received refreshToken:', refreshToken);
    const user = await AuthRepository.findUserByRefreshToken(refreshToken);
    console.log('User found:', user);
    if (!user) throw new Error('Invalid refresh token');
    await AuthRepository.clearUserRefreshToken(user.id);
    return { message: 'Logged out successfully' };
};
