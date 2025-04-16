import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import TemplateCard from '../../components/templates/TemplateCard';
import TemplateFilterModal from '../../components/templates/TemplateFilterModal';
import CanvaAuthModal from '../../components/templates/CanvaAuthModal';
import API from '../../services/api';

const TemplateIntegration = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('canva');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [canvaAuthModalVisible, setCanvaAuthModalVisible] = useState(false);
  const [isCanvaConnected, setIsCanvaConnected] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    platforms: [],
    formats: [],
    styles: [],
    free: false
  });

  useEffect(() => {
    checkCanvaConnection();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [activeTab, selectedCategory, filters]);

  const checkCanvaConnection = async () => {
    try {
      // In a real implementation, this would call the API
      const response = await API.templates.getCanvaStatus();
      setIsCanvaConnected(response.data.connected);
    } catch (error) {
      console.error('Error checking Canva connection:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      // In a real implementation, this would call the API
      const response = await API.templates.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the API with proper parameters
      const response = await API.templates.getTemplates({
        source: activeTab,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
        filters: Object.keys(filters).length > 0 ? filters : undefined
      });
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCanvaAuth = async (credentials) => {
    try {
      // In a real implementation, this would call the API
      await API.templates.connectCanva(credentials);
      setCanvaAuthModalVisible(false);
      setIsCanvaConnected(true);
      fetchTemplates();
    } catch (error) {
      console.error('Error connecting to Canva:', error);
    }
  };

  const handleSearch = () => {
    fetchTemplates();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setFilterModalVisible(false);
  };

  const handleTemplateSelect = (template) => {
    // In a real implementation, this would navigate to the content editor with the template
    console.log('Selected template:', template.id);
  };

  const renderCanvaAuth = () => {
    return (
      <View style={styles.authContainer}>
        <Image 
          source={require('../../assets/canva-logo.png')} 
          style={styles.canvaLogo}
          resizeMode="contain"
        />
        <Text style={[styles.authTitle, { color: colors.text }]}>
          Connect with Canva
        </Text>
        <Text style={[styles.authDescription, { color: colors.text + '80' }]}>
          Access thousands of professional templates directly in UniSphere by connecting your Canva account.
        </Text>
        <TouchableOpacity 
          style={[styles.connectButton, { backgroundColor: colors.primary }]}
          onPress={() => setCanvaAuthModalVisible(true)}
        >
          <Text style={styles.connectButtonText}>Connect Canva</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTemplates = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Loading templates...
          </Text>
        </View>
      );
    }

    if (templates.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="images-outline" size={64} color={colors.text + '40'} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No templates found
          </Text>
          <Text style={[styles.emptySubtext, { color: colors.text + '80' }]}>
            Try adjusting your search or filters
          </Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.templatesGrid}>
        {templates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            onPress={() => handleTemplateSelect(template)}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Content Templates</Text>
        {isCanvaConnected && (
          <View style={styles.connectedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.connectedText}>Canva Connected</Text>
          </View>
        )}
      </View>

      {activeTab === 'canva' && !isCanvaConnected ? (
        renderCanvaAuth()
      ) : (
        <>
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
              <Ionicons name="search" size={20} color={colors.text} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search templates"
                placeholderTextColor={colors.text + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity 
              style={[styles.filterButton, { backgroundColor: colors.primary }]}
              onPress={() => setFilterModalVisible(true)}
            >
              <Ionicons name="options-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'canva' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab('canva')}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'canva' ? colors.primary : colors.text }
              ]}>
                Canva
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'unisphere' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab('unisphere')}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'unisphere' ? colors.primary : colors.text }
              ]}>
                UniSphere
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'custom' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab('custom')}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'custom' ? colors.primary : colors.text }
              ]}>
                My Templates
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            <TouchableOpacity 
              style={[
                styles.categoryChip, 
                selectedCategory === 'all' && { backgroundColor: colors.primary },
                { borderColor: colors.primary }
              ]}
              onPress={() => setSelectedCategory('all')}
            >
              <Text style={[
                styles.categoryText, 
                { color: selectedCategory === 'all' ? '#fff' : colors.primary }
              ]}>
                All
              </Text>
            </TouchableOpacity>
            {categories.map(category => (
              <TouchableOpacity 
                key={category.id}
                style={[
                  styles.categoryChip, 
                  selectedCategory === category.id && { backgroundColor: colors.primary },
                  { borderColor: colors.primary }
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText, 
                  { color: selectedCategory === category.id ? '#fff' : colors.primary }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.templatesContainer}>
            {renderTemplates()}
          </View>
        </>
      )}

      <TemplateFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={handleFilterChange}
      />

      <CanvaAuthModal
        visible={canvaAuthModalVisible}
        onClose={() => setCanvaAuthModalVisible(false)}
        onConnect={handleCanvaAuth}
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
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  connectedText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  canvaLogo: {
    width: 120,
    height: 60,
    marginBottom: 24,
  },
  authTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  authDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  connectButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  categoriesContainer: {
    maxHeight: 50,
    marginVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  templatesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default TemplateIntegration;
