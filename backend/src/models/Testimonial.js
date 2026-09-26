import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required.'],
      trim: true
    },

    company: {
      type: String,
      required: [true, 'Company is required.'],
      trim: true
    },

    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true
    },

    rating: {
      type: Number,
      required: [true, 'Rating is required.'],
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      required: [true, 'Comment is required.'],
      trim: true
    },

    status: {
      type: String,
      enum: ['approved', 'pending'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

testimonialSchema.index({ createdAt: -1 });

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
