import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '../../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      if (status === 404) {
        throw new Error(ERROR_MESSAGES.DATA_NOT_FOUND);
      } else if (status >= 500) {
        throw new Error(ERROR_MESSAGES.SERVER_ERROR);
      }
    } else if (error.request) {
      // Network error
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    throw error;
  }
);

// API Service Functions
export const apiService = {
  // Get sentiment data
  getSentiment: async () => {
    try {
      return await api.get(API_ENDPOINTS.SENTIMENT);
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
      throw error;
    }
  },

  // Get sentiment by topic
  getSentimentByTopic: async () => {
    try {
      return await api.get(API_ENDPOINTS.SENTIMENT_BY_TOPIC);
    } catch (error) {
      console.error('Error fetching sentiment by topic:', error);
      throw error;
    }
  },

  // Get topics data
  getTopics: async () => {
    try {
      return await api.get(API_ENDPOINTS.TOPICS);
    } catch (error) {
      console.error('Error fetching topics data:', error);
      throw error;
    }
  },

  // Get hashtags data
  getHashtags: async () => {
    try {
      return await api.get(API_ENDPOINTS.HASHTAGS);
    } catch (error) {
      console.error('Error fetching hashtags data:', error);
      throw error;
    }
  },

  // Get influencers data
  getInfluencers: async () => {
    try {
      return await api.get(API_ENDPOINTS.INFLUENCERS);
    } catch (error) {
      console.error('Error fetching influencers data:', error);
      throw error;
    }
  },

  // Get fake news data
  getFakeNews: async () => {
    try {
      return await api.get(API_ENDPOINTS.FAKE_NEWS);
    } catch (error) {
      console.error('Error fetching fake news data:', error);
      throw error;
    }
  },

  // Get geographical data
  getGeoData: async () => {
    try {
      return await api.get(API_ENDPOINTS.GEO_DATA);
    } catch (error) {
      console.error('Error fetching geo data:', error);
      throw error;
    }
  },

  // Submit feedback
  submitFeedback: async (feedbackData) => {
    try {
      return await api.post(API_ENDPOINTS.FEEDBACK, feedbackData);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  },

  // Export data as CSV
  exportData: async (dataType = 'hashtags') => {
    try {
      const response = await api.get(`/export/${dataType}`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `maonibot_${dataType}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }
};

export default apiService;