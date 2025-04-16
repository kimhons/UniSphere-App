const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getGrowthOverview,
  getGrowthStrategies,
  createGrowthStrategy,
  updateGrowthStrategy,
  deleteGrowthStrategy,
  getCollaborations,
  createCollaboration,
  updateCollaboration,
  deleteCollaboration,
  getTrendingTopics,
  createTrendingTopic,
  updateTrendingTopic,
  deleteTrendingTopic,
  getHashtagCollections,
  createHashtagCollection,
  updateHashtagCollection,
  deleteHashtagCollection,
  generateAIRecommendations
} = require('../controllers/growthController');

// Protected routes
router.use(protect);

// Growth overview
router.get('/overview', getGrowthOverview);

// Growth strategies routes
router.route('/strategies')
  .get(getGrowthStrategies)
  .post(createGrowthStrategy);

router.route('/strategies/:id')
  .put(updateGrowthStrategy)
  .delete(deleteGrowthStrategy);

// Collaborations routes
router.route('/collaborations')
  .get(getCollaborations)
  .post(createCollaboration);

router.route('/collaborations/:id')
  .put(updateCollaboration)
  .delete(deleteCollaboration);

// Trending topics routes
router.route('/trends')
  .get(getTrendingTopics)
  .post(createTrendingTopic);

router.route('/trends/:id')
  .put(updateTrendingTopic)
  .delete(deleteTrendingTopic);

// Hashtag collections routes
router.route('/hashtags')
  .get(getHashtagCollections)
  .post(createHashtagCollection);

router.route('/hashtags/:id')
  .put(updateHashtagCollection)
  .delete(deleteHashtagCollection);

// AI recommendations
router.post('/generate-recommendations', generateAIRecommendations);

module.exports = router;
