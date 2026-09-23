export const sendSuccess = (response, statusCode, message, data) => {
  response.status(statusCode).json({
    success: true,
    message,
    data
  });
};
