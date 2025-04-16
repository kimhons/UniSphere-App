import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import PricingCard from '../../components/pricing/PricingCard';
import PricingFeatureList from '../../components/pricing/PricingFeatureList';
import PricingComparisonModal from '../../components/pricing/PricingComparisonModal';

const PricingScreen = () => {
  const { colors } = useTheme();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'annual' or 'monthly'
  const [comparisonModalVisible, setComparisonModalVisible] = useState(false);
  
  const pricingPlans = [
    {
      id: 'creator',
      name: 'Creator',
      price: billingCycle === 'annual' ? 79 : 99,
      description: 'Perfect for individual creators just getting started',
      features: [
        'All core platform features',
        'Up to 5 connected social accounts',
        'Basic analytics and AI features',
        'Content creation studio',
        'Cross-platform scheduler',
        'Basic monetization tools',
        'No platform fees on collaborations',
        'Community support'
      ],
      popular: false,
      color: colors.primary
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'annual' ? 199 : 249,
      description: 'For serious creators looking to grow and monetize',
      features: [
        'Everything in Creator, plus:',
        'Unlimited social accounts',
        'Advanced analytics and AI features',
        'Priority support',
        'Content rights management',
        'Advanced monetization tools',
        'eCommerce integration',
        'No platform fees on collaborations',
        'Additional team member seats (2)'
      ],
      popular: true,
      color: colors.primary
    },
    {
      id: 'business',
      name: 'Business',
      price: billingCycle === 'annual' ? 499 : 599,
      description: 'For creator teams and small agencies',
      features: [
        'Everything in Professional, plus:',
        'Team collaboration tools',
        'Advanced monetization features',
        'White-label options',
        'API access',
        'Brand marketplace access',
        'Advanced campaign management',
        'No platform fees on collaborations',
        'Additional team member seats (5)'
      ],
      popular: false,
      color: colors.primary
    }
  ];
  
  const enterprisePlan = {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large creator teams and agencies',
    features: [
      'Everything in Business, plus:',
      'Custom integrations',
      'Dedicated account manager',
      'Custom training and onboarding',
      'Advanced security features',
      'Priority feature requests',
      'Custom analytics dashboards',
      'No platform fees on collaborations',
      'Unlimited team member seats'
    ],
    popular: false,
    color: colors.primary
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Pricing Plans</Text>
        <TouchableOpacity 
          style={styles.compareButton}
          onPress={() => setComparisonModalVisible(true)}
        >
          <Text style={[styles.compareButtonText, { color: colors.primary }]}>Compare with competitors</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.billingToggle}>
        <Text style={[styles.billingLabel, { color: colors.text }]}>Monthly</Text>
        <TouchableOpacity 
          style={[
            styles.toggleContainer, 
            { backgroundColor: colors.primary + '20' }
          ]}
          onPress={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
        >
          <View style={[
            styles.toggleButton, 
            { 
              backgroundColor: colors.primary,
              transform: [{ translateX: billingCycle === 'annual' ? 28 : 0 }]
            }
          ]} />
        </TouchableOpacity>
        <View style={styles.annualLabelContainer}>
          <Text style={[styles.billingLabel, { color: colors.text }]}>Annual</Text>
          <View style={[styles.saveBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.saveText}>Save 20%</Text>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.plansContainer} showsVerticalScrollIndicator={false}>
        {pricingPlans.map(plan => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            onSelect={() => console.log(`Selected plan: ${plan.id}`)}
          />
        ))}
        
        <View style={[styles.enterpriseContainer, { backgroundColor: colors.card }]}>
          <View style={styles.enterpriseHeader}>
            <Text style={[styles.enterpriseName, { color: colors.text }]}>{enterprisePlan.name}</Text>
            <Text style={[styles.enterprisePrice, { color: colors.text }]}>{enterprisePlan.price}</Text>
          </View>
          <Text style={[styles.enterpriseDescription, { color: colors.text + '80' }]}>
            {enterprisePlan.description}
          </Text>
          <PricingFeatureList features={enterprisePlan.features} color={colors.primary} />
          <TouchableOpacity 
            style={[styles.contactButton, { borderColor: colors.primary }]}
            onPress={() => console.log('Contact for enterprise')}
          >
            <Text style={[styles.contactButtonText, { color: colors.primary }]}>Contact Sales</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.guaranteeContainer}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
          <Text style={[styles.guaranteeText, { color: colors.text }]}>
            30-day money-back guarantee
          </Text>
        </View>
        
        <View style={styles.faqContainer}>
          <Text style={[styles.faqTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>
              Does UniSphere charge platform fees?
            </Text>
            <Text style={[styles.faqAnswer, { color: colors.text + '80' }]}>
              No, UniSphere does not charge any platform fees on brand collaborations or monetization. You keep 100% of your earnings, unlike competitors who charge 5-10% fees.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>
              Can I change plans later?
            </Text>
            <Text style={[styles.faqAnswer, { color: colors.text + '80' }]}>
              Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, your new rate will apply at the next billing cycle.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={[styles.faqQuestion, { color: colors.text }]}>
              Is there a free trial?
            </Text>
            <Text style={[styles.faqAnswer, { color: colors.text + '80' }]}>
              Yes, all plans come with a 14-day free trial. No credit card required to start.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <PricingComparisonModal
        visible={comparisonModalVisible}
        onClose={() => setComparisonModalVisible(false)}
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
  compareButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  compareButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  billingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggleContainer: {
    width: 56,
    height: 28,
    borderRadius: 14,
    marginHorizontal: 12,
    padding: 2,
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  annualLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  plansContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  enterpriseContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  enterpriseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  enterpriseName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  enterprisePrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  enterpriseDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  contactButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  guaranteeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  guaranteeText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  faqContainer: {
    marginBottom: 40,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default PricingScreen;
