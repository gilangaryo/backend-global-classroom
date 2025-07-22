import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized: Token missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ status: 'error', message: 'Forbidden: Invalid token' });
    }
};
