// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  SENTIMENT: '/sentiment',
  SENTIMENT_BY_TOPIC: '/sentiment_by_topic',
  TOPICS: '/topics',
  HASHTAGS: '/hashtags',
  INFLUENCERS: '/influencers',
  FAKE_NEWS: '/fake_news',
  FEEDBACK: '/feedback',
  GEO_DATA: '/geo_data'
};

// Chart Colors (Kenyan Flag Colors)
export const CHART_COLORS = {
  POSITIVE: '#008000',  // Green
  NEGATIVE: '#FF0000',  // Red
  NEUTRAL: '#808080',   // Gray
  PRIMARY: '#008000',   // Kenya Green
  SECONDARY: '#000000', // Kenya Black
  ACCENT: '#FFFFFF'     // Kenya White
};

// Language Options
export const LANGUAGES = {
  EN: 'en',
  SW: 'sw'
};

// Translation Keys
export const TRANSLATIONS = {
  [LANGUAGES.EN]: {
    title: 'MaoniBot',
    subtitle: 'Kenyan Public Sentiment & Trends',
    sentimentAnalysis: 'Sentiment Analysis',
    sentimentByCounty: 'Sentiment by County',
    trendingTopics: 'Trending Topics',
    hashtagTracker: 'Hashtag Tracker',
    topInfluencers: 'Top Influencers',
    fakeNewsIndicator: 'Fake News Indicator',
    shareYourFeedback: 'Share Your Feedback',
    totalPosts: 'Total Posts',
    analyzedToday: 'Analyzed today',
    topHashtag: 'Top Hashtag',
    dominantSentiment: 'Dominant Sentiment',
    positive: 'Positive',
    negative: 'Negative',
    neutral: 'Neutral',
    lastUpdated: 'Last Updated',
    exportData: 'Export Data (CSV)',
    searchHashtag: 'Search Hashtag or Keyword',
    submitFeedback: 'Submit Feedback',
    yourName: 'Your Name',
    suggestTopic: 'Suggest a Topic or Hashtag',
    yourFeedback: 'Your Feedback'
  },
  [LANGUAGES.SW]: {
    title: 'Roboti ya Maoni',
    subtitle: 'Maarifa ya Wakati Halisi kutoka Mazungumzo ya Mtandaoni ya Kenya',
    sentimentAnalysis: 'Uchambuzi wa Hisia',
    sentimentByCounty: 'Hisia kwa Kaunti',
    trendingTopics: 'Mada za Mwenendo',
    hashtagTracker: 'Kifuatiliaji cha Hashtag',
    topInfluencers: 'Wanathawanyiko wa Juu',
    fakeNewsIndicator: 'Kiashiria cha Habari za Uongo',
    shareYourFeedback: 'Toa Maoni Yako',
    totalPosts: 'Jumla ya Machapisho',
    analyzedToday: 'Yamechambuliwa leo',
    topHashtag: 'Hashtag ya Juu',
    dominantSentiment: 'Hisia Kuu',
    positive: 'Chanya',
    negative: 'Hasi',
    neutral: 'Wastani',
    lastUpdated: 'Imesasishwa Mwisho',
    exportData: 'Hamisha Data (CSV)',
    searchHashtag: 'Tafuta Hashtag au Neno Muhimu',
    submitFeedback: 'Wasilisha Maoni',
    yourName: 'Jina Lako',
    suggestTopic: 'Pendekeza Mada au Hashtag',
    yourFeedback: 'Maoni Yako'
  }
};

// Default Chart Options
export const DEFAULT_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#008000',
      borderWidth: 1
    }
  }
};

// Map Configuration
export const MAP_CONFIG = {
  CENTER: [-1.286389, 36.817223], // Nairobi coordinates
  ZOOM: 6,
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
};

// Kenya Counties Coordinates
export const KENYA_COUNTIES = [
  { name: 'Nairobi', coords: [-1.286389, 36.817223] },
  { name: 'Mombasa', coords: [-4.043477, 39.668206] },
  { name: 'Kisumu', coords: [-0.091702, 34.767963] },
  { name: 'Nakuru', coords: [-0.303099, 36.080025] },
  { name: 'Eldoret', coords: [0.514277, 35.269779] }
];

// Sample Data for Development
export const SAMPLE_DATA = {
  sentiment: {
    positive: 60,
    negative: 30,
    neutral: 10
  },
  hashtags: [
    { hashtag: '#UngaRevolution', count: 200, sentiment: 'Negative', retweets: 1200 },
    { hashtag: '#KenyaDecides', count: 150, sentiment: 'Neutral', retweets: 800 },
    { hashtag: '#CBC', count: 100, sentiment: 'Positive', retweets: 600 },
    { hashtag: '#NHIF', count: 80, sentiment: 'Negative', retweets: 400 },
    { hashtag: '#HustlerFund', count: 50, sentiment: 'Positive', retweets: 300 }
  ],
  topics: [
    { name: 'Unga Prices', frequency: 120 },
    { name: 'NHIF Reforms', frequency: 80 },
    { name: 'CBC Education', frequency: 60 },
    { name: 'Politics', frequency: 50 },
    { name: 'Healthcare', frequency: 30 }
  ],
  influencers: [
    { username: '@KenyaNews', followers: '10K', posts: 50, topic: '#UngaRevolution' },
    { username: '@NairobiVoice', followers: '8K', posts: 30, topic: '#CBC' },
    { username: '@MombasaTalk', followers: '5K', posts: 20, topic: '#NHIF' }
  ]
};

// Filter Options
export const FILTER_OPTIONS = {
  platforms: ['Twitter/X', 'YouTube'],
  languages: ['All Languages', 'English', 'Kiswahili'],
  timeRanges: ['Last 24h', 'Last 7d', 'Last 30d'],
  locations: ['All Locations', 'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  DATA_NOT_FOUND: 'Data not found.',
  INVALID_INPUT: 'Please enter valid input.',
  FEEDBACK_REQUIRED: 'Please fill in all required fields.'
};

export const APP_CONFIG = {
  name: 'MaoniBot',
  version: '1.0.0',
  description: 'Kenyan Public Sentiment & Trends',
  author: 'MaoniBot Team',
  updateInterval: 30000, // 30 seconds
  maxRetries: 3,
  timeout: 10000, // 10 seconds
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FEEDBACK_SUBMITTED: 'Thank you for your feedback!',
  DATA_EXPORTED: 'Data exported successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
};