import { deleteProduct, createProduct, getProduct, listProducts } from '../services/product.service.js';
import { deleteProductImage, uploadProductImage } from '../config/cloudinary.js';
import { PRODUCT_CATEGORIES } from '../models/Product.js';
import { sendSuccess } from '../utils/response.js';

const parseApplications = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return value;

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    return value.split(',').map((application) => application.trim());
  }

  return value;
};

const validateProductInput = (input) => {
  const details = {};
  ['name', 'category', 'brand', 'description', 'applications'].forEach((field) => {
    if (input[field] === undefined || input[field] === '') details[field] = `${field} is required.`;
  });

  if (input.category !== undefined && !PRODUCT_CATEGORIES.includes(input.category)) {
    details.category = 'Category is invalid.';
  }

  if (input.applications !== undefined && (!Array.isArray(input.applications) || input.applications.length === 0 || input.applications.some((application) => typeof application !== 'string' || application.trim().length === 0))) {
    details.applications = 'Applications must be a non-empty array of strings.';
  }

  return details;
};

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

export const create = async (request, response) => {
  const input = {
    ...request.body,
    applications: parseApplications(request.body.applications)
  };

  const details = validateProductInput(input);
  if (!request.file) details.image = 'Product image is required.';
  if (Object.keys(details).length > 0) throw validationError(details);

  const image = await uploadProductImage(request.file.buffer);

  try {
    return sendSuccess(
      response,
      201,
      'Product created successfully.',
      await createProduct({
        ...input,
        image
      })
    );
  } catch (error) {
    try {
      await deleteProductImage(image.publicId);
    } catch (cleanupError) {
      console.error(`Product image cleanup failed: ${cleanupError.message}`);
    }
    throw error;
  }
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Products fetched successfully.',
  await listProducts()
);

export const get = async (request, response) => sendSuccess(
  response,
  200,
  'Product fetched successfully.',
  await getProduct(request.params.id)
);

export const remove = async (request, response) => {
  await deleteProduct(request.params.id);
  return response.status(200).json({ success: true, message: 'Product deleted successfully.' });
};
