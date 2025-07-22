// schemas/course.schema.js
import { z } from 'zod';

export const CourseSchema = z.object({
    title: z.string().min(3).max(100),
    price: z.number().min(0),

    slug: z.string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
    categoryId: z.number().int().positive().optional(),
    description: z.string().max(1000).optional(),
    digitalUrl: z.string().url().optional(),
    previewUrl: z.string().url().optional(),
    imageUrl: z.string().url().optional(),
    colorButton: z.string(),
});
