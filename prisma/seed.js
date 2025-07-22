import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';
import slugify from 'slugify';

const prisma = new PrismaClient();

function makeSlug(text) {
    const base = slugify(text, { lower: true, strict: true });
    return `${base}-${nanoid(6)}`;
}

async function main() {
    const courseData = {
        title: 'Contoh Course',
        slug: makeSlug('Contoh Course'),
        description: 'Ini contoh deskripsi course.',
        price: 199.99,
        previewUrl: 'https://example.com/preview.mp4',
        digitalUrl: 'https://example.com/digital.zip',
        imageUrl: 'https://example.com/image.png',
        colorButton: '#FF0000',
        units: {
            create: Array.from({ length: 3 }, (_, ui) => {
                const unitTitle = `Unit ${ui + 1}`;
                return {
                    title: unitTitle,
                    slug: makeSlug(unitTitle),
                    description: `Deskripsi ${unitTitle}`,
                    price: 49.99,
                    previewUrl: null,
                    digitalUrl: null,
                    imageUrl: null,
                    subunits: {
                        create: Array.from({ length: 2 }, (_, si) => {
                            const subTitle = `Unit ${ui + 1} - Subunit ${si + 1}`;
                            return {
                                title: subTitle,
                                slug: makeSlug(subTitle),
                                description: `Deskripsi ${subTitle}`,
                                price: 19.99,
                                previewUrl: null,
                                digitalUrl: null,
                                imageUrl: null,
                                tag: `tag-${ui}-${si}`,
                                lessons: {
                                    create: {
                                        title: `Lesson untuk ${subTitle}`,
                                        slug: makeSlug(`Lesson ${ui + 1}-${si + 1}`),
                                        description: `Deskripsi lesson ${ui + 1}-${si + 1}`,
                                        price: 9.99,
                                        previewUrl: null,
                                        digitalUrl: null,
                                        imageUrl: null,
                                        tag: `tag-${ui}-${si}`,
                                    }
                                }
                            };
                        })
                    }
                };
            })
        }
    };

    const course = await prisma.course.create({ data: courseData });
    console.log('Seed berhasil:', course.id);
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
