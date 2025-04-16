# UniSphere App - Deployment Guide

## Overview

This guide provides detailed instructions for deploying the UniSphere app to production environments. It covers both the backend API server and the React Native mobile application.

## Prerequisites

Before deploying, ensure you have:

- GitHub account with access to the UniSphere-App repository
- Node.js (v14 or higher) installed on your deployment server
- MongoDB Atlas account or other MongoDB hosting solution
- Apple Developer account (for iOS deployment)
- Google Play Developer account (for Android deployment)
- AWS, Heroku, or other cloud hosting account for the backend

## Backend Deployment

### Option 1: Deploying to Heroku

1. **Create a Heroku account and install the Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create a new Heroku app**
   ```bash
   cd /path/to/unisphere/backend
   heroku create unisphere-api
   ```

3. **Add MongoDB add-on or configure external MongoDB**
   ```bash
   # Using Heroku MongoDB add-on
   heroku addons:create mongodb:sandbox
   
   # Or set environment variable for external MongoDB
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unisphere
   ```

4. **Configure environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your_secure_jwt_secret
   heroku config:set JWT_EXPIRE=30d
   heroku config:set OPENAI_API_KEY=your_openai_api_key
   ```

5. **Deploy the backend**
   ```bash
   git subtree push --prefix backend heroku master
   ```

6. **Verify deployment**
   ```bash
   heroku open
   ```

### Option 2: Deploying to AWS Elastic Beanstalk

1. **Install the AWS CLI and EB CLI**
   ```bash
   pip install awscli
   pip install awsebcli
   ```

2. **Configure AWS credentials**
   ```bash
   aws configure
   ```

3. **Initialize Elastic Beanstalk application**
   ```bash
   cd /path/to/unisphere/backend
   eb init
   ```

4. **Create an environment**
   ```bash
   eb create unisphere-api-prod
   ```

5. **Configure environment variables**
   ```bash
   eb setenv NODE_ENV=production MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unisphere JWT_SECRET=your_secure_jwt_secret JWT_EXPIRE=30d OPENAI_API_KEY=your_openai_api_key
   ```

6. **Deploy the application**
   ```bash
   eb deploy
   ```

### Option 3: Using Docker

1. **Build the Docker image**
   ```bash
   cd /path/to/unisphere
   docker build -t unisphere-api ./backend
   ```

2. **Run the container**
   ```bash
   docker run -p 5000:5000 \
     -e NODE_ENV=production \
     -e MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unisphere \
     -e JWT_SECRET=your_secure_jwt_secret \
     -e JWT_EXPIRE=30d \
     -e OPENAI_API_KEY=your_openai_api_key \
     unisphere-api
   ```

3. **For Docker Compose deployment**
   ```bash
   docker-compose up -d
   ```

## Mobile App Deployment

### Building the React Native App

1. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

2. **Configure app.json**
   Update the `app.json` file in the `frontend/unisphere-app` directory with your app's information:
   ```json
   {
     "expo": {
       "name": "UniSphere",
       "slug": "unisphere",
       "version": "1.0.0",
       "orientation": "portrait",
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#ffffff"
       },
       "updates": {
         "fallbackToCacheTimeout": 0
       },
       "assetBundlePatterns": [
         "**/*"
       ],
       "ios": {
         "supportsTablet": true,
         "bundleIdentifier": "com.yourcompany.unisphere"
       },
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#FFFFFF"
         },
         "package": "com.yourcompany.unisphere"
       },
       "web": {
         "favicon": "./assets/favicon.png"
       }
     }
   }
   ```

3. **Configure API endpoint**
   Create a `.env` file in the `frontend/unisphere-app` directory:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

4. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

5. **Log in to Expo**
   ```bash
   eas login
   ```

### iOS Deployment

1. **Configure app for iOS**
   ```bash
   cd /path/to/unisphere/frontend/unisphere-app
   eas build:configure
   ```

2. **Update eas.json**
   ```json
   {
     "build": {
       "production": {
         "ios": {
           "distributionType": "app-store"
         }
       }
     },
     "submit": {
       "production": {
         "ios": {
           "appleId": "your-apple-id@example.com",
           "ascAppId": "your-app-store-connect-app-id",
           "appleTeamId": "your-apple-team-id"
         }
       }
     }
   }
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios --profile production
   ```

4. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### Android Deployment

1. **Generate upload keystore**
   ```bash
   cd /path/to/unisphere/frontend/unisphere-app
   eas build:configure
   ```

2. **Update eas.json for Android**
   ```json
   {
     "build": {
       "production": {
         "android": {
           "buildType": "app-bundle"
         }
       }
     },
     "submit": {
       "production": {
         "android": {
           "serviceAccountKeyPath": "./path/to/service-account.json",
           "track": "production"
         }
       }
     }
   }
   ```

3. **Build for Android**
   ```bash
   eas build --platform android --profile production
   ```

4. **Submit to Google Play**
   ```bash
   eas submit --platform android
   ```

## Continuous Integration/Continuous Deployment

### Setting up GitHub Actions

1. **Create a workflow file**
   Create a file at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [ main ]

   jobs:
     deploy-backend:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'
         - name: Install dependencies
           run: cd backend && npm install
         - name: Deploy to Heroku
           uses: akhileshns/heroku-deploy@v3.12.12
           with:
             heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
             heroku_app_name: "unisphere-api"
             heroku_email: ${{ secrets.HEROKU_EMAIL }}
             appdir: "backend"

     build-mobile-app:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'
         - name: Setup Expo
           uses: expo/expo-github-action@v7
           with:
             expo-version: 5.x
             token: ${{ secrets.EXPO_TOKEN }}
         - name: Install dependencies
           run: cd frontend/unisphere-app && npm install
         - name: Build app
           run: cd frontend/unisphere-app && expo build:ios --non-interactive
   ```

2. **Configure secrets in GitHub repository**
   - Go to your repository settings
   - Navigate to Secrets
   - Add the following secrets:
     - `HEROKU_API_KEY`
     - `HEROKU_EMAIL`
     - `EXPO_TOKEN`

## Post-Deployment Tasks

### Database Setup

1. **Create indexes for performance**
   ```javascript
   // Connect to your MongoDB instance and run:
   db.users.createIndex({ email: 1 }, { unique: true });
   db.content.createIndex({ user: 1, status: 1 });
   db.analytics.createIndex({ user: 1, platform: 1, date: 1 });
   ```

### Monitoring Setup

1. **Set up application monitoring**
   - Create a Sentry.io account
   - Add Sentry SDK to both backend and frontend
   - Configure error reporting

2. **Set up performance monitoring**
   - Implement New Relic or similar service
   - Configure API endpoint monitoring
   - Set up alerts for performance issues

### Security Checks

1. **Run security audit**
   ```bash
   npm audit --production
   ```

2. **Configure security headers**
   Ensure your backend has proper security headers:
   ```javascript
   app.use(helmet());
   ```

3. **Set up SSL/TLS**
   Ensure your API is served over HTTPS.

## Troubleshooting

### Common Deployment Issues

1. **MongoDB Connection Issues**
   - Check network access settings in MongoDB Atlas
   - Verify connection string is correct
   - Ensure IP whitelist includes your server

2. **API Connection Issues**
   - Verify API URL in frontend configuration
   - Check CORS settings in backend
   - Test API endpoints with Postman

3. **Mobile App Build Failures**
   - Check Expo build logs
   - Verify app.json configuration
   - Ensure all native dependencies are compatible

## Maintenance

### Regular Maintenance Tasks

1. **Database backups**
   Set up automated backups for MongoDB:
   ```bash
   mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/unisphere" --out=/backup/$(date +%Y-%m-%d)
   ```

2. **Dependency updates**
   Regularly update dependencies:
   ```bash
   npm outdated
   npm update
   ```

3. **Performance monitoring**
   Regularly check API response times and database query performance.

## Scaling

### Scaling Strategies

1. **Horizontal scaling**
   - Deploy multiple instances of the API
   - Set up load balancing

2. **Database scaling**
   - Implement MongoDB sharding
   - Set up read replicas

3. **Caching**
   - Implement Redis for caching
   - Cache frequently accessed data

## Rollback Procedures

In case of deployment issues:

1. **Backend rollback**
   ```bash
   # For Heroku
   heroku rollback
   
   # For AWS Elastic Beanstalk
   eb rollback
   ```

2. **Mobile app rollback**
   - Revert to previous version in App Store Connect
   - Revert to previous version in Google Play Console

## Contact Information

For deployment assistance, contact:
- Technical support: support@unisphere.com
- DevOps team: devops@unisphere.com
