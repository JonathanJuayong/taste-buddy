import z from 'zod';

export const ingredient = z.object({
	qty: z.number(),
	unit: z.string(),
	item: z.string()
});

export const mainSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string(),
	image_src: z.string(),
	serves: z.number(),
	cook_time: z.number(),
	prep_time: z.number(),
	ingredients: ingredient.array().default([{ item: '', qty: 1, unit: '' }]),
	steps: z.string().array().default([''])
});

export type MainSchema = z.infer<typeof mainSchema>;
