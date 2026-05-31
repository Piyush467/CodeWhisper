const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');
const { reviewLimiter } = require('../middlewares/rateLimitMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const sanitizeMiddleware = require('../middlewares/sanitizeMiddleware');

const router = express.Router();

// Protected, rate-limited, validated, and sanitized review submission route
router.post(
  '/',
  protect,
  reviewLimiter,
  validateMiddleware.review,
  sanitizeMiddleware.reviewInput,
  reviewController.review
);

module.exports = router;
