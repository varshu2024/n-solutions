import { Router } from 'express';
import {
  downloadResumeFile,
  list,
  submit,
  updateStatus,
  remove
} from '../controllers/job-application.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { resumeUpload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', resumeUpload, asyncHandler(submit));
router.get('/', requireAdmin, asyncHandler(list));
router.get('/:id/resume/download', requireAdmin, asyncHandler(downloadResumeFile));
router.patch('/:id/status', requireAdmin, asyncHandler(updateStatus));
router.delete('/:id', requireAdmin, asyncHandler(remove));
export default router;
