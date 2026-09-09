import mongoose from 'mongoose';
import { isValidEmail } from '../utils/validation.js';

export const ENQUIRY_PROJECT_TYPES = [
  'Commercial Solar',
  'Industrial Solar',
  'Residential Rooftop',
  'PM Surya Ghar',
  'Government Project',
  'Solar Pump',
  'O&M Services',
  'Product Enquiry',
  'Other'
];

export const ENQUIRY_STATUS_VALUES = ['Unread', 'Read', 'Resolved'];

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [1, 'Full name is required.'],
      maxlength: [150, 'Full name must not exceed 150 characters.']
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [150, 'Company name must not exceed 150 characters.']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      minlength: [1, 'Phone number is required.'],
      validate: {
        validator(value) {
          return typeof value === 'string' && value.trim().length >= 7 && /^[0-9+()\-\s]+$/.test(value.trim());
        },
        message: 'Phone number is invalid.'
      }
    },
    emailAddress: {
      type: String,
      required: [true, 'Email address is required.'],
      trim: true,
      lowercase: true,
      validate: {
        validator(value) {
          return isValidEmail(value);
        },
        message: 'A valid email is required.'
      }
    },
    projectLocation: {
      type: String,
      trim: true,
      maxlength: [200, 'Project location must not exceed 200 characters.']
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required.'],
      enum: {
        values: ENQUIRY_PROJECT_TYPES,
        message: 'Project type is invalid.'
      }
    },
    monthlyElectricityBill: {
      type: Number,
      min: [0, 'Monthly electricity bill must not be negative.']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message must not exceed 2000 characters.']
    },
    status: {
      type: String,
      enum: {
        values: ENQUIRY_STATUS_VALUES,
        message: 'Status must be Unread, Read, or Resolved.'
      },
      default: 'Unread'
    }
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
