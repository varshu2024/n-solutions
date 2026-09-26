import { deleteMediaImage, deleteMediaVideo, uploadMediaImage, uploadMediaVideo } from '../config/cloudinary.js';
import { VIDEO_CATEGORIES } from '../models/Video.js';
import { createVideo, deleteVideo, getVideo, listVideos, updateVideo } from '../services/video.service.js';
import { sendSuccess } from '../utils/response.js';

const validationError = (details) => { const error = new Error('Request validation failed.'); error.statusCode = 400; error.details = details; return error; };
const isUrl = (value) => { try { return Boolean(new URL(value)); } catch (error) { return false; } };
const validate = (input, partial = false) => {
  const details = {};
  ['title', 'description', 'category'].forEach((field) => { 
    if ((!partial && (!input[field] || typeof input[field] !== 'string' || !input[field].trim())) || (partial && input[field] !== undefined && (typeof input[field] !== 'string' || !input[field].trim()))) details[field] = `${field} is required.`; });
  if (!partial && !input.videoUrl) {
  details.videoUrl = 'Video URL or video file is required.'
}

if (
  input.videoUrl !== undefined &&
  input.videoUrl !== 'uploaded-video' &&
  !isUrl(input.videoUrl)
) {
  details.videoUrl = 'Video URL must be a valid URL.'
}
if (input.category !== undefined && !VIDEO_CATEGORIES.includes(input.category)) details.category = 'Category is invalid.';
  if (partial && Object.keys(input).length === 0) details.video = 'At least one field is required.';
  return details;
};
const cleanupImage = async (asset) => { try { await deleteMediaImage(asset?.publicId); } catch (error) { console.error(`Media image cleanup failed: ${error.message}`); } };
const cleanupVideo = async (publicId) => { try { await deleteMediaVideo(publicId); } catch (error) { console.error(`Media video cleanup failed: ${error.message}`); } };

export const create = async (request, response) => {
  const files = request.files || {}; const thumbnailFile = files.thumbnail?.[0]; const videoFile = files.video?.[0]; const input = { ...request.body }; const details = validate({ ...input, videoUrl: input.videoUrl || (videoFile ? 'uploaded-video' : undefined) }); if (!thumbnailFile) details.thumbnail = 'Video thumbnail is required.'; if (!input.videoUrl && !videoFile) details.videoUrl = 'Video URL or video file is required.'; if (Object.keys(details).length) throw validationError(details);
  const thumbnail = await uploadMediaImage(thumbnailFile.buffer); let uploadedVideo;
  try { if (videoFile) { uploadedVideo = await uploadMediaVideo(videoFile.buffer); input.videoUrl = uploadedVideo.url; input.videoPublicId = uploadedVideo.publicId; } return sendSuccess(response, 201, 'Video created successfully.', await createVideo({ ...input, thumbnail })); }
  catch (error) { await cleanupImage(thumbnail); if (uploadedVideo) await cleanupVideo(uploadedVideo.publicId); throw error; }
};
export const list = async (request, response) => sendSuccess(response, 200, 'Videos fetched successfully.', await listVideos());
export const get = async (request, response) => sendSuccess(response, 200, 'Video fetched successfully.', await getVideo(request.params.id));

export const update = async (request, response) => {
  const files = request.files || {}; const thumbnailFile = files.thumbnail?.[0]; const videoFile = files.video?.[0]; const input = { ...request.body }; const details = validate(input, true); if (input.videoUrl !== undefined && !input.videoUrl) details.videoUrl = 'Video URL must not be empty.'; if (!thumbnailFile && !videoFile && Object.keys(input).length === 0) details.video = 'At least one field is required.'; if (Object.keys(details).length) throw validationError(details);
  let thumbnail; let uploadedVideo;
  try {
    if (thumbnailFile) { thumbnail = await uploadMediaImage(thumbnailFile.buffer); input.thumbnail = thumbnail; }
    if (videoFile) { uploadedVideo = await uploadMediaVideo(videoFile.buffer); input.videoUrl = uploadedVideo.url; input.videoPublicId = uploadedVideo.publicId; }
    const result = await updateVideo(request.params.id, input);
    if (result.previousThumbnail) await cleanupImage(result.previousThumbnail);
    if (result.previousVideo) await cleanupVideo(result.previousVideo);
    return sendSuccess(response, 200, 'Video updated successfully.', result.data);
  } catch (error) { if (thumbnail) await cleanupImage(thumbnail); if (uploadedVideo) await cleanupVideo(uploadedVideo.publicId); throw error; }
};
export const remove = async (request, response) => { await deleteVideo(request.params.id); return sendSuccess(response, 200, 'Video deleted successfully.'); };
