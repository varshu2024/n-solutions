import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title is required'],
      maxlength: [150, 'Title must not exceed 150 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['residential', 'commercial', 'industrial']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [1, 'Location is required'],
      maxlength: [200, 'Location must not exceed 200 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description is required'],
      maxlength: [5000, 'Description must not exceed 5000 characters']
    },
    services: {
      type: [String],
      required: [true, 'At least one service is required'],
      validate: {
        validator: (services) => services.length > 0 && services.every((service) => service.trim().length > 0),
        message: 'At least one non-empty service is required'
      }
    },
    image: {
      url: {
        type: String,
        required: [true, 'Image URL is required']
      },
      publicId: {
        type: String,
        required: [true, 'Image public ID is required']
      }
    },
    status: {
      type: String,
      enum: ['completed', 'in_progress'],
      default: 'in_progress'
    }
  },
  { timestamps: true }
);

projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model('Project', projectSchema);