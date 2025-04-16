const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest', 'all'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  metrics: {
    followers: {
      count: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      },
      changePercentage: {
        type: Number,
        default: 0
      }
    },
    engagement: {
      rate: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      }
    },
    impressions: {
      count: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      }
    },
    reach: {
      count: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      }
    },
    profileViews: {
      count: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      }
    },
    contentCount: {
      count: {
        type: Number,
        default: 0
      },
      change: {
        type: Number,
        default: 0
      }
    }
  },
  audienceData: {
    demographics: {
      ageRanges: [{
        range: String,
        percentage: Number
      }],
      genders: [{
        gender: String,
        percentage: Number
      }],
      locations: [{
        location: String,
        percentage: Number
      }]
    },
    interests: [{
      interest: String,
      percentage: Number
    }],
    activeHours: [{
      hour: Number,
      activity: Number
    }],
    activeDays: [{
      day: String,
      activity: Number
    }]
  },
  contentPerformance: {
    byType: [{
      type: String,
      engagementRate: Number,
      count: Number
    }],
    byTime: [{
      hour: Number,
      engagementRate: Number,
      count: Number
    }],
    topPerforming: [{
      contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
      },
      engagementRate: Number,
      impressions: Number,
      reach: Number
    }]
  },
  growthInsights: [{
    type: String,
    title: String,
    description: String,
    metric: String,
    value: Number,
    recommendation: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for user and date for efficient queries
AnalyticsSchema.index({ user: 1, platform: 1, date: 1 });

// Static method to get analytics for a specific date range
AnalyticsSchema.statics.getAnalyticsForDateRange = async function(userId, platform, startDate, endDate) {
  return this.find({
    user: userId,
    platform: platform,
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: 1 });
};

// Static method to get latest analytics
AnalyticsSchema.statics.getLatestAnalytics = async function(userId, platform) {
  return this.findOne({
    user: userId,
    platform: platform
  }).sort({ date: -1 });
};

// Method to calculate growth rate
AnalyticsSchema.methods.calculateGrowthRate = function(previousAnalytics) {
  if (!previousAnalytics) {
    return 0;
  }
  
  const currentFollowers = this.metrics.followers.count;
  const previousFollowers = previousAnalytics.metrics.followers.count;
  
  if (previousFollowers === 0) {
    return 0;
  }
  
  return ((currentFollowers - previousFollowers) / previousFollowers) * 100;
};

module.exports = mongoose.model('Analytics', AnalyticsSchema);
