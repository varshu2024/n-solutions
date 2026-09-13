export const notFoundHandler = (request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`
  });
};

export const errorHandler = (error, request, response, next) => {
  if (response.headersSent) return next(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error.';
  let details = error.details;

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Request validation failed.';
    details = Object.fromEntries(Object.entries(error.errors).map(([field, value]) => [field, value.message]));
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'An admin with this email already exists.';
  }

  const body = { success: false, message };
  if (details) body.details = details;
  if (process.env.NODE_ENV !== 'production' && statusCode === 500) body.error = error.message;

  console.error(error);
  return response.status(statusCode).json(body);
};
