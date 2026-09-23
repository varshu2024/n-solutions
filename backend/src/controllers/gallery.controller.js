import { deleteMediaImage, uploadMediaImage } from '../config/cloudinary.js';
import { GALLERY_CATEGORIES } from '../models/Gallery.js';
import { createGallery, deleteGallery, getGallery, listGallery, updateGallery } from '../services/gallery.service.js';
import { sendSuccess } from '../utils/response.js';

const validationError = (details) => { const error = new Error('Request validation failed.'); error.statusCode = 400; error.details = details; return error; };
const validate = (input, partial = false, hasFile = false) => {
  const details = {};
  ['title', 'category'].forEach((field) => { if ((!partial && (!input[field] || typeof input[field] !== 'string' || !input[field].trim())) || (partial && input[field] !== undefined && (typeof input[field] !== 'string' || !input[field].trim()))) details[field] = `${field} is required.`; });
  if (input.category !== undefined && !GALLERY_CATEGORIES.includes(input.category)) details.category = 'Category is invalid.';
  if (partial && Object.keys(input).length === 0 && !hasFile) details.gallery = 'At least one field is required.';
  return details;
};
const cleanup = async (asset) => { try { await deleteMediaImage(asset?.publicId); } catch (error) { console.error(`Media image cleanup failed: ${error.message}`); } };

export const create = async (request, response) => {
  const input = { ...request.body }; const details = validate(input); if (!request.file) details.image = 'Gallery image is required.'; if (Object.keys(details).length) throw validationError(details);
  const image = await uploadMediaImage(request.file.buffer); try { return sendSuccess(response, 201, 'Gallery item created successfully.', await createGallery({ ...input, image })); } catch (error) { await cleanup(image); throw error; }
};
export const list = async (request, response) => sendSuccess(response, 200, 'Gallery items fetched successfully.', await listGallery());
export const get = async (request, response) => sendSuccess(response, 200, 'Gallery item fetched successfully.', await getGallery(request.params.id));
export const update = async (request, response) => {
  const input = { ...request.body }; const details = validate(input, true, Boolean(request.file)); if (!request.file && Object.keys(input).length === 0) details.gallery = 'At least one field is required.'; if (Object.keys(details).length) throw validationError(details);
  let image; if (request.file) { image = await uploadMediaImage(request.file.buffer); input.image = image; }
  try { const result = await updateGallery(request.params.id, input); if (result.previousImage) await cleanup(result.previousImage); return sendSuccess(response, 200, 'Gallery item updated successfully.', result.data); } catch (error) { if (image) await cleanup(image); throw error; }
};
export const remove = async (request, response) => { await deleteGallery(request.params.id); return sendSuccess(response, 200, 'Gallery item deleted successfully.'); };
