import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastProvider, useToast } from './UI/Toast';
import { ApiProvider } from './hooks/useApi';
import { APP_CONFIG } from './utils/constants';
import SentimentPage from './pages/SentimentPage';
import HashtagPage from './pages/HashtagPage';
import AboutPage from './pages/AboutPage';
import StatusPage from './pages/StatusPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/tailwind.css';

// Main Dashboard Component (based on your HTML)
const Dashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type) => {
    toast.addToast(message, type);
  };

  return (
    <div className="bg-gray-100 font-sans">
      {/* Header */}
      <header className="kenya-green text-white p-4 relative">
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">MaoniBot</h1>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg mr-4">Kenyan Public Sentiment & Trends</h2>
            <select className="bg-white text-black p-1 rounded">
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex space-x-6">
          <Link to="/" className="text-green-600 hover:text-green-800">Dashboard</Link>
          <Link to="/sentiment" className="text-green-600 hover:text-green-800">Sentiment</Link>
          <Link to="/hashtags" className="text-green-600 hover:text-green-800">Hashtags</Link>
          <Link to="/about" className="text-green-600 hover:text-green-800">About</Link>
          <Link to="/status" className="text-green-600 hover:text-green-800">Status</Link>
        </div>
      </nav>

      {/* Summary Cards */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">Total Posts</h3>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-gray-600">Analyzed today</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">Top Hashtag</h3>
            <p className="text-2xl font-bold">#UngaRevolution</p>
            <p className="text-gray-600">200 posts</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">Dominant Sentiment</h3>
            <p className="text-2xl font-bold text-red-600">Negative</p>
            <p className="text-gray-600">30% of posts</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="flex flex-wrap gap-4">
            <select className="border p-2 rounded">
              <option>Twitter/X</option>
              <option>YouTube</option>
            </select>
            <select className="border p-2 rounded">
              <option>All Languages</option>
              <option>English</option>
              <option>Kiswahili</option>
            </select>
            <select className="border p-2 rounded">
              <option>Last 24h</option>
              <option>Last 7d</option>
              <option>Last 30d</option>
            </select>
            <button 
              className="kenya-green text-white p-2 rounded"
              onClick={() => showToast('Data exported successfully!', 'success')}
            >
              Export Data (CSV)
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Last Updated: {lastUpdated.toLocaleString()}
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-2 pulse"></span>
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sentiment Overview */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Sentiment Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-600">Positive</span>
                <span className="font-bold">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-red-600">Negative</span>
                <span className="font-bold">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Neutral</span>
                <span className="font-bold">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{width: '10%'}}></div>
              </div>
            </div>
          </div>

          {/* Top Hashtags */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Top Hashtags</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">#UngaRevolution</span>
                <div className="text-right">
                  <div className="font-bold">200</div>
                  <div className="text-sm text-red-600">Negative</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">#KenyaDecides</span>
                <div className="text-right">
                  <div className="font-bold">150</div>
                  <div className="text-sm text-gray-600">Neutral</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">#CBC</span>
                <div className="text-right">
                  <div className="font-bold">100</div>
                  <div className="text-sm text-green-600">Positive</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Posts */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <span className="text-green-600 font-semibold">Positive:</span>
              <p>"CBC is empowering our kids! #CBC"</p>
            </div>
            <div className="p-4 border-l-4 border-red-500 bg-red-50">
              <span className="text-red-600 font-semibold">Negative:</span>
              <p>"Unga prices too high! #UngaRevolution"</p>
            </div>
            <div className="p-4 border-l-4 border-gray-500 bg-gray-50">
              <span className="text-gray-600 font-semibold">Neutral:</span>
              <p>"Discussing NHIF reforms today. #NHIF"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="kenya-black text-white p-4 mt-4">
        <div className="container mx-auto text-center">
          <p>MaoniBot | Powered by AI | Data sourced from Twitter/X | 
            <a href="#" className="underline ml-2">Contact Us</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <ApiProvider>
      <ToastProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sentiment" element={<SentimentPage />} />
              <Route path="/hashtags" element={<HashtagPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/status" element={<StatusPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </ApiProvider>
  );
}

export default App;