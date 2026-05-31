const sanitizeCode = require('../utils/sanitizeCode');

/**
 * Sanitizes input request body parameters
 */
const sanitizeMiddleware = {
  /**
   * Sanitizes the code review request inputs (removes null characters, BOM, and limits size)
   */
  reviewInput: (req, res, next) => {
    if (req.body && typeof req.body.code === 'string') {
      req.body.code = sanitizeCode.clean(req.body.code);
    }
    
    if (req.body && typeof req.body.language === 'string') {
      req.body.language = req.body.language.trim().toLowerCase();
    }
    
    next();
  }
};

module.exports = sanitizeMiddleware;
