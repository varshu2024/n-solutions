import mongoose from 'mongoose';

export const VIDEO_CATEGORIES = ['Projects', 'Installations', 'Events', 'Company'];

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, minlength: [1, 'Title is required'], maxlength: [200, 'Title must not exceed 200 characters'] },
    description: { type: String, required: [true, 'Description is required'], trim: true, minlength: [1, 'Description is required'], maxlength: [5000, 'Description must not exceed 5000 characters'] },
    thumbnail: {
      url: { type: String, required: [true, 'Thumbnail URL is required'] },
      publicId: { type: String, required: [true, 'Thumbnail public ID is required'] }
    },
    videoUrl: { type: String, required: [true, 'Video URL is required'], trim: true },
    videoPublicId: { type: String, default: null },
    category: { type: String, required: [true, 'Category is required'], enum: VIDEO_CATEGORIES }
  },
  { timestamps: true }
);

videoSchema.index({ createdAt: -1 });

export const Video = mongoose.model('Video', videoSchema);
