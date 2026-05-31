const issueExtractor = {
  /**
   * Filter and sort issues by severity levels.
   * @param {Array} issues 
   * @returns {object} Categorized lists
   */
  extractBySeverity: (issues) => {
    if (!Array.isArray(issues)) return {};
    
    return {
      critical: issues.filter(i => i.severity === 'critical'),
      high: issues.filter(i => i.severity === 'high'),
      medium: issues.filter(i => i.severity === 'medium'),
      low: issues.filter(i => i.severity === 'low')
    };
  }
};

module.exports = issueExtractor;
