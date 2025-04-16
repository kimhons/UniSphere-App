const mongoose = require('mongoose');

const AIModelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['content_generation', 'caption_generation', 'hashtag_recommendation', 'analytics_insight', 'growth_strategy', 'monetization_suggestion'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  trainingData: {
    sources: [{
      type: String,
      enum: ['user_content', 'platform_analytics', 'audience_data', 'industry_trends', 'competitor_analysis'],
      required: true
    }],
    contentIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    }],
    dateRange: {
      start: Date,
      end: Date
    }
  },
  performance: {
    accuracy: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    userRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0
    },
    usageCount: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  lastUsed: Date,
  status: {
    type: String,
    enum: ['training', 'active', 'inactive', 'error'],
    default: 'training'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
AIModelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to track model usage
AIModelSchema.methods.trackUsage = function(success = true) {
  this.performance.usageCount += 1;
  this.lastUsed = Date.now();
  
  // Update success rate
  const currentSuccesses = this.performance.successRate * (this.performance.usageCount - 1) / 100;
  const newSuccesses = currentSuccesses + (success ? 1 : 0);
  this.performance.successRate = (newSuccesses / this.performance.usageCount) * 100;
  
  return this.save();
};

// Method to update user rating
AIModelSchema.methods.updateRating = function(rating) {
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }
  
  // Calculate weighted average if there's an existing rating
  if (this.performance.userRating > 0) {
    this.performance.userRating = (this.performance.userRating + rating) / 2;
  } else {
    this.performance.userRating = rating;
  }
  
  return this.save();
};

// Static method to find best model for a specific task
AIModelSchema.statics.findBestModel = async function(userId, type) {
  return this.findOne({
    user: userId,
    type: type,
    status: 'active'
  }).sort({
    'performance.accuracy': -1,
    'performance.userRating': -1,
    'performance.usageCount': -1
  });
};

module.exports = mongoose.model('AIModel', AIModelSchema);
