import { z } from 'zod';

export const SubunitSchema = z.object({
    title: z.string().min(1, 'Title wajib diisi'),
    tag: z.string(),
    description: z.string(),
    price: z.coerce.number().nonnegative('Harga tidak boleh minus'),
    previewUrl: z.string().url('URL tidak valid'),
    digitalUrl: z.string().url('URL tidak valid'),
    imageUrl: z.string().url('URL tidak valid'),
    unitId: z.number(),
});

export const SubunitUpdateSchema = z.object({
    itemId: z.string().uuid().optional(),
    title: z.string().min(1, 'Title wajib diisi').optional(),
    previewUrl: z.string().url('URL tidak valid').optional().nullable(),
    digitalUrl: z.string().url('URL tidak valid').optional().nullable(),
    description: z.string().optional().nullable(),
    price: z.coerce.number().nonnegative('Harga tidak boleh minus').optional(),
    imageUrl: z.string().url('URL tidak valid').optional().nullable(),
    isActive: z.boolean().optional(),
    tag: z.string().optional().nullable(),
    unitId: z.number().optional(),
});

export const SubunitStatusSchema = z.object({
    isActive: z.boolean(),
});
