import React, { useState, useMemo } from 'react';
import { TRANSLATIONS, SAMPLE_DATA } from '../../utils/constants';

const HashtagTracker = ({ data, language = 'en' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('count');
  const [sortOrder, setSortOrder] = useState('desc');

  const translations = TRANSLATIONS[language];
  
  // Use provided data or fallback to sample data
  const hashtagsData = data || SAMPLE_DATA.hashtags;

  // Filter and sort hashtags based on search term and sort options
  const filteredAndSortedHashtags = useMemo(() => {
    let filtered = hashtagsData.filter(hashtag =>
      hashtag.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'sentiment') {
        // Custom sort for sentiment: Positive > Neutral > Negative
        const sentimentOrder = { 'Positive': 3, 'Neutral': 2, 'Negative': 1 };
        aValue = sentimentOrder[aValue] || 0;
        bValue = sentimentOrder[bValue] || 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [hashtagsData, searchTerm, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '👍';
      case 'negative': return '👎';
      default: return '😐';
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <span className="text-gray-400">↕️</span>;
    return sortOrder === 'asc' ? <span className="text-white">↑</span> : <span className="text-white">↓</span>;
  };

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder={translations.searchHashtag || "Search Hashtag or Keyword"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-kenya-green"
        />
        <div className="flex gap-2 text-sm text-gray-600">
          <span>Sort by:</span>
          <button
            onClick={() => handleSort('count')}
            className={`px-2 py-1 rounded ${sortBy === 'count' ? 'bg-kenya-green text-white' : 'hover:bg-gray-200'}`}
          >
            Count
          </button>
          <button
            onClick={() => handleSort('sentiment')}
            className={`px-2 py-1 rounded ${sortBy === 'sentiment' ? 'bg-kenya-green text-white' : 'hover:bg-gray-200'}`}
          >
            Sentiment
          </button>
          <button
            onClick={() => handleSort('retweets')}
            className={`px-2 py-1 rounded ${sortBy === 'retweets' ? 'bg-kenya-green text-white' : 'hover:bg-gray-200'}`}
          >
            Retweets
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-2xl font-bold text-kenya-green">{filteredAndSortedHashtags.length}</div>
          <div className="text-sm text-gray-600">Total Hashtags</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">
            {filteredAndSortedHashtags.reduce((sum, h) => sum + h.count, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Mentions</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-2xl font-bold text-green-600">
            {filteredAndSortedHashtags.filter(h => h.sentiment === 'Positive').length}
          </div>
          <div className="text-sm text-gray-600">Positive</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-2xl font-bold text-red-600">
            {filteredAndSortedHashtags.filter(h => h.sentiment === 'Negative').length}
          </div>
          <div className="text-sm text-gray-600">Negative</div>
        </div>
      </div>

      {/* Hashtags Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="hashtag-table w-full">
          <thead>
            <tr className="kenya-green text-white">
              <th 
                className="p-3 text-left cursor-pointer hover:bg-green-700 transition-colors"
                onClick={() => handleSort('hashtag')}
              >
                <div className="flex items-center justify-between">
                  Hashtag
                  <SortIcon column="hashtag" />
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-green-700 transition-colors"
                onClick={() => handleSort('count')}
              >
                <div className="flex items-center justify-between">
                  Count
                  <SortIcon column="count" />
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-green-700 transition-colors"
                onClick={() => handleSort('sentiment')}
              >
                <div className="flex items-center justify-between">
                  Sentiment
                  <SortIcon column="sentiment" />
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-green-700 transition-colors"
                onClick={() => handleSort('retweets')}
              >
                <div className="flex items-center justify-between">
                  Retweets
                  <SortIcon column="retweets" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedHashtags.length > 0 ? (
              filteredAndSortedHashtags.map((hashtag, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {hashtag.hashtag}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-semibold">{hashtag.count.toLocaleString()}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(hashtag.sentiment)}`}>
                      {getSentimentIcon(hashtag.sentiment)} {hashtag.sentiment}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-700">{hashtag.retweets?.toLocaleString() || '0'}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  {searchTerm ? `No hashtags found matching "${searchTerm}"` : 'No hashtag data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination would go here if needed */}
      {filteredAndSortedHashtags.length > 10 && (
        <div className="text-center text-sm text-gray-600">
          Showing {Math.min(10, filteredAndSortedHashtags.length)} of {filteredAndSortedHashtags.length} hashtags
        </div>
      )}
    </div>
  );
};

export default HashtagTracker;