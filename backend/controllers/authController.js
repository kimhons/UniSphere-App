const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  // Validate input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  
  // Check if user already exists
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  // Create user
  const user = await User.create({
    name,
    email,
    password
  });
  
  if (user) {
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }
  
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      token: generateToken(user._id)
    }
  });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      bio: user.bio,
      website: user.website,
      location: user.location,
      socialAccounts: user.socialAccounts,
      preferences: user.preferences,
      subscription: user.subscription,
      createdAt: user.createdAt
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, bio, website, location, profileImage, preferences } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (bio !== undefined) user.bio = bio;
  if (website !== undefined) user.website = website;
  if (location !== undefined) user.location = location;
  if (profileImage) user.profileImage = profileImage;
  if (preferences) {
    user.preferences = {
      ...user.preferences,
      ...preferences
    };
  }
  
  const updatedUser = await user.save();
  
  res.status(200).json({
    success: true,
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      bio: updatedUser.bio,
      website: updatedUser.website,
      location: updatedUser.location,
      preferences: updatedUser.preferences
    }
  });
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Please provide current and new password');
  }
  
  const user = await User.findById(req.user._id).select('+password');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Check if current password matches
  const isMatch = await user.matchPassword(currentPassword);
  
  if (!isMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }
  
  // Update password
  user.password = newPassword;
  await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Connect social media account
// @route   POST /api/auth/connect/:platform
// @access  Private
const connectSocialAccount = asyncHandler(async (req, res) => {
  const { platform } = req.params;
  const { username, accountId, accessToken, refreshToken, tokenExpiry } = req.body;
  
  // Validate platform
  const validPlatforms = ['instagram', 'tiktok', 'youtube', 'twitter', 'linkedin', 'facebook', 'pinterest'];
  
  if (!validPlatforms.includes(platform)) {
    res.status(400);
    throw new Error('Invalid platform');
  }
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Check if account already exists
  const existingAccountIndex = user.socialAccounts.findIndex(
    account => account.platform === platform
  );
  
  if (existingAccountIndex !== -1) {
    // Update existing account
    user.socialAccounts[existingAccountIndex] = {
      ...user.socialAccounts[existingAccountIndex],
      username,
      accountId,
      accessToken,
      refreshToken,
      tokenExpiry: tokenExpiry ? new Date(tokenExpiry) : undefined,
      isConnected: true,
      lastSynced: Date.now()
    };
  } else {
    // Add new account
    user.socialAccounts.push({
      platform,
      username,
      accountId,
      accessToken,
      refreshToken,
      tokenExpiry: tokenExpiry ? new Date(tokenExpiry) : undefined,
      isConnected: true,
      lastSynced: Date.now()
    });
  }
  
  await user.save();
  
  res.status(200).json({
    success: true,
    message: `${platform} account connected successfully`,
    account: {
      platform,
      username,
      isConnected: true
    }
  });
});

// @desc    Disconnect social media account
// @route   DELETE /api/auth/connect/:platform
// @access  Private
const disconnectSocialAccount = asyncHandler(async (req, res) => {
  const { platform } = req.params;
  
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  // Find account
  const accountIndex = user.socialAccounts.findIndex(
    account => account.platform === platform
  );
  
  if (accountIndex === -1) {
    res.status(404);
    throw new Error(`No connected ${platform} account found`);
  }
  
  // Mark as disconnected
  user.socialAccounts[accountIndex].isConnected = false;
  
  await user.save();
  
  res.status(200).json({
    success: true,
    message: `${platform} account disconnected successfully`
  });
});

// @desc    Get all connected social accounts
// @route   GET /api/auth/connect
// @access  Private
const getConnectedAccounts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const connectedAccounts = user.socialAccounts.map(account => ({
    platform: account.platform,
    username: account.username,
    isConnected: account.isConnected,
    followerCount: account.followerCount,
    lastSynced: account.lastSynced
  }));
  
  res.status(200).json({
    success: true,
    accounts: connectedAccounts
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'unisphere_secret_key', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  connectSocialAccount,
  disconnectSocialAccount,
  getConnectedAccounts
};
