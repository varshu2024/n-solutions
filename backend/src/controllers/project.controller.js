import { deleteProject, createProject, getProject, listProjects, updateProjectStatus } from '../services/project.service.js';
import { deleteProjectImage, uploadProjectImage } from '../config/cloudinary.js';
import { sendSuccess } from '../utils/response.js';

const categories = ['residential', 'commercial', 'industrial'];
const statuses = ['completed', 'in_progress'];

const parseServices = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return value;
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch (error) {
    return value.split(',').map((service) => service.trim());
  }
  return value;
};

const validateProjectInput = (input) => {
  const details = {};
  ['title', 'category', 'location', 'description', 'services'].forEach((field) => {
    if (input[field] === undefined || input[field] === '') details[field] = `${field} is required.`;
  });
  if (input.category !== undefined && !categories.includes(input.category)) {
    details.category = 'Category must be residential, commercial, or industrial.';
  }
  if (input.status !== undefined && !statuses.includes(input.status)) {
    details.status = 'Status must be completed or in_progress.';
  }
  if (input.services !== undefined && (!Array.isArray(input.services) || input.services.length === 0
    || input.services.some((service) => typeof service !== 'string' || service.trim().length === 0))) {
    details.services = 'Services must be a non-empty array of strings.';
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
  const input = { ...request.body, services: parseServices(request.body.services) };
  const details = validateProjectInput(input);
  if (!request.file) details.image = 'Project image is required.';
  if (Object.keys(details).length > 0) throw validationError(details);

  const image = await uploadProjectImage(request.file.buffer);
  try {
    return sendSuccess(response, 201, 'Project created successfully.', await createProject({
      ...input,
      image
    }));
  } catch (error) {
    try {
      await deleteProjectImage(image.publicId);
    } catch (cleanupError) {
      console.error(`Project image cleanup failed: ${cleanupError.message}`);
    }
    throw error;
  }
};

export const list = async (request, response) => sendSuccess(
  response, 200, 'Projects fetched successfully.', await listProjects()
);

export const get = async (request, response) => sendSuccess(
  response, 200, 'Project fetched successfully.', await getProject(request.params.id)
);

export const updateStatus = async (request, response) => {
  if (!request.body || Object.keys(request.body).length !== 1 || !statuses.includes(request.body.status)) {
    throw validationError({ status: 'Status must be completed or in_progress, and no other fields are allowed.' });
  }
  return sendSuccess(
    response, 200, 'Project status updated successfully.',
    await updateProjectStatus(request.params.id, request.body.status)
  );
};

export const remove = async (request, response) => {
  await deleteProject(request.params.id);
  return response.status(200).json({ success: true, message: 'Project deleted successfully.' });
};