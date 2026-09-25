import mongoose from 'mongoose';
import { Job } from '../models/Job.js';
import { JobApplication } from '../models/JobApplication.js';
import { APPLICATION_STATUS_VALUES } from '../models/JobApplication.js'
const invalidJobId = () => {
  const error = new Error('Invalid job ID.');
  error.statusCode = 400;
  return error;
};

const jobNotFound = () => {
  const error = new Error('Job not found.');
  error.statusCode = 404;
  return error;
};

const closedJob = () => {
  const error = new Error('Applications are closed for this job.');
  error.statusCode = 400;
  return error;
};

export const findJobForApplication = async (jobId) => {
  if (!mongoose.isValidObjectId(jobId)) throw invalidJobId();
  const job = await Job.findById(jobId);
  if (!job) throw jobNotFound();
  if (job.jobStatus !== 'Open') throw closedJob();
  return job;
};

export const createJobApplication = (input) => JobApplication.create(input);

const applicationResponse = (application) => ({
  id: application._id.toString(),
  jobId: application.jobId?._id?.toString() || application.jobId?.toString(),
  jobTitle: application.jobId?.jobTitle || '',
  fullName: application.fullName,
  email: application.email,
  phoneNumber: application.phoneNumber,
  positionAppliedFor: application.positionAppliedFor,
  yearsOfExperience: application.yearsOfExperience ?? null,
  message: application.message || '',
  resumeUrl: application.resume.url,
  applicationStatus: application.applicationStatus,
  appliedDate: application.appliedDate,
  createdAt: application.createdAt,
  updatedAt: application.updatedAt
});

export const listJobApplications = async () => {
  const applications = await JobApplication.find({})
    .populate('jobId', 'jobTitle')
    .sort({ appliedDate: -1 })
    .lean();

  return applications.map(applicationResponse);
};

export const updateJobApplicationStatus = async (id, status) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error('Invalid application ID.')
    error.statusCode = 400
    throw error
  }

  if (!APPLICATION_STATUS_VALUES.includes(status)) {
    const error = new Error(
      'Status must be Applied, Shortlisted, Interview, Selected, or Rejected.'
    )
    error.statusCode = 400
    throw error
  }

  const application = await JobApplication.findById(id)

  if (!application) {
    const error = new Error('Job application not found.')
    error.statusCode = 404
    throw error
  }

  application.applicationStatus = status
  await application.save()

  return applicationResponse(application)
}