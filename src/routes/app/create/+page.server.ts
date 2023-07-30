import { mainSchema } from '$lib/formSchema';
import { addRecipe } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';

export const load = (async () => {
	const form = await superValidate(mainSchema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, mainSchema);

		const id = crypto.randomUUID() as string;
		console.log({ recipe: form.data });
		const createdRecipe = addRecipe({ ...form.data, id });

		console.log('recipe created', createdRecipe);

		return { form };
	}
};
