const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  contentType: {
    type: String,
    enum: ['post', 'video', 'story', 'reel'],
    required: true
  },
  caption: {
    type: String,
    maxlength: [2200, 'Caption cannot be more than 2200 characters']
  },
  hashtags: [String],
  mediaUrls: [String],
  platforms: [{
    type: String,
    enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest'],
    required: true
  }],
  scheduledFor: Date,
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published', 'failed'],
    default: 'draft'
  },
  platformData: [{
    platform: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest'],
      required: true
    },
    postId: String,
    postUrl: String,
    status: {
      type: String,
      enum: ['pending', 'published', 'failed'],
      default: 'pending'
    },
    publishedAt: Date,
    errorMessage: String,
    analytics: {
      likes: {
        type: Number,
        default: 0
      },
      comments: {
        type: Number,
        default: 0
      },
      shares: {
        type: Number,
        default: 0
      },
      saves: {
        type: Number,
        default: 0
      },
      impressions: {
        type: Number,
        default: 0
      },
      reach: {
        type: Number,
        default: 0
      },
      engagement: {
        type: Number,
        default: 0
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      }
    }
  }],
  aiGenerated: {
    type: Boolean,
    default: false
  },
  aiPrompt: String,
  aiModel: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ContentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate engagement rate
ContentSchema.methods.calculateEngagement = function(platform) {
  const platformData = this.platformData.find(p => p.platform === platform);
  
  if (!platformData || !platformData.analytics) {
    return 0;
  }
  
  const { likes, comments, shares, saves, impressions } = platformData.analytics;
  
  if (!impressions || impressions === 0) {
    return 0;
  }
  
  // Calculate engagement as (likes + comments + shares + saves) / impressions
  const interactions = likes + comments + shares + saves;
  return (interactions / impressions) * 100;
};

module.exports = mongoose.model('Content', ContentSchema);
