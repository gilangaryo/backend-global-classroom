import { v4 as uuidv4 } from 'uuid';

export const sessionMiddleware = (req, res, next) => {
    let sessionId = req.cookies?.session_id;

    if (!sessionId) {
        sessionId = uuidv4();
        res.cookie('session_id', sessionId, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
            sameSite: 'lax',
        });
    }

    req.session_id = sessionId;
    next();
};
