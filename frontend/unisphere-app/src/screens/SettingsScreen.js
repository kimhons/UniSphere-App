import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [autoPost, setAutoPost] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  
  const connectedAccounts = [
    { id: 'instagram', name: 'Instagram', username: '@alexjohnson', connected: true },
    { id: 'tiktok', name: 'TikTok', username: '@alexjohnson', connected: true },
    { id: 'youtube', name: 'YouTube', username: 'Alex Johnson', connected: true },
    { id: 'twitter', name: 'Twitter', username: '@alexj', connected: true },
    { id: 'linkedin', name: 'LinkedIn', username: 'Alex Johnson', connected: false },
    { id: 'facebook', name: 'Facebook', username: 'Alex Johnson', connected: false },
    { id: 'pinterest', name: 'Pinterest', username: '@alexjohnson', connected: false },
  ];
  
  const renderAccountIcon = (accountId) => {
    let iconName = 'logo-instagram';
    if (accountId === 'tiktok') iconName = 'musical-notes';
    if (accountId === 'youtube') iconName = 'logo-youtube';
    if (accountId === 'twitter') iconName = 'logo-twitter';
    if (accountId === 'linkedin') iconName = 'logo-linkedin';
    if (accountId === 'facebook') iconName = 'logo-facebook';
    if (accountId === 'pinterest') iconName = 'logo-pinterest';
    
    return <Ionicons name={iconName} size={24} color="#8E2DE2" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileEmail}>alex.johnson@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Password & Security</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="card-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Subscription & Billing</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          {connectedAccounts.map((account) => (
            <View key={account.id} style={styles.accountItem}>
              <View style={styles.accountLeft}>
                {renderAccountIcon(account.id)}
                <View style={styles.accountInfo}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountUsername}>{account.username}</Text>
                </View>
              </View>
              {account.connected ? (
                <TouchableOpacity style={styles.disconnectButton}>
                  <Text style={styles.disconnectText}>Disconnect</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectText}>Connect</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#CCCCCC", true: "#8E2DE2" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#CCCCCC", true: "#8E2DE2" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="mail-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Email Updates</Text>
            </View>
            <Switch
              value={emailUpdates}
              onValueChange={setEmailUpdates}
              trackColor={{ false: "#CCCCCC", true: "#8E2DE2" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="time-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Auto-Post Scheduling</Text>
            </View>
            <Switch
              value={autoPost}
              onValueChange={setAutoPost}
              trackColor={{ false: "#CCCCCC", true: "#8E2DE2" }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="sync-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Background Data Sync</Text>
            </View>
            <Switch
              value={dataSync}
              onValueChange={setDataSync}
              trackColor={{ false: "#CCCCCC", true: "#8E2DE2" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Help Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="chatbubble-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="document-text-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="shield-outline" size={24} color="#8E2DE2" style={styles.settingIcon} />
              <Text style={styles.settingText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#CCCCCC" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>UniSphere v1.0.0</Text>
        </View>
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  editProfileButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountInfo: {
    marginLeft: 15,
  },
  accountName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  accountUsername: {
    fontSize: 14,
    color: '#666666',
  },
  connectButton: {
    backgroundColor: '#8E2DE2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  disconnectText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutText: {
    fontSize: 16,
    color: '#8E2DE2',
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteAccountText: {
    fontSize: 16,
    color: '#F44336',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default SettingsScreen;
