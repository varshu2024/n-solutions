import mongoose from 'mongoose';

export const JOB_STATUS_VALUES = ['Open', 'Closed'];

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, 'Job title is required.'],
      trim: true,
      minlength: [1, 'Job title is required.'],
      maxlength: [150, 'Job title must not exceed 150 characters.']
    },
    department: {
      type: String,
      required: [true, 'Department is required.'],
      trim: true,
      minlength: [1, 'Department is required.'],
      maxlength: [150, 'Department must not exceed 150 characters.']
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true,
      minlength: [1, 'Location is required.'],
      maxlength: [200, 'Location must not exceed 200 characters.']
    },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required.'],
      trim: true,
      minlength: [1, 'Employment type is required.'],
      maxlength: [100, 'Employment type must not exceed 100 characters.']
    },
    experienceRequired: {
      type: String,
      required: [true, 'Experience required is required.'],
      trim: true,
      minlength: [1, 'Experience required is required.'],
      maxlength: [150, 'Experience required must not exceed 150 characters.']
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required.'],
      trim: true,
      minlength: [1, 'Qualification is required.'],
      maxlength: [500, 'Qualification must not exceed 500 characters.']
    },
    jobDescription: {
      type: String,
      required: [true, 'Job description is required.'],
      trim: true,
      minlength: [1, 'Job description is required.'],
      maxlength: [5000, 'Job description must not exceed 5000 characters.']
    },
    jobResponsibilities: {
      type: [String],
      required: [true, 'At least one job responsibility is required.'],
      validate: {
        validator: (responsibilities) => responsibilities.length > 0
          && responsibilities.every((responsibility) => typeof responsibility === 'string' && responsibility.trim().length > 0),
        message: 'At least one non-empty job responsibility is required.'
      }
    },
    numberOfOpenings: {
      type: Number,
      required: [true, 'Number of openings is required.'],
      min: [1, 'Number of openings must be a positive number.'],
      validate: {
        validator: Number.isInteger,
        message: 'Number of openings must be a whole number.'
      }
    },
    applicationDeadline: {
      type: Date,
      required: [true, 'Application deadline is required.']
    },
    jobStatus: {
      type: String,
      required: [true, 'Job status is required.'],
      enum: {
        values: JOB_STATUS_VALUES,
        message: 'Job status must be Open or Closed.'
      }
    }
  },
  { timestamps: true }
);

jobSchema.index({ jobStatus: 1, createdAt: -1 });

export const Job = mongoose.model('Job', jobSchema);
