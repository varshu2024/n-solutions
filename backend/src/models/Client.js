import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      minlength: [1, 'Client name is required'],
      maxlength: [200, 'Client name must not exceed 200 characters']
    },

    role: {
      type: String,
      trim: true,
      default: 'Client',
      maxlength: [100, 'Role must not exceed 100 characters']
    },

    company: {
      type: String,
      trim: true,
      default: '',
      maxlength: [200, 'Company name must not exceed 200 characters']
    },

    location: {
      type: String,
      trim: true,
      default: '',
      maxlength: [200, 'Location must not exceed 200 characters']
    },

    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [3000, 'Description must not exceed 3000 characters']
    },

    quote: {
      type: String,
      trim: true,
      default: '',
      maxlength: [1000, 'Quote must not exceed 1000 characters']
    },

    image: {
      url: {
        type: String,
        default: ''
      },
      publicId: {
        type: String,
        default: ''
      }
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

clientSchema.index({ createdAt: -1 });

export const Client = mongoose.model('Client', clientSchema);
