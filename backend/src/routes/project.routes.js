import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { projectImageUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, remove, updateStatus } from '../controllers/project.controller.js';
import { list as listPublic } from '../controllers/public-project.controller.js';

const router = Router();

router.get('/', asyncHandler(listPublic));
router.use(requireAdmin);
router.post('/', projectImageUpload, asyncHandler(create));
router.get('/:id', asyncHandler(get));
router.patch('/:id/status', asyncHandler(updateStatus));
router.delete('/:id', asyncHandler(remove));

export default router;