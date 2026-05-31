const Review = require('../models/Review');
const pagination = require('../utils/pagination');
const logger = require('../utils/logger');
const asyncHandler = require('../middlewares/asyncHandler');
const CONSTANTS = require('../utils/constants');

const historyController = {
  /**
   * @desc    Get paginated review history for current user
   * @route   GET /api/review/history
   * @access  Private (Protected)
   */
  getHistory: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page, limit } = req.query;

    const { skip, limitNum, pageNum } = pagination.getParams(page, limit);

    // Query DB for count and reviews
    const totalCount = await Review.countDocuments({ userId });
    
    // For list page, avoid sending massive code strings to reduce network weight
    // Retrieve only necessary fields first.
    const reviews = await Review.find({ userId })
      .select('language explanation detectedIssues createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const result = pagination.formatResponse(reviews, totalCount, pageNum, limitNum);

    logger.info(`Retrieved ${reviews.length} history items for user: ${req.user.email}`);

    return res.status(200).json({
      success: true,
      ...result
    });
  }),

  /**
   * @desc    Get detailed review session by ID
   * @route   GET /api/review/:id
   * @access  Private (Protected)
   */
  getReviewById: asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: CONSTANTS.ERRORS.REVIEW.NOT_FOUND
      });
    }

    // Verify ownership
    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: CONSTANTS.ERRORS.REVIEW.UNAUTHORIZED
      });
    }

    logger.info(`Retrieved detailed review ${reviewId} for user: ${req.user.email}`);

    return res.status(200).json({
      success: true,
      review: {
        id: review._id,
        originalCode: review.originalCode,
        improvedCode: review.improvedCode,
        explanation: review.explanation,
        detectedIssues: review.detectedIssues,
        suggestions: review.suggestions,
        language: review.language,
        createdAt: review.createdAt
      }
    });
  }),

  /**
   * @desc    Delete a review from history
   * @route   DELETE /api/review/:id
   * @access  Private (Protected)
   */
  deleteReview: asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        error: CONSTANTS.ERRORS.REVIEW.NOT_FOUND
      });
    }

    // Verify ownership
    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        error: CONSTANTS.ERRORS.REVIEW.UNAUTHORIZED
      });
    }

    await review.deleteOne();
    logger.info(`Deleted review ${reviewId} for user: ${req.user.email}`);

    return res.status(200).json({
      success: true,
      message: 'Review session successfully removed from history.'
    });
  })
};

module.exports = historyController;
