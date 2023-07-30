import type { MainSchema } from '$lib/formSchema';

const db = new Map<string, MainSchema[]>();

const initialData: MainSchema[] = [
	// {
	// 	id: '1',
	// 	name: 'Shoyu Ramen',
	// 	description: '',
	// 	cookTime: 5,
	// 	prepTime: 10,
	// 	serves: 2,
	// 	ingredients: [],
	// 	steps: [],
	// 	imageSrc: 'recipe/ramen_bpgd2w'
	// },
	// {
	// 	id: '2',
	// 	name: 'Gua Bao',
	// 	description: '',
	// 	cookTime: 5,
	// 	prepTime: 10,
	// 	serves: 2,
	// 	ingredients: [],
	// 	steps: [],
	// 	imageSrc: 'recipe/bao_i3lzki'
	// },
	// {
	// 	id: '3',
	// 	name: 'Fried Rice',
	// 	description: '',
	// 	cookTime: 5,
	// 	prepTime: 10,
	// 	serves: 2,
	// 	ingredients: [],
	// 	steps: [],
	// 	imageSrc: 'recipe/rice_xnmqdq'
	// }
];

db.set('data', initialData);

export const getRecipes = () => db.get('data');
export const addRecipe = (recipe: MainSchema) => {
	const recipes = getRecipes() ?? [];
	db.set('data', [...recipes, recipe]);
	return recipe;
};
