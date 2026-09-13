import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { deleteProjectImage } from '../config/cloudinary.js';

const projectResponse = (project) => ({
  id: project._id.toString(),
  title: project.title,
  category: project.category,
  location: project.location,
  description: project.description,
  services: project.services,
  image: project.image,
  status: project.status,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt
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

const findProject = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const project = await Project.findById(id);
  if (!project) throw notFoundError();
  return project;
};

export const createProject = async (input) => projectResponse(await Project.create(input));

export const listProjects = async () => {
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  return projects.map(projectResponse);
};

export const getProject = async (id) => projectResponse(await findProject(id));

export const updateProjectStatus = async (id, status) => {
  const project = await findProject(id);
  project.status = status;
  await project.save();
  return projectResponse(project);
};

export const deleteProject = async (id) => {
  const project = await findProject(id);
  await deleteProjectImage(project.image?.publicId);
  await project.deleteOne();
};