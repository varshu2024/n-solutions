import { listPublicMedia } from '../services/public-media.service.js'
import { sendSuccess } from '../utils/response.js'

export const list = async (request, response) => {
  const data = await listPublicMedia(request.query.type)

  return sendSuccess(
    response,
    200,
    'Public media fetched successfully.',
    data
  )
}