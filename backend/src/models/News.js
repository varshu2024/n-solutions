import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true, minlength: [1, 'Title is required'], maxlength: [200, 'Title must not exceed 200 characters'] },
    summary: { type: String, required: [true, 'Summary is required'], trim: true, minlength: [1, 'Summary is required'], maxlength: [5000, 'Summary must not exceed 5000 characters'] },
    image: {
      url: { type: String, required: [true, 'Image URL is required'] },
      publicId: { type: String, required: [true, 'Image public ID is required'] }
    },
    publicationDate: { type: String, required: [true, 'Publication date is required'] },
    source: { type: String, required: [true, 'Source is required'], trim: true, minlength: [1, 'Source is required'], maxlength: [150, 'Source must not exceed 150 characters'] },
    articleUrl: { type: String, required: [true, 'Article URL is required'], trim: true }
  },
  { timestamps: true }
);

newsSchema.index({ publicationDate: -1, createdAt: -1 });

export const News = mongoose.model('News', newsSchema);
