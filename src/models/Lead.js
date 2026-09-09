import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name is required'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      maxlength: [150, 'Company must not exceed 150 characters']
    },
    type: {
      type: String,
      required: [true, 'Lead type is required'],
      enum: ['residential', 'commercial', 'industrial', 'other']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location is required'],
      maxlength: [200, 'Location must not exceed 200 characters']
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'qualified'],
      default: 'new'
    }
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);