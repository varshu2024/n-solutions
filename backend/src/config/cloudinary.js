import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

const ensureCloudinaryConfig = () => {
  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    const error = new Error('Cloudinary is not configured.');
    error.statusCode = 503;
    throw error;
  }
};

const uploadImage = (fileBuffer, folder) => {
  ensureCloudinaryConfig();
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve({
        url: result.secure_url,
        publicId: result.public_id
      }))
    );
    uploadStream.end(fileBuffer);
  });
};

export const uploadProjectImage = (fileBuffer) => uploadImage(fileBuffer, 'nsolutions/projects');
export const uploadProductImage = (fileBuffer) => uploadImage(fileBuffer, 'nsolutions/products');

const deleteImage = async (publicId) => {
  if (!publicId) return;
  ensureCloudinaryConfig();
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });
  await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

export const deleteProjectImage = async (publicId) => deleteImage(publicId);
export const deleteProductImage = async (publicId) => deleteImage(publicId);