import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const GrowthScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('strategies');
  
  const growthStrategies = [
    { 
      id: '1', 
      title: 'Increase Engagement Rate', 
      description: 'Boost your engagement by responding to comments within 2 hours and asking questions in your captions.',
      difficulty: 'Easy',
      impact: 'Medium',
      platforms: ['instagram', 'tiktok', 'twitter']
    },
    { 
      id: '2', 
      title: 'Optimize Posting Schedule', 
      description: 'Post during peak hours (6-8PM weekdays) when your audience is most active to maximize reach.',
      difficulty: 'Easy',
      impact: 'High',
      platforms: ['instagram', 'tiktok', 'youtube', 'twitter']
    },
    { 
      id: '3', 
      title: 'Collaborate with Similar Creators', 
      description: 'Partner with creators in your niche for cross-promotion to reach new audiences.',
      difficulty: 'Medium',
      impact: 'High',
      platforms: ['instagram', 'youtube', 'tiktok']
    },
    { 
      id: '4', 
      title: 'Create Platform-Specific Content', 
      description: 'Tailor your content format and style to each platform's unique audience and algorithm.',
      difficulty: 'Hard',
      impact: 'High',
      platforms: ['instagram', 'tiktok', 'youtube', 'twitter']
    },
  ];
  
  const collaborationOpportunities = [
    {
      id: '1',
      name: 'Sarah Johnson',
      handle: '@sarahjfashion',
      followers: '25.4K',
      niche: 'Fashion & Style',
      match: 'High',
      image: require('../assets/collaborator1.png')
    },
    {
      id: '2',
      name: 'Mike Chen',
      handle: '@mikestravels',
      followers: '42.8K',
      niche: 'Travel & Lifestyle',
      match: 'Medium',
      image: require('../assets/collaborator2.png')
    },
    {
      id: '3',
      name: 'Emma Roberts',
      handle: '@emmabeauty',
      followers: '18.2K',
      niche: 'Beauty & Skincare',
      match: 'High',
      image: require('../assets/collaborator3.png')
    },
  ];
  
  const trendingTopics = [
    {
      id: '1',
      topic: 'Sustainable Fashion',
      growth: '+28%',
      relevance: 'High',
      platforms: ['instagram', 'tiktok', 'youtube']
    },
    {
      id: '2',
      topic: 'Morning Routines',
      growth: '+15%',
      relevance: 'Medium',
      platforms: ['youtube', 'tiktok']
    },
    {
      id: '3',
      topic: 'Tech Reviews',
      growth: '+32%',
      relevance: 'Medium',
      platforms: ['youtube', 'twitter']
    },
    {
      id: '4',
      topic: 'Plant-Based Recipes',
      growth: '+45%',
      relevance: 'High',
      platforms: ['instagram', 'tiktok', 'pinterest']
    },
  ];
  
  const hashtagCollections = [
    {
      id: '1',
      name: 'Fashion Essentials',
      hashtags: ['#OOTD', '#FashionTips', '#StyleInspo', '#FashionBlogger', '#SummerStyle'],
      reach: '2.5M',
      relevance: 'High'
    },
    {
      id: '2',
      name: 'Travel Photography',
      hashtags: ['#TravelGram', '#Wanderlust', '#TravelPhotography', '#ExploreMore', '#TravelBlogger'],
      reach: '4.8M',
      relevance: 'Medium'
    },
    {
      id: '3',
      name: 'Fitness Motivation',
      hashtags: ['#FitnessGoals', '#WorkoutMotivation', '#HealthyLifestyle', '#FitFam', '#MorningWorkout'],
      reach: '3.2M',
      relevance: 'Medium'
    },
  ];
  
  const renderPlatformIcons = (platforms) => {
    return (
      <View style={styles.platformIconsContainer}>
        {platforms.map(platform => {
          let iconName = 'question-mark';
          if (platform === 'instagram') iconName = 'logo-instagram';
          if (platform === 'tiktok') iconName = 'musical-notes';
          if (platform === 'youtube') iconName = 'logo-youtube';
          if (platform === 'twitter') iconName = 'logo-twitter';
          if (platform === 'pinterest') iconName = 'logo-pinterest';
          
          return (
            <View key={platform} style={styles.platformIconCircle}>
              <Ionicons name={iconName} size={14} color="#FFFFFF" />
            </View>
          );
        })}
      </View>
    );
  };
  
  const renderDifficultyBadge = (difficulty) => {
    let color = '#FFC107'; // Medium - yellow
    if (difficulty === 'Easy') color = '#4CAF50'; // Green
    if (difficulty === 'Hard') color = '#F44336'; // Red
    
    return (
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{difficulty}</Text>
      </View>
    );
  };
  
  const renderImpactBadge = (impact) => {
    let color = '#FFC107'; // Medium - yellow
    if (impact === 'High') color = '#4CAF50'; // Green
    if (impact === 'Low') color = '#F44336'; // Red
    
    return (
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{impact}</Text>
      </View>
    );
  };
  
  const renderMatchBadge = (match) => {
    let color = '#FFC107'; // Medium - yellow
    if (match === 'High') color = '#4CAF50'; // Green
    if (match === 'Low') color = '#F44336'; // Red
    
    return (
      <View style={[styles.matchBadge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{match} Match</Text>
      </View>
    );
  };
  
  const renderRelevanceBadge = (relevance) => {
    let color = '#FFC107'; // Medium - yellow
    if (relevance === 'High') color = '#4CAF50'; // Green
    if (relevance === 'Low') color = '#F44336'; // Red
    
    return (
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{relevance}</Text>
      </View>
    );
  };
  
  const renderStrategiesTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Growth Strategies</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#8E2DE2" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {growthStrategies.map((strategy) => (
        <TouchableOpacity key={strategy.id} style={styles.strategyCard}>
          <View style={styles.strategyHeader}>
            <Text style={styles.strategyTitle}>{strategy.title}</Text>
            <View style={styles.badgeContainer}>
              {renderDifficultyBadge(strategy.difficulty)}
              {renderImpactBadge(strategy.impact)}
            </View>
          </View>
          <Text style={styles.strategyDescription}>{strategy.description}</Text>
          <View style={styles.strategyFooter}>
            {renderPlatformIcons(strategy.platforms)}
            <TouchableOpacity style={styles.implementButton}>
              <Text style={styles.implementButtonText}>Implement</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Strategies</Text>
      </TouchableOpacity>
      
      <View style={styles.aiSuggestionContainer}>
        <View style={styles.aiSuggestionHeader}>
          <Ionicons name="bulb-outline" size={24} color="#FFC107" />
          <Text style={styles.aiSuggestionTitle}>AI Strategy Suggestion</Text>
        </View>
        <Text style={styles.aiSuggestionText}>
          Based on your content performance, creating "behind-the-scenes" content could increase your engagement by up to 24%. Try showing your creative process or daily routine.
        </Text>
        <TouchableOpacity style={styles.aiSuggestionButton}>
          <Text style={styles.aiSuggestionButtonText}>Generate Content Ideas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderCollaborationsTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Collaboration Opportunities</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#8E2DE2" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {collaborationOpportunities.map((collaborator) => (
        <TouchableOpacity key={collaborator.id} style={styles.collaboratorCard}>
          <Image source={collaborator.image} style={styles.collaboratorImage} />
          <View style={styles.collaboratorInfo}>
            <Text style={styles.collaboratorName}>{collaborator.name}</Text>
            <Text style={styles.collaboratorHandle}>{collaborator.handle}</Text>
            <View style={styles.collaboratorDetails}>
              <Text style={styles.collaboratorDetail}>{collaborator.followers} followers</Text>
              <Text style={styles.collaboratorDetail}>{collaborator.niche}</Text>
            </View>
          </View>
          <View style={styles.collaboratorActions}>
            {renderMatchBadge(collaborator.match)}
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>Find More Collaborators</Text>
      </TouchableOpacity>
      
      <View style={styles.collaborationTipsContainer}>
        <Text style={styles.sectionTitle}>Collaboration Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Ionicons name="chatbubble-outline" size={24} color="#8E2DE2" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Personalize Your Outreach</Text>
            <Text style={styles.tipText}>
              Mention specific content you enjoyed from the creator and why you think a collaboration would benefit both audiences.
            </Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Ionicons name="document-text-outline" size={24} color="#8E2DE2" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Create a Collaboration Agreement</Text>
            <Text style={styles.tipText}>
              Outline expectations, deliverables, and timeline to ensure a smooth collaboration process.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  const renderTrendsTab = () => (
    <View>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderTitle}>Trending Topics</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#8E2DE2" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {trendingTopics.map((trend) => (
        <TouchableOpacity key={trend.id} style={styles.trendCard}>
          <View style={styles.trendInfo}>
            <Text style={styles.trendTopic}>{trend.topic}</Text>
            <View style={styles.trendDetails}>
              <View style={styles.trendGrowth}>
                <Ionicons name="trending-up" size={16} color="#4CAF50" />
                <Text style={styles.trendGrowthText}>{trend.growth}</Text>
              </View>
              {renderRelevanceBadge(trend.relevance)}
            </View>
          </View>
          <View style={styles.trendActions}>
            <View style={styles.trendPlatforms}>
              {renderPlatformIcons(trend.platforms)}
            </View>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All Trends</Text>
      </TouchableOpacity>
      
      <View style={styles.hashtagsContainer}>
        <Text style={styles.sectionTitle}>Hashtag Collections</Text>
        {hashtagCollections.map((collection) => (
          <View key={collection.id} style={styles.hashtagCard}>
            <View style={styles.hashtagHeader}>
              <Text style={styles.hashtagName}>{collection.name}</Text>
              <View style={styles.hashtagMeta}>
                <Text style={styles.hashtagReach}>{collection.reach} reach</Text>
                {renderRelevanceBadge(collection.relevance)}
              </View>
            </View>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hashtagScroll}
            >
              {collection.hashtags.map((hashtag, index) => (
                <View key={index} style={styles.hashtagItem}>
                  <Text style={styles.hashtagText}>{hashtag}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy-outline" size={16} color="#8E2DE2" />
              <Text style={styles.copyButtonText}>Copy All</Text>
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
        <Text style={styles.headerTitle}>Growth Accelerator</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'strategies' && styles.activeTab]}
          onPress={() => setActiveTab('strategies')}
        >
          <Text style={[styles.tabText, activeTab === 'strategies' && styles.activeTabText]}>Strategies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'collaborations' && styles.activeTab]}
          onPress={() => setActiveTab('collaborations')}
        >
          <Text style={[styles.tabText, activeTab === 'collaborations' && styles.activeTabText]}>Collaborations</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'trends' && styles.activeTab]}
          onPress={() => setActiveTab('trends')}
        >
          <Text style={[styles.tabText, activeTab === 'trends' && styles.activeTabText]}>Trends</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {activeTab === 'strategies' && renderStrategiesTab()}
        {activeTab === 'collaborations' && renderCollaborationsTab()}
        {activeTab === 'trends' && renderTrendsTab()}
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
    padding: 20,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 14,
    color: '#8E2DE2',
    marginLeft: 5,
  },
  strategyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  strategyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 5,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  strategyDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  strategyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  implementButton: {
    backgroundColor: '#8E2DE2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  implementButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  aiSuggestionContainer: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  aiSuggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiSuggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  aiSuggestionText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  aiSuggestionButton: {
    backgroundColor: '#FFC107',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  aiSuggestionButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  collaboratorCard: {
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
  collaboratorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  collaboratorHandle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  collaboratorDetails: {
    flexDirection: 'row',
  },
  collaboratorDetail: {
    fontSize: 12,
    color: '#666666',
    marginRight: 10,
  },
  collaboratorActions: {
    alignItems: 'flex-end',
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: '#8E2DE2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  connectButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  collaborationTipsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  tipCard: {
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
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(142, 45, 226, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trendTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 10,
  },
  trendDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  trendGrowthText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  trendActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendPlatforms: {
    
  },
  createButton: {
    backgroundColor: '#8E2DE2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  createButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  hashtagsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  hashtagCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hashtagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  hashtagName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  hashtagMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hashtagReach: {
    fontSize: 12,
    color: '#666666',
    marginRight: 10,
  },
  hashtagScroll: {
    marginBottom: 15,
  },
  hashtagItem: {
    backgroundColor: 'rgba(142, 45, 226, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  hashtagText: {
    fontSize: 14,
    color: '#8E2DE2',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  copyButtonText: {
    fontSize: 14,
    color: '#8E2DE2',
    fontWeight: 'bold',
    marginLeft: 5,
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

export default GrowthScreen;
