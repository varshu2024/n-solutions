import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      minlength: [1, 'Description is required.'],
      maxlength: [5000, 'Description must not exceed 5000 characters.']
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required.'],
      trim: true,
      minlength: [1, 'Client name is required.'],
      maxlength: [150, 'Client name must not exceed 150 characters.']
    },
    company: {
      type: String,
      required: [true, 'Company is required.'],
      trim: true,
      minlength: [1, 'Company is required.'],
      maxlength: [150, 'Company must not exceed 150 characters.']
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true,
      minlength: [1, 'Location is required.'],
      maxlength: [200, 'Location must not exceed 200 characters.']
    }
  },
  { timestamps: true }
);

testimonialSchema.index({ createdAt: -1 });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
