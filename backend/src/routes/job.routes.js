import { Router } from 'express';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { create, list, listAll, remove, update } from '../controllers/job.controller.js';

const router = Router();

router.get('/', asyncHandler(list));
router.use(requireAdmin);
router.get('/admin', asyncHandler(listAll));
router.post('/', asyncHandler(create));
router.patch('/:id', asyncHandler(update));
router.delete('/:id', asyncHandler(remove));

export default router;
