import { deleteMediaImage, uploadMediaImage } from '../config/cloudinary.js';
import { createNews, deleteNews, getNews, listNews, updateNews } from '../services/news.service.js';
import { sendSuccess } from '../utils/response.js';

const validationError = (details) => { const error = new Error('Request validation failed.'); error.statusCode = 400; error.details = details; return error; };
const isUrl = (value) => { try { return Boolean(new URL(value)); } catch (error) { return false; } };
const validate = (input, partial = false) => {
  const details = {};
  ['title', 'summary', 'publicationDate', 'source', 'articleUrl'].forEach((field) => {
    if (!partial && (!input[field] || typeof input[field] !== 'string' || !input[field].trim())) details[field] = `${field} is required.`;
    if (partial && input[field] !== undefined && (typeof input[field] !== 'string' || !input[field].trim())) details[field] = `${field} is required.`;
  });
  if (input.publicationDate !== undefined && (!/^\d{4}-\d{2}-\d{2}$/.test(input.publicationDate) || Number.isNaN(Date.parse(input.publicationDate)))) details.publicationDate = 'Publication date must be a valid YYYY-MM-DD date.';
  if (input.articleUrl !== undefined && !isUrl(input.articleUrl)) details.articleUrl = 'Article URL must be a valid URL.';
  return details;
};
const cleanup = async (asset) => { try { await deleteMediaImage(asset?.publicId); } catch (error) { console.error(`Media image cleanup failed: ${error.message}`); } };

export const create = async (request, response) => {
  const input = { ...request.body };
  const details = validate(input);
  if (!request.file) details.image = 'News image is required.';
  if (Object.keys(details).length) throw validationError(details);
  const image = await uploadMediaImage(request.file.buffer);
  try { return sendSuccess(response, 201, 'News publication created successfully.', await createNews({ ...input, image })); }
  catch (error) { await cleanup(image); throw error; }
};

export const list = async (request, response) => sendSuccess(response, 200, 'News publications fetched successfully.', await listNews());
export const get = async (request, response) => sendSuccess(response, 200, 'News publication fetched successfully.', await getNews(request.params.id));

export const update = async (request, response) => {
  const input = { ...request.body };
  const details = validate(input, true);
  if (!request.file && Object.keys(input).length === 0) details.news = 'At least one field is required.';
  if (Object.keys(details).length) throw validationError(details);
  let image;
  if (request.file) { image = await uploadMediaImage(request.file.buffer); input.image = image; }
  try {
    const result = await updateNews(request.params.id, input);
    if (result.previousImage) await cleanup(result.previousImage);
    return sendSuccess(response, 200, 'News publication updated successfully.', result.data);
  } catch (error) { if (image) await cleanup(image); throw error; }
};

export const remove = async (request, response) => { await deleteNews(request.params.id); return sendSuccess(response, 200, 'News publication deleted successfully.'); };
