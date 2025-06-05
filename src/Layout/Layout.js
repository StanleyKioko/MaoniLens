import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorBoundary from '../UI/ErrorBoundary';
import { LANGUAGES } from '../utils/constants';

const Layout = ({ children }) => {
  const [language, setLanguage] = useState(LANGUAGES.EN);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize layout on mount
  useEffect(() => {
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('maonibot_language') || LANGUAGES.EN;
    const savedDarkMode = localStorage.getItem('maonibot_darkmode') === 'true';
    
    setLanguage(savedLanguage);
    setDarkMode(savedDarkMode);
    
    // Apply dark mode class to body if enabled
    if (savedDarkMode) {
      document.body.classList.add('dark');
    }
    
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('maonibot_language', newLanguage);
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('maonibot_darkmode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // Handle sidebar toggle
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside (mobile)
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading MaoniBot...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* Header */}
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          darkMode={darkMode}
          onDarkModeToggle={handleDarkModeToggle}
          onSidebarToggle={handleSidebarToggle}
          sidebarOpen={sidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            language={language}
          />

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={handleOverlayClick}
            />
          )}

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer language={language} />

        {/* Back to Top Button */}
        <BackToTopButton />
      </div>
    </ErrorBoundary>
  );
};

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-kenya-green hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 animate-pulse"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Layout;