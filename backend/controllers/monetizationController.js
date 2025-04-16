const asyncHandler = require('express-async-handler');
const Monetization = require('../models/Monetization');
const User = require('../models/User');

// @desc    Get monetization overview
// @route   GET /api/monetization/overview
// @access  Private
const getMonetizationOverview = asyncHandler(async (req, res) => {
  // Get or create monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  // Update revenue summary
  monetization.updateRevenueSummary();
  await monetization.save();
  
  res.status(200).json({
    success: true,
    data: {
      revenueSummary: monetization.revenueSummary,
      lastUpdated: monetization.lastUpdated
    }
  });
});

// @desc    Get products
// @route   GET /api/monetization/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  res.status(200).json({
    success: true,
    count: monetization.products.length,
    data: monetization.products
  });
});

// @desc    Create product
// @route   POST /api/monetization/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, type, imageUrl, downloadUrl } = req.body;
  
  // Validate input
  if (!name || !description || !price || !type) {
    res.status(400);
    throw new Error('Please provide name, description, price, and type');
  }
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  // Add product
  monetization.products.push({
    name,
    description,
    price,
    type,
    imageUrl,
    downloadUrl,
    isActive: true,
    sales: 0,
    revenue: 0,
    createdAt: Date.now()
  });
  
  await monetization.save();
  
  res.status(201).json({
    success: true,
    data: monetization.products[monetization.products.length - 1]
  });
});

// @desc    Update product
// @route   PUT /api/monetization/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, type, imageUrl, downloadUrl, isActive } = req.body;
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find product
  const productIndex = monetization.products.findIndex(
    product => product._id.toString() === req.params.id
  );
  
  if (productIndex === -1) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Update product fields
  if (name) monetization.products[productIndex].name = name;
  if (description) monetization.products[productIndex].description = description;
  if (price) monetization.products[productIndex].price = price;
  if (type) monetization.products[productIndex].type = type;
  if (imageUrl !== undefined) monetization.products[productIndex].imageUrl = imageUrl;
  if (downloadUrl !== undefined) monetization.products[productIndex].downloadUrl = downloadUrl;
  if (isActive !== undefined) monetization.products[productIndex].isActive = isActive;
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    data: monetization.products[productIndex]
  });
});

// @desc    Delete product
// @route   DELETE /api/monetization/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find product
  const productIndex = monetization.products.findIndex(
    product => product._id.toString() === req.params.id
  );
  
  if (productIndex === -1) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Remove product
  monetization.products.splice(productIndex, 1);
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// @desc    Get affiliate links
// @route   GET /api/monetization/affiliate
// @access  Private
const getAffiliateLinks = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  res.status(200).json({
    success: true,
    count: monetization.affiliateLinks.length,
    data: monetization.affiliateLinks
  });
});

// @desc    Create affiliate link
// @route   POST /api/monetization/affiliate
// @access  Private
const createAffiliateLink = asyncHandler(async (req, res) => {
  const { name, platform, url, trackingCode, commission } = req.body;
  
  // Validate input
  if (!name || !platform || !url) {
    res.status(400);
    throw new Error('Please provide name, platform, and url');
  }
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  // Add affiliate link
  monetization.affiliateLinks.push({
    name,
    platform,
    url,
    trackingCode,
    commission: commission || 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    isActive: true,
    createdAt: Date.now()
  });
  
  await monetization.save();
  
  res.status(201).json({
    success: true,
    data: monetization.affiliateLinks[monetization.affiliateLinks.length - 1]
  });
});

// @desc    Update affiliate link
// @route   PUT /api/monetization/affiliate/:id
// @access  Private
const updateAffiliateLink = asyncHandler(async (req, res) => {
  const { name, platform, url, trackingCode, commission, isActive } = req.body;
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find affiliate link
  const linkIndex = monetization.affiliateLinks.findIndex(
    link => link._id.toString() === req.params.id
  );
  
  if (linkIndex === -1) {
    res.status(404);
    throw new Error('Affiliate link not found');
  }
  
  // Update affiliate link fields
  if (name) monetization.affiliateLinks[linkIndex].name = name;
  if (platform) monetization.affiliateLinks[linkIndex].platform = platform;
  if (url) monetization.affiliateLinks[linkIndex].url = url;
  if (trackingCode !== undefined) monetization.affiliateLinks[linkIndex].trackingCode = trackingCode;
  if (commission !== undefined) monetization.affiliateLinks[linkIndex].commission = commission;
  if (isActive !== undefined) monetization.affiliateLinks[linkIndex].isActive = isActive;
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    data: monetization.affiliateLinks[linkIndex]
  });
});

// @desc    Delete affiliate link
// @route   DELETE /api/monetization/affiliate/:id
// @access  Private
const deleteAffiliateLink = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find affiliate link
  const linkIndex = monetization.affiliateLinks.findIndex(
    link => link._id.toString() === req.params.id
  );
  
  if (linkIndex === -1) {
    res.status(404);
    throw new Error('Affiliate link not found');
  }
  
  // Remove affiliate link
  monetization.affiliateLinks.splice(linkIndex, 1);
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    message: 'Affiliate link deleted successfully'
  });
});

// @desc    Get sponsorships
// @route   GET /api/monetization/sponsorships
// @access  Private
const getSponsorships = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  res.status(200).json({
    success: true,
    count: monetization.sponsorships.length,
    data: monetization.sponsorships
  });
});

// @desc    Create sponsorship
// @route   POST /api/monetization/sponsorships
// @access  Private
const createSponsorship = asyncHandler(async (req, res) => {
  const { name, brand, description, startDate, endDate, value, status, deliverables, notes } = req.body;
  
  // Validate input
  if (!name || !brand || !value) {
    res.status(400);
    throw new Error('Please provide name, brand, and value');
  }
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  // Add sponsorship
  monetization.sponsorships.push({
    name,
    brand,
    description,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    value,
    status: status || 'negotiating',
    deliverables: deliverables || [],
    notes,
    createdAt: Date.now()
  });
  
  await monetization.save();
  
  res.status(201).json({
    success: true,
    data: monetization.sponsorships[monetization.sponsorships.length - 1]
  });
});

// @desc    Update sponsorship
// @route   PUT /api/monetization/sponsorships/:id
// @access  Private
const updateSponsorship = asyncHandler(async (req, res) => {
  const { name, brand, description, startDate, endDate, value, status, deliverables, notes } = req.body;
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find sponsorship
  const sponsorshipIndex = monetization.sponsorships.findIndex(
    sponsorship => sponsorship._id.toString() === req.params.id
  );
  
  if (sponsorshipIndex === -1) {
    res.status(404);
    throw new Error('Sponsorship not found');
  }
  
  // Update sponsorship fields
  if (name) monetization.sponsorships[sponsorshipIndex].name = name;
  if (brand) monetization.sponsorships[sponsorshipIndex].brand = brand;
  if (description !== undefined) monetization.sponsorships[sponsorshipIndex].description = description;
  if (startDate) monetization.sponsorships[sponsorshipIndex].startDate = new Date(startDate);
  if (endDate) monetization.sponsorships[sponsorshipIndex].endDate = new Date(endDate);
  if (value) monetization.sponsorships[sponsorshipIndex].value = value;
  if (status) monetization.sponsorships[sponsorshipIndex].status = status;
  if (deliverables) monetization.sponsorships[sponsorshipIndex].deliverables = deliverables;
  if (notes !== undefined) monetization.sponsorships[sponsorshipIndex].notes = notes;
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    data: monetization.sponsorships[sponsorshipIndex]
  });
});

// @desc    Delete sponsorship
// @route   DELETE /api/monetization/sponsorships/:id
// @access  Private
const deleteSponsorship = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    res.status(404);
    throw new Error('Monetization data not found');
  }
  
  // Find sponsorship
  const sponsorshipIndex = monetization.sponsorships.findIndex(
    sponsorship => sponsorship._id.toString() === req.params.id
  );
  
  if (sponsorshipIndex === -1) {
    res.status(404);
    throw new Error('Sponsorship not found');
  }
  
  // Remove sponsorship
  monetization.sponsorships.splice(sponsorshipIndex, 1);
  
  await monetization.save();
  
  res.status(200).json({
    success: true,
    message: 'Sponsorship deleted successfully'
  });
});

// @desc    Get transactions
// @route   GET /api/monetization/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  res.status(200).json({
    success: true,
    count: monetization.transactions.length,
    data: monetization.transactions
  });
});

// @desc    Add transaction
// @route   POST /api/monetization/transactions
// @access  Private
const addTransaction = asyncHandler(async (req, res) => {
  const { source, sourceId, amount, platform, status, paymentMethod, customerEmail, notes } = req.body;
  
  // Validate input
  if (!source || !amount) {
    res.status(400);
    throw new Error('Please provide source and amount');
  }
  
  // Get monetization data for user
  let monetization = await Monetization.findOne({ user: req.user._id });
  
  if (!monetization) {
    monetization = await Monetization.create({
      user: req.user._id
    });
  }
  
  // Add transaction
  monetization.transactions.push({
    source,
    sourceId,
    amount,
    platform,
    date: Date.now(),
    status: status || 'completed',
    paymentMethod,
    customerEmail,
    notes
  });
  
  // Update revenue summary
  monetization.updateRevenueSummary();
  
  await monetization.save();
  
  res.status(201).json({
    success: true,
    data: monetization.transactions[monetization.transactions.length - 1]
  });
});

module.exports = {
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
};
