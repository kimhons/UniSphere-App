const mongoose = require('mongoose');

const GrowthSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  strategies: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true
    },
    impact: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true
    },
    platforms: [{
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest']
    }],
    status: {
      type: String,
      enum: ['suggested', 'in_progress', 'completed', 'dismissed'],
      default: 'suggested'
    },
    startDate: Date,
    completionDate: Date,
    results: {
      followerGrowth: Number,
      engagementIncrease: Number,
      notes: String
    },
    aiGenerated: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  collaborations: [{
    creatorId: String,
    name: {
      type: String,
      required: true
    },
    handle: String,
    platform: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest']
    },
    followers: Number,
    niche: String,
    match: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    status: {
      type: String,
      enum: ['suggested', 'contacted', 'in_progress', 'completed', 'rejected'],
      default: 'suggested'
    },
    contactDate: Date,
    completionDate: Date,
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    results: {
      followerGain: Number,
      engagementRate: Number,
      notes: String
    },
    aiGenerated: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  trendingTopics: [{
    topic: {
      type: String,
      required: true
    },
    growth: String,
    relevance: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    platforms: [{
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest']
    }],
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active'
    },
    contentCreated: {
      type: Boolean,
      default: false
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content'
    },
    aiGenerated: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: Date
  }],
  hashtagCollections: [{
    name: {
      type: String,
      required: true
    },
    hashtags: [{
      type: String,
      required: true
    }],
    reach: String,
    relevance: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    platforms: [{
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest']
    }],
    usageCount: {
      type: Number,
      default: 0
    },
    aiGenerated: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  growthMetrics: {
    followerGrowthRate: {
      type: Number,
      default: 0
    },
    engagementTrend: {
      type: Number,
      default: 0
    },
    contentEffectiveness: {
      type: Number,
      default: 0
    },
    audienceRetention: {
      type: Number,
      default: 0
    },
    platformGrowth: {
      instagram: {
        type: Number,
        default: 0
      },
      tiktok: {
        type: Number,
        default: 0
      },
      youtube: {
        type: Number,
        default: 0
      },
      twitter: {
        type: Number,
        default: 0
      },
      linkedin: {
        type: Number,
        default: 0
      },
      facebook: {
        type: Number,
        default: 0
      },
      pinterest: {
        type: Number,
        default: 0
      }
    }
  },
  growthGoals: [{
    metric: {
      type: String,
      enum: ['followers', 'engagement', 'content', 'revenue'],
      required: true
    },
    platform: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest', 'all']
    },
    targetValue: {
      type: Number,
      required: true
    },
    startValue: {
      type: Number,
      required: true
    },
    currentValue: {
      type: Number,
      required: true
    },
    deadline: Date,
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'missed'],
      default: 'in_progress'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update lastUpdated on save
GrowthSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Method to get active growth strategies
GrowthSchema.methods.getActiveStrategies = function() {
  return this.strategies.filter(strategy => 
    strategy.status === 'suggested' || strategy.status === 'in_progress'
  );
};

// Method to get active collaborations
GrowthSchema.methods.getActiveCollaborations = function() {
  return this.collaborations.filter(collab => 
    collab.status === 'suggested' || collab.status === 'contacted' || collab.status === 'in_progress'
  );
};

// Method to get active trending topics
GrowthSchema.methods.getActiveTrendingTopics = function() {
  return this.trendingTopics.filter(topic => 
    topic.status === 'active' && (!topic.expiresAt || topic.expiresAt > Date.now())
  );
};

// Method to track strategy progress
GrowthSchema.methods.updateStrategyStatus = function(strategyId, status, results = {}) {
  const strategy = this.strategies.id(strategyId);
  
  if (!strategy) {
    return false;
  }
  
  strategy.status = status;
  
  if (status === 'in_progress' && !strategy.startDate) {
    strategy.startDate = Date.now();
  }
  
  if (status === 'completed') {
    strategy.completionDate = Date.now();
    strategy.results = results;
  }
  
  return true;
};

module.exports = mongoose.model('Growth', GrowthSchema);
