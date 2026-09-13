import mongoose from 'mongoose';
import { ProjectMilestone } from '../models/ProjectMilestone.js';

const invalidId = () => { const error = new Error('Invalid milestone ID.'); error.statusCode = 400; return error; };
const notFound = () => { const error = new Error('Project milestone not found.'); error.statusCode = 404; return error; };
const findMilestone = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidId();
  const milestone = await ProjectMilestone.findById(id);
  if (!milestone) throw notFound();
  return milestone;
};
const response = (milestone) => ({ id: milestone._id.toString(), period: milestone.period, title: milestone.title, type: milestone.type, description: milestone.description, createdAt: milestone.createdAt, updatedAt: milestone.updatedAt });

export const createMilestone = async (input) => response(await ProjectMilestone.create(input));
export const listMilestones = async () => (await ProjectMilestone.find({}).sort({ createdAt: -1 }).lean()).map(response);
export const getMilestone = async (id) => response(await findMilestone(id));
export const updateMilestone = async (id, input) => {
  const milestone = await findMilestone(id);
  Object.assign(milestone, input);
  await milestone.save();
  return response(milestone);
};
export const deleteMilestone = async (id) => { const milestone = await findMilestone(id); await milestone.deleteOne(); };
