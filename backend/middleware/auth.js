const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check if auth header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unisphere_secret_key');
      
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin only middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
});

// Check if user has connected the specified platform
const platformConnected = (platform) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized');
    }
    
    const connectedAccount = req.user.socialAccounts.find(
      account => account.platform === platform && account.isConnected
    );
    
    if (!connectedAccount) {
      res.status(403);
      throw new Error(`${platform} account not connected`);
    }
    
    req.platformAccount = connectedAccount;
    next();
  });
};

// Rate limiting middleware for specific routes
const rateLimiter = (limit, windowMs) => {
  const requestCounts = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean up old requests
    for (const [key, timestamp] of requestCounts.entries()) {
      if (timestamp < windowStart) {
        requestCounts.delete(key);
      }
    }
    
    // Count requests for this IP
    const requests = Array.from(requestCounts.entries())
      .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
      .length;
    
    if (requests >= limit) {
      res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later'
      });
      return;
    }
    
    // Add this request
    const requestId = `${ip}-${now}`;
    requestCounts.set(requestId, now);
    
    next();
  };
};

module.exports = { protect, admin, platformConnected, rateLimiter };
