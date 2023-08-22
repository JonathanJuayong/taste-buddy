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
