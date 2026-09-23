import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { videoMediaUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, list, remove, update } from '../controllers/video.controller.js';

const router = Router();
router.use(requireAdmin);
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.post('/', videoMediaUpload, asyncHandler(create));
router.patch('/:id', videoMediaUpload, asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;
