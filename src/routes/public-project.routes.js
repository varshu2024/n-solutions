import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { get, list } from '../controllers/public-project.controller.js';

const router = Router();

router.get('/', asyncHandler(list));
router.get('/:id', asyncHandler(get));

export default router;
