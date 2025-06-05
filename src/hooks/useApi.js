import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// API Context
const ApiContext = createContext();

// API Provider Component
export const ApiProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const apiCall = async (endpoint, options = {}) => {
    try {
      setGlobalLoading(true);
      setGlobalError(null);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (err) {
      setGlobalError(err.message);
      throw err;
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ apiCall, globalLoading, globalError }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use API
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { apiCall } = useContext(ApiContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiCall(endpoint, options);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await apiCall(endpoint, options);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Custom hook for data export
export const useExport = () => {
  const { apiCall } = useContext(ApiContext);

  const exportData = async (format = 'csv') => {
    try {
      const data = await apiCall(API_ENDPOINTS.EXPORT, {
        method: 'GET',
        headers: {
          'Accept': format === 'csv' ? 'text/csv' : 'application/json'
        }
      });
      
      // Create download
      const blob = new Blob([data], { 
        type: format === 'csv' ? 'text/csv' : 'application/json' 
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `maonibot_data.${format}`);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  };

  return { exportData };
};

// Custom hook for feedback submission
export const useFeedback = () => {
  const { apiCall } = useContext(ApiContext);

  const submitFeedback = async (feedbackData) => {
    try {
      const result = await apiCall(API_ENDPOINTS.FEEDBACK, {
        method: 'POST',
        body: JSON.stringify(feedbackData),
      });
      return result;
    } catch (error) {
      console.error('Feedback submission failed:', error);
      throw error;
    }
  };

  return { submitFeedback };
};

export default useApi;