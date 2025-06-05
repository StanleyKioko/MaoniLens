import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../utils/constants';

const Header = ({ 
  language, 
  onLanguageChange, 
  darkMode, 
  onDarkModeToggle, 
  onSidebarToggle,
  sidebarOpen 
}) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const translations = TRANSLATIONS[language];

  // Update timestamp every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatLastUpdated = (date) => {
    return new Intl.DateTimeFormat(language === 'sw' ? 'sw-KE' : 'en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <header className="kenya-green text-white shadow-lg sticky top-0 z-50 relative">
      {/* Header Pattern Background */}
      <div className="header-pattern"></div>
      
      <div className="container mx-auto px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={onSidebarToggle}
              className="lg:hidden mr-3 p-2 rounded-md hover:bg-green-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://via.placeholder.com/40x40?text=M&color=FFFFFF&background=008000" 
                alt="MaoniBot Logo" 
                className="w-10 h-10 mr-3 rounded-full border-2 border-white shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{translations.title}</h1>
                <p className="text-green-100 text-sm hidden sm:block">{translations.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="hidden md:flex items-center text-sm">
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-300 pulse' : 'bg-red-400'}`}></div>
              <span className="text-green-100">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Last Updated */}
            <div className="hidden md:block text-sm text-green-100">
              <span>{translations.lastUpdated || 'Last Updated'}: </span>
              <span className="font-medium">{formatLastUpdated(lastUpdated)}</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="p-2 rounded-md hover:bg-green-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <select 
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
              >
                <option value="en">🇬🇧 English</option>
                <option value="sw">🇰🇪 Kiswahili</option>
              </select>
            </div>

            {/* Settings Button */}
            <button
              className="p-2 rounded-md hover:bg-green-700 transition-colors"
              aria-label="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Last Updated Info */}
      <div className="md:hidden bg-green-800 bg-opacity-50 px-4 py-2 text-xs text-green-100">
        <div className="flex items-center justify-between">
          <span>{translations.lastUpdated || 'Last Updated'}: {formatLastUpdated(lastUpdated)}</span>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-300 pulse' : 'bg-red-400'}`}></div>
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;