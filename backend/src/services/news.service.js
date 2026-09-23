import mongoose from 'mongoose';
import { deleteMediaImage } from '../config/cloudinary.js';
import { News } from '../models/News.js';

const invalidId = () => { const error = new Error('Invalid news ID.'); error.statusCode = 400; return error; };
const notFound = () => { const error = new Error('News publication not found.'); error.statusCode = 404; return error; };
const findNews = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidId();
  const news = await News.findById(id);
  if (!news) throw notFound();
  return news;
};
const response = (news) => ({ id: news._id.toString(), title: news.title, summary: news.summary, image: news.image, publicationDate: news.publicationDate, source: news.source, articleUrl: news.articleUrl, createdAt: news.createdAt, updatedAt: news.updatedAt });

export const createNews = async (input) => response(await News.create(input));
export const listNews = async () => (await News.find({}).sort({ publicationDate: -1, createdAt: -1 }).lean()).map(response);
export const getNews = async (id) => response(await findNews(id));
export const updateNews = async (id, input) => {
  const news = await findNews(id);
  const previousImage = input.image ? news.image : null;
  Object.assign(news, input);
  await news.save();
  return { data: response(news), previousImage };
};
export const deleteNews = async (id) => {
  const news = await findNews(id);
  await deleteMediaImage(news.image?.publicId);
  await news.deleteOne();
};
