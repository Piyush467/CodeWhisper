const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['bug', 'security', 'performance', 'style', 'readability'],
    required: true
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    required: true
  },
  line: {
    type: Number,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true
  }
});

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    originalCode: {
      type: String,
      required: [true, 'Original code is required'],
      maxLength: [100000, 'Original code cannot exceed 100,000 characters']
    },
    improvedCode: {
      type: String,
      required: [true, 'Improved code is required']
    },
    explanation: {
      type: String,
      required: [true, 'Explanation is required']
    },
    detectedIssues: [issueSchema],
    suggestions: [
      {
        type: String
      }
    ],
    language: {
      type: String,
      required: true,
      index: true,
      trim: true,
      lowercase: true
    },
    metadata: {
      modelName: {
        type: String,
        default: 'gemini-2.5-flash'
      },
      tokenUsage: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

// Optimize retrieval by indexing userId and createdAt together for history view
reviewSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
