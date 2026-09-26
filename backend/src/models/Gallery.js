import mongoose from 'mongoose';

export const GALLERY_CATEGORIES = ['Projects', 'Installations', 'Events', 'Company'];

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title is required'],
      maxlength: [200, 'Title must not exceed 200 characters']
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: GALLERY_CATEGORIES
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description must not exceed 1000 characters'],
      default: ''
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
    }
  },
  {
    timestamps: true
  }
);

gallerySchema.index({ createdAt: -1 });

export const Gallery = mongoose.model('Gallery', gallerySchema);
