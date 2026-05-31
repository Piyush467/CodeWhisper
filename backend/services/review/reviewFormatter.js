const reviewFormatter = {
  /**
   * Helper to format or prettify code before review (optional).
   * @param {string} code 
   * @returns {string} Formatted code
   */
  format: (code) => {
    if (!code) return '';
    return code.trim();
  }
};

module.exports = reviewFormatter;
