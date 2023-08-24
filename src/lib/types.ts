import type { ZodValidation } from 'sveltekit-superforms';
import type { mainSchema } from '$lib/formSchema';
import type { SuperForm } from 'sveltekit-superforms/client';

export type RecipeCard = {
	id: number;
	name: string;
	image_src: string;
};

export type User = {
	id: string;
};

export type FormData = SuperForm<ZodValidation<typeof mainSchema>, unknown>;
