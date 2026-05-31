const jwtService = require('../services/auth/jwtService');
const tokenUtils = require('../utils/tokenUtils');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Authentication Guard Middleware
 */
const protect = async (req, res, next) => {
  try {
    const token = tokenUtils.extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No authentication token provided.'
      });
    }

    // Verify token
    const decoded = jwtService.verifyToken(token);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        error: 'Invalid session or token expired. Please log in again.'
      });
    }

    // Check if user still exists in database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User account associated with this session no longer exists.'
      });
    }

    // Attach user information to request
    req.user = user;
    next();
  } catch (error) {
    logger.error('Error in protect auth middleware:', error);
    return res.status(401).json({
      success: false,
      error: 'Authentication failed. Please sign in.'
    });
  }
};

module.exports = { protect };
