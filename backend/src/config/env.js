import dotenv from 'dotenv';

dotenv.config();

const requiredVariables = ['MONGODB_URI', 'JWT_SECRET'];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
}


const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) ? parsed : fallback;
};

const parseCorsOrigins = (value) => { 
  if (!value || value === '*') return '*';
  return value.split(',').map((origin) => origin.trim()).filter(Boolean);
};

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInteger(process.env.PORT, 5000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: parseCorsOrigins(process.env.CORS_ORIGIN),
  adminRegistrationMode: process.env.ADMIN_REGISTRATION_MODE || 'bootstrap',
  adminRegistrationKey: process.env.ADMIN_REGISTRATION_KEY || '',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
  dashboardDefaultLimit: parseInteger(process.env.DASHBOARD_DEFAULT_LIMIT, 10),
  dashboardMaxLimit: parseInteger(process.env.DASHBOARD_MAX_LIMIT, 50)
});
