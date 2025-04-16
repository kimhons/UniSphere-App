import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import ContentRightsCard from '../../components/rights/ContentRightsCard';
import LicenseTemplateModal from '../../components/rights/LicenseTemplateModal';
import API from '../../services/api';

const ContentRightsManagement = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('active');
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentRights, setContentRights] = useState([
    {
      id: '1',
      title: 'Summer Collection Promotion',
      brand: 'Fashion Brand X',
      contentType: 'Image',
      platforms: ['Instagram', 'TikTok'],
      startDate: '2025-04-01',
      endDate: '2025-07-01',
      status: 'active',
      usageRights: 'Limited commercial use on specified platforms',
      thumbnail: 'https://example.com/image1.jpg'
    },
    {
      id: '2',
      title: 'Product Review Video',
      brand: 'Tech Company Y',
      contentType: 'Video',
      platforms: ['YouTube', 'Instagram'],
      startDate: '2025-03-15',
      endDate: '2026-03-15',
      status: 'active',
      usageRights: 'Full commercial use with attribution',
      thumbnail: 'https://example.com/image2.jpg'
    },
    {
      id: '3',
      title: 'Holiday Campaign',
      brand: 'Retail Store Z',
      contentType: 'Image',
      platforms: ['Instagram', 'Facebook'],
      startDate: '2024-11-01',
      endDate: '2025-01-15',
      status: 'expired',
      usageRights: 'Limited time promotion',
      thumbnail: 'https://example.com/image3.jpg'
    }
  ]);

  const filteredRights = contentRights.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCreateTemplate = (templateData) => {
    // In a real implementation, this would call the API
    console.log('Creating template:', templateData);
    setTemplateModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Content Rights Management</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setTemplateModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>New License</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by title or brand"
            placeholderTextColor={colors.text + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'active' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'active' ? colors.primary : colors.text }
          ]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'pending' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'pending' ? colors.primary : colors.text }
          ]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'expired' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab('expired')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'expired' ? colors.primary : colors.text }
          ]}>
            Expired
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'all' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'all' ? colors.primary : colors.text }
          ]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {filteredRights.length > 0 ? (
          filteredRights.map(item => (
            <ContentRightsCard 
              key={item.id} 
              data={item} 
              onPress={() => console.log('Pressed content rights item:', item.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={64} color={colors.text + '40'} />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No content rights found
            </Text>
            <Text style={[styles.emptySubtext, { color: colors.text + '80' }]}>
              Create a new license template to get started
            </Text>
          </View>
        )}
      </ScrollView>

      <LicenseTemplateModal
        visible={templateModalVisible}
        onClose={() => setTemplateModalVisible(false)}
        onSave={handleCreateTemplate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ContentRightsManagement;
