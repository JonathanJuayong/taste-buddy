import { cld } from '$lib/server/cloudinary';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const file = formData.get('file') as File | null;

		const arrayBuffer = await file?.arrayBuffer();

		if (arrayBuffer) {
			const directory = path.join(os.tmpdir(), crypto.randomUUID().slice(0, 5));
			const filePath = directory + '/image';

			await fs.mkdirs(directory);
			await fs.appendFile(filePath, Buffer.from(arrayBuffer));

			const result = await cld.uploader.upload(filePath, {});

			return json({
				public_id: result.public_id
			});
		} else {
			throw error(422, {
				message: `Array buffer is undefined`
			});
		}
	} catch (e) {
		console.log(e);
		throw error(422, {
			message: `Something went wrong: ${e}`
		});
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const publicId = formData.get('publicId') as string;
		await cld.uploader.destroy(publicId);
		return json({
			status: 200,
			message: 'Image deleted'
		});
	} catch (e) {
		throw error(400, 'Something went wrong' + JSON.stringify(e, null, 2));
	}
};
