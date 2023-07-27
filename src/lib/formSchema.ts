import z from 'zod';

export const ingredient = z.object({
	qty: z.number(),
	unit: z.string(),
	item: z.string()
});

export const mainSchema = z.object({
	name: z.string(),
	description: z.string(),
	serves: z.number(),
	cookTime: z.number(),
	prepTime: z.number(),
	ingredients: ingredient.array().default([{ item: '', qty: 1, unit: '' }]),
	steps: z.string().array().default([''])
});

export type MainSchema = z.infer<typeof mainSchema>;
