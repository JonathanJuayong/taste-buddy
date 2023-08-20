import type { MainSchema } from '$lib/formSchema';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const recipes = localStorageStore<MainSchema[]>('recipes', []);

export const scrollStore = localStorageStore<number>('scroll', 0);
