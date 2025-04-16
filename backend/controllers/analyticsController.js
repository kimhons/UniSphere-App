const asyncHandler = require('express-async-handler');
const Analytics = require('../models/Analytics');
const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Get analytics overview
// @route   GET /api/analytics/overview
// @access  Private
const getAnalyticsOverview = asyncHandler(async (req, res) => {
  const { platform = 'all', period = '30d' } = req.query;
  
  // Calculate date range based on period
  const endDate = new Date();
  let startDate = new Date();
  
  switch (period) {
    case '7d':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(startDate.getDate() - 90);
      break;
    case '1y':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }
  
  // Get latest analytics
  const latestAnalytics = await Analytics.getLatestAnalytics(req.user._id, platform);
  
  if (!latestAnalytics) {
    return res.status(200).json({
      success: true,
      message: 'No analytics data available yet',
      data: null
    });
  }
  
  // Get historical analytics for the period
  const historicalAnalytics = await Analytics.getAnalyticsForDateRange(
    req.user._id,
    platform,
    startDate,
    endDate
  );
  
  // Calculate growth rates
  const firstAnalytics = historicalAnalytics.length > 0 ? historicalAnalytics[0] : null;
  const growthRate = firstAnalytics ? latestAnalytics.calculateGrowthRate(firstAnalytics) : 0;
  
  // Format response
  const response = {
    overview: {
      followers: {
        count: latestAnalytics.metrics.followers.count,
        change: latestAnalytics.metrics.followers.change,
        changePercentage: latestAnalytics.metrics.followers.changePercentage,
        growthRate
      },
      engagement: {
        rate: latestAnalytics.metrics.engagement.rate,
        change: latestAnalytics.metrics.engagement.change
      },
      impressions: {
        count: latestAnalytics.metrics.impressions.count,
        change: latestAnalytics.metrics.impressions.change
      },
      reach: {
        count: latestAnalytics.metrics.reach.count,
        change: latestAnalytics.metrics.reach.change
      }
    },
    audienceData: latestAnalytics.audienceData,
    contentPerformance: latestAnalytics.contentPerformance,
    growthInsights: latestAnalytics.growthInsights,
    historicalData: historicalAnalytics.map(analytics => ({
      date: analytics.date,
      followers: analytics.metrics.followers.count,
      engagement: analytics.metrics.engagement.rate,
      impressions: analytics.metrics.impressions.count,
      reach: analytics.metrics.reach.count
    })),
    lastUpdated: latestAnalytics.lastUpdated
  };
  
  res.status(200).json({
    success: true,
    data: response
  });
});

// @desc    Get audience demographics
// @route   GET /api/analytics/audience
// @access  Private
const getAudienceDemographics = asyncHandler(async (req, res) => {
  const { platform = 'all' } = req.query;
  
  // Get latest analytics
  const latestAnalytics = await Analytics.getLatestAnalytics(req.user._id, platform);
  
  if (!latestAnalytics) {
    return res.status(200).json({
      success: true,
      message: 'No audience data available yet',
      data: null
    });
  }
  
  res.status(200).json({
    success: true,
    data: latestAnalytics.audienceData,
    lastUpdated: latestAnalytics.lastUpdated
  });
});

// @desc    Get content performance
// @route   GET /api/analytics/content
// @access  Private
const getContentPerformance = asyncHandler(async (req, res) => {
  const { platform = 'all', period = '30d', contentType } = req.query;
  
  // Calculate date range based on period
  const endDate = new Date();
  let startDate = new Date();
  
  switch (period) {
    case '7d':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(startDate.getDate() - 90);
      break;
    case '1y':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }
  
  // Build query for content
  const contentQuery = {
    user: req.user._id,
    status: 'published',
    'platformData.publishedAt': { $gte: startDate, $lte: endDate }
  };
  
  if (platform !== 'all') {
    contentQuery.platforms = platform;
  }
  
  if (contentType) {
    contentQuery.contentType = contentType;
  }
  
  // Get published content
  const content = await Content.find(contentQuery).sort({ 'platformData.publishedAt': -1 });
  
  // Get latest analytics
  const latestAnalytics = await Analytics.getLatestAnalytics(req.user._id, platform);
  
  // Format response
  const response = {
    contentItems: content.map(item => ({
      _id: item._id,
      title: item.title,
      contentType: item.contentType,
      platforms: item.platforms,
      publishedAt: item.platformData[0]?.publishedAt,
      performance: item.platformData.map(platform => ({
        platform: platform.platform,
        engagementRate: item.calculateEngagement(platform.platform),
        likes: platform.analytics?.likes || 0,
        comments: platform.analytics?.comments || 0,
        shares: platform.analytics?.shares || 0,
        saves: platform.analytics?.saves || 0,
        impressions: platform.analytics?.impressions || 0,
        reach: platform.analytics?.reach || 0
      }))
    })),
    performanceByType: latestAnalytics?.contentPerformance?.byType || [],
    performanceByTime: latestAnalytics?.contentPerformance?.byTime || [],
    topPerforming: latestAnalytics?.contentPerformance?.topPerforming || []
  };
  
  res.status(200).json({
    success: true,
    data: response
  });
});

// @desc    Get growth insights
// @route   GET /api/analytics/insights
// @access  Private
const getGrowthInsights = asyncHandler(async (req, res) => {
  const { platform = 'all' } = req.query;
  
  // Get latest analytics
  const latestAnalytics = await Analytics.getLatestAnalytics(req.user._id, platform);
  
  if (!latestAnalytics) {
    return res.status(200).json({
      success: true,
      message: 'No insights available yet',
      data: []
    });
  }
  
  res.status(200).json({
    success: true,
    data: latestAnalytics.growthInsights,
    lastUpdated: latestAnalytics.lastUpdated
  });
});

// @desc    Sync analytics data from social platforms
// @route   POST /api/analytics/sync
// @access  Private
const syncAnalyticsData = asyncHandler(async (req, res) => {
  const { platforms } = req.body;
  
  if (!platforms || platforms.length === 0) {
    res.status(400);
    throw new Error('Please provide platforms to sync');
  }
  
  // Check if user has connected the requested platforms
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const connectedPlatforms = user.socialAccounts
    .filter(account => account.isConnected)
    .map(account => account.platform);
  
  const invalidPlatforms = platforms.filter(platform => 
    !connectedPlatforms.includes(platform) && platform !== 'all'
  );
  
  if (invalidPlatforms.length > 0) {
    res.status(400);
    throw new Error(`Platforms not connected: ${invalidPlatforms.join(', ')}`);
  }
  
  // In a real app, this would call the social media APIs to fetch analytics data
  // For now, we'll just simulate successful syncing with mock data
  
  // Create mock analytics data for each platform
  const syncResults = [];
  
  for (const platform of platforms) {
    // Skip 'all' as it's a virtual platform for aggregated data
    if (platform === 'all') continue;
    
    // Create or update analytics for this platform
    const analytics = await createMockAnalytics(req.user._id, platform);
    
    syncResults.push({
      platform,
      success: true,
      lastUpdated: analytics.lastUpdated
    });
    
    // Update last synced timestamp on user's social account
    const accountIndex = user.socialAccounts.findIndex(
      account => account.platform === platform
    );
    
    if (accountIndex !== -1) {
      user.socialAccounts[accountIndex].lastSynced = Date.now();
    }
  }
  
  // If 'all' was requested, create aggregated analytics
  if (platforms.includes('all')) {
    await createAggregatedAnalytics(req.user._id);
    
    syncResults.push({
      platform: 'all',
      success: true,
      lastUpdated: new Date()
    });
  }
  
  // Save user with updated lastSynced timestamps
  await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Analytics data synced successfully',
    results: syncResults
  });
});

// Helper function to create mock analytics data
const createMockAnalytics = async (userId, platform) => {
  // Get existing analytics or create new one
  let analytics = await Analytics.findOne({
    user: userId,
    platform,
    date: { $gte: new Date().setHours(0, 0, 0, 0) }
  });
  
  if (!analytics) {
    // Get previous analytics for calculating changes
    const previousAnalytics = await Analytics.getLatestAnalytics(userId, platform);
    
    // Generate random metrics with realistic changes from previous
    const previousFollowers = previousAnalytics?.metrics.followers.count || 1000;
    const followerChange = Math.floor(Math.random() * 50) - 10; // -10 to +40
    const followerCount = previousFollowers + followerChange;
    
    analytics = await Analytics.create({
      user: userId,
      platform,
      metrics: {
        followers: {
          count: followerCount,
          change: followerChange,
          changePercentage: (followerChange / previousFollowers) * 100
        },
        engagement: {
          rate: (Math.random() * 5) + 1, // 1-6%
          change: (Math.random() * 0.6) - 0.3 // -0.3 to +0.3
        },
        impressions: {
          count: Math.floor(Math.random() * 5000) + 1000,
          change: Math.floor(Math.random() * 1000) - 200
        },
        reach: {
          count: Math.floor(Math.random() * 3000) + 500,
          change: Math.floor(Math.random() * 600) - 100
        },
        profileViews: {
          count: Math.floor(Math.random() * 500) + 100,
          change: Math.floor(Math.random() * 100) - 20
        },
        contentCount: {
          count: Math.floor(Math.random() * 20) + 5,
          change: Math.floor(Math.random() * 5) - 1
        }
      },
      audienceData: {
        demographics: {
          ageRanges: [
            { range: '18-24', percentage: 25 + (Math.random() * 10) },
            { range: '25-34', percentage: 35 + (Math.random() * 10) },
            { range: '35-44', percentage: 20 + (Math.random() * 10) },
            { range: '45-54', percentage: 10 + (Math.random() * 5) },
            { range: '55+', percentage: 5 + (Math.random() * 5) }
          ],
          genders: [
            { gender: 'Female', percentage: 55 + (Math.random() * 10) },
            { gender: 'Male', percentage: 40 + (Math.random() * 10) },
            { gender: 'Other', percentage: 5 + (Math.random() * 2) }
          ],
          locations: [
            { location: 'United States', percentage: 40 + (Math.random() * 10) },
            { location: 'United Kingdom', percentage: 15 + (Math.random() * 5) },
            { location: 'Canada', percentage: 10 + (Math.random() * 5) },
            { location: 'Australia', percentage: 8 + (Math.random() * 4) },
            { location: 'Germany', percentage: 7 + (Math.random() * 3) },
            { location: 'Other', percentage: 20 + (Math.random() * 5) }
          ]
        },
        interests: [
          { interest: 'Fashion', percentage: 30 + (Math.random() * 10) },
          { interest: 'Travel', percentage: 25 + (Math.random() * 10) },
          { interest: 'Fitness', percentage: 20 + (Math.random() * 10) },
          { interest: 'Food', percentage: 15 + (Math.random() * 5) },
          { interest: 'Technology', percentage: 10 + (Math.random() * 5) }
        ],
        activeHours: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          activity: Math.floor(Math.random() * 100)
        })),
        activeDays: [
          { day: 'Monday', activity: Math.floor(Math.random() * 100) },
          { day: 'Tuesday', activity: Math.floor(Math.random() * 100) },
          { day: 'Wednesday', activity: Math.floor(Math.random() * 100) },
          { day: 'Thursday', activity: Math.floor(Math.random() * 100) },
          { day: 'Friday', activity: Math.floor(Math.random() * 100) },
          { day: 'Saturday', activity: Math.floor(Math.random() * 100) },
          { day: 'Sunday', activity: Math.floor(Math.random() * 100) }
        ]
      },
      contentPerformance: {
        byType: [
          { type: 'post', engagementRate: (Math.random() * 5) + 1, count: Math.floor(Math.random() * 10) + 5 },
          { type: 'video', engagementRate: (Math.random() * 7) + 3, count: Math.floor(Math.random() * 8) + 2 },
          { type: 'story', engagementRate: (Math.random() * 4) + 1, count: Math.floor(Math.random() * 15) + 10 },
          { type: 'reel', engagementRate: (Math.random() * 8) + 4, count: Math.floor(Math.random() * 6) + 1 }
        ],
        byTime: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          engagementRate: (Math.random() * 6) + 1,
          count: Math.floor(Math.random() * 5) + 1
        })),
        topPerforming: []
      },
      growthInsights: [
        {
          type: 'positive',
          title: 'Engagement Increase',
          description: 'Your engagement rate has increased by 15% in the last week.',
          metric: 'engagement',
          value: 15,
          recommendation: 'Continue posting similar content to maintain this growth trend.'
        },
        {
          type: 'opportunity',
          title: 'Optimal Posting Time',
          description: 'Your audience is most active between 6-8PM, but you\'re posting mostly in the morning.',
          metric: 'timing',
          value: 0,
          recommendation: 'Try scheduling more posts for the evening hours to reach more of your audience.'
        },
        {
          type: 'negative',
          title: 'Declining Reach',
          description: 'Your reach has decreased by 8% compared to last month.',
          metric: 'reach',
          value: -8,
          recommendation: 'Experiment with more hashtags and engage with larger accounts to increase visibility.'
        }
      ]
    });
  }
  
  return analytics;
};

// Helper function to create aggregated analytics
const createAggregatedAnalytics = async (userId) => {
  // Get all platform analytics for today
  const platformAnalytics = await Analytics.find({
    user: userId,
    platform: { $ne: 'all' },
    date: { $gte: new Date().setHours(0, 0, 0, 0) }
  });
  
  if (platformAnalytics.length === 0) {
    return null;
  }
  
  // Aggregate metrics
  const aggregatedMetrics = {
    followers: {
      count: 0,
      change: 0,
      changePercentage: 0
    },
    engagement: {
      rate: 0,
      change: 0
    },
    impressions: {
      count: 0,
      change: 0
    },
    reach: {
      count: 0,
      change: 0
    },
    profileViews: {
      count: 0,
      change: 0
    },
    contentCount: {
      count: 0,
      change: 0
    }
  };
  
  // Sum up metrics
  platformAnalytics.forEach(analytics => {
    aggregatedMetrics.followers.count += analytics.metrics.followers.count;
    aggregatedMetrics.followers.change += analytics.metrics.followers.change;
    aggregatedMetrics.impressions.count += analytics.metrics.impressions.count;
    aggregatedMetrics.impressions.change += analytics.metrics.impressions.change;
    aggregatedMetrics.reach.count += analytics.metrics.reach.count;
    aggregatedMetrics.reach.change += analytics.metrics.reach.change;
    aggregatedMetrics.profileViews.count += analytics.metrics.profileViews.count;
    aggregatedMetrics.profileViews.change += analytics.metrics.profileViews.change;
    aggregatedMetrics.contentCount.count += analytics.metrics.contentCount.count;
    aggregatedMetrics.contentCount.change += analytics.metrics.contentCount.change;
  });
  
  // Calculate average engagement rate
  aggregatedMetrics.engagement.rate = platformAnalytics.reduce(
    (sum, analytics) => sum + analytics.metrics.engagement.rate,
    0
  ) / platformAnalytics.length;
  
  aggregatedMetrics.engagement.change = platformAnalytics.reduce(
    (sum, analytics) => sum + analytics.metrics.engagement.change,
    0
  ) / platformAnalytics.length;
  
  // Calculate change percentage
  const previousTotal = aggregatedMetrics.followers.count - aggregatedMetrics.followers.change;
  aggregatedMetrics.followers.changePercentage = previousTotal > 0 
    ? (aggregatedMetrics.followers.change / previousTotal) * 100
    : 0;
  
  // Get or create aggregated analytics
  let aggregatedAnalytics = await Analytics.findOne({
    user: userId,
    platform: 'all',
    date: { $gte: new Date().setHours(0, 0, 0, 0) }
  });
  
  if (!aggregatedAnalytics) {
    // Create new aggregated analytics
    aggregatedAnalytics = await Analytics.create({
      user: userId,
      platform: 'all',
      metrics: aggregatedMetrics,
      // Combine audience data and other fields as needed
      audienceData: platformAnalytics[0].audienceData, // Simplified for this example
      contentPerformance: platformAnalytics[0].contentPerformance, // Simplified for this example
      growthInsights: platformAnalytics.flatMap(a => a.growthInsights)
    });
  } else {
    // Update existing aggregated analytics
    aggregatedAnalytics.metrics = aggregatedMetrics;
    await aggregatedAnalytics.save();
  }
  
  return aggregatedAnalytics;
};

module.exports = {
  getAnalyticsOverview,
  getAudienceDemographics,
  getContentPerformance,
  getGrowthInsights,
  syncAnalyticsData
};
