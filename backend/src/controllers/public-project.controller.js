import { sendSuccess } from '../utils/response.js';
import { getPublicProject, listPublicProjects } from '../services/public-project.service.js';

const categoryValues = {
  Residential: 'residential',
  Commercial: 'commercial',
  Industrial: 'industrial',
  Government: 'Government'
};

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

export const list = async (request, response) => {
  const requestedCategory = request.query.category;
  if (requestedCategory !== undefined && !Object.hasOwn(categoryValues, requestedCategory)) {
    throw validationError({ category: 'Category must be Residential, Commercial, Industrial, or Government.' });
  }

  return sendSuccess(
    response,
    200,
    'Projects fetched successfully.',
    await listPublicProjects(categoryValues[requestedCategory])
  );
};

export const get = async (request, response) => sendSuccess(
  response,
  200,
  'Project fetched successfully.',
  await getPublicProject(request.params.id)
);
