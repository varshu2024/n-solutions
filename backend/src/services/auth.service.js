import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { LoginOtp } from '../models/LoginOtp.js';
import { env } from '../config/env.js';
import { signAdminToken } from '../utils/jwt.js';
import { sendOtpEmail } from './email.service.js';

const publicAdmin = (admin) => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: admin.role
});

const isRegistrationKeyValid = (providedKey) => (
  Boolean(env.adminRegistrationKey) && providedKey === env.adminRegistrationKey
);

export const registerAdmin = async ({ name, email, password, registrationKey }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingAdminCount = await Admin.countDocuments();

  if (env.adminRegistrationMode === 'disabled') {
    const error = new Error('Admin registration is disabled.');
    error.statusCode = 403;
    throw error;
  }

  if (env.adminRegistrationMode === 'key' && !isRegistrationKeyValid(registrationKey)) {
    const error = new Error('A valid admin registration key is required.');
    error.statusCode = 403;
    throw error;
  }

  if (env.adminRegistrationMode === 'bootstrap' && existingAdminCount > 0 && !isRegistrationKeyValid(registrationKey)) {
    const error = new Error('Bootstrap registration is closed.');
    error.statusCode = 403;
    throw error;
  }

  if (env.adminRegistrationMode === 'bootstrap' && existingAdminCount > 0 && !registrationKey) {
    const error = new Error('A valid admin registration key is required.');
    error.statusCode = 403;
    throw error;
  }

  const existingAdmin = await Admin.findOne({ email: normalizedEmail }).select('_id').lean();
  if (existingAdmin) {
    const error = new Error('An admin with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const admin = await Admin.create({ name: name.trim(), email: normalizedEmail, password });
  return publicAdmin(admin);
};

export const loginAdmin = async ({ email, password }) => {
  const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).select('+password');
  const passwordMatches = admin ? await bcrypt.compare(password, admin.password) : false;

  if (!admin || !passwordMatches) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  return { admin: publicAdmin(admin), token: signAdminToken(admin) };
};

const generateOtp = () => (
  Math.floor(100000 + Math.random() * 900000).toString()
);

export const sendLoginOtp = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  // Verify the admin exists and the password is correct first.
  const admin = await Admin.findOne({ email: normalizedEmail })
    .select('+password');

  const passwordMatches = admin
    ? await bcrypt.compare(password, admin.password)
    : false;

  if (!admin || !passwordMatches) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const otp = generateOtp();

  // Remove any previous OTP for this email.
  await LoginOtp.deleteMany({ email: normalizedEmail });

  // Store only the hashed OTP.
  const otpHash = await bcrypt.hash(otp, 10);

  await LoginOtp.create({
    email: normalizedEmail,
    otpHash,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    attempts: 0
  });

  // Send the actual OTP to the admin's email.
  await sendOtpEmail({
    to: normalizedEmail,
    otp
  });

  return {
    message: 'OTP sent successfully.'
  };
};

export const verifyLoginOtp = async ({ email, otp }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const loginOtp = await LoginOtp.findOne({
    email: normalizedEmail
  });

  if (!loginOtp) {
    const error = new Error('OTP not found or expired.');
    error.statusCode = 401;
    throw error;
  }

  if (loginOtp.expiresAt <= new Date()) {
    await LoginOtp.deleteOne({ _id: loginOtp._id });

    const error = new Error('OTP has expired. Please request a new OTP.');
    error.statusCode = 401;
    throw error;
  }

  if (loginOtp.attempts >= 5) {
    await LoginOtp.deleteOne({ _id: loginOtp._id });

    const error = new Error('Too many incorrect OTP attempts. Please request a new OTP.');
    error.statusCode = 429;
    throw error;
  }

  const otpMatches = await bcrypt.compare(otp, loginOtp.otpHash);

  if (!otpMatches) {
    loginOtp.attempts += 1;
    await loginOtp.save();

    const error = new Error('Invalid OTP.');
    error.statusCode = 401;
    throw error;
  }

  const admin = await Admin.findOne({
    email: normalizedEmail
  });

  if (!admin) {
    const error = new Error('Admin account not found.');
    error.statusCode = 401;
    throw error;
  }

  // OTP is one-time use.
  await LoginOtp.deleteOne({ _id: loginOtp._id });

  return {
    admin: publicAdmin(admin),
    token: signAdminToken(admin)
  };
};