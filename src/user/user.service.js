import * as AuthRepository from './user.repository.js';

export const getProfile = async (userId) => {
    const user = await AuthRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Remove sensitive info if needed
    delete user.password;

    return user;
};

export const getAllUsers = async () => {
    return await AuthRepository.findAllUsers();
};

export const updateProfile = async (userId, updateData) => {
    const user = await AuthRepository.findUserById(userId);
    if (!user) throw new Error('User not found');

    // Optional: validate data fields (e.g., name length, etc.)

    return await AuthRepository.updateUser(userId, updateData);
};

export const deleteUserById = async (userId) => {
    const user = await AuthRepository.findUserById(userId);
    if (!user) throw new Error('User not found');

    return await AuthRepository.deleteUser(userId);
};
