import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About MaoniBot</h1>
      
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What is MaoniBot?</h2>
          <p className="text-gray-700 leading-relaxed">
            MaoniBot is a real-time sentiment analysis tool designed specifically for Kenyan social media conversations. 
            Our platform analyzes posts from Twitter/X and other social media platforms to provide insights into public 
            opinion and trending topics across Kenya.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Real-time sentiment analysis of Kenyan social media posts</li>
            <li>Geographic sentiment mapping across Kenyan counties</li>
            <li>Hashtag and keyword tracking</li>
            <li>Trending topics identification</li>
            <li>Fake news detection indicators</li>
            <li>Multi-language support (English and Kiswahili)</li>
            <li>Data export capabilities for researchers and analysts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">1. Data Collection</h3>
              <p className="text-sm text-gray-600">
                We collect public posts from social media platforms using official APIs and ethical scraping methods.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">2. AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Advanced AI algorithms analyze text for sentiment, topics, and authenticity in both English and Kiswahili.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">3. Insights</h3>
              <p className="text-sm text-gray-600">
                Results are presented through interactive dashboards, charts, and maps for easy understanding.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
          <p className="text-gray-700 mb-4">
            MaoniBot is powered by cutting-edge technology:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Frontend</h4>
              <ul className="text-sm text-gray-600">
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>Chart.js for visualizations</li>
                <li>Leaflet.js for mapping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Backend & AI</h4>
              <ul className="text-sm text-gray-600">
                <li>Python/Django</li>
                <li>Natural Language Processing</li>
                <li>Machine Learning models</li>
                <li>Real-time data processing</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> contact@maonibot.co.ke
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Twitter:</strong> @MaoniBotKE
            </p>
            <p className="text-gray-700">
              <strong>GitHub:</strong> github.com/maonibot
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;