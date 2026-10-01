import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { mediaImageUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  create,
  get,
  list,
  remove,
  update
} from '../controllers/client.controller.js';

const router = Router();

// Public list and get
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));

// Admin routes
router.post('/', requireAdmin, mediaImageUpload, asyncHandler(create));
router.patch('/:id', requireAdmin, mediaImageUpload, asyncHandler(update));
router.delete('/:id', requireAdmin, asyncHandler(remove));

export default router;
