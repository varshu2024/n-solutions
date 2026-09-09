import mongoose from 'mongoose';
import { Project } from '../models/Project.js';

const publicProjectResponse = (project) => ({
  id: project._id.toString(),
  title: project.title,
  category: project.category,
  location: project.location,
  description: project.description,
  services: project.services,
  image: {
    url: project.image?.url
  },
  ...(project.createdAt ? { createdAt: project.createdAt } : {})
});

const invalidIdError = () => {
  const error = new Error('Invalid project ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Project not found.');
  error.statusCode = 404;
  return error;
};

const findPublicProject = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();

  const project = await Project.findById(id)
    .select('title category location description services image createdAt')
    .lean();

  if (!project) throw notFoundError();
  return project;
};

export const listPublicProjects = async () => {
  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .select('title category location description services image createdAt')
    .lean();

  return projects.map(publicProjectResponse);
};

export const getPublicProject = async (id) => publicProjectResponse(await findPublicProject(id));
