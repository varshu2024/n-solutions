import mongoose from 'mongoose';
import { deleteMediaImage } from '../config/cloudinary.js';
import { Gallery } from '../models/Gallery.js';

const invalidId = () => { const error = new Error('Invalid gallery ID.'); error.statusCode = 400; return error; };
const notFound = () => { const error = new Error('Gallery item not found.'); error.statusCode = 404; return error; };
const findGallery = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidId();
  const gallery = await Gallery.findById(id);
  if (!gallery) throw notFound();
  return gallery;
};
const response = (gallery) => ({
  id: gallery._id.toString(),
  title: gallery.title,
  description: gallery.description || '',
  category: gallery.category,
  image: gallery.image,
  createdAt: gallery.createdAt,
  updatedAt: gallery.updatedAt
});

export const createGallery = async (input) => response(await Gallery.create(input));
export const listGallery = async () => (await Gallery.find({}).sort({ createdAt: -1 }).lean()).map(response);
export const getGallery = async (id) => response(await findGallery(id));
export const updateGallery = async (id, input) => {
  const gallery = await findGallery(id);
  const previousImage = input.image ? gallery.image : null;
  Object.assign(gallery, input);
  await gallery.save();
  return { data: response(gallery), previousImage };
};
export const deleteGallery = async (id) => { const gallery = await findGallery(id); await deleteMediaImage(gallery.image?.publicId); await gallery.deleteOne(); };
