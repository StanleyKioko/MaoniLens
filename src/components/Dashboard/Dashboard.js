import React, { useState, useEffect } from 'react';
import SentimentChart from './SentimentChart';
import TopicsChart from './TopicsChart';
import HashtagTracker from './HashtagTracker';
import GeospatialMap from './GeospatialMap';
import FeedbackForm from './FeedbackForm';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { useApi } from '../../hooks/useApi';
import { TRANSLATIONS, LANGUAGES } from '../../utils/constants';

const Dashboard = () => {
  const [language, setLanguage] = useState(LANGUAGES.EN);
  const [filters, setFilters] = useState({
    platform: 'All Platforms',
    language: 'All Languages',
    timeRange: 'Last 24h',
    location: 'All Locations'
  });

  // API hooks for different data
  const { data: sentimentData, loading: sentimentLoading, error: sentimentError } = useApi('sentiment');
  const { data: topicsData, loading: topicsLoading } = useApi('topics');
  const { data: hashtagsData, loading: hashtagsLoading } = useApi('hashtags');
  const { data: geoData, loading: geoLoading } = useApi('geoData');

  const translations = TRANSLATIONS[language];

  // Calculate summary statistics
  const totalPosts = hashtagsData?.reduce((sum, hashtag) => sum + hashtag.count, 0) || 1234;
  const topHashtag = hashtagsData?.[0]?.hashtag || '#UngaRevolution';
  const dominantSentiment = sentimentData ? 
    Object.keys(sentimentData).reduce((a, b) => sentimentData[a] > sentimentData[b] ? a : b) 
    : 'Negative';

  const handleLanguageToggle = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const exportData = async () => {
    try {
      const csvData = hashtagsData?.map(item => 
        `${item.hashtag},${item.count},${item.sentiment},${item.retweets}`
      ).join('\n') || '';
      
      const csvContent = 'Hashtag,Count,Sentiment,Retweets\n' + csvData;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'maonibot_data.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="kenya-green text-white p-4 relative">
        <div className="header-pattern"></div>
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/40x40?text=Maoni+Logo" 
              alt="MaoniBot Logo" 
              className="w-8 h-8 mr-2"
            />
            <h1 className="text-2xl font-bold">{translations.title}</h1>
          </div>
          <div className="flex items-center">
            <h2 className="text-lg mr-4">{translations.subtitle}</h2>
            <select 
              value={language}
              onChange={(e) => handleLanguageToggle(e.target.value)}
              className="bg-white text-black p-1 rounded"
            >
              <option value={LANGUAGES.EN}>English</option>
              <option value={LANGUAGES.SW}>Kiswahili</option>
            </select>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">{translations.totalPosts}</h3>
            <p className="text-2xl font-bold">{totalPosts.toLocaleString()}</p>
            <p className="text-gray-600">{translations.analyzedToday}</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">{translations.topHashtag}</h3>
            <p className="text-2xl font-bold">{topHashtag}</p>
            <p className="text-gray-600">{hashtagsData?.[0]?.count} posts</p>
          </div>
          <div className="bg-white p-4 rounded shadow text-center fade-in">
            <h3 className="text-lg font-semibold">{translations.dominantSentiment}</h3>
            <p className={`text-2xl font-bold ${
              dominantSentiment === 'Positive' ? 'text-green-600' : 
              dominantSentiment === 'Negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {translations[dominantSentiment.toLowerCase()]}
            </p>
            <p className="text-gray-600">
              {sentimentData?.[dominantSentiment] || 30}% of posts
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <div className="flex flex-wrap gap-4">
            <select 
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
              className="border p-2 rounded"
            >
              <option>All Platforms</option>
              <option>Twitter/X</option>
              <option>YouTube</option>
            </select>
            <select 
              value={filters.language}
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="border p-2 rounded"
            >
              <option>All Languages</option>
              <option>English</option>
              <option>Kiswahili</option>
            </select>
            <select 
              value={filters.timeRange}
              onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              className="border p-2 rounded"
            >
              <option>Last 24h</option>
              <option>Last 7d</option>
              <option>Last 30d</option>
            </select>
            <select 
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="border p-2 rounded"
            >
              <option>All Locations</option>
              <option>Nairobi</option>
              <option>Mombasa</option>
              <option>Kisumu</option>
              <option>Nakuru</option>
              <option>Eldoret</option>
            </select>
            <button 
              onClick={exportData}
              className="kenya-green text-white p-2 rounded hover:bg-green-700 transition-colors"
            >
              {translations.exportData}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {translations.lastUpdated}: <span id="lastUpdated">{new Date().toLocaleString()}</span>
            <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-2 pulse"></span>
          </p>
        </div>

        {/* Sentiment Analysis Section */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.sentimentAnalysis}</h2>
          {sentimentLoading ? (
            <LoadingSpinner />
          ) : sentimentError ? (
            <div className="error-message">Error loading sentiment data: {sentimentError}</div>
          ) : (
            <SentimentChart data={sentimentData} language={language} />
          )}
        </section>

        {/* Geospatial View */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.sentimentByCounty}</h2>
          {geoLoading ? (
            <LoadingSpinner />
          ) : (
            <GeospatialMap data={geoData} />
          )}
        </section>

        {/* Trending Topics */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.trendingTopics}</h2>
          {topicsLoading ? (
            <LoadingSpinner />
          ) : (
            <TopicsChart data={topicsData} language={language} />
          )}
        </section>

        {/* Hashtag Tracker */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.hashtagTracker}</h2>
          {hashtagsLoading ? (
            <LoadingSpinner />
          ) : (
            <HashtagTracker data={hashtagsData} language={language} />
          )}
        </section>

        {/* Top Influencers */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.topInfluencers}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { username: '@KenyaNews', followers: '10K', posts: 50, topic: '#UngaRevolution' },
              { username: '@NairobiVoice', followers: '8K', posts: 30, topic: '#CBC' },
              { username: '@MombasaTalk', followers: '5K', posts: 20, topic: '#NHIF' }
            ].map((influencer, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded text-center">
                <p className="font-semibold">{influencer.username}</p>
                <p className="text-sm text-gray-600">
                  {influencer.followers} followers | {influencer.posts} posts on {influencer.topic}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fake News Indicator */}
        <section className="bg-white p-4 rounded shadow mb-4 fade-in">
          <h2 className="text-xl font-semibold mb-2">{translations.fakeNewsIndicator}</h2>
          <div className="overflow-x-auto">
            <table className="hashtag-table w-full">
              <thead>
                <tr className="kenya-red text-white">
                  <th className="p-2">Post</th>
                  <th className="p-2">Confidence</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">"Unga prices to drop by 50% tomorrow!"</td>
                  <td className="p-2">0.85</td>
                  <td className="p-2 text-red-600">Likely False</td>
                </tr>
                <tr>
                  <td className="p-2">"NHIF to cover all Kenyans by 2026"</td>
                  <td className="p-2">0.60</td>
                  <td className="p-2 text-gray-600">Uncertain</td>
                </tr>
                <tr>
                  <td className="p-2">"Free education for all in 2025!"</td>
                  <td className="p-2">0.90</td>
                  <td className="p-2 text-red-600">Likely False</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Feedback Form */}
        <FeedbackForm language={language} />
      </div>
    </div>
  );
};

export default Dashboard;