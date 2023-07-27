import type { RecipeCard } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const recipes: RecipeCard[] = [
		{
			id: '1',
			name: 'Shoyu Ramen',
			src: 'recipe/ramen_bpgd2w'
		},
		{
			id: '2',
			name: 'Gua Bao',
			src: 'recipe/bao_i3lzki'
		},
		{
			id: '3',
			name: 'Fried Rice',
			src: 'recipe/rice_xnmqdq'
		},
		{
			id: '4',
			name: 'Shoyu Ramen',
			src: 'recipe/ramen_bpgd2w'
		},
		{
			id: '5',
			name: 'Gua Bao',
			src: 'recipe/bao_i3lzki'
		},
		{
			id: '6',
			name: 'Fried Rice',
			src: 'recipe/rice_xnmqdq'
		},
		{
			id: '7',
			name: 'Shoyu Ramen',
			src: 'recipe/ramen_bpgd2w'
		},
		{
			id: '8',
			name: 'Gua Bao',
			src: 'recipe/bao_i3lzki'
		},
		{
			id: '9',
			name: 'Fried Rice',
			src: 'recipe/rice_xnmqdq'
		}
	];
	// return { recipes };
	return { recipes: [] };
}) satisfies PageServerLoad;
