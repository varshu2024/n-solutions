import { Product } from '../models/Product.js';

const publicProductResponse = (product) => ({
  id: product._id.toString(),
  name: product.name,
  category: product.category,
  brand: product.brand,
  description: product.description,
  applications: product.applications,
  image: {
    url: product.image?.url
  },
  createdAt: product.createdAt
});

export const listPublicProducts = async () => {
  const products = await Product.find({})
    .select('name category brand description applications image createdAt')
    .sort({ createdAt: -1 })
    .lean();

  return products.map(publicProductResponse);
};
