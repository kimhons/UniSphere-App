import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AnalyticsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  
  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'instagram', name: 'Instagram', icon: 'logo-instagram' },
    { id: 'tiktok', name: 'TikTok', icon: 'musical-notes' },
    { id: 'youtube', name: 'YouTube', icon: 'logo-youtube' },
    { id: 'twitter', name: 'Twitter', icon: 'logo-twitter' },
  ];
  
  const timeRanges = [
    { id: 'week', name: 'Week' },
    { id: 'month', name: 'Month' },
    { id: '3months', name: '3 Months' },
    { id: 'year', name: 'Year' },
  ];
  
  const followerData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [12500, 12650, 12800, 13100, 13250, 13500, 13800],
        color: (opacity = 1) => `rgba(142, 45, 226, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };
  
  const engagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [3.2, 3.5, 4.1, 3.8, 4.5, 5.2, 4.8],
        color: (opacity = 1) => `rgba(74, 0, 224, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };
  
  const contentPerformanceData = {
    labels: ["Posts", "Videos", "Stories", "Reels"],
    data: [4.2, 5.8, 3.6, 6.5]
  };
  
  const audienceData = {
    labels: ["18-24", "25-34", "35-44", "45+"],
    data: [35, 40, 15, 10]
  };
  
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(142, 45, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#8E2DE2"
    }
  };
  
  const renderPlatformSelector = () => (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.platformScroll}
    >
      {platforms.map((platform) => (
        <TouchableOpacity 
          key={platform.id}
          style={[
            styles.platformButton,
            selectedPlatform === platform.id && styles.platformButtonActive
          ]}
          onPress={() => setSelectedPlatform(platform.id)}
        >
          {platform.icon && (
            <Ionicons 
              name={platform.icon} 
              size={16} 
              color={selectedPlatform === platform.id ? '#FFFFFF' : '#8E2DE2'} 
              style={styles.platformIcon}
            />
          )}
          <Text 
            style={[
              styles.platformText,
              selectedPlatform === platform.id && styles.platformTextActive
            ]}
          >
            {platform.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
  
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
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>88.5K</Text>
          <Text style={styles.statLabel}>Total Followers</Text>
          <Text style={styles.statChange}>+12.3%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4.2%</Text>
          <Text style={styles.statLabel}>Avg. Engagement</Text>
          <Text style={styles.statChange}>+0.8%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statLabel}>Posts</Text>
          <Text style={styles.statChange}>+15</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$3.2K</Text>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statChange}>+22.5%</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Follower Growth</Text>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={20} color="#8E2DE2" />
          </TouchableOpacity>
        </View>
        <LineChart
          data={followerData}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Engagement Rate</Text>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={20} color="#8E2DE2" />
          </TouchableOpacity>
        </View>
        <LineChart
          data={engagementData}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.insightsContainer}>
        <Text style={styles.sectionTitle}>AI Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightIconContainer}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Growth Opportunity</Text>
            <Text style={styles.insightText}>
              Your engagement is 28% higher on Tuesdays and Thursdays. Consider posting more content on these days.
            </Text>
          </View>
        </View>
        <View style={styles.insightCard}>
          <View style={[styles.insightIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.1)' }]}>
            <Ionicons name="bulb-outline" size={24} color="#FFC107" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Content Recommendation</Text>
            <Text style={styles.insightText}>
              Video content is performing 43% better than images. Try creating more video content to boost engagement.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  
  const renderContentTab = () => (
    <View>
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Content Performance by Type</Text>
        </View>
        <BarChart
          data={contentPerformanceData}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          verticalLabelRotation={0}
          fromZero
        />
        <Text style={styles.chartSubtitle}>Average Engagement Rate (%)</Text>
      </View>
      
      <View style={styles.topContentContainer}>
        <Text style={styles.sectionTitle}>Top Performing Content</Text>
        <View style={styles.contentCard}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentTitle}>Summer Fashion Haul 2025</Text>
            <Text style={styles.contentMeta}>Posted 2 days ago • Instagram, TikTok</Text>
          </View>
          <View style={styles.contentStats}>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>12.5K</Text>
              <Text style={styles.contentStatLabel}>Likes</Text>
            </View>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>843</Text>
              <Text style={styles.contentStatLabel}>Comments</Text>
            </View>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>7.2%</Text>
              <Text style={styles.contentStatLabel}>Engagement</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentCard}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentTitle}>My Morning Routine</Text>
            <Text style={styles.contentMeta}>Posted 5 days ago • YouTube, Instagram</Text>
          </View>
          <View style={styles.contentStats}>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>8.3K</Text>
              <Text style={styles.contentStatLabel}>Likes</Text>
            </View>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>512</Text>
              <Text style={styles.contentStatLabel}>Comments</Text>
            </View>
            <View style={styles.contentStat}>
              <Text style={styles.contentStatValue}>5.8%</Text>
              <Text style={styles.contentStatLabel}>Engagement</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
  
  const renderAudienceTab = () => (
    <View>
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Audience Age Distribution</Text>
        </View>
        <PieChart
          data={[
            {
              name: "18-24",
              population: 35,
              color: "#8E2DE2",
              legendFontColor: "#666666",
              legendFontSize: 12
            },
            {
              name: "25-34",
              population: 40,
              color: "#4A00E0",
              legendFontColor: "#666666",
              legendFontSize: 12
            },
            {
              name: "35-44",
              population: 15,
              color: "#9C27B0",
              legendFontColor: "#666666",
              legendFontSize: 12
            },
            {
              name: "45+",
              population: 10,
              color: "#E040FB",
              legendFontColor: "#666666",
              legendFontSize: 12
            }
          ]}
          width={width - 40}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 0]}
          absolute
        />
      </View>
      
      <View style={styles.audienceStatsContainer}>
        <Text style={styles.sectionTitle}>Audience Demographics</Text>
        <View style={styles.audienceStatRow}>
          <View style={styles.audienceStat}>
            <Text style={styles.audienceStatLabel}>Gender</Text>
            <View style={styles.audienceStatContent}>
              <Text style={styles.audienceStatValue}>68% Female</Text>
              <Text style={styles.audienceStatValue}>32% Male</Text>
            </View>
          </View>
          <View style={styles.audienceStat}>
            <Text style={styles.audienceStatLabel}>Top Locations</Text>
            <View style={styles.audienceStatContent}>
              <Text style={styles.audienceStatValue}>United States (42%)</Text>
              <Text style={styles.audienceStatValue}>UK (15%)</Text>
              <Text style={styles.audienceStatValue}>Canada (12%)</Text>
            </View>
          </View>
        </View>
        <View style={styles.audienceStatRow}>
          <View style={styles.audienceStat}>
            <Text style={styles.audienceStatLabel}>Active Hours</Text>
            <View style={styles.audienceStatContent}>
              <Text style={styles.audienceStatValue}>6PM - 9PM (Weekdays)</Text>
              <Text style={styles.audienceStatValue}>12PM - 3PM (Weekends)</Text>
            </View>
          </View>
          <View style={styles.audienceStat}>
            <Text style={styles.audienceStatLabel}>Interests</Text>
            <View style={styles.audienceStatContent}>
              <Text style={styles.audienceStatValue}>Fashion (65%)</Text>
              <Text style={styles.audienceStatValue}>Beauty (48%)</Text>
              <Text style={styles.audienceStatValue}>Travel (32%)</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.insightsContainer}>
        <Text style={styles.sectionTitle}>Audience Insights</Text>
        <View style={styles.insightCard}>
          <View style={[styles.insightIconContainer, { backgroundColor: 'rgba(76, 175, 80, 0.1)' }]}>
            <Ionicons name="people" size={24} color="#4CAF50" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Audience Growth</Text>
            <Text style={styles.insightText}>
              Your audience is growing 2.3x faster on TikTok compared to other platforms. Consider cross-promoting your TikTok content.
            </Text>
          </View>
        </View>
        <View style={styles.insightCard}>
          <View style={[styles.insightIconContainer, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
            <Ionicons name="globe-outline" size={24} color="#2196F3" />
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Geographic Opportunity</Text>
            <Text style={styles.insightText}>
              Engagement from Australia has increased by 28% this month. Consider creating content that appeals to this growing audience.
            </Text>
          </View>
        </View>
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
        <Text style={styles.headerTitle}>Analytics</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={24} color="#333333" />
        </TouchableOpacity>
      </View>
      
      {renderPlatformSelector()}
      {renderTimeRangeSelector()}
      
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
          style={[styles.tab, activeTab === 'audience' && styles.activeTab]}
          onPress={() => setActiveTab('audience')}
        >
          <Text style={[styles.tabText, activeTab === 'audience' && styles.activeTabText]}>Audience</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'audience' && renderAudienceTab()}
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
        >
          <Ionicons name="bar-chart" size={24} color="#8E2DE2" />
          <Text style={[styles.navText, { color: '#8E2DE2' }]}>Analytics</Text>
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
  exportButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  platformScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  platformButtonActive: {
    backgroundColor: '#8E2DE2',
  },
  platformIcon: {
    marginRight: 5,
  },
  platformText: {
    fontSize: 14,
    color: '#8E2DE2',
  },
  platformTextActive: {
    color: '#FFFFFF',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
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
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  statChange: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
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
  },
  topContentContainer: {
    marginBottom: 20,
  },
  contentCard: {
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
  contentInfo: {
    marginBottom: 15,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  contentMeta: {
    fontSize: 12,
    color: '#666666',
  },
  contentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentStat: {
    alignItems: 'center',
  },
  contentStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  contentStatLabel: {
    fontSize: 12,
    color: '#666666',
  },
  audienceStatsContainer: {
    marginBottom: 20,
  },
  audienceStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  audienceStat: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  audienceStatLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  audienceStatContent: {
    
  },
  audienceStatValue: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
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

export default AnalyticsScreen;
