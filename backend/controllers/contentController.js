const asyncHandler = require('express-async-handler');
const Content = require('../models/Content');
const User = require('../models/User');
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-development'
});

// @desc    Create new content
// @route   POST /api/content
// @access  Private
const createContent = asyncHandler(async (req, res) => {
  const { title, contentType, caption, hashtags, mediaUrls, platforms, scheduledFor } = req.body;
  
  // Validate input
  if (!title || !contentType || !platforms || platforms.length === 0) {
    res.status(400);
    throw new Error('Please provide title, content type, and at least one platform');
  }
  
  // Create content
  const content = await Content.create({
    user: req.user._id,
    title,
    contentType,
    caption,
    hashtags,
    mediaUrls,
    platforms,
    scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
    status: scheduledFor ? 'scheduled' : 'draft',
    platformData: platforms.map(platform => ({
      platform,
      status: 'pending'
    }))
  });
  
  if (content) {
    res.status(201).json({
      success: true,
      content
    });
  } else {
    res.status(400);
    throw new Error('Invalid content data');
  }
});

// @desc    Get all content for user
// @route   GET /api/content
// @access  Private
const getAllContent = asyncHandler(async (req, res) => {
  const { status, platform, contentType, page = 1, limit = 10 } = req.query;
  
  // Build query
  const query = { user: req.user._id };
  
  if (status) {
    query.status = status;
  }
  
  if (platform) {
    query.platforms = platform;
  }
  
  if (contentType) {
    query.contentType = contentType;
  }
  
  // Pagination
  const skip = (page - 1) * limit;
  
  // Get content
  const content = await Content.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  
  // Get total count
  const total = await Content.countDocuments(query);
  
  res.status(200).json({
    success: true,
    count: content.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    content
  });
});

// @desc    Get content by ID
// @route   GET /api/content/:id
// @access  Private
const getContentById = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  
  if (!content) {
    res.status(404);
    throw new Error('Content not found');
  }
  
  // Check if content belongs to user
  if (content.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to access this content');
  }
  
  res.status(200).json({
    success: true,
    content
  });
});

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private
const updateContent = asyncHandler(async (req, res) => {
  const { title, contentType, caption, hashtags, mediaUrls, platforms, scheduledFor, status } = req.body;
  
  let content = await Content.findById(req.params.id);
  
  if (!content) {
    res.status(404);
    throw new Error('Content not found');
  }
  
  // Check if content belongs to user
  if (content.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this content');
  }
  
  // Update fields
  if (title) content.title = title;
  if (contentType) content.contentType = contentType;
  if (caption !== undefined) content.caption = caption;
  if (hashtags) content.hashtags = hashtags;
  if (mediaUrls) content.mediaUrls = mediaUrls;
  
  // Update platforms if changed
  if (platforms && platforms.length > 0) {
    // Get new platforms that weren't in the original list
    const newPlatforms = platforms.filter(p => !content.platforms.includes(p));
    
    // Update platforms list
    content.platforms = platforms;
    
    // Add platform data for new platforms
    newPlatforms.forEach(platform => {
      if (!content.platformData.find(p => p.platform === platform)) {
        content.platformData.push({
          platform,
          status: 'pending'
        });
      }
    });
    
    // Remove platform data for removed platforms
    content.platformData = content.platformData.filter(
      p => platforms.includes(p.platform)
    );
  }
  
  // Update scheduling
  if (scheduledFor) {
    content.scheduledFor = new Date(scheduledFor);
    if (content.status === 'draft') {
      content.status = 'scheduled';
    }
  }
  
  // Update status if provided
  if (status) {
    content.status = status;
  }
  
  // Save updated content
  content = await content.save();
  
  res.status(200).json({
    success: true,
    content
  });
});

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private
const deleteContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  
  if (!content) {
    res.status(404);
    throw new Error('Content not found');
  }
  
  // Check if content belongs to user
  if (content.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this content');
  }
  
  await content.remove();
  
  res.status(200).json({
    success: true,
    message: 'Content deleted successfully'
  });
});

// @desc    Publish content immediately
// @route   POST /api/content/:id/publish
// @access  Private
const publishContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  
  if (!content) {
    res.status(404);
    throw new Error('Content not found');
  }
  
  // Check if content belongs to user
  if (content.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to publish this content');
  }
  
  // Check if content is already published
  if (content.status === 'published') {
    res.status(400);
    throw new Error('Content is already published');
  }
  
  // Update status
  content.status = 'published';
  content.scheduledFor = null;
  
  // In a real app, this would call the social media APIs to publish the content
  // For now, we'll just simulate successful publishing
  content.platformData.forEach(platform => {
    platform.status = 'published';
    platform.publishedAt = Date.now();
    platform.postId = `mock-post-id-${Date.now()}`;
    platform.postUrl = `https://example.com/${platform.platform}/post/${platform.postId}`;
  });
  
  await content.save();
  
  res.status(200).json({
    success: true,
    message: 'Content published successfully',
    content
  });
});

// @desc    Generate content with AI
// @route   POST /api/content/generate
// @access  Private
const generateContentWithAI = asyncHandler(async (req, res) => {
  const { prompt, platforms, contentType } = req.body;
  
  if (!prompt || !platforms || !contentType) {
    res.status(400);
    throw new Error('Please provide prompt, platforms, and content type');
  }
  
  try {
    // In a real app, this would use the OpenAI API to generate content
    // For now, we'll simulate AI-generated content
    let generatedCaption = '';
    let generatedHashtags = [];
    
    // Simulate OpenAI API call
    if (process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a social media content creator assistant. Generate engaging content for ${platforms.join(', ')} based on the user's prompt.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500
      });
      
      generatedCaption = completion.choices[0].message.content;
      
      // Generate hashtags
      const hashtagCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Generate 5-7 relevant hashtags for the following social media post. Return only the hashtags as a comma-separated list without explanation."
          },
          {
            role: "user",
            content: generatedCaption
          }
        ],
        max_tokens: 100
      });
      
      generatedHashtags = hashtagCompletion.choices[0].message.content
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.substring(1));
    } else {
      // Fallback for development without API key
      generatedCaption = `AI-generated content based on: "${prompt}"\n\nThis is a placeholder for AI-generated content. In production, this would be generated using OpenAI's API based on your prompt.`;
      generatedHashtags = ['content', 'socialmedia', 'ai', 'generated', 'unisphere'];
    }
    
    // Create content draft
    const content = await Content.create({
      user: req.user._id,
      title: `AI Generated: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`,
      contentType,
      caption: generatedCaption,
      hashtags: generatedHashtags,
      platforms,
      status: 'draft',
      aiGenerated: true,
      aiPrompt: prompt,
      aiModel: 'gpt-3.5-turbo',
      platformData: platforms.map(platform => ({
        platform,
        status: 'pending'
      }))
    });
    
    res.status(201).json({
      success: true,
      content
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500);
    throw new Error('Error generating content with AI: ' + error.message);
  }
});

module.exports = {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  publishContent,
  generateContentWithAI
};
