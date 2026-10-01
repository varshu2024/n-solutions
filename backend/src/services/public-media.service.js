import { Gallery } from '../models/Gallery.js';
import { News } from '../models/News.js';
import { ProjectMilestone } from '../models/ProjectMilestone.js';
import { Video } from '../models/Video.js';
import { Client } from '../models/Client.js';

export const PUBLIC_MEDIA_TYPES = {
  NEWS: 'News & Media Coverage',
  MILESTONES: 'Project Milestones',
  GALLERY: 'Image Gallery',
  VIDEOS: 'Videos',
  CLIENTS: 'Clients'
};

const publicImage = (image) => ({ url: image?.url });

const publicNews = (news) => ({
  id: news._id.toString(),
  title: news.title,
  summary: news.summary,
  image: publicImage(news.image),
  publicationDate: news.publicationDate,
  source: news.source,
  articleUrl: news.articleUrl,
  createdAt: news.createdAt
});

const publicMilestone = (milestone) => ({
  id: milestone._id.toString(),
  period: milestone.period,
  title: milestone.title,
  type: milestone.type,
  description: milestone.description,
  createdAt: milestone.createdAt
});

const publicGallery = (gallery) => ({
  id: gallery._id.toString(),
  title: gallery.title,
  description: gallery.description || '',
  category: gallery.category,
  image: publicImage(gallery.image),
  createdAt: gallery.createdAt
});

const publicVideo = (video) => ({
  id: video._id.toString(),
  title: video.title,
  description: video.description,
  thumbnail: publicImage(video.thumbnail),
  videoUrl: video.videoUrl,
  category: video.category,
  createdAt: video.createdAt
});

const publicClient = (client) => ({
  id: client._id.toString(),
  name: client.name,
  role: client.role,
  company: client.company,
  location: client.location,
  description: client.description,
  quote: client.quote,
  image: publicImage(client.image),
  createdAt: client.createdAt
});

const newsQuery = () => News.find({})
  .select('title summary image publicationDate source articleUrl createdAt')
  .sort({ publicationDate: -1, createdAt: -1 })
  .lean();

const milestoneQuery = () => ProjectMilestone.find({})
  .select('period title type description createdAt')
  .sort({ createdAt: -1 })
  .lean();

const galleryQuery = (filter = {}) => Gallery.find(filter)
  .select('title description category image createdAt')
  .sort({ createdAt: -1 })
  .lean();

const videoQuery = () => Video.find({})
  .select('title description thumbnail videoUrl category createdAt')
  .sort({ createdAt: -1 })
  .lean();

const clientQuery = () => Client.find({ status: 'active' })
  .select('name role company location description quote image createdAt')
  .sort({ createdAt: -1 })
  .lean();

const invalidTypeError = () => {
  const error = new Error('Media type is invalid.');
  error.statusCode = 400;
  error.details = { type: `Type must be one of: ${Object.values(PUBLIC_MEDIA_TYPES).join(', ')}.` };
  return error;
};

const invalidGalleryCategoryError = () => {
  const error = new Error('Gallery category is invalid.');
  error.statusCode = 400;
  error.details = { category: 'Category must be one of: Projects, Installations, Events, Company.' };
  return error;
};

export const listPublicGallery = async (category) => {
  if (category !== undefined && !['Projects', 'Installations', 'Events', 'Company'].includes(category)) {
    throw invalidGalleryCategoryError();
  }

  const gallery = await galleryQuery(category ? { category } : {});
  return gallery.map(publicGallery);
};

export const listPublicMedia = async (type) => {
  if (type !== undefined && !Object.values(PUBLIC_MEDIA_TYPES).includes(type)) throw invalidTypeError();

  if (type === PUBLIC_MEDIA_TYPES.NEWS) return (await newsQuery()).map(publicNews);
  if (type === PUBLIC_MEDIA_TYPES.MILESTONES) return (await milestoneQuery()).map(publicMilestone);
  if (type === PUBLIC_MEDIA_TYPES.GALLERY) return listPublicGallery();
  if (type === PUBLIC_MEDIA_TYPES.VIDEOS) return (await videoQuery()).map(publicVideo);
  if (type === PUBLIC_MEDIA_TYPES.CLIENTS) return (await clientQuery()).map(publicClient);

  const [news, projectMilestones, gallery, videos, clients] = await Promise.all([
    newsQuery(),
    milestoneQuery(),
    galleryQuery(),
    videoQuery(),
    clientQuery()
  ]);

  return {
    news: news.map(publicNews),
    projectMilestones: projectMilestones.map(publicMilestone),
    gallery: gallery.map(publicGallery),
    videos: videos.map(publicVideo),
    clients: clients.map(publicClient)
  };
};
