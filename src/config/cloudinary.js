import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

const ensureCloudinaryConfig = () => {
  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    const error = new Error('Cloudinary is not configured.');
    error.statusCode = 503;
    throw error;
  }
};

const uploadFile = (fileBuffer, folder, resourceType = 'image') => {
  ensureCloudinaryConfig();
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => (error ? reject(error) : resolve({
        url: result.secure_url,
        publicId: result.public_id
      }))
    );
    uploadStream.end(fileBuffer);
  });
};

export const uploadProjectImage = (fileBuffer) => uploadFile(fileBuffer, 'nsolutions/projects');
export const uploadProductImage = (fileBuffer) => uploadFile(fileBuffer, 'nsolutions/products');

export const uploadMediaImage = (fileBuffer) => uploadFile(fileBuffer, 'nsolutions/media/images');
export const uploadMediaVideo = (fileBuffer) => uploadFile(fileBuffer, 'nsolutions/media/videos', 'video');
export const uploadResume = (fileBuffer) => uploadFile(fileBuffer, 'nsolutions/resumes', 'raw');

const deleteFile = async (publicId, resourceType = 'image') => {
  if (!publicId) return;
  ensureCloudinaryConfig();
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret
  });
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export const deleteProjectImage = async (publicId) => deleteFile(publicId);
export const deleteProductImage = async (publicId) => deleteFile(publicId);
export const deleteMediaImage = async (publicId) => deleteFile(publicId);
export const deleteMediaVideo = async (publicId) => deleteFile(publicId, 'video');
export const deleteResume = async (publicId) => deleteFile(publicId, 'raw');