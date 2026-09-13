import { deleteResume, uploadResume } from '../config/cloudinary.js';
import { createJobApplication, findJobForApplication, listJobApplications } from '../services/job-application.service.js';
import { sendSuccess } from '../utils/response.js';
import { isValidEmail } from '../utils/validation.js';

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

const validateInput = (input, file) => {
  const details = {};
  const allowedFields = ['jobId', 'fullName', 'email', 'phoneNumber', 'positionAppliedFor', 'yearsOfExperience', 'message'];
  const unknownFields = Object.keys(input).filter((field) => !allowedFields.includes(field));

  if (unknownFields.length > 0) details.fields = `Unsupported fields: ${unknownFields.join(', ')}.`;
  if (typeof input.jobId !== 'string' || !input.jobId.trim()) details.jobId = 'Job ID is required.';
  if (typeof input.fullName !== 'string' || !input.fullName.trim()) details.fullName = 'Full name is required.';
  if (typeof input.email !== 'string' || !isValidEmail(input.email.trim())) details.email = 'A valid email is required.';
  if (typeof input.phoneNumber !== 'string' || !/^[0-9+().\s-]{7,30}$/.test(input.phoneNumber.trim())) details.phoneNumber = 'A valid phone number is required.';
  if (input.positionAppliedFor !== undefined && (typeof input.positionAppliedFor !== 'string' || !input.positionAppliedFor.trim())) details.positionAppliedFor = 'Position applied for must be a non-empty string.';
  if (input.yearsOfExperience !== undefined && input.yearsOfExperience !== '') {
    const years = Number(input.yearsOfExperience);
    if (!Number.isInteger(years) || years < 0) details.yearsOfExperience = 'Years of experience must be a non-negative whole number.';
  }
  if (input.message !== undefined && (typeof input.message !== 'string' || input.message.length > 3000)) details.message = 'Message must be text and must not exceed 3000 characters.';
  if (!file) details.resume = 'Resume is required.';
  return details;
};

const cleanupResume = async (asset) => {
  try {
    await deleteResume(asset?.publicId);
  } catch (error) {
    console.error(`Resume cleanup failed: ${error.message}`);
  }
};

export const submit = async (request, response) => {
  const input = { ...request.body };
  const details = validateInput(input, request.file);
  if (Object.keys(details).length > 0) throw validationError(details);

  const job = await findJobForApplication(input.jobId.trim());
  const normalized = {
    jobId: job._id,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phoneNumber: input.phoneNumber.trim(),
    positionAppliedFor: input.positionAppliedFor?.trim() || job.jobTitle,
    message: input.message?.trim()
  };
  if (input.yearsOfExperience !== undefined && input.yearsOfExperience !== '') normalized.yearsOfExperience = Number(input.yearsOfExperience);

  let resume;
  try {
    resume = await uploadResume(request.file.buffer);
  } catch (error) {
    if (error.statusCode === 503) throw error;
    const uploadError = new Error('Resume upload failed.');
    uploadError.statusCode = 500;
    throw uploadError;
  }

  try {
    await createJobApplication({ ...normalized, resume });
  } catch (error) {
    await cleanupResume(resume);
    if (error.name === 'ValidationError') throw error;
    const databaseError = new Error('Unable to submit application.');
    databaseError.statusCode = 500;
    throw databaseError;
  }

  return sendSuccess(response, 201, 'Application submitted successfully.');
};

export const list = async (request, response) => sendSuccess(
  response,
  200,
  'Job applications fetched successfully.',
  await listJobApplications()
);
