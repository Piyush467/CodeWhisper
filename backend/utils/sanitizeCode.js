/**
 * Code Sanitization Utility
 */
const sanitizeCode = {
  /**
   * Sanitizes raw code submissions.
   * Prevents standard exploits, buffer sizes, and strips malicious null characters.
   * @param {string} code 
   * @param {number} maxLength 
   * @returns {string} Cleaned code
   */
  clean: (code, maxLength = 50000) => {
    if (!code || typeof code !== 'string') {
      return '';
    }

    let cleaned = code;

    // 1. Remove Null byte character injection risks
    cleaned = cleaned.replace(/\0/g, '');

    // 2. Remove standard Byte Order Marks (BOM) or invisible non-printable control chars
    // but preserve newlines (\n), carriage returns (\r) and tabs (\t)
    cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

    // 3. Enforce maximum characters length limit strictly
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength);
    }

    return cleaned;
  }
};

module.exports = sanitizeCode;
