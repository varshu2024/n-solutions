import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { Enquiry } from './models/Enquiry.js';
import { Lead } from './models/Lead.js';
import { Product } from './models/Product.js';
import { Project } from './models/Project.js';
import { registerDashboardModels } from './config/dashboardModels.js';

registerDashboardModels({ Lead, Project, Product, Enquiry });

const startServer = async () => {
  await connectDatabase();
  const server = app.listen(env.port, () => {
    console.log(`NSolutions Solar API listening on port ${env.port}.`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down.`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));
};

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
