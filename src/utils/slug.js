import slugify from 'slugify';
import { nanoid } from 'nanoid';

export function makeSlug(title) {
    const base = slugify(title, { lower: true, strict: true });
    const suffix = nanoid(6);
    return `${base}-${suffix}`;
}
