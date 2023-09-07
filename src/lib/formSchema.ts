import z from 'zod';
import {
	MAX_INGREDIENT_QTY,
	MIN_INGREDIENT_UNIT_LENGTH,
	MAX_INGREDIENT_UNIT_LENGTH,
	MIN_INGREDIENT_ITEM_LENGTH,
	MAX_INGREDIENT_ITEM_LENGTH,
	MIN_STEP_LENGTH,
	MAX_STEP_LENGTH,
	MAX_LENGTH_NAME,
	MAX_LENGTH_DESCRIPTION,
	MAX_NUMBER_SERVES,
	MAX_NUMBER_COOK_TIME,
	MAX_NUMBER_PREP_TIME,
	MAX_NUMBER_INGREDIENTS,
	MAX_NUMBER_STEPS,
	MAX_NAME_LENGTH,
	MAX_BIO_LENGTH
} from '$lib/constants';

const ingredient = z.object({
	qty: z
		.number()
		.gt(0, 'Qty must be greater than 0')
		.max(MAX_INGREDIENT_QTY, `Qty must not exceed ${MAX_INGREDIENT_QTY}`),
	unit: z.string().min(MIN_INGREDIENT_UNIT_LENGTH).max(MAX_INGREDIENT_UNIT_LENGTH),
	item: z.string().min(MIN_INGREDIENT_ITEM_LENGTH).max(MAX_INGREDIENT_ITEM_LENGTH)
});

export const step = z.object({
	id: z.string(),
	step: z.string().min(MIN_STEP_LENGTH).max(MAX_STEP_LENGTH)
});

export const mainSchema = z.object({
	id: z.number(),
	name: z.string().max(MAX_LENGTH_NAME).min(1),
	description: z.string().max(MAX_LENGTH_DESCRIPTION),
	image_src: z.string(),
	serves: z
		.number()
		.gt(0, 'Number must be greater than 0')
		.lt(MAX_NUMBER_SERVES, `Number cannot be greater than ${MAX_NUMBER_SERVES}`)
		.default(1),
	cook_time: z
		.number()
		.gt(0, 'Number must be greater than 0')
		.lt(MAX_NUMBER_COOK_TIME, `Number cannot be greater than ${MAX_NUMBER_COOK_TIME}`)
		.default(1),
	prep_time: z
		.number()
		.gt(0, 'Number must be greater than 0')
		.lt(MAX_NUMBER_PREP_TIME, `Number cannot be greater than ${MAX_NUMBER_PREP_TIME}`)
		.default(1),
	ingredients: ingredient
		.array()
		.min(1, 'Cannot have 0 ingredients')
		.max(MAX_NUMBER_INGREDIENTS, `Cannot have more than ${MAX_NUMBER_INGREDIENTS} ingredients`)
		.default([{ item: '', qty: 1, unit: '' }]),
	steps: step
		.array()
		.min(1, 'Cannot have 0 ingredients')
		.max(MAX_NUMBER_STEPS, `Cannot have more than ${MAX_NUMBER_STEPS} steps`)
		.default([{ id: 'default', step: '' }])
});

export type MainSchema = z.infer<typeof mainSchema>;

export const userSchema = z.object({
	name: z.string().max(MAX_NAME_LENGTH),
	bio: z.string().max(MAX_BIO_LENGTH),
	profile_picture: z.string()
});

export type UserSchema = z.infer<typeof userSchema>;
