const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  connectSocialAccount,
  disconnectSocialAccount,
  getConnectedAccounts
} = require('../controllers/authController');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateUserProfile);
router.put('/password', protect, changePassword);

// Social account routes
router.post('/connect/:platform', protect, connectSocialAccount);
router.delete('/connect/:platform', protect, disconnectSocialAccount);
router.get('/connect', protect, getConnectedAccounts);

module.exports = router;
