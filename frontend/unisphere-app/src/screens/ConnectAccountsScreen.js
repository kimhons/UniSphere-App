import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const ConnectAccountsScreen = ({ navigation }) => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  
  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: 'instagram', type: 'FontAwesome' },
    { id: 'tiktok', name: 'TikTok', icon: 'music', type: 'FontAwesome5' },
    { id: 'youtube', name: 'YouTube', icon: 'youtube-play', type: 'FontAwesome' },
    { id: 'twitter', name: 'Twitter', icon: 'twitter', type: 'FontAwesome' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin', type: 'FontAwesome' },
    { id: 'facebook', name: 'Facebook', icon: 'facebook', type: 'FontAwesome' },
    { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', type: 'FontAwesome' },
  ];
  
  const toggleAccount = (accountId) => {
    if (connectedAccounts.includes(accountId)) {
      setConnectedAccounts(connectedAccounts.filter(id => id !== accountId));
    } else {
      setConnectedAccounts([...connectedAccounts, accountId]);
    }
  };
  
  const handleContinue = () => {
    navigation.navigate('Dashboard');
  };
  
  const renderIcon = (platform) => {
    if (platform.type === 'FontAwesome') {
      return <FontAwesome name={platform.icon} size={24} color="#FFFFFF" />;
    } else if (platform.type === 'FontAwesome5') {
      return <FontAwesome5 name={platform.icon} size={24} color="#FFFFFF" />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A00E0', '#8E2DE2']}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Connect Your Accounts</Text>
            <Text style={styles.subtitle}>Link your social media accounts to manage them all in one place</Text>
          </View>
          
          <View style={styles.platformsContainer}>
            {socialPlatforms.map((platform) => (
              <TouchableOpacity
                key={platform.id}
                style={[
                  styles.platformButton,
                  connectedAccounts.includes(platform.id) && styles.platformButtonActive
                ]}
                onPress={() => toggleAccount(platform.id)}
              >
                <View style={styles.platformIconContainer}>
                  {renderIcon(platform)}
                </View>
                <Text style={styles.platformName}>{platform.name}</Text>
                <View style={styles.statusContainer}>
                  {connectedAccounts.includes(platform.id) ? (
                    <View style={styles.connectedIndicator}>
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      <Text style={styles.connectedText}>Connected</Text>
                    </View>
                  ) : (
                    <Text style={styles.connectText}>Connect</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#FFFFFF" />
            <Text style={styles.infoText}>
              You can always connect more accounts later from your profile settings
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.continueButton,
              connectedAccounts.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={connectedAccounts.length === 0}
          >
            <Text style={styles.continueButtonText}>
              {connectedAccounts.length === 0 ? 'Connect at least one account' : 'Continue to Dashboard'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleContinue}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 10,
  },
  platformsContainer: {
    width: '100%',
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  platformButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  platformIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  platformName: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  connectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  connectedText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  connectText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginLeft: 10,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueButtonText: {
    color: '#8E2DE2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default ConnectAccountsScreen;
