import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const MonetizationScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  
  const timeRanges = [
    { id: 'week', name: 'Week' },
    { id: 'month', name: 'Month' },
    { id: '3months', name: '3 Months' },
    { id: 'year', name: 'Year' },
  ];
  
  const revenueData = [
    { source: 'Products', amount: 1250.75, percentage: 38 },
    { source: 'Affiliate', amount: 875.50, percentage: 27 },
    { source: 'Sponsorships', amount: 750.00, percentage: 23 },
    { source: 'Tips', amount: 385.25, percentage: 12 },
  ];
  
  const products = [
    { id: '1', name: 'Summer Presets Pack', price: 24.99, sales: 42, revenue: 1049.58, image: require('../assets/product1.png') },
    { id: '2', name: 'Content Creator Guide', price: 19.99, sales: 28, revenue: 559.72, image: require('../assets/product2.png') },
    { id: '3', name: 'Lightroom Mobile Presets', price: 14.99, sales: 35, revenue: 524.65, image: require('../assets/product3.png') },
  ];
  
  const affiliateLinks = [
    { id: '1', name: 'Camera Equipment', platform: 'Amazon', clicks: 325, conversions: 18, revenue: 450.25 },
    { id: '2', name: 'Makeup Brand', platform: 'Sephora', clicks: 210, conversions: 12, revenue: 280.80 },
    { id: '3', name: 'Clothing Store', platform: 'Fashion Nova', clicks: 175, conversions: 8, revenue: 144.45 },
  ];
  
  const sponsorships = [
    { id: '1', name: 'Beauty Brand Campaign', status: 'Active', startDate: 'Apr 10, 2025', endDate: 'May 10, 2025', value: 500.00 },
    { id: '2', name: 'Tech Gadget Review', status: 'Completed', startDate: 'Mar 15, 2025', endDate: 'Apr 5, 2025', value: 350.00 },
    { id: '3', name: 'Travel Destination Promo', status: 'Negotiating', startDate: 'TBD', endDate: 'TBD', value: 750.00 },
  ];
  
  const opportunities = [
    { id: '1', type: 'Affiliate', name: 'Fitness Equipment', match: 'High', potential: '$200-400/mo' },
    { id: '2', type: 'Sponsorship', name: 'Wellness Brand', match: 'Medium', potential: '$500-800' },
    { id: '3', type: 'Product', name: 'Workout Guide', match: 'High', potential: '$800-1200/mo' },
  ];
  
  const renderTimeRangeSelector = () => (
    <View style={styles.timeRangeContainer}>
      {timeRanges.map((range) => (
        <TouchableOpacity 
          key={range.id}
          style={[
            styles.timeRangeButton,
            timeRange === range.id && styles.timeRangeButtonActive
          ]}
          onPress={() => setTimeRange(range.id)}
        >
          <Text 
            style={[
              styles.timeRangeText,
              timeRange === range.id && styles.timeRangeTextActive
            ]}
          >
            {range.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const renderOverviewTab = () => (
    <View>
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Revenue Summary</Text>
          <Text style={styles.summaryTotal}>$3,261.50</Text>
          <Text style={styles.summaryChange}>+18.5% from last month</Text>
        </View>
        
        <View style={styles.revenueBreakdown}>
          {revenueData.map((item, index) => (
            <View key={index} style={styles.revenueItem}>
              <View style={styles.revenueItemHeader}>
                <Text style={styles.revenueSource}>{item.source}</Text>
                <Text style={styles.revenueAmount}>${item.amount.toFixed(2)}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${item.percentage}%` },
                    index === 0 ? { backgroundColor: '#8E2DE2' } :
                    index === 1 ? { backgroundColor: '#4A00E0' } :
                    index === 2 ? { backgroundColor: '#9C27B0' } :
                    { backgroundColor: '#E040FB' }
                  ]}
                />
              </View>
              <Text style={styles.revenuePercentage}>{item.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="add-circle-outline" size={28} color="#8E2DE2" />
            <Text style={styles.actionName}>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="link-outline" size={28} color="#8E2DE2" />
            <Text style={styles.actionName}>Create Affiliate Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="briefcase-outline" size={28} color="#8E2DE2" />
            <Text style={styles.actionName}>Manage Sponsorships</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="cash-outline" size={28} color="#8E2DE2" />
            <Text style={styles.actionName}>View Transactions</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.insightsContainer}>
        <Text style={styles.sectionTitle}>AI Monetization Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Revenue Opportunity</Text>
            <Text style={styles.insightText}>
              Your audience is 3x more likely to purchase digital products compared to physical goods. Consider creating more digital products.
            </Text>
            <TouchableOpacity style={styles.insightActionButton}>
              <Text style={styles.insightActionText}>Create Digital Product</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.insightCard}>
          <View style={[styles.insightIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
            <Ionicons name="bulb-outline" size={24} color="#FFC107" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Affiliate Recommendation</Text>
            <Text style={styles.insightText}>
              Based on your audience interests, fitness equipment affiliate programs could generate 35% more revenue than your current affiliates.
            </Text>
            <TouchableOpacity style={styles.insightActionButton}>
              <Text style={styles.insightActionText}>Explore Fitness Affiliates</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  
  const renderProductsTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Your Products</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {products.map((product) => (
        <TouchableOpacity key={product.id} style={styles.productCard}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            <View style={styles.productStats}>
              <View style={styles.productStat}>
                <Text style={styles.productStatValue}>{product.sales}</Text>
                <Text style={styles.productStatLabel}>Sales</Text>
              </View>
              <View style={styles.productStat}>
                <Text style={styles.productStatValue}>${product.revenue.toFixed(2)}</Text>
                <Text style={styles.productStatLabel}>Revenue</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.productMenuButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#666666" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Products</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderAffiliateTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Affiliate Links</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {affiliateLinks.map((link) => (
        <View key={link.id} style={styles.affiliateCard}>
          <View style={styles.affiliateInfo}>
            <Text style={styles.affiliateName}>{link.name}</Text>
            <Text style={styles.affiliatePlatform}>{link.platform}</Text>
            <View style={styles.affiliateStats}>
              <View style={styles.affiliateStat}>
                <Text style={styles.affiliateStatValue}>{link.clicks}</Text>
                <Text style={styles.affiliateStatLabel}>Clicks</Text>
              </View>
              <View style={styles.affiliateStat}>
                <Text style={styles.affiliateStatValue}>{link.conversions}</Text>
                <Text style={styles.affiliateStatLabel}>Conversions</Text>
              </View>
              <View style={styles.affiliateStat}>
                <Text style={styles.affiliateStatValue}>${link.revenue.toFixed(2)}</Text>
                <Text style={styles.affiliateStatLabel}>Revenue</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.affiliateMenuButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#666666" />
          </TouchableOpacity>
        </View>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Affiliate Links</Text>
      </TouchableOpacity>
      
      <View style={styles.opportunitiesContainer}>
        <Text style={styles.sectionTitle}>Affiliate Opportunities</Text>
        {opportunities.filter(opp => opp.type === 'Affiliate').map((opportunity) => (
          <View key={opportunity.id} style={styles.opportunityCard}>
            <View style={styles.opportunityInfo}>
              <Text style={styles.opportunityName}>{opportunity.name}</Text>
              <Text style={styles.opportunityPotential}>Potential: {opportunity.potential}</Text>
            </View>
            <View style={styles.matchContainer}>
              <Text 
                style={[
                  styles.matchText, 
                  opportunity.match === 'High' ? styles.matchHigh : 
                  opportunity.match === 'Medium' ? styles.matchMedium : 
                  styles.matchLow
                ]}
              >
                {opportunity.match} Match
              </Text>
            </View>
            <TouchableOpacity style={styles.opportunityButton}>
              <Text style={styles.opportunityButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
  
  const renderSponsorshipsTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Sponsorships</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {sponsorships.map((sponsorship) => (
        <View key={sponsorship.id} style={styles.sponsorshipCard}>
          <View style={styles.sponsorshipInfo}>
            <Text style={styles.sponsorshipName}>{sponsorship.name}</Text>
            <View style={styles.sponsorshipDates}>
              <Text style={styles.sponsorshipDateLabel}>Period: </Text>
              <Text style={styles.sponsorshipDateValue}>
                {sponsorship.startDate} - {sponsorship.endDate}
              </Text>
            </View>
            <View style={styles.sponsorshipValue}>
              <Text style={styles.sponsorshipValueLabel}>Value: </Text>
              <Text style={styles.sponsorshipValueAmount}>${sponsorship.value.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.sponsorshipStatus}>
            <View 
              style={[
                styles.statusIndicator,
                sponsorship.status === 'Active' ? styles.statusActive :
                sponsorship.status === 'Completed' ? styles.statusCompleted :
                styles.statusNegotiating
              ]}
            />
            <Text style={styles.statusText}>{sponsorship.status}</Text>
          </View>
        </View>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Sponsorships</Text>
      </TouchableOpacity>
      
      <View style={styles.opportunitiesContainer}>
        <Text style={styles.sectionTitle}>Sponsorship Opportunities</Text>
        {opportunities.filter(opp => opp.type === 'Sponsorship').map((opportunity) => (
          <View key={opportunity.id} style={styles.opportunityCard}>
            <View style={styles.opportunityInfo}>
              <Text style={styles.opportunityName}>{opportunity.name}</Text>
              <Text style={styles.opportunityPotential}>Potential: {opportunity.potential}</Text>
            </View>
            <View style={styles.matchContainer}>
              <Text 
                style={[
                  styles.matchText, 
                  opportunity.match === 'High' ? styles.matchHigh : 
                  opportunity.match === 'Medium' ? styles.matchMedium : 
                  styles.matchLow
                ]}
              >
                {opportunity.match} Match
              </Text>
            </View>
            <TouchableOpacity style={styles.opportunityButton}>
              <Text style={styles.opportunityButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monetization</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
      
      {renderTimeRangeSelector()}
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'affiliate' && styles.activeTab]}
          onPress={() => setActiveTab('affiliate')}
        >
          <Text style={[styles.tabText, activeTab === 'affiliate' && styles.activeTabText]}>Affiliate</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'sponsorships' && styles.activeTab]}
          onPress={() => setActiveTab('sponsorships')}
        >
          <Text style={[styles.tabText, activeTab === 'sponsorships' && styles.activeTabText]}>Sponsorships</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'products' && renderProductsTab()}
        {activeTab === 'affiliate' && renderAffiliateTab()}
        {activeTab === 'sponsorships' && renderSponsorshipsTab()}
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Ionicons name="home-outline" size={24} color="#666666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('ContentCreation')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#666666" />
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Ionicons name="bar-chart-outline" size={24} color="#666666" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
        >
          <Ionicons name="cash" size={24} color="#8E2DE2" />
          <Text style={[styles.navText, { color: '#8E2DE2' }]}>Monetize</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  settingsButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  timeRangeButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  timeRangeButtonActive: {
    backgroundColor: '#F0F0F0',
  },
  timeRangeText: {
    fontSize: 14,
    color: '#666666',
  },
  timeRangeTextActive: {
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8E2DE2',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
  },
  activeTabText: {
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryHeader: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  summaryTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  summaryChange: {
    fontSize: 14,
    color: '#4CAF50',
  },
  revenueBreakdown: {
    
  },
  revenueItem: {
    marginBottom: 15,
  },
  revenueItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  revenueSource: {
    fontSize: 14,
    color: '#333333',
  },
  revenueAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'right',
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionName: {
    fontSize: 14,
    color: '#333333',
    marginTop: 10,
    textAlign: 'center',
  },
  insightsContainer: {
    marginBottom: 20,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  insightText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  insightActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  insightActionText: {
    fontSize: 12,
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tabHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#8E2DE2',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#8E2DE2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productStats: {
    flexDirection: 'row',
  },
  productStat: {
    marginRight: 20,
  },
  productStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  productStatLabel: {
    fontSize: 12,
    color: '#666666',
  },
  productMenuButton: {
    padding: 5,
  },
  viewAllButton: {
    alignItems: 'center',
    marginVertical: 10,
  },
  viewAllText: {
    fontSize: 14,
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  affiliateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  affiliateInfo: {
    flex: 1,
  },
  affiliateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  affiliatePlatform: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  affiliateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  affiliateStat: {
    
  },
  affiliateStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  affiliateStatLabel: {
    fontSize: 12,
    color: '#666666',
  },
  affiliateMenuButton: {
    padding: 5,
  },
  opportunitiesContainer: {
    marginTop: 20,
  },
  opportunityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  opportunityInfo: {
    flex: 1,
  },
  opportunityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  opportunityPotential: {
    fontSize: 14,
    color: '#666666',
  },
  matchContainer: {
    marginRight: 15,
  },
  matchText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  matchHigh: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
  },
  matchMedium: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    color: '#FFC107',
  },
  matchLow: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336',
  },
  opportunityButton: {
    backgroundColor: '#8E2DE2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  opportunityButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sponsorshipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sponsorshipInfo: {
    flex: 1,
  },
  sponsorshipName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  sponsorshipDates: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  sponsorshipDateLabel: {
    fontSize: 14,
    color: '#666666',
  },
  sponsorshipDateValue: {
    fontSize: 14,
    color: '#333333',
  },
  sponsorshipValue: {
    flexDirection: 'row',
  },
  sponsorshipValueLabel: {
    fontSize: 14,
    color: '#666666',
  },
  sponsorshipValueAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  sponsorshipStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusCompleted: {
    backgroundColor: '#2196F3',
  },
  statusNegotiating: {
    backgroundColor: '#FFC107',
  },
  statusText: {
    fontSize: 12,
    color: '#333333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
  },
});

export default MonetizationScreen;
