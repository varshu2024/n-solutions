import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { list } from '../controllers/public-gallery.controller.js';

const router = Router();

router.get('/', asyncHandler(list));

export default router;