import React from 'react';
import { TRANSLATIONS } from '../utils/constants';

const Breadcrumb = ({ items, language = 'en' }) => {
  const translations = TRANSLATIONS[language];

  // Default breadcrumb if no items provided
  const defaultItems = [
    { 
      label: language === 'sw' ? 'Nyumbani' : 'Home', 
      href: '#home',
      active: false 
    },
    { 
      label: language === 'sw' ? 'Dashibodi' : 'Dashboard', 
      href: '#dashboard',
      active: true 
    }
  ];

  const breadcrumbItems = items || defaultItems;

  const handleNavigation = (href, active) => {
    if (!active && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 text-gray-400 mx-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            
            {item.active ? (
              <span className="text-gray-500 text-sm font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item.href, item.active)}
                className="text-gray-700 hover:text-kenya-green text-sm font-medium transition-colors duration-200"
              >
                {index === 0 && (
                  <svg 
                    className="w-4 h-4 mr-1 inline" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                )}
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;