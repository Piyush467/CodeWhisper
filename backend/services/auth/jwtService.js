const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-super-secret-key-change-in-prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const jwtService = {
  /**
   * Signs a payload into a JWT.
   * @param {object} payload 
   * @returns {string} Token
   */
  generateToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });
  },

  /**
   * Verifies a JWT token.
   * @param {string} token 
   * @returns {object|null} Decoded payload or null if invalid
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      logger.debug(`JWT Verification failed: ${error.message}`);
      return null;
    }
  },

  /**
   * Helper to set cookie parameters.
   */
  getCookieOptions: () => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Calculate standard expiry (default 7 days)
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    
    return {
      httpOnly: true, // Prevents client-side XSS access
      secure: isProduction, // HTTPS only in production
      sameSite: isProduction ? 'strict' : 'lax', // CSRF protection
      maxAge: maxAge
    };
  }
};

module.exports = jwtService;
