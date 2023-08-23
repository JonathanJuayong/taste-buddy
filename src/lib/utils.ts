import { modalStore } from '@skeletonlabs/skeleton';

export const confirmModal = (title: string, body: string) =>
	new Promise<boolean>((resolve) => {
		modalStore.trigger({
			type: 'confirm',
			title,
			body,
			response: (r: boolean) => {
				resolve(r);
			}
		});
	});

export function generateRandomId() {
	return Math.random().toString(36).substring(2, 7);
}

export function focus(element: HTMLElement, index: number) {
	if (index === 0) return;

	const el = Array.from(element.children)[0] as HTMLElement;
	el.focus();
}

export function moveItemTo<T>(arr: Array<T>, fromIndex: number, toIndex: number) {
	const fromIsSameAsToIndex = fromIndex === toIndex;
	const fromIndexIsInvalid = fromIndex < 0 || fromIndex >= arr.length;

	if (fromIsSameAsToIndex || fromIndexIsInvalid) return arr;

	const item = arr[fromIndex];
	const modifiedArray = arr.filter((_, i) => i !== fromIndex);

	if (toIndex >= arr.length) {
		return [...modifiedArray, item];
	}

	if (toIndex <= 0) {
		return [item, ...modifiedArray];
	}

	return [...modifiedArray.slice(0, toIndex), item, ...modifiedArray.slice(toIndex)];
}
