import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
