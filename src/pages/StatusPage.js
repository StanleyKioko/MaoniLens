import React, { useState, useEffect } from 'react';

const StatusPage = () => {
  const [systemStatus, setSystemStatus] = useState({
    api: 'Online',
    dataCollection: 'Active',
    lastUpdate: '2 minutes ago',
    postsAnalyzed: '1,234',
    uptime: '99.9%',
    responseTime: '120ms'
  });

  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // In a real app, this would fetch actual system status
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'active':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'offline':
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'active':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'offline':
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Status</h1>
        <div className="text-sm text-gray-600">
          Last updated: {lastRefresh.toLocaleString()}
          <span className="inline-block w-2 h-2 bg-green-600 rounded-full ml-2 pulse"></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* API Status */}
        <div className={`p-6 border rounded-lg ${getStatusBg(systemStatus.api)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">API Status</h3>
            <div className={`w-3 h-3 rounded-full ${systemStatus.api === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <p className={`text-lg font-bold ${getStatusColor(systemStatus.api)}`}>
            {systemStatus.api}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Response time: {systemStatus.responseTime}
          </p>
        </div>

        {/* Data Collection */}
        <div className={`p-6 border rounded-lg ${getStatusBg(systemStatus.dataCollection)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Data Collection</h3>
            <div className={`w-3 h-3 rounded-full ${systemStatus.dataCollection === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <p className={`text-lg font-bold ${getStatusColor(systemStatus.dataCollection)}`}>
            {systemStatus.dataCollection}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Collecting from Twitter/X API
          </p>
        </div>

        {/* System Uptime */}
        <div className="p-6 border rounded-lg bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2">System Uptime</h3>
          <p className="text-lg font-bold text-blue-600">{systemStatus.uptime}</p>
          <p className="text-sm text-gray-600 mt-2">
            Last 30 days average
          </p>
        </div>

        {/* Last Update */}
        <div className="p-6 border rounded-lg bg-gray-50 border-gray-200">
          <h3 className="font-semibold mb-2">Last Data Update</h3>
          <p className="text-lg font-bold text-gray-700">{systemStatus.lastUpdate}</p>
          <p className="text-sm text-gray-600 mt-2">
            Auto-updates every 30 seconds
          </p>
        </div>

        {/* Posts Analyzed Today */}
        <div className="p-6 border rounded-lg bg-purple-50 border-purple-200">
          <h3 className="font-semibold mb-2">Posts Analyzed Today</h3>
          <p className="text-lg font-bold text-purple-600">{systemStatus.postsAnalyzed}</p>
          <p className="text-sm text-gray-600 mt-2">
            +234 in the last hour
          </p>
        </div>

        {/* Active Connections */}
        <div className="p-6 border rounded-lg bg-orange-50 border-orange-200">
          <h3 className="font-semibold mb-2">Active Users</h3>
          <p className="text-lg font-bold text-orange-600">42</p>
          <p className="text-sm text-gray-600 mt-2">
            Currently viewing dashboard
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent System Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-green-50 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Data collection resumed</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">System backup completed</p>
              <p className="text-xs text-gray-600">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">High traffic detected</p>
              <p className="text-xs text-gray-600">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;