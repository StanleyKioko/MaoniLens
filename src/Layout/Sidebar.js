import React, { useState } from 'react';
import { TRANSLATIONS } from '../utils/constants';

const Sidebar = ({ isOpen, onClose, language }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const translations = TRANSLATIONS[language];

  const navigationItems = [
    {
      id: 'dashboard',
      icon: '📊',
      label: language === 'sw' ? 'Dashibodi' : 'Dashboard',
      href: '#dashboard'
    },
    {
      id: 'sentiment',
      icon: '😊',
      label: translations.sentimentAnalysis,
      href: '#sentiment'
    },
    {
      id: 'geospatial',
      icon: '🗺️',
      label: translations.sentimentByCounty,
      href: '#geospatial'
    },
    {
      id: 'topics',
      icon: '🔥',
      label: translations.trendingTopics,
      href: '#topics'
    },
    {
      id: 'hashtags',
      icon: '#️⃣',
      label: translations.hashtagTracker,
      href: '#hashtags'
    },
    {
      id: 'influencers',
      icon: '👥',
      label: translations.topInfluencers,
      href: '#influencers'
    },
    {
      id: 'fakenews',
      icon: '⚠️',
      label: translations.fakeNewsIndicator,
      href: '#fakenews'
    },
    {
      id: 'feedback',
      icon: '📝',
      label: translations.shareYourFeedback,
      href: '#feedback'
    }
  ];

  const quickStats = [
    {
      label: language === 'sw' ? 'Jumla ya Machapisho' : 'Total Posts',
      value: '1,234',
      change: '+12%',
      positive: true
    },
    {
      label: language === 'sw' ? 'Hashtag za Leo' : 'Today\'s Hashtags',
      value: '45',
      change: '+8%',
      positive: true
    },
    {
      label: language === 'sw' ? 'Hisia Chanya' : 'Positive Sentiment',
      value: '60%',
      change: '+5%',
      positive: true
    },
    {
      label: language === 'sw' ? 'Hisia Hasi' : 'Negative Sentiment',
      value: '30%',
      change: '-3%',
      positive: false
    }
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    
    // Smooth scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {language === 'sw' ? 'Menyu Kuu' : 'Navigation'}
          </h3>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`
                w-full flex items-center px-3 py-3 text-left rounded-lg transition-colors duration-200
                ${activeSection === item.id
                  ? 'bg-kenya-green text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
            {language === 'sw' ? 'Takwimu za Haraka' : 'Quick Stats'}
          </h4>
          <div className="space-y-3">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.positive 
                      ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900'
                      : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {language === 'sw' ? 'Imeundwa na' : 'Powered by'}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <img 
                src="https://via.placeholder.com/20x20?text=xAI&color=FFFFFF&background=000000" 
                alt="xAI" 
                className="w-5 h-5 rounded"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">xAI Technology</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;