import { listPublicGallery } from '../services/public-media.service.js';
import { sendSuccess } from '../utils/response.js';

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Gallery images fetched successfully.',
  await listPublicGallery(request.query.category)
);