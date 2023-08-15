import type { MainSchema } from '$lib/formSchema';
import postgres from 'postgres';
import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_USERNAME } from '$env/static/private';
import type { User } from '$lib/types';

function generateRandomId() {
	return Math.random().toString(36).substring(2, 7);
}

export type Ingredient = {
	qty: number;
	unit: string;
	item: string;
};

const sql = postgres({
	username: PG_USERNAME,
	password: PG_PASSWORD,
	host: PG_HOST,
	port: 5432,
	database: PG_DATABASE
});

type RecipeSQLReturnType = Omit<MainSchema, 'ingredients' | 'steps'> & {
	ingredients: string[];
	steps: string[];
	author_id: string;
};

export const getUserById = async (id: string) => {
	const results = await sql<User[]>`SELECT * FROM user_ WHERE id = ${id}`;
	if (results.length === 0) return null;
	return results[0];
};

export const getRecipesPaginated = async (resultsPerPage: number, lastSeenId: number) => {
	return await sql<MainSchema[]>`
    SELECT * FROM recipe_
      WHERE id > ${lastSeenId}
      ORDER BY id
      LIMIT ${resultsPerPage}
  `;
};

export const getAllUsers = async () => await sql`SELECT * FROM user_;`;

export const createUser = async (id: string) => await sql`INSERT INTO user_ (id) VALUES (${id})`;

export const getRecipesByUser = async (id: string) =>
	await sql<MainSchema[]>`SELECT * FROM recipe_ WHERE author_id = ${id}`;

export const getRecipeById = async (
	id: number
): Promise<(MainSchema & { author_id: string }) | null> => {
	const result = await sql<RecipeSQLReturnType[]>`SELECT * FROM recipe_ WHERE id = ${id};`;

	if (result.length === 0) return null;

	const recipe = result[0];
	const ingredients = recipe.ingredients.map((ingredient) => {
		// ingredient is formatted as following: "qty;unit;item"
		const [qty, unit, item] = ingredient.split(';');
		return { qty: Number(qty), unit, item };
	});
	const steps = recipe.steps.map((step) => ({ id: generateRandomId(), step }));
	return { ...recipe, ingredients, steps };
};

export const updateRecipe = async (id: number, updatedRecipe: MainSchema) => {
	const { name, description, image_src, serves, cook_time, prep_time, ingredients, steps } =
		updatedRecipe;
	const ingredients_ = ingredients.map(({ qty, unit, item }) => `${qty};${unit};${item}`);

	await sql`UPDATE recipe_ SET
    name=${name},
    description=${description},
    image_src=${image_src},
    serves=${serves},
    cook_time=${cook_time},
    prep_time=${prep_time},
    ingredients=${ingredients_},
    steps=${steps.map(({ step }) => step)}
    WHERE id=${id}
  `;
};

export const addRecipe = async (recipe: MainSchema, author_id: string) => {
	const { name, description, image_src, serves, cook_time, prep_time, ingredients, steps } = recipe;
	const ingredients_ = ingredients.map(({ qty, unit, item }) => `${qty};${unit};${item}`);

	await sql`INSERT INTO recipe_ (
    name,
    description,
    image_src,
    serves,
    cook_time,
    prep_time,
    ingredients,
    steps,
    author_id
  ) VALUES (
    ${name},
    ${description},
    ${image_src},
    ${serves},
    ${cook_time},
    ${prep_time},
    ${ingredients_},
    ${steps.map(({ step }) => step)},
    ${author_id}
  )`;
};

export const deleteRecipe = async (id: number) => {
	await sql`DELETE FROM recipe_ WHERE id=${id}`;
};
