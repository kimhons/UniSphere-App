import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import ShopifyConnectModal from '../../components/ecommerce/ShopifyConnectModal';
import ProductCard from '../../components/ecommerce/ProductCard';
import SalesMetricsCard from '../../components/ecommerce/SalesMetricsCard';
import API from '../../services/api';

const ECommerceIntegration = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('products');
  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState([]);
  const [salesMetrics, setSalesMetrics] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    topSellingProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the API
      const response = await API.ecommerce.getShopifyStatus();
      setIsConnected(response.data.connected);
      if (response.data.connected) {
        fetchProducts();
        fetchSalesMetrics();
      }
    } catch (error) {
      console.error('Error checking Shopify connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      // In a real implementation, this would call the API
      const response = await API.ecommerce.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSalesMetrics = async () => {
    try {
      // In a real implementation, this would call the API
      const response = await API.ecommerce.getSalesMetrics();
      setSalesMetrics(response.data);
    } catch (error) {
      console.error('Error fetching sales metrics:', error);
    }
  };

  const handleConnectShopify = async (credentials) => {
    try {
      // In a real implementation, this would call the API
      await API.ecommerce.connectShopify(credentials);
      setConnectModalVisible(false);
      checkConnection();
    } catch (error) {
      console.error('Error connecting to Shopify:', error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (!isConnected) {
      return (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('../../assets/shopify-logo.png')} 
            style={styles.shopifyLogo}
            resizeMode="contain"
          />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Connect your Shopify store
          </Text>
          <Text style={[styles.emptyText, { color: colors.text + '80' }]}>
            Link your Shopify store to track sales, manage products, and attribute revenue to your social content.
          </Text>
          <TouchableOpacity 
            style={[styles.connectButton, { backgroundColor: colors.primary }]}
            onPress={() => setConnectModalVisible(true)}
          >
            <Text style={styles.connectButtonText}>Connect Shopify</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (activeTab === 'products') {
      return (
        <View style={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            <ScrollView contentContainerStyle={styles.productsGrid}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onPress={() => console.log('Product pressed:', product.id)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color={colors.text + '40'} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No products found
              </Text>
            </View>
          )}
        </View>
      );
    } else if (activeTab === 'analytics') {
      return (
        <ScrollView style={styles.analyticsContainer}>
          <SalesMetricsCard 
            title="Sales Overview" 
            metrics={[
              { label: 'Total Sales', value: `$${salesMetrics.totalSales.toLocaleString()}` },
              { label: 'Total Orders', value: salesMetrics.totalOrders.toString() },
              { label: 'Average Order', value: `$${salesMetrics.averageOrderValue.toLocaleString()}` },
              { label: 'Conversion Rate', value: `${salesMetrics.conversionRate}%` }
            ]}
          />
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Selling Products</Text>
          {salesMetrics.topSellingProducts.map(product => (
            <View key={product.id} style={[styles.topProductItem, { backgroundColor: colors.card }]}>
              <Image source={{ uri: product.image }} style={styles.topProductImage} />
              <View style={styles.topProductInfo}>
                <Text style={[styles.topProductTitle, { color: colors.text }]}>{product.title}</Text>
                <Text style={[styles.topProductSales, { color: colors.text + '80' }]}>
                  {product.sales} sold • ${product.revenue.toLocaleString()} revenue
                </Text>
              </View>
              <Text style={[styles.topProductRank, { color: colors.primary }]}>#{product.rank}</Text>
            </View>
          ))}
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Attribution</Text>
          <View style={[styles.attributionCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.attributionTitle, { color: colors.text }]}>
              Social Media Attribution
            </Text>
            <Text style={[styles.attributionSubtitle, { color: colors.text + '80' }]}>
              Sales attributed to your social media content
            </Text>
            
            {/* This would be a chart in a real implementation */}
            <View style={styles.attributionChart}>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { backgroundColor: colors.primary, width: '45%' }]} />
                <Text style={styles.chartLabel}>Instagram</Text>
                <Text style={styles.chartValue}>45%</Text>
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { backgroundColor: colors.primary, width: '30%' }]} />
                <Text style={styles.chartLabel}>TikTok</Text>
                <Text style={styles.chartValue}>30%</Text>
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { backgroundColor: colors.primary, width: '15%' }]} />
                <Text style={styles.chartLabel}>YouTube</Text>
                <Text style={styles.chartValue}>15%</Text>
              </View>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { backgroundColor: colors.primary, width: '10%' }]} />
                <Text style={styles.chartLabel}>Other</Text>
                <Text style={styles.chartValue}>10%</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>eCommerce Integration</Text>
        {isConnected && (
          <View style={styles.connectedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.connectedText}>Connected to Shopify</Text>
          </View>
        )}
      </View>

      {isConnected && (
        <>
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
              <Ionicons name="search" size={20} color={colors.text} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search products"
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
                activeTab === 'products' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab('products')}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'products' ? colors.primary : colors.text }
              ]}>
                Products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                activeTab === 'analytics' && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab('analytics')}
            >
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'analytics' ? colors.primary : colors.text }
              ]}>
                Analytics
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {renderContent()}

      <ShopifyConnectModal
        visible={connectModalVisible}
        onClose={() => setConnectModalVisible(false)}
        onConnect={handleConnectShopify}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  shopifyLogo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
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
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  topProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  topProductImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  topProductInfo: {
    flex: 1,
    marginLeft: 12,
  },
  topProductTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  topProductSales: {
    fontSize: 14,
  },
  topProductRank: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  attributionCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  attributionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  attributionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  attributionChart: {
    marginTop: 8,
  },
  chartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 24,
  },
  chartFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 4,
  },
  chartLabel: {
    flex: 1,
    marginLeft: 8,
    color: '#fff',
    fontWeight: '500',
    zIndex: 1,
  },
  chartValue: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    zIndex: 1,
  },
});

export default ECommerceIntegration;
