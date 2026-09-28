import { Router } from 'express';

import { asyncHandler } from '../utils/asyncHandler.js';

import { createPublic } from '../controllers/lead.controller.js';

const router = Router();

router.post('/', asyncHandler(createPublic));

export default router;