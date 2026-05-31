const logger = require('../../utils/logger');

const responseParser = {
  /**
   * Cleans and parses the Gemini API response.
   * Strips out any markdown wrappers like ```json and ``` if returned.
   * @param {string} rawResponse 
   * @returns {object} Parsed JSON review object
   */
  parse: (rawResponse) => {
    if (!rawResponse) {
      throw new Error('Received empty response from AI model');
    }

    let cleaned = rawResponse.trim();

    // Remove markdown code fences if Gemini included them despite system prompt instructions
    if (cleaned.startsWith('```')) {
      // Find where the JSON starts
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleaned = cleaned.substring(firstBrace, lastBrace + 1);
      } else {
        // Strip markdown backticks
        cleaned = cleaned.replace(/^```(json)?/i, '').replace(/```$/, '').trim();
      }
    }

    try {
      return JSON.parse(cleaned);
    } catch (error) {
      logger.error('JSON parsing failed for AI response. Raw payload:', null);
      logger.debug(rawResponse);
      throw new Error(`Failed to parse AI review output: ${error.message}`);
    }
  }
};

module.exports = responseParser;
