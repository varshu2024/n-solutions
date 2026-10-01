import { deleteMediaImage, uploadMediaImage } from '../config/cloudinary.js';
import {
  createClient,
  deleteClient,
  getClient,
  listClients,
  updateClient
} from '../services/client.service.js';
import { sendSuccess } from '../utils/response.js';

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validate = (input, partial = false) => {
  const details = {};

  if (!partial && (!input.name || typeof input.name !== 'string' || !input.name.trim())) {
    details.name = 'Client name is required.';
  }

  if (partial && input.name !== undefined && (typeof input.name !== 'string' || !input.name.trim())) {
    details.name = 'Client name cannot be empty.';
  }

  return details;
};

const cleanup = async (asset) => {
  try {
    if (asset?.publicId) {
      await deleteMediaImage(asset.publicId);
    }
  } catch (error) {
    console.error(`Client media image cleanup failed: ${error.message}`);
  }
};

export const create = async (request, response) => {
  const input = { ...request.body };
  const details = validate(input);
  if (Object.keys(details).length) throw validationError(details);

  let image = null;
  if (request.file) {
    image = await uploadMediaImage(request.file.buffer);
    input.image = image;
  }

  try {
    const client = await createClient(input);
    return sendSuccess(response, 201, 'Client created successfully.', client);
  } catch (error) {
    if (image) await cleanup(image);
    throw error;
  }
};

export const list = async (request, response) =>
  sendSuccess(response, 200, 'Clients fetched successfully.', await listClients());

export const get = async (request, response) =>
  sendSuccess(response, 200, 'Client fetched successfully.', await getClient(request.params.id));

export const update = async (request, response) => {
  const input = { ...request.body };
  const details = validate(input, true);
  if (Object.keys(details).length) throw validationError(details);

  let image;
  if (request.file) {
    image = await uploadMediaImage(request.file.buffer);
    input.image = image;
  }

  try {
    const result = await updateClient(request.params.id, input);
    if (result.previousImage) await cleanup(result.previousImage);
    return sendSuccess(response, 200, 'Client updated successfully.', result.data);
  } catch (error) {
    if (image) await cleanup(image);
    throw error;
  }
};

export const remove = async (request, response) => {
  await deleteClient(request.params.id);
  return sendSuccess(response, 200, 'Client deleted successfully.');
};
