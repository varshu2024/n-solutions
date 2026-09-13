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
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
