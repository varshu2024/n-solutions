import {
  changeAdminPassword,
  getAdminProfile,
  updateAdminProfile
} from '../services/profile.service.js';
import { sendSuccess } from '../utils/response.js';
import { validatePassword, validateProfileInput } from '../utils/validation.js';

const validationError = (details) => {
  const error = new Error('Request validation failed.');
  error.statusCode = 400;
  error.details = details;
  return error;
};

export const getProfile = async (request, response) => {
  const admin = await getAdminProfile(request.admin.id);
  return sendSuccess(response, 200, 'Admin profile fetched successfully.', { admin });
};

export const updateProfile = async (request, response) => {
  const { fullName, emailAddress } = request.body || {};
  const details = validateProfileInput({ fullName, emailAddress });
  if (Object.keys(details).length > 0) throw validationError(details);

  const admin = await updateAdminProfile(request.admin.id, {
    name: fullName === undefined ? undefined : fullName.trim(),
    email: emailAddress === undefined ? undefined : emailAddress.trim().toLowerCase()
  });
  return sendSuccess(response, 200, 'Admin profile updated successfully.', { admin });
};

export const updatePassword = async (request, response) => {
  const { currentPassword, newPassword } = request.body || {};
  const details = validatePassword({ currentPassword, newPassword });
  if (Object.keys(details).length > 0) throw validationError(details);

  const admin = await changeAdminPassword(request.admin.id, { currentPassword, newPassword });
  return sendSuccess(response, 200, 'Admin password updated successfully.', { admin });
};
