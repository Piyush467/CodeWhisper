const geminiService = require("../services/ai/geminiService");
const cacheService = require("../services/review/cacheService");
const Review = require("../models/Review");
const logger = require("../utils/logger");
const asyncHandler = require("../middlewares/asyncHandler");

const reviewController = {
  /**
   * @desc    Submit code and retrieve AI review
   * @route   POST /api/review
   * @access  Private (Protected)
   */
  review: asyncHandler(async (req, res) => {
    const { code, language } = req.body;
    const userId = req.user._id;

    // 1. Generate unique cache key
    const cacheKey = cacheService.generateKey(code, language);

    // 2. Try cache retrieval
    let reviewResult = await cacheService.get(cacheKey);
    let isFromCache = true;

    if (!reviewResult) {
      isFromCache = false;
      logger.info("Cache miss. Calling AI review service...");

      // 3. Trigger Gemini review service
      reviewResult = await geminiService.reviewCode(code, language);

      // 4. Save review results inside the LRU cache
      if (reviewResult && !reviewResult.isFallback) {
        await cacheService.set(cacheKey, reviewResult);
      }
    }

    // 5. Save the review to the MongoDB database
    const savedReview = await Review.create({
      userId,
      originalCode: code,
      improvedCode: reviewResult.improvedCode,
      explanation: reviewResult.explanation,
      detectedIssues: reviewResult.detectedIssues,
      suggestions: reviewResult.suggestions,
      language: language,
      metadata: {
        modelName: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        tokenUsage: 0, // placeholder
      },
    });

    logger.info(
      `Code review completed & saved. ID: ${savedReview._id}. Cached: ${isFromCache}`,
    );

    // Return full result including DB record ID
    return res.status(200).json({
      success: true,
      cached: isFromCache,
      review: {
        id: savedReview._id,
        originalCode: savedReview.originalCode,
        improvedCode: savedReview.improvedCode,
        explanation: savedReview.explanation,
        detectedIssues: savedReview.detectedIssues,
        suggestions: savedReview.suggestions,
        language: savedReview.language,
        createdAt: savedReview.createdAt,
      },
    });
  }),
};

module.exports = reviewController;
