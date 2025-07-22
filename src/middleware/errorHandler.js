export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Error dari validateData (safeParse gagal)
    if (err.issues) {
        const errors = err.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        return res.status(err.status || 400).json({
            status: 'error',
            message: err.message || 'Validation error',
            errors,
            data: null,
        });
    }

    // Error asli dari Zod
    if (err.name === 'ZodError') {
        const errors = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors,
            data: null,
        });
    }

    // Not found error
    if (err.status === 404) {
        return res.status(404).json({
            status: 'error',
            message: err.message || 'Not found',
            data: null,
        });
    }

    // Prisma error
    if (
        (err.code && err.code.startsWith('P')) ||
        /Unknown argument/.test(err.message)
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Field tidak valid pada request',
            data: null,
        });
    }

    // Fallback
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        data: null,
    });
};
