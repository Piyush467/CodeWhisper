const express = require('express');
const authController = require('../controllers/authController');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { authLimiter } = require('../middlewares/rateLimitMiddleware');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes with rate limiting and body validations
router.post('/register', authLimiter, validateMiddleware.register, authController.register);
router.post('/login', authLimiter, validateMiddleware.login, authController.login);

// Public route to clear cookie (no token needed to logout, but standard)
router.post('/logout', authController.logout);

// Protected routes to verify identity
router.get('/me', protect, authController.me);

module.exports = router;
