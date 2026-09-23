import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';

const publicAdmin = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role
});

const notFoundError = () => {
  const error = new Error('Admin account not found.');
  error.statusCode = 404;
  return error;
};

const emailConflictError = () => {
  const error = new Error('An admin with this email already exists.');
  error.statusCode = 409;
  return error;
};

export const getAdminProfile = async (adminId) => {
  const admin = await Admin.findById(adminId);
  if (!admin) throw notFoundError();
  return publicAdmin(admin);
};

export const updateAdminProfile = async (adminId, { name, email }) => {
  const admin = await Admin.findById(adminId);
  if (!admin) throw notFoundError();

  if (email !== undefined && email !== admin.email) {
    const existingAdmin = await Admin.findOne({ email, _id: { $ne: adminId } }).select('_id').lean();
    if (existingAdmin) throw emailConflictError();
  }

  if (name !== undefined) admin.name = name;
  if (email !== undefined) admin.email = email;
  await admin.save();

  return publicAdmin(admin);
};

export const changeAdminPassword = async (adminId, { currentPassword, newPassword }) => {
  const admin = await Admin.findById(adminId).select('+password');
  if (!admin) throw notFoundError();

  const passwordMatches = await bcrypt.compare(currentPassword, admin.password);
  if (!passwordMatches) {
    const error = new Error('Current password is incorrect.');
    error.statusCode = 401;
    throw error;
  }

  admin.password = newPassword;
  await admin.save();

  return publicAdmin(admin);
};
