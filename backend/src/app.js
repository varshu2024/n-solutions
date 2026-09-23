import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import leadRoutes from './routes/lead.routes.js';
import productRoutes from './routes/product.routes.js';
import projectRoutes from './routes/project.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import publicProductRoutes from './routes/public-product.routes.js';
import publicProjectRoutes from './routes/public-project.routes.js';
import newsRoutes from './routes/news.routes.js';
import projectMilestoneRoutes from './routes/project-milestone.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import videoRoutes from './routes/video.routes.js';
import publicMediaRoutes from './routes/public-media.routes.js';
import publicGalleryRoutes from './routes/public-gallery.routes.js';
import jobRoutes from './routes/job.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import jobApplicationRoutes from './routes/job-application.routes.js';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

app.disable('x-powered-by');
app.use(cors({
  origin: env.corsOrigin,
  credentials: env.corsOrigin !== '*'
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

app.get('/health', (request, response) => {
  response.json({ success: true, message: 'NSolutions Solar API is healthy.' });
});
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/public/products', publicProductRoutes);
app.use('/api/public/projects', publicProjectRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/milestones', projectMilestoneRoutes);
app.use('/api/gallery', publicGalleryRoutes);
app.use('/api/admin/gallery', galleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/media', publicMediaRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
