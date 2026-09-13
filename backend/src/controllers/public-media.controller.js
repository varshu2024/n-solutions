import { listPublicMedia } from '../services/public-media.service.js';
import { sendSuccess } from '../utils/response.js';

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Media fetched successfully.',
  await listPublicMedia(request.query.type)
);
