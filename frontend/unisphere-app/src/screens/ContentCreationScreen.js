import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ContentCreationScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [contentType, setContentType] = useState('post');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'tiktok']);
  const [caption, setCaption] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: 'logo-instagram' },
    { id: 'tiktok', name: 'TikTok', icon: 'musical-notes' },
    { id: 'youtube', name: 'YouTube', icon: 'logo-youtube' },
    { id: 'twitter', name: 'Twitter', icon: 'logo-twitter' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'logo-linkedin' },
    { id: 'facebook', name: 'Facebook', icon: 'logo-facebook' },
    { id: 'pinterest', name: 'Pinterest', icon: 'logo-pinterest' },
  ];
  
  const contentTypes = [
    { id: 'post', name: 'Post', icon: 'image-outline' },
    { id: 'video', name: 'Video', icon: 'videocam-outline' },
    { id: 'story', name: 'Story', icon: 'ellipsis-horizontal-circle-outline' },
    { id: 'reel', name: 'Reel', icon: 'film-outline' },
  ];
  
  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };
  
  const generateAiSuggestions = () => {
    // In a real app, this would call the backend AI service
    setAiSuggestions([
      "Check out my latest summer fashion finds! Perfect for beach days and outdoor adventures. #SummerStyle #FashionTips",
      "Just dropped my summer essentials collection! Which one is your favorite? Let me know in the comments! ☀️👗",
      "Summer vibes and new styles! Swipe to see all the looks I've put together for the season. #OOTD #SummerFashion"
    ]);
  };
  
  const applySuggestion = (suggestion) => {
    setCaption(suggestion);
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
        <Text style={styles.headerTitle}>Content Studio</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Draft</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'create' && styles.activeTab]}
          onPress={() => setActiveTab('create')}
        >
          <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'templates' && styles.activeTab]}
          onPress={() => setActiveTab('templates')}
        >
          <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'drafts' && styles.activeTab]}
          onPress={() => setActiveTab('drafts')}
        >
          <Text style={[styles.tabText, activeTab === 'drafts' && styles.activeTabText]}>Drafts</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentTypeContainer}>
          <Text style={styles.sectionTitle}>Content Type</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.contentTypeScroll}
          >
            {contentTypes.map((type) => (
              <TouchableOpacity 
                key={type.id}
                style={[
                  styles.contentTypeButton,
                  contentType === type.id && styles.contentTypeButtonActive
                ]}
                onPress={() => setContentType(type.id)}
              >
                <Ionicons 
                  name={type.icon} 
                  size={24} 
                  color={contentType === type.id ? '#FFFFFF' : '#8E2DE2'} 
                />
                <Text 
                  style={[
                    styles.contentTypeText,
                    contentType === type.id && styles.contentTypeTextActive
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.platformsContainer}>
          <Text style={styles.sectionTitle}>Platforms</Text>
          <View style={styles.platformsGrid}>
            {platforms.map((platform) => (
              <TouchableOpacity 
                key={platform.id}
                style={[
                  styles.platformButton,
                  selectedPlatforms.includes(platform.id) && styles.platformButtonActive
                ]}
                onPress={() => togglePlatform(platform.id)}
              >
                <Ionicons 
                  name={platform.icon} 
                  size={24} 
                  color={selectedPlatforms.includes(platform.id) ? '#FFFFFF' : '#8E2DE2'} 
                />
                <Text 
                  style={[
                    styles.platformText,
                    selectedPlatforms.includes(platform.id) && styles.platformTextActive
                  ]}
                >
                  {platform.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.mediaContainer}>
          <Text style={styles.sectionTitle}>Media</Text>
          <View style={styles.mediaUploadContainer}>
            <TouchableOpacity style={styles.mediaUploadButton}>
              <Ionicons name="add" size={40} color="#8E2DE2" />
              <Text style={styles.mediaUploadText}>Add Media</Text>
            </TouchableOpacity>
            <View style={styles.mediaPreviewContainer}>
              <Image
                source={require('../assets/media_placeholder.png')}
                style={styles.mediaPreview}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.mediaEditButton}>
                <Ionicons name="create-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.captionContainer}>
          <View style={styles.captionHeader}>
            <Text style={styles.sectionTitle}>Caption</Text>
            <TouchableOpacity 
              style={styles.aiButton}
              onPress={generateAiSuggestions}
            >
              <Ionicons name="bulb-outline" size={20} color="#8E2DE2" />
              <Text style={styles.aiButtonText}>AI Suggestions</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.captionInput}
            placeholder="Write your caption here..."
            placeholderTextColor="#AAAAAA"
            multiline
            value={caption}
            onChangeText={setCaption}
          />
          
          {aiSuggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>AI Suggestions</Text>
              {aiSuggestions.map((suggestion, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => applySuggestion(suggestion)}
                >
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                  <Ionicons name="add-circle-outline" size={20} color="#8E2DE2" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.hashtagsContainer}>
          <View style={styles.captionHeader}>
            <Text style={styles.sectionTitle}>Hashtags</Text>
            <TouchableOpacity style={styles.aiButton}>
              <Ionicons name="bulb-outline" size={20} color="#8E2DE2" />
              <Text style={styles.aiButtonText}>Generate Hashtags</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hashtagsContent}>
            <View style={styles.hashtagItem}>
              <Text style={styles.hashtagText}>#SummerStyle</Text>
              <TouchableOpacity>
                <Ionicons name="close-circle" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
            <View style={styles.hashtagItem}>
              <Text style={styles.hashtagText}>#FashionTips</Text>
              <TouchableOpacity>
                <Ionicons name="close-circle" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
            <View style={styles.hashtagItem}>
              <Text style={styles.hashtagText}>#OOTD</Text>
              <TouchableOpacity>
                <Ionicons name="close-circle" size={20} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.schedulingContainer}>
          <Text style={styles.sectionTitle}>Scheduling</Text>
          <TouchableOpacity style={styles.schedulingButton}>
            <Ionicons name="calendar-outline" size={24} color="#8E2DE2" />
            <Text style={styles.schedulingButtonText}>Schedule for Later</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.postButton}>
            <Text style={styles.postButtonText}>Post Now</Text>
          </TouchableOpacity>
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
  saveButton: {
    paddingHorizontal: 10,
  },
  saveButtonText: {
    fontSize: 14,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  contentTypeContainer: {
    marginBottom: 20,
  },
  contentTypeScroll: {
    marginLeft: -5,
  },
  contentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  contentTypeButtonActive: {
    backgroundColor: '#8E2DE2',
  },
  contentTypeText: {
    fontSize: 14,
    color: '#8E2DE2',
    marginLeft: 5,
  },
  contentTypeTextActive: {
    color: '#FFFFFF',
  },
  platformsContainer: {
    marginBottom: 20,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  platformButtonActive: {
    backgroundColor: '#8E2DE2',
  },
  platformText: {
    fontSize: 14,
    color: '#8E2DE2',
    marginLeft: 5,
  },
  platformTextActive: {
    color: '#FFFFFF',
  },
  mediaContainer: {
    marginBottom: 20,
  },
  mediaUploadContainer: {
    flexDirection: 'row',
  },
  mediaUploadButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  mediaUploadText: {
    fontSize: 12,
    color: '#8E2DE2',
    marginTop: 5,
  },
  mediaPreviewContainer: {
    position: 'relative',
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  mediaEditButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captionContainer: {
    marginBottom: 20,
  },
  captionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  aiButtonText: {
    fontSize: 12,
    color: '#8E2DE2',
    marginLeft: 5,
  },
  captionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  suggestionsContainer: {
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  suggestionText: {
    fontSize: 14,
    color: '#666666',
    flex: 1,
    marginRight: 10,
  },
  hashtagsContainer: {
    marginBottom: 20,
  },
  hashtagsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  hashtagText: {
    fontSize: 14,
    color: '#8E2DE2',
    marginRight: 5,
  },
  schedulingContainer: {
    marginBottom: 30,
  },
  schedulingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
  },
  schedulingButtonText: {
    fontSize: 16,
    color: '#8E2DE2',
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  postButton: {
    backgroundColor: '#8E2DE2',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ContentCreationScreen;
