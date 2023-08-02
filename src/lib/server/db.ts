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
export const getRecipeById = (id: string) => {
	const recipes = getRecipes() ?? [];
	return recipes.find((recipe) => recipe.id === id);
};
export const updateRecipe = (id: string, updatedRecipe: MainSchema) => {
	const recipes = getRecipes();
	if (!recipes) return undefined;

	const newRecipes = recipes.map((recipe) => {
		if (recipe.id === id) {
			return { ...recipe, ...updatedRecipe };
		} else {
			return recipe;
		}
	});
	db.set('data', newRecipes);
	return updatedRecipe;
};
export const addRecipe = (recipe: MainSchema) => {
	const recipes = getRecipes() ?? [];
	db.set('data', [...recipes, recipe]);
	return recipe;
};
export const deleteRecipe = (id: string) => {
	const recipes = getRecipes() ?? [];
	const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
	db.set('data', [...filteredRecipes]);
	return id;
};
