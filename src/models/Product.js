import mongoose from 'mongoose';

export const PRODUCT_CATEGORIES = [
  'Solar Panels',
  'Solar Inverters',
  'Mounting Structures',
  'Solar Cables',
  'Earth Pits & Arrestors',
  'Solar Pumps',
  'Electrical Accessories',
  'Other Components'
];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name is required'],
      maxlength: [150, 'Name must not exceed 150 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: PRODUCT_CATEGORIES
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      minlength: [1, 'Brand is required'],
      maxlength: [150, 'Brand must not exceed 150 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [1, 'Description is required'],
      maxlength: [5000, 'Description must not exceed 5000 characters']
    },
    applications: {
      type: [String],
      required: [true, 'At least one application is required'],
      validate: {
        validator: (applications) => applications.length > 0 && applications.every((application) => typeof application === 'string' && application.trim().length > 0),
        message: 'At least one non-empty application is required'
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
    }
  },
  { timestamps: true }
);

productSchema.index({ createdAt: -1 });

export const Product = mongoose.model('Product', productSchema);
