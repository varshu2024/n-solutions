import { sendSuccess } from '../utils/response.js';
import { getPublicProject, listPublicProjects } from '../services/public-project.service.js';

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Projects fetched successfully.',
  await listPublicProjects()
);

export const get = async (request, response) => sendSuccess(
  response,
  200,
  'Project fetched successfully.',
  await getPublicProject(request.params.id)
);
