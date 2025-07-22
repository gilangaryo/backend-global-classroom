import { z } from 'zod';

export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                data: err.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message,
                }))
            });
        }
        next(err); // untuk error non-Zod
    }
};
