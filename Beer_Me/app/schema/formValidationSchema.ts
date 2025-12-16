import {z} from 'zod';

const imageFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'heic', 'heif', 'webp'];

export const BeerSchema = z.object({
    image: z.string()
        .optional()
        .refine((val) => {
            if (!val) return true;
            const lastDotIndex = val.lastIndexOf('.');
            if (lastDotIndex === -1) return false;
            const extension = val.slice(lastDotIndex + 1).toLowerCase();
            return imageFileExtensions.includes(extension);
        }, {
            message: "Image must be a valid image file (jpg, jpeg, png, gif, heic, heif, webp)"
        }),
    name: z.string()
        .min(1, {message: "Name is required"})
        .max(100, {message: "Name must be less than 100 characters"}),
    type: z.string().optional(),
    subType: z.string().optional(),
    rating: z.number()
        .min(1, {message: "Rating must be between 1 and 5"})
        .max(5, {message: "Rating must be between 1 and 5"}),
    brewery: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    date: z.string().optional(),
});

export type BeerFormValues = z.infer<typeof BeerSchema>;