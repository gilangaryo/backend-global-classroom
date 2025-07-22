// schemas/course.schema.js
import { z } from 'zod';

export const UnitSchema = z.object({
    title: z.string().min(1, 'Title wajib diisi'),
    previewUrl: z.string().url('URL tidak valid'),
    digitalUrl: z.string(),
    description: z.string(),
    price: z.coerce.number().nonnegative('Harga tidak boleh minus'),
    imageUrl: z.string().url('URL tidak valid'),
    courseId: z.number(),
});


export const UnitStatusSchema = z.object({
    isActive: z.boolean(),
});
