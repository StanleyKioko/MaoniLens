import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { CHART_COLORS, DEFAULT_CHART_OPTIONS, TRANSLATIONS, SAMPLE_DATA } from '../../utils/constants';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const SentimentChart = ({ data, language = 'en' }) => {
  const translations = TRANSLATIONS[language];
  
  // Use provided data or fallback to sample data
  const sentimentData = data || SAMPLE_DATA.sentiment;
  
  const pieChartData = {
    labels: [
      translations.positive,
      translations.negative, 
      translations.neutral
    ],
    datasets: [{
      data: [
        sentimentData.positive || 60,
        sentimentData.negative || 30,
        sentimentData.neutral || 10
      ],
      backgroundColor: [
        CHART_COLORS.POSITIVE,
        CHART_COLORS.NEGATIVE,
        CHART_COLORS.NEUTRAL
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const barChartData = {
    labels: ['Unga Prices', 'NHIF Reforms', 'CBC Education'],
    datasets: [
      {
        label: translations.positive,
        data: [20, 40, 60],
        backgroundColor: CHART_COLORS.POSITIVE,
      },
      {
        label: translations.negative,
        data: [50, 30, 20],
        backgroundColor: CHART_COLORS.NEGATIVE,
      },
      {
        label: translations.neutral,
        data: [30, 30, 20],
        backgroundColor: CHART_COLORS.NEUTRAL,
      }
    ]
  };

  const barOptions = {
    ...DEFAULT_CHART_OPTIONS,
    scales: { 
      y: { 
        beginAtZero: true, 
        stacked: true,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      x: { 
        stacked: true 
      }
    },
    plugins: {
      ...DEFAULT_CHART_OPTIONS.plugins,
      tooltip: {
        ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const samplePosts = [
    {
      text: language === 'sw' ? 'CBC inaboresha watoto wetu! #CBC' : 'CBC is empowering our kids! #CBC',
      sentiment: 'positive'
    },
    {
      text: language === 'sw' ? 'Bei ya unga ni juu sana! #UngaRevolution' : 'Unga prices too high! #UngaRevolution',
      sentiment: 'negative'
    },
    {
      text: language === 'sw' ? 'Tunajadili marekebisho ya NHIF leo. #NHIF' : 'Discussing NHIF reforms today. #NHIF',
      sentiment: 'neutral'
    }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentLabel = (sentiment) => {
    switch (sentiment) {
      case 'positive': return translations.positive;
      case 'negative': return translations.negative;
      default: return translations.neutral;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Pie Chart */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2 text-center">Overall Sentiment</h4>
        <div className="w-full h-64">
          <Pie 
            data={pieChartData} 
            options={{
              ...DEFAULT_CHART_OPTIONS,
              plugins: {
                ...DEFAULT_CHART_OPTIONS.plugins,
                tooltip: {
                  ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
                  callbacks: {
                    label: function(context) {
                      const percentage = ((context.raw / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                      return `${context.label}: ${percentage}%`;
                    }
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2 text-center">Sentiment by Topic</h4>
        <div className="w-full h-64">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>

      {/* Sample Posts */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2">Sample Posts</h4>
        <div className="space-y-3">
          {samplePosts.map((post, index) => (
            <div key={index} className="text-sm">
              <span className={`font-medium ${getSentimentColor(post.sentiment)}`}>
                {getSentimentLabel(post.sentiment)}:
              </span>
              <p className="text-gray-700 mt-1">"{post.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;