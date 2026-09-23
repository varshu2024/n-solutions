import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { deleteProductImage } from '../config/cloudinary.js';

const productResponse = (product) => ({
  id: product._id.toString(),
  name: product.name,
  category: product.category,
  brand: product.brand,
  description: product.description,
  applications: product.applications,
  image: product.image,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt
});

const invalidIdError = () => {
  const error = new Error('Invalid product ID.');
  error.statusCode = 400;
  return error;
};

const notFoundError = () => {
  const error = new Error('Product not found.');
  error.statusCode = 404;
  return error;
};

const findProduct = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidIdError();
  const product = await Product.findById(id);
  if (!product) throw notFoundError();
  return product;
};

export const createProduct = async (input) => productResponse(await Product.create(input));

export const listProducts = async () => {
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .lean();

  return products.map(productResponse);
};

export const getProduct = async (id) => productResponse(await findProduct(id));

export const deleteProduct = async (id) => {
  const product = await findProduct(id);
  await deleteProductImage(product.image?.publicId);
  await product.deleteOne();
};
