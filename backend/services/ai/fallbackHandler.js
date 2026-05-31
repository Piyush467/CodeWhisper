const logger = require('../../utils/logger');

const fallbackHandler = {
  /**
   * Generates a safe, complete fallback review payload when Gemini is offline or failed.
   * @param {string} originalCode 
   * @param {string} errorDetails 
   * @returns {object} Review payload
   */
  getFallbackReview: (originalCode, errorDetails) => {
    logger.warn(`AI Fallback handler invoked due to error: ${errorDetails}`);
    
    return {
      improvedCode: originalCode,
      explanation: `**Note: Local Review Fallback Activated**\n\nThe AI Code Review Service experienced a temporary network issue or timeout while processing your code (${errorDetails}). Your code is preserved below. Please click "Review" again to retry.`,
      detectedIssues: [
        {
          type: 'performance',
          severity: 'medium',
          line: 1,
          description: 'AI Code Reviewer temporary connection issue. The API returned a status error or timeout.',
          recommendation: 'Check your network connection and click "Review" to submit the request again.'
        }
      ],
      suggestions: [
        'Ensure that your code is syntactically valid before submitting.',
        'If the problem persists, please check that the Gemini API Key is active.'
      ]
    };
  }
};

module.exports = fallbackHandler;
