import cloudinary from 'cloudinary';
import {
	CLOUDINARY_API_SECRET,
	CLOUDINARY_API_KEY,
	CLOUDINARY_CLOUD_NAME
} from '$env/static/private';

export const cld = cloudinary.v2;

cld.config({
	secure: true,
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});
