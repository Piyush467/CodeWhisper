/**
 * Token Extraction Utilities
 */
const tokenUtils = {
  /**
   * Extracts a JWT token from cookies or the Authorization header.
   * @param {object} req Express request object
   * @returns {string|null} Token or null if not found
   */
  extractToken: (req) => {
    if (!req) return null;

    // 1. Try to extract from secure HttpOnly cookies
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }

    // 2. Try to extract from Authorization Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  }
};

module.exports = tokenUtils;
