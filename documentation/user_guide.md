# UniSphere App Documentation

## Overview

UniSphere is an all-in-one platform for influencers to manage multiple social media accounts, analyze performance, create content, and monetize their reach. This comprehensive solution addresses the challenges faced by content creators who need to maintain a presence across various platforms while optimizing their content strategy and maximizing revenue opportunities.

## Features

### Cross-Platform Management
- Connect and manage multiple social media accounts (Instagram, TikTok, YouTube, Twitter, LinkedIn, Facebook, Pinterest)
- Single dashboard view of all connected platforms
- Unified content publishing and scheduling
- Cross-platform analytics in one place

### Content Creation Studio
- Create and edit content for multiple platforms
- AI-powered caption and hashtag generation
- Content templates and formatting tools
- Media library for asset management
- Platform-specific content optimization

### Analytics Dashboard
- Comprehensive performance metrics across all platforms
- Audience demographics and engagement analysis
- Content performance tracking and comparison
- Growth trends and historical data visualization
- Custom reporting and data export

### Monetization Center
- Product creation and management for digital/physical goods
- Affiliate link tracking and performance metrics
- Sponsorship management and tracking
- Revenue analytics and forecasting
- Payment processing integration

### Growth Accelerator
- AI-powered growth strategy recommendations
- Collaboration opportunities with similar creators
- Trending topics and hashtag collections
- Performance benchmarking against industry standards
- Audience growth tracking and goal setting

## Technical Architecture

### Frontend
- React Native mobile application
- Component-based architecture for reusability
- Responsive design for both mobile and tablet
- Offline capabilities for content creation
- Real-time updates and notifications

### Backend
- Node.js with Express server
- MongoDB database for flexible data storage
- RESTful API architecture
- JWT authentication and security
- Social media API integrations

### AI Integration
- Content generation capabilities
- Performance analysis and insights
- Growth strategy recommendations
- Audience analysis and targeting
- Monetization opportunity identification

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager
- Git

### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/kimhons/UniSphere-App.git
   cd UniSphere-App
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/unisphere
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ../frontend/unisphere-app
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm start
   ```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile
- `PUT /api/auth/password` - Change password
- `POST /api/auth/connect/:platform` - Connect social media account
- `DELETE /api/auth/connect/:platform` - Disconnect social media account
- `GET /api/auth/connect` - Get all connected accounts

### Content Endpoints
- `GET /api/content` - Get all content for user
- `POST /api/content` - Create new content
- `GET /api/content/:id` - Get content by ID
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content
- `POST /api/content/:id/publish` - Publish content immediately
- `POST /api/content/generate` - Generate content with AI

### Analytics Endpoints
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/audience` - Get audience demographics
- `GET /api/analytics/content` - Get content performance
- `GET /api/analytics/insights` - Get growth insights
- `POST /api/analytics/sync` - Sync analytics data from social platforms

### Monetization Endpoints
- `GET /api/monetization/overview` - Get monetization overview
- `GET /api/monetization/products` - Get products
- `POST /api/monetization/products` - Create product
- `PUT /api/monetization/products/:id` - Update product
- `DELETE /api/monetization/products/:id` - Delete product
- `GET /api/monetization/affiliate` - Get affiliate links
- `POST /api/monetization/affiliate` - Create affiliate link
- `PUT /api/monetization/affiliate/:id` - Update affiliate link
- `DELETE /api/monetization/affiliate/:id` - Delete affiliate link
- `GET /api/monetization/sponsorships` - Get sponsorships
- `POST /api/monetization/sponsorships` - Create sponsorship
- `PUT /api/monetization/sponsorships/:id` - Update sponsorship
- `DELETE /api/monetization/sponsorships/:id` - Delete sponsorship
- `GET /api/monetization/transactions` - Get transactions
- `POST /api/monetization/transactions` - Add transaction

### Growth Endpoints
- `GET /api/growth/overview` - Get growth overview
- `GET /api/growth/strategies` - Get growth strategies
- `POST /api/growth/strategies` - Create growth strategy
- `PUT /api/growth/strategies/:id` - Update growth strategy
- `DELETE /api/growth/strategies/:id` - Delete growth strategy
- `GET /api/growth/collaborations` - Get collaborations
- `POST /api/growth/collaborations` - Create collaboration
- `PUT /api/growth/collaborations/:id` - Update collaboration
- `DELETE /api/growth/collaborations/:id` - Delete collaboration
- `GET /api/growth/trends` - Get trending topics
- `POST /api/growth/trends` - Create trending topic
- `PUT /api/growth/trends/:id` - Update trending topic
- `DELETE /api/growth/trends/:id` - Delete trending topic
- `GET /api/growth/hashtags` - Get hashtag collections
- `POST /api/growth/hashtags` - Create hashtag collection
- `PUT /api/growth/hashtags/:id` - Update hashtag collection
- `DELETE /api/growth/hashtags/:id` - Delete hashtag collection
- `POST /api/growth/generate-recommendations` - Generate AI recommendations

## Deployment Guide

### Backend Deployment
1. Set up a MongoDB Atlas cluster or other MongoDB hosting solution
2. Update the `.env` file with production database URI
3. Build the backend for production:
   ```
   npm run build
   ```
4. Deploy using a service like Heroku, AWS, or DigitalOcean:
   ```
   # Example for Heroku
   heroku create
   git push heroku master
   ```

### Frontend Deployment
1. Build the frontend for production:
   ```
   cd frontend/unisphere-app
   npm run build
   ```
2. Deploy the build folder to a static hosting service like Netlify, Vercel, or AWS S3

### Docker Deployment
1. Build the Docker images:
   ```
   docker-compose build
   ```
2. Run the containers:
   ```
   docker-compose up -d
   ```

## User Guide

### Getting Started
1. Create an account or log in
2. Connect your social media accounts
3. Explore the dashboard to view your cross-platform analytics
4. Create your first content piece in the Content Studio
5. Set up your monetization options

### Content Creation
1. Navigate to the Content Creation screen
2. Select platforms for your content
3. Upload media or create new content
4. Use AI to generate captions and hashtags
5. Schedule or publish immediately

### Analytics
1. View your performance metrics across all platforms
2. Analyze audience demographics and engagement
3. Track content performance and identify trends
4. Generate custom reports for specific time periods

### Monetization
1. Set up products to sell to your audience
2. Create and track affiliate links
3. Manage sponsorship deals and partnerships
4. Monitor revenue streams and transaction history

### Growth
1. Implement recommended growth strategies
2. Connect with potential collaborators
3. Create content around trending topics
4. Use optimized hashtag collections for better reach

## Troubleshooting

### Common Issues
- **Connection failures**: Ensure your social media tokens are valid and not expired
- **Content publishing errors**: Verify platform-specific requirements are met
- **Analytics discrepancies**: Sync data manually if automatic sync fails
- **Performance issues**: Clear cache and restart the application

### Support
For additional support, please contact support@unisphere.com or visit our help center at help.unisphere.com.

## Contributing
We welcome contributions to the UniSphere platform! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
UniSphere is licensed under the MIT License. See LICENSE file for details.
