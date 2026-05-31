const googleGenAI = require('../../config/gemini');
const promptBuilder = require('./promptBuilder');
const responseParser = require('./responseParser');
const responseValidator = require('./responseValidator');
const fallbackHandler = require('./fallbackHandler');
const logger = require('../../utils/logger');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const REQUEST_TIMEOUT = 25000; // 25 seconds timeout

const geminiService = {
  /**
   * Submits code to Gemini API for a structured code review.
   * @param {string} code 
   * @param {string} language 
   * @returns {Promise<object>} Review results matching the schema
   */
  reviewCode: async (code, language) => {
    try {
      if (!googleGenAI) {
        throw new Error('Gemini API client is not configured');
      }

      const systemInstruction = promptBuilder.getSystemInstruction();
      const userPrompt = promptBuilder.buildUserPrompt(code, language);

      const model = googleGenAI.getGenerativeModel({
        model: GEMINI_MODEL,
        systemInstruction: systemInstruction,
        generationConfig: {
          responseMimeType: 'application/json' // Instruct model to guarantee JSON mode
        }
      });

      // Create a timeout promise to handle unresponsive API calls
      const apiCallPromise = model.generateContent(userPrompt);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI Review request timed out')), REQUEST_TIMEOUT)
      );

      logger.info(`Sending review request to ${GEMINI_MODEL} for language: ${language}`);
      
      // Race the API call against our timeout
      const result = await Promise.race([apiCallPromise, timeoutPromise]);
      
      const response = await result.response;
      const rawText = response.text();
      
      logger.debug('Received raw response from Gemini.');
      
      // Parse the JSON review
      const parsedReview = responseParser.parse(rawText);
      
      // Validate structure and map fields
      const validatedReview = responseValidator.validate(parsedReview);
      
      return validatedReview;
    } catch (error) {
      logger.error(`Error in geminiService.reviewCode: ${error.message}`, error);
      // Execute the offline fallback handler so the server survives and user gets feedback
      return fallbackHandler.getFallbackReview(code, error.message);
    }
  }
};

module.exports = geminiService;
