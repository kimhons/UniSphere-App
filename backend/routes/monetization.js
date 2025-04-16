const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMonetizationOverview,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAffiliateLinks,
  createAffiliateLink,
  updateAffiliateLink,
  deleteAffiliateLink,
  getSponsorships,
  createSponsorship,
  updateSponsorship,
  deleteSponsorship,
  getTransactions,
  addTransaction
} = require('../controllers/monetizationController');

// Protected routes
router.use(protect);

// Monetization overview
router.get('/overview', getMonetizationOverview);

// Products routes
router.route('/products')
  .get(getProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

// Affiliate links routes
router.route('/affiliate')
  .get(getAffiliateLinks)
  .post(createAffiliateLink);

router.route('/affiliate/:id')
  .put(updateAffiliateLink)
  .delete(deleteAffiliateLink);

// Sponsorships routes
router.route('/sponsorships')
  .get(getSponsorships)
  .post(createSponsorship);

router.route('/sponsorships/:id')
  .put(updateSponsorship)
  .delete(deleteSponsorship);

// Transactions routes
router.route('/transactions')
  .get(getTransactions)
  .post(addTransaction);

module.exports = router;
