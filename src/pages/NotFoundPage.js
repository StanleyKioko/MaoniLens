import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto p-4 text-center min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Go to Homepage
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these pages:</p>
            <div className="mt-2 space-x-4">
              <Link to="/sentiment" className="text-green-600 hover:underline">Sentiment</Link>
              <Link to="/hashtags" className="text-green-600 hover:underline">Hashtags</Link>
              <Link to="/about" className="text-green-600 hover:underline">About</Link>
              <Link to="/status" className="text-green-600 hover:underline">Status</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;