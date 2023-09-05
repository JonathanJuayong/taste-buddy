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
      WHERE id < ${lastSeenId}
      ORDER BY id DESC
      FETCH FIRST ${resultsPerPage} ROWS ONLY
  `;
};

export const getAllUsers = async () => await sql`SELECT * FROM user_;`;

export const createUser = async (
	id: string,
	name: string | null = 'Anonymous-User-' + id.slice(0, 5),
	bio: string | null = '',
	profile_picture: string | null = ''
) => {
	await sql`
    INSERT INTO user_ (id, name, bio, profile_picture) 
    VALUES (${id}, ${name}, ${bio}, ${profile_picture})`;
};

export const updateUser = async (
	id: string,
	name: string,
	bio: string,
	profile_picture: string
) => {
	await sql`
    UPDATE user_
    SET name = ${name},
        bio = ${bio},
        profile_picture = ${profile_picture}
    WHERE id = ${id}
  `;
};

export const getRecipesByUser = async (id: string) =>
	await sql<MainSchema[]>`SELECT * FROM recipe_ WHERE author_id = ${id}`;

export const getRecipesByNameByUserPaginated = async (
	authorId: string,
	search: string,
	resultsPerPage: number,
	lastSeenId: number
) => {
	const authorIdString = `%${authorId}%`;
	const searchString = `%${search}%`;
	return await sql<MainSchema[]>`
    SELECT * FROM recipe_
      WHERE author_id ILIKE ${authorIdString}
        AND name ILIKE ${searchString}
        AND id < ${lastSeenId}
      ORDER BY id DESC
      FETCH FIRST ${resultsPerPage} ROWS ONLY
  `;
};

export const getRecipeById = async (
	id: number
): Promise<
	(MainSchema & { author_id: string; username: string; profile_picture: string }) | null
> => {
	const result = await sql<
		(RecipeSQLReturnType & { author_id: string; username: string; profile_picture: string })[]
	>`
  SELECT
    r.name,
    r.description,
    r.image_src,
    r.serves,
    r.cook_time,
    r.prep_time,
    r.ingredients,
    r.steps,
    r.author_id,
    u.name AS username,
    u.profile_picture
  FROM recipe_ r 
  INNER JOIN user_ u 
    ON r.author_id = u.id
  WHERE r.id = ${id};`;

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

export const searchRecipesByNamePaginated = async (
	search: string,
	lastSeenId: number,
	resultsPerPage: number
) => {
	const string = `%${search}%`;
	return await sql<MainSchema[]>`
    SELECT * FROM recipe_ 
      WHERE 
        id < ${lastSeenId}
        AND name ILIKE ${string} 
      ORDER BY id DESC 
      FETCH FIRST ${resultsPerPage} ROWS ONLY
    `;
};

export const createLike = async (recipeId: number, userId: string): Promise<'Success' | 'Fail'> => {
	try {
		await sql`INSERT INTO likes_ (recipe_id, user_id) VALUES (${recipeId}, ${userId})`;
		return 'Success';
	} catch (error) {
		console.log(error);
		return 'Fail';
	}
};

export const deleteLike = async (recipeId: number, userId: string): Promise<'Success' | 'Fail'> => {
	try {
		await sql`DELETE FROM likes_ WHERE recipe_id = ${recipeId} AND user_id = ${userId}`;
		return 'Success';
	} catch (error) {
		console.log(error);
		return 'Fail';
	}
};

export const isLiked = async (recipeId: number, userId: string): Promise<boolean> => {
	const data =
		await sql`SELECT * FROM likes_ WHERE recipe_id = ${recipeId} AND user_id = ${userId}`;
	return data.length > 0;
};

export const findLikedRecipesPaginated = async (
	userId: string,
	resultsPerPage: number,
	lastSeenId: number
) => {
	return await sql<RecipeSQLReturnType[]>`
    SELECT * FROM recipe_ r 
    INNER JOIN likes_ l 
      ON r.id = l.recipe_id
    WHERE l.user_id = ${userId}
      AND r.id < ${lastSeenId}
    ORDER BY r.id DESC
    FETCH FIRST ${resultsPerPage} ROWS ONLY
    `;
};
