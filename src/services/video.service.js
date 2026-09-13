import mongoose from 'mongoose';
import { deleteMediaImage, deleteMediaVideo } from '../config/cloudinary.js';
import { Video } from '../models/Video.js';

const invalidId = () => { const error = new Error('Invalid video ID.'); error.statusCode = 400; return error; };
const notFound = () => { const error = new Error('Video not found.'); error.statusCode = 404; return error; };
const findVideo = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw invalidId();
  const video = await Video.findById(id);
  if (!video) throw notFound();
  return video;
};
const response = (video) => ({ id: video._id.toString(), title: video.title, description: video.description, thumbnail: video.thumbnail, videoUrl: video.videoUrl, category: video.category, createdAt: video.createdAt, updatedAt: video.updatedAt });

export const createVideo = async (input) => response(await Video.create(input));
export const listVideos = async () => (await Video.find({}).sort({ createdAt: -1 }).lean()).map(response);
export const getVideo = async (id) => response(await findVideo(id));
export const updateVideo = async (id, input) => {
  const video = await findVideo(id);
  const previousThumbnail = input.thumbnail ? video.thumbnail : null;
  const previousVideo = input.videoPublicId ? video.videoPublicId : null;
  Object.assign(video, input);
  await video.save();
  return { data: response(video), previousThumbnail, previousVideo };
};
export const deleteVideo = async (id) => {
  const video = await findVideo(id);
  await deleteMediaImage(video.thumbnail?.publicId);
  await deleteMediaVideo(video.videoPublicId);
  await video.deleteOne();
};
