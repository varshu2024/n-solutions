import { Router } from 'express';
import {
  list,
  submit,
  updateStatus
} from '../controllers/job-application.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { resumeUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', resumeUpload, asyncHandler(submit));
router.get('/', requireAdmin, asyncHandler(list));
router.patch('/:id/status', requireAdmin, asyncHandler(updateStatus));

export default router;
