import { z } from 'zod';

export const LessonSchema = z.object({
    title: z.string().min(1, 'Title wajib diisi'),
    tag: z.string(),
    description: z.string(),
    price: z.coerce.number().nonnegative('Harga tidak boleh minus'),
    previewUrl: z.string().url('URL tidak valid'),
    digitalUrl: z.string().url('URL tidak valid'),
    imageUrl: z.string().url('URL tidak valid'),
    unitId: z.number().optional().nullable(),
    subunitId: z.number().optional().nullable(),
});

export const LessonUpdateSchema = LessonSchema.partial();

export const LessonStatusSchema = z.object({
    isActive: z.boolean(),
});
