const { GoogleGenAI } = require('@google/generative-ai');
const logger = require('../utils/logger');

// Initialize Gemini Client
let googleGenAI;

try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    logger.warn('GEMINI_API_KEY environment variable is not defined.');
  }
  
  // Note: For newer @google/generative-ai libraries, we import GoogleGenAI or GoogleGenerativeAI. Let's check which is standard.
  // Standard is GoogleGenerativeAI from '@google/generative-ai'.
  const { GoogleGenerativeAI } = require('@google/generative-ai');
  googleGenAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');
  logger.info('Gemini API Client initialized.');
} catch (error) {
  logger.error('Failed to initialize Gemini API Client', error);
}

module.exports = googleGenAI;
