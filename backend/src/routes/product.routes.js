import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { projectImageUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, list, remove } from '../controllers/product.controller.js';

const router = Router();

router.use(requireAdmin);
router.post('/', projectImageUpload, asyncHandler(create));
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.delete('/:id', asyncHandler(remove));

export default router;
