const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAnalyticsOverview,
  getAudienceDemographics,
  getContentPerformance,
  getGrowthInsights,
  syncAnalyticsData
} = require('../controllers/analyticsController');

// Protected routes
router.use(protect);

// Analytics routes
router.get('/overview', getAnalyticsOverview);
router.get('/audience', getAudienceDemographics);
router.get('/content', getContentPerformance);
router.get('/insights', getGrowthInsights);
router.post('/sync', syncAnalyticsData);

module.exports = router;
