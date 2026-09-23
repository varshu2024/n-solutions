import mongoose from 'mongoose';

export const APPLICATION_STATUS_VALUES = ['Applied', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job is required.']
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      minlength: [1, 'Full name is required.'],
      maxlength: [100, 'Full name must not exceed 100 characters.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email must not exceed 254 characters.']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      maxlength: [30, 'Phone number must not exceed 30 characters.']
    },
    positionAppliedFor: {
      type: String,
      required: [true, 'Position applied for is required.'],
      trim: true,
      maxlength: [150, 'Position applied for must not exceed 150 characters.']
    },
    yearsOfExperience: {
      type: Number,
      min: [0, 'Years of experience must not be negative.'],
      validate: {
        validator: (value) => Number.isInteger(value),
        message: 'Years of experience must be a whole number.'
      }
    },
    message: {
      type: String,
      trim: true,
      maxlength: [3000, 'Message must not exceed 3000 characters.']
    },
    resume: {
      url: { type: String, required: true },
      publicId: { type: String, required: true }
    },
    applicationStatus: {
      type: String,
      enum: APPLICATION_STATUS_VALUES,
      default: 'Applied'
    },
    appliedDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

jobApplicationSchema.index({ jobId: 1, appliedDate: -1 });

jobApplicationSchema.index(
  { jobId: 1, email: 1 },
  { unique: true }
);

export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
