import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login, logout, register } from '../controllers/auth.controller.js';
import { getProfile, updatePassword, updateProfile } from '../controllers/profile.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts. Please try again later.' }
});

router.post('/register', authLimiter, asyncHandler(register));
router.post('/login', authLimiter, asyncHandler(login));
router.post('/logout', requireAdmin, asyncHandler(logout));
router.get('/profile', requireAdmin, asyncHandler(getProfile));
router.patch('/profile', requireAdmin, asyncHandler(updateProfile));
router.patch('/profile/password', requireAdmin, asyncHandler(updatePassword));

export default router;
