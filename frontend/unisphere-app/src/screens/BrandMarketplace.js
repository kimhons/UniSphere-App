// BrandMarketplace.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import FilterModal from '../../components/marketplace/FilterModal';
import CreatorCard from '../../components/marketplace/CreatorCard';
import BrandPortalHeader from '../../components/marketplace/BrandPortalHeader';
import API from '../../services/api';

const BrandMarketplace = ({ navigation }) => {
  const { colors } = useTheme();
  const [creators, setCreators] = useState([]);
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    platforms: [],
    categories: [],
    followerRange: [1000, 1000000],
    engagementRate: 0,
    verificationLevel: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreators();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, creators]);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the API
      const response = await API.marketplace.getVerifiedCreators();
      setCreators(response.data);
      setFilteredCreators(response.data);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let results = [...creators];
    
    // Apply search query
    if (searchQuery) {
      results = results.filter(creator => 
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply platform filters
    if (filters.platforms.length > 0) {
      results = results.filter(creator => 
        creator.platforms.some(platform => filters.platforms.includes(platform))
      );
    }
    
    // Apply category filters
    if (filters.categories.length > 0) {
      results = results.filter(creator => 
        filters.categories.includes(creator.niche)
      );
    }
    
    // Apply follower range filter
    results = results.filter(creator => 
      creator.followers >= filters.followerRange[0] && 
      creator.followers <= filters.followerRange[1]
    );
    
    // Apply engagement rate filter
    if (filters.engagementRate > 0) {
      results = results.filter(creator => 
        creator.engagementRate >= filters.engagementRate
      );
    }
    
    // Apply verification level filter
    if (filters.verificationLevel.length > 0) {
      results = results.filter(creator => 
        filters.verificationLevel.includes(creator.verificationLevel)
      );
    }
    
    setFilteredCreators(results);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setFilterModalVisible(false);
  };

  const renderCreatorItem = ({ item }) => (
    <CreatorCard 
      creator={item} 
      onPress={() => navigation.navigate('CreatorProfile', { creatorId: item.id })}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <BrandPortalHeader />
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Ionicons name="search" size={20} color={colors.text} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search creators by name or niche"
            placeholderTextColor={colors.text + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Ionicons name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: colors.text }]}>
          {filteredCreators.length} verified creators found
        </Text>
        
        <FlatList
          data={filteredCreators}
          renderItem={renderCreatorItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.creatorsList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No creators found matching your criteria
              </Text>
            </View>
          }
        />
      </View>
      
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={handleFilterChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
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
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsText: {
    fontSize: 14,
    marginBottom: 16,
  },
  creatorsList: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BrandMarketplace;
