# UniSphere App - Developer Documentation Update

## New Features Technical Implementation

This document provides technical details for developers working on the UniSphere app, focusing on the newly implemented features based on our competitor analysis and user requirements.

## 1. Brand Marketplace Implementation

### Component Structure

The Brand Marketplace feature is implemented with the following components:

- `BrandMarketplace.js`: Main screen component
- `components/marketplace/FilterModal.js`: Filter UI for marketplace
- `components/marketplace/CreatorCard.js`: Card component for displaying creator profiles
- `components/marketplace/BrandPortalHeader.js`: Header component for the marketplace

### API Endpoints

The Brand Marketplace interacts with these backend endpoints:

```javascript
// Get verified creators
API.marketplace.getVerifiedCreators()

// Get creator details
API.marketplace.getCreatorProfile(creatorId)

// Apply filters to creator search
API.marketplace.filterCreators(filterParams)

// Submit application to brand
API.marketplace.applyToBrand(brandId, applicationData)
```

### State Management

The marketplace uses React's useState and useEffect hooks to manage:
- Creator listing data
- Search queries
- Filter states
- Pagination

### Implementation Notes

- Creator verification badges are displayed based on the `verificationLevel` property
- Engagement rates are calculated on the backend and provided as a pre-computed value
- The filter system supports multiple selection for platforms and categories

## 2. Content Rights Management Implementation

### Component Structure

The Content Rights Management feature consists of:

- `ContentRightsManagement.js`: Main screen component
- `components/rights/ContentRightsCard.js`: Card component for displaying license information
- `components/rights/LicenseTemplateModal.js`: Modal for creating license templates

### API Endpoints

The Content Rights Management feature uses these endpoints:

```javascript
// Get content rights
API.rights.getContentRights(status)

// Create license template
API.rights.createLicenseTemplate(templateData)

// Update license
API.rights.updateLicense(licenseId, licenseData)

// Monitor content usage
API.rights.getContentUsage(contentId)
```

### Database Schema

Content rights are stored with the following schema:

```javascript
{
  id: String,
  title: String,
  brand: String,
  contentType: String,
  platforms: Array<String>,
  startDate: Date,
  endDate: Date,
  status: String, // 'active', 'pending', 'expired'
  usageRights: String,
  thumbnail: String,
  contentId: String,
  creatorId: String,
  brandId: String,
  terms: Object,
  compensation: Object
}
```

### Implementation Notes

- Rights status is automatically updated based on date ranges
- The system supports different license types with customizable terms
- Usage tracking is implemented through content fingerprinting

## 3. eCommerce Integration Implementation

### Component Structure

The eCommerce Integration feature includes:

- `ECommerceIntegration.js`: Main screen component
- `components/ecommerce/ShopifyConnectModal.js`: Modal for Shopify authentication
- `components/ecommerce/ProductCard.js`: Card component for displaying products
- `components/ecommerce/SalesMetricsCard.js`: Card for displaying sales metrics

### API Endpoints

The eCommerce Integration uses these endpoints:

```javascript
// Check Shopify connection status
API.ecommerce.getShopifyStatus()

// Connect to Shopify
API.ecommerce.connectShopify(credentials)

// Get products from Shopify
API.ecommerce.getProducts()

// Get sales metrics
API.ecommerce.getSalesMetrics()
```

### Shopify API Integration

The integration uses Shopify's Admin API with the following scopes:
- `read_products`
- `read_orders`
- `read_customers`
- `read_analytics`

### Implementation Notes

- OAuth 2.0 is used for Shopify authentication
- Product data is cached locally and refreshed periodically
- Sales attribution uses UTM parameters and custom tracking

## 4. Pricing Screen Implementation

### Component Structure

The Pricing Screen feature includes:

- `PricingScreen.js`: Main screen component
- `components/pricing/PricingCard.js`: Card component for displaying pricing plans
- `components/pricing/PricingFeatureList.js`: Component for listing plan features
- `components/pricing/PricingComparisonModal.js`: Modal for comparing with competitors

### API Endpoints

The Pricing Screen uses these endpoints:

```javascript
// Get pricing plans
API.pricing.getPlans()

// Get current subscription
API.pricing.getCurrentSubscription()

// Update subscription
API.pricing.updateSubscription(planId, billingCycle)
```

### Implementation Notes

- Pricing is displayed with a toggle between monthly and annual billing
- Annual billing shows a 20% discount
- The comparison modal dynamically fetches competitor pricing data

## 5. Canva Template Integration Implementation

### Component Structure

The Template Integration feature includes:

- `TemplateIntegration.js`: Main screen component
- `components/templates/TemplateCard.js`: Card component for displaying templates
- `components/templates/TemplateFilterModal.js`: Filter UI for templates
- `components/templates/CanvaAuthModal.js`: Modal for Canva authentication

### API Endpoints

The Template Integration uses these endpoints:

```javascript
// Check Canva connection status
API.templates.getCanvaStatus()

// Connect to Canva
API.templates.connectCanva(credentials)

// Get template categories
API.templates.getCategories()

// Get templates
API.templates.getTemplates(params)
```

### Canva API Integration

The integration uses Canva's Developer API with the following features:
- Template discovery
- Design creation
- Asset management
- User authentication

### Implementation Notes

- OAuth 2.0 is used for Canva authentication
- Templates are categorized by platform and content type
- The integration supports both Canva's templates and UniSphere's custom templates

## Integration with Existing Codebase

### Navigation Updates

The `AppNavigator.js` file has been updated to include the new screens:

```javascript
// Add new screens to the main tab navigator
const TabNavigator = createBottomTabNavigator({
  Dashboard: DashboardScreen,
  Content: ContentCreationScreen,
  Analytics: AnalyticsScreen,
  Monetization: MonetizationScreen,
  Growth: GrowthScreen,
  // New screens
  Marketplace: BrandMarketplace,
  Rights: ContentRightsManagement,
  ECommerce: ECommerceIntegration,
  Templates: TemplateIntegration,
  Pricing: PricingScreen
});
```

### Context Updates

The ThemeContext has been extended to support the new components:

```javascript
// Add new theme variables for the new components
const themeColors = {
  // Existing colors
  // ...
  
  // New colors for marketplace
  marketplaceBackground: '#f5f8ff',
  verificationBadge: '#4caf50',
  
  // New colors for rights management
  licenseBadgeActive: '#4caf50',
  licenseBadgePending: '#ff9800',
  licenseBadgeExpired: '#f44336',
  
  // New colors for eCommerce
  shopifyPrimary: '#95bf47',
  salesPositive: '#4caf50',
  salesNegative: '#f44336'
};
```

### API Service Updates

The API service has been extended with new modules:

```javascript
// api.js
import marketplace from './services/marketplaceApi';
import rights from './services/rightsApi';
import ecommerce from './services/ecommerceApi';
import templates from './services/templatesApi';
import pricing from './services/pricingApi';

const API = {
  // Existing modules
  // ...
  
  // New modules
  marketplace,
  rights,
  ecommerce,
  templates,
  pricing
};

export default API;
```

## Testing Considerations

### Unit Tests

New unit tests should be created for:
- Brand marketplace filtering logic
- Content rights status calculations
- eCommerce sales attribution
- Template filtering and categorization

### Integration Tests

Integration tests should focus on:
- API interactions with Shopify
- API interactions with Canva
- Brand marketplace search and filter combinations
- Content rights lifecycle management

### User Testing

User testing should prioritize:
- Brand marketplace discovery flow
- Content rights creation process
- eCommerce connection and analytics
- Template discovery and usage

## Performance Considerations

- Lazy load marketplace creators to improve initial load time
- Implement pagination for template browsing
- Cache Shopify product data to reduce API calls
- Optimize images in template previews

## Security Considerations

- Implement proper OAuth 2.0 flow for third-party services
- Store API tokens securely using secure storage
- Implement proper permission checks for content rights management
- Sanitize all user inputs, especially in search and filter functions

## Next Steps for Developers

1. Implement backend services for the new API endpoints
2. Create the supporting components referenced in this document
3. Update the database schema to support the new features
4. Implement the third-party API integrations (Shopify, Canva)
5. Create comprehensive tests for all new functionality
