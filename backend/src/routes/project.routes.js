import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { projectImageUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, list, remove, updateStatus } from '../controllers/project.controller.js';

const router = Router();

router.use(requireAdmin);
router.post('/', projectImageUpload, asyncHandler(create));
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.patch('/:id/status', asyncHandler(updateStatus));
router.delete('/:id', asyncHandler(remove));

export default router;