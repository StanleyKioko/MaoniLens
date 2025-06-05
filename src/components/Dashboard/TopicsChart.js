import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CHART_COLORS, DEFAULT_CHART_OPTIONS, SAMPLE_DATA } from '../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const TopicsChart = ({ data, language = 'en' }) => {
  // Use provided data or fallback to sample data
  const topicsData = data || SAMPLE_DATA.topics;
  
  const barChartData = {
    labels: topicsData.map(topic => topic.name),
    datasets: [{
      label: 'Frequency',
      data: topicsData.map(topic => topic.frequency),
      backgroundColor: CHART_COLORS.PRIMARY,
      borderColor: CHART_COLORS.SECONDARY,
      borderWidth: 1
    }]
  };

  const timelineData = {
    labels: ['May 24', 'May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30'],
    datasets: [
      {
        label: '#UngaRevolution',
        data: [20, 30, 50, 80, 100, 150, 200],
        borderColor: CHART_COLORS.NEGATIVE,
        backgroundColor: CHART_COLORS.NEGATIVE + '20',
        fill: false,
        tension: 0.4
      },
      {
        label: '#CBC',
        data: [10, 20, 30, 40, 60, 80, 100],
        borderColor: CHART_COLORS.POSITIVE,
        backgroundColor: CHART_COLORS.POSITIVE + '20',
        fill: false,
        tension: 0.4
      },
      {
        label: '#NHIF',
        data: [5, 15, 25, 35, 45, 65, 80],
        borderColor: CHART_COLORS.NEUTRAL,
        backgroundColor: CHART_COLORS.NEUTRAL + '20',
        fill: false,
        tension: 0.4
      }
    ]
  };

  const barOptions = {
    ...DEFAULT_CHART_OPTIONS,
    scales: { 
      y: { 
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      ...DEFAULT_CHART_OPTIONS.plugins,
      tooltip: {
        ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()} mentions`;
          }
        }
      }
    }
  };

  const lineOptions = {
    ...DEFAULT_CHART_OPTIONS,
    scales: { 
      y: { 
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    plugins: {
      ...DEFAULT_CHART_OPTIONS.plugins,
      title: {
        display: true,
        text: 'Topic Trends Over Time'
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Topics Bar Chart */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2 text-center">Topic Frequency</h4>
        <div className="w-full h-64">
          <Bar data={barChartData} options={barOptions} />
        </div>
      </div>

      {/* Word Cloud Placeholder */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2 text-center">Popular Keywords</h4>
        <div className="word-cloud h-48 rounded bg-white border flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-3xl font-bold text-kenya-green mb-2">Unga</div>
            <div className="text-xl font-semibold text-kenya-red mb-1">NHIF</div>
            <div className="text-lg text-gray-700 mb-1">CBC Kenya</div>
            <div className="text-sm text-gray-600">Education Politics Healthcare</div>
            <div className="text-xs text-gray-500 mt-2">Word Cloud Visualization</div>
          </div>
        </div>
      </div>

      {/* Topic Timeline */}
      <div className="bg-gray-50 p-4 rounded">
        <h4 className="font-semibold mb-2 text-center">Trending Timeline</h4>
        <div className="w-full h-64">
          <Line data={timelineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default TopicsChart;