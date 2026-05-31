const logger = require('../../utils/logger');

const responseValidator = {
  /**
   * Validates the structure of the parsed review object.
   * Modifies or inserts defaults for missing parts to keep the schema compliant.
   * @param {object} parsedReview 
   * @returns {object} Validated review object
   */
  validate: (parsedReview) => {
    if (!parsedReview || typeof parsedReview !== 'object') {
      throw new Error('AI response is not an object');
    }

    const validated = {
      improvedCode: parsedReview.improvedCode || '',
      explanation: parsedReview.explanation || 'No summary explanation was provided by the AI reviewer.',
      detectedIssues: [],
      suggestions: Array.isArray(parsedReview.suggestions) ? parsedReview.suggestions : []
    };

    // Ensure improvedCode has something, otherwise fall back to empty string or a placeholder message
    if (!validated.improvedCode) {
      logger.warn('AI reviewer returned empty improvedCode.');
    }

    // Process detected issues
    if (Array.isArray(parsedReview.detectedIssues)) {
      parsedReview.detectedIssues.forEach((issue, idx) => {
        if (!issue || typeof issue !== 'object') return;

        // Map and validate issue types
        const type = ['bug', 'security', 'performance', 'style', 'readability'].includes(issue.type)
          ? issue.type
          : 'readability';

        // Map and validate severity
        const severity = ['critical', 'high', 'medium', 'low'].includes(issue.severity)
          ? issue.severity
          : 'low';

        // Validate line number
        let line = Number(issue.line);
        if (isNaN(line) || line < 1) {
          line = null;
        }

        validated.detectedIssues.push({
          type,
          severity,
          line,
          description: issue.description || `Issue #${idx + 1} found with ${type}`,
          recommendation: issue.recommendation || 'No recommendation was provided.'
        });
      });
    }

    return validated;
  }
};

module.exports = responseValidator;
