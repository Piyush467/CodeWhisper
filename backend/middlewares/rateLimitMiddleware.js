const rateLimit = require('express-rate-limit');

/**
 * Rate Limiter for Authentication routes (Sign up, Login)
 * Max 15 requests per 15 minutes
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate Limiter for AI Code Review submissions
 * Max 30 reviews per 1 hour (to prevent API token drain)
 */
const reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: {
    success: false,
    error: 'AI review request quota exceeded. Please wait an hour before submitting more code.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  authLimiter,
  reviewLimiter
};
