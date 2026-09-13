import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, list, get, update, remove } from '../controllers/lead.controller.js';

const router = Router();

router.use(requireAdmin);
router.post('/', asyncHandler(create));
router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));
router.put('/:id', asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;