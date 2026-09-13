import mongoose from 'mongoose';
import { Job } from '../models/Job.js';

const jobResponse = (job) => ({
  id: job._id.toString(),
  jobTitle: job.jobTitle,
  department: job.department,
  location: job.location,
  employmentType: job.employmentType,
  experienceRequired: job.experienceRequired,
  qualification: job.qualification,
  jobDescription: job.jobDescription,
  jobResponsibilities: job.jobResponsibilities,
  numberOfOpenings: job.numberOfOpenings,
  applicationDeadline: job.applicationDeadline,
  jobStatus: job.jobStatus,
  createdAt: job.createdAt,
  updatedAt: job.updatedAt
});

const invalidIdError = () => {
  const error = new Error('Invalid job ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Job not found.');
  error.statusCode = 404;
  return error;
};

const findJob = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const job = await Job.findById(id);
  if (!job) throw notFoundError();
  return job;
};

export const createJob = async (input) => jobResponse(await Job.create(input));

export const listAdminJobs = async () => {
  const jobs = await Job.find({}).sort({ createdAt: -1 }).lean();
  return jobs.map(jobResponse);
};

export const updateJob = async (id, input) => {
  const job = await findJob(id);
  Object.assign(job, input);
  await job.save();
  return jobResponse(job);
};

export const deleteJob = async (id) => {
  const job = await findJob(id);
  await job.deleteOne();
};

export const listPublicJobs = async () => {
  const jobs = await Job.find({ jobStatus: 'Open' })
    .select('jobTitle department location employmentType experienceRequired qualification jobDescription jobResponsibilities numberOfOpenings applicationDeadline jobStatus createdAt')
    .sort({ createdAt: -1 })
    .lean();

  return jobs.map(jobResponse);
};
