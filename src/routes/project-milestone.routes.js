import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, get, list, remove, update } from '../controllers/project-milestone.controller.js';

const router = Router();
router.use(requireAdmin);
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.post('/', asyncHandler(create));
router.patch('/:id', asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;
