const logger = require('../utils/logger');

/**
 * Centalized Error Middleware
 */
const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for internal tracking
  logger.error(`${req.method} ${req.originalUrl} - Error: ${err.message}`, err);

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered. Account already exists.';
    return res.status(409).json({ success: false, error: message });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({ success: false, error: message });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, error: 'Invalid token. Please log in again.' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, error: 'Token expired. Please log in again.' });
  }

  // Fallback server error (500)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorMiddleware;
