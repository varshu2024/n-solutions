import { Router } from 'express';
import { recentEnquiries, recentLeads, stats } from '../controllers/dashboard.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.use(requireAdmin);
router.get('/stats', asyncHandler(stats));
router.get('/recent-enquiries', asyncHandler(recentEnquiries));
router.get('/recent-leads', asyncHandler(recentLeads));

export default router;
