const validators = require('../utils/validators');
const CONSTANTS = require('../utils/constants');

const validateMiddleware = {
  /**
   * Validates Registration requests
   */
  register: (req, res, next) => {
    const { name, email, password } = req.body;

    if (validators.isEmpty(name)) {
      return res.status(400).json({ success: false, error: 'Name is a required field' });
    }
    if (validators.isEmpty(email) || !validators.isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }
    if (validators.isEmpty(password) || !validators.isValidPassword(password)) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    next();
  },

  /**
   * Validates Login requests
   */
  login: (req, res, next) => {
    const { email, password } = req.body;

    if (validators.isEmpty(email) || !validators.isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }
    if (validators.isEmpty(password)) {
      return res.status(400).json({ success: false, error: 'Password is required' });
    }

    next();
  },

  /**
   * Validates Code Review submissions
   */
  review: (req, res, next) => {
    const { code, language } = req.body;

    if (validators.isEmpty(code)) {
      return res.status(400).json({ success: false, error: CONSTANTS.ERRORS.REVIEW.EMPTY_CODE });
    }
    
    // Check max size (50k characters)
    if (typeof code === 'string' && code.length > 50000) {
      return res.status(400).json({ success: false, error: CONSTANTS.ERRORS.REVIEW.CODE_TOO_LARGE });
    }

    if (validators.isEmpty(language)) {
      return res.status(400).json({ success: false, error: CONSTANTS.ERRORS.REVIEW.INVALID_LANG });
    }

    // Verify if language is allowed/supported
    const cleanLang = String(language).toLowerCase().trim();
    if (!CONSTANTS.LANGUAGES.includes(cleanLang)) {
      return res.status(400).json({ 
        success: false, 
        error: `Unsupported language: '${language}'. Supported languages are: ${CONSTANTS.LANGUAGES.join(', ')}` 
      });
    }

    next();
  }
};

module.exports = validateMiddleware;
