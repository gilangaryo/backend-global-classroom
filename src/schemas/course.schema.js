// schemas/course.schema.js
import { z } from 'zod';

export const CourseSchema = z.object({
    title: z.string().min(3).max(100),
    price: z.number().min(0),
    description: z.string().max(1000),
    digitalUrl: z.string().url().optional(),
    imageUrl: z.string().url().optional(),
    colorButton: z.string(),
});

export const CourseStatusSchema = z.object({
    isActive: z.boolean(),
});