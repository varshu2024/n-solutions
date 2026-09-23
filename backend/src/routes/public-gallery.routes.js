import { Router } from 'express'

import { requireAdmin } from '../middleware/auth.middleware.js'
import { mediaImageUpload } from '../middleware/upload.middleware.js'
import { asyncHandler } from '../utils/asyncHandler.js'

import { list as publicList } from '../controllers/public-gallery.controller.js'
import {
  create,
  get,
  update,
  remove
} from '../controllers/gallery.controller.js'

const router = Router()

// Public
router.get('/', asyncHandler(publicList))

// Admin
router.post(
  '/',
  requireAdmin,
  mediaImageUpload,
  asyncHandler(create)
)

router.get(
  '/:id',
  asyncHandler(get)
)

router.patch(
  '/:id',
  requireAdmin,
  mediaImageUpload,
  asyncHandler(update)
)

router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(remove)
)

export default router