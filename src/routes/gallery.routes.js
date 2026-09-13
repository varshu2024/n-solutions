import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { mediaImageUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, list, remove, update } from '../controllers/gallery.controller.js';

const router = Router();
router.use(requireAdmin);
router.get('/admin', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.post('/', mediaImageUpload, asyncHandler(create));
router.patch('/:id', mediaImageUpload, asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;
