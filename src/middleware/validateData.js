
export const validateData = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        const error = new Error('Validation error');
        error.status = 400;
        error.issues = result.error.issues;
        throw error;
    }
    return result.data;
};
