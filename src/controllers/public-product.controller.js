import { sendSuccess } from '../utils/response.js';
import { listPublicProducts } from '../services/public-product.service.js';

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Products fetched successfully.',
  await listPublicProducts()
);
