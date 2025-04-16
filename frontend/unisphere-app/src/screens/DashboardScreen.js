import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const platformStats = [
    { id: 'instagram', name: 'Instagram', followers: '12.5K', engagement: '3.2%', growth: '+2.1%' },
    { id: 'tiktok', name: 'TikTok', followers: '45.2K', engagement: '5.7%', growth: '+8.3%' },
    { id: 'youtube', name: 'YouTube', followers: '8.7K', engagement: '4.1%', growth: '+1.5%' },
    { id: 'twitter', name: 'Twitter', followers: '22.3K', engagement: '2.8%', growth: '+0.7%' },
  ];
  
  const recentContent = [
    { id: '1', title: 'Summer Fashion Haul 2025', platforms: ['instagram', 'tiktok'], performance: 'High', date: '2 days ago' },
    { id: '2', title: 'My Morning Routine', platforms: ['youtube', 'instagram'], performance: 'Medium', date: '5 days ago' },
    { id: '3', title: 'Tech Review: New Gadgets', platforms: ['twitter', 'youtube'], performance: 'High', date: '1 week ago' },
  ];
  
  const quickActions = [
    { id: 'create', name: 'Create Content', icon: 'add-circle-outline', screen: 'ContentCreation' },
    { id: 'analytics', name: 'View Analytics', icon: 'bar-chart-outline', screen: 'Analytics' },
    { id: 'monetize', name: 'Monetize', icon: 'cash-outline', screen: 'Monetization' },
    { id: 'grow', name: 'Grow Audience', icon: 'trending-up-outline', screen: 'Growth' },
  ];
  
  const renderPerformanceIndicator = (performance) => {
    let color = '#FFC107'; // Medium - yellow
    if (performance === 'High') color = '#4CAF50'; // Green
    if (performance === 'Low') color = '#F44336'; // Red
    
    return (
      <View style={[styles.performanceIndicator, { backgroundColor: color }]}>
        <Text style={styles.performanceText}>{performance}</Text>
      </View>
    );
  };
  
  const renderPlatformIcons = (platforms) => {
    return (
      <View style={styles.platformIconsContainer}>
        {platforms.map(platform => {
          let iconName = 'question-mark';
          if (platform === 'instagram') iconName = 'logo-instagram';
          if (platform === 'tiktok') iconName = 'musical-notes';
          if (platform === 'youtube') iconName = 'logo-youtube';
          if (platform === 'twitter') iconName = 'logo-twitter';
          
          return (
            <View key={platform} style={styles.platformIconCircle}>
              <Ionicons name={iconName} size={14} color="#FFFFFF" />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.username}>Alex Johnson</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'content' && styles.activeTab]}
          onPress={() => setActiveTab('content')}
        >
          <Text style={[styles.tabText, activeTab === 'content' && styles.activeTabText]}>Content</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>Schedule</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Platform Performance</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Analytics')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsScrollView}
          >
            {platformStats.map((platform) => (
              <View key={platform.id} style={styles.statCard}>
                <Text style={styles.platformName}>{platform.name}</Text>
                <Text style={styles.followerCount}>{platform.followers}</Text>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Engagement:</Text>
                  <Text style={styles.statValue}>{platform.engagement}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Growth:</Text>
                  <Text style={[styles.statValue, styles.growthValue]}>{platform.growth}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.screen)}
              >
                <Ionicons name={action.icon} size={28} color="#8E2DE2" />
                <Text style={styles.actionName}>{action.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Content</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ContentCreation')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {recentContent.map((content) => (
            <TouchableOpacity 
              key={content.id}
              style={styles.contentCard}
              onPress={() => navigation.navigate('ContentCreation', { contentId: content.id })}
            >
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>{content.title}</Text>
                <Text style={styles.contentDate}>{content.date}</Text>
                {renderPlatformIcons(content.platforms)}
              </View>
              {renderPerformanceIndicator(content.performance)}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.insightsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="bulb-outline" size={24} color="#FFC107" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Content Opportunity</Text>
              <Text style={styles.insightText}>
                Your fashion content performs 43% better on TikTok. Consider creating more fashion-related videos this week.
              </Text>
              <TouchableOpacity style={styles.insightActionButton}>
                <Text style={styles.insightActionText}>Create Content</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.insightCard}>
            <View style={styles.insightIconContainer}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Growth Opportunity</Text>
              <Text style={styles.insightText}>
                Collaborating with creators in your niche could increase your follower growth by up to 15%.
              </Text>
              <TouchableOpacity style={styles.insightActionButton}>
                <Text style={styles.insightActionText}>Find Collaborators</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => {}}
        >
          <Ionicons name="home" size={24} color="#8E2DE2" />
          <Text style={[styles.navText, { color: '#8E2DE2' }]}>Home</Text>
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
          onPress={() => navigation.navigate('Monetization')}
        >
          <Ionicons name="cash-outline" size={24} color="#666666" />
          <Text style={styles.navText}>Monetize</Text>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666666',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8E2DE2',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  activeTabText: {
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  scrollContent: {
    flex: 1,
  },
  statsContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8E2DE2',
  },
  statsScrollView: {
    marginLeft: -5,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  platformName: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  followerCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  growthValue: {
    color: '#4CAF50',
  },
  quickActionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
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
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  contentDate: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
  },
  platformIconsContainer: {
    flexDirection: 'row',
  },
  platformIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8E2DE2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  performanceIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  performanceText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  insightsContainer: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 80,
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
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

export default DashboardScreen;
