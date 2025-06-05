import React from 'react';

const SentimentPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sentiment Analysis</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-green-600">Positive</h3>
            <p className="text-2xl font-bold">60%</p>
            <p className="text-gray-600">of analyzed posts</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Negative</h3>
            <p className="text-2xl font-bold">30%</p>
            <p className="text-gray-600">of analyzed posts</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-600">Neutral</h3>
            <p className="text-2xl font-bold">10%</p>
            <p className="text-gray-600">of analyzed posts</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Sample Posts by Sentiment</h3>
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
    </div>
  );
};

export default SentimentPage;