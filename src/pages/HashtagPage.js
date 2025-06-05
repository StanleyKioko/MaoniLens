import React, { useState } from 'react';

const HashtagPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const hashtags = [
    { name: '#UngaRevolution', count: 200, sentiment: 'Negative', retweets: 1200 },
    { name: '#KenyaDecides', count: 150, sentiment: 'Neutral', retweets: 800 },
    { name: '#CBC', count: 100, sentiment: 'Positive', retweets: 600 },
    { name: '#NHIF', count: 80, sentiment: 'Negative', retweets: 400 },
    { name: '#HustlerFund', count: 50, sentiment: 'Positive', retweets: 300 },
  ];

  const filteredHashtags = hashtags.filter(hashtag =>
    hashtag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600';
      case 'Negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hashtag Analysis</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Hashtag or Keyword"
            className="border p-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="kenya-green text-white">
                <th className="p-2 text-left">Hashtag</th>
                <th className="p-2 text-left">Count</th>
                <th className="p-2 text-left">Sentiment</th>
                <th className="p-2 text-left">Retweets</th>
              </tr>
            </thead>
            <tbody>
              {filteredHashtags.map((hashtag, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="p-2 font-semibold">{hashtag.name}</td>
                  <td className="p-2">{hashtag.count}</td>
                  <td className={`p-2 ${getSentimentColor(hashtag.sentiment)}`}>
                    {hashtag.sentiment}
                  </td>
                  <td className="p-2">{hashtag.retweets.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HashtagPage;