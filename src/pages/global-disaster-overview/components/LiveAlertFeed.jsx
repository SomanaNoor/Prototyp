import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveAlertFeed = () => {
  const [alerts, setAlerts] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const mockAlerts = [
    {
      id: 'alert-001',
      type: 'earthquake',
      severity: 'critical',
      title: 'Magnitude 7.2 Earthquake',
      location: 'Manila, Philippines',
      timestamp: new Date(Date.now() - 300000),
      description: 'Major seismic activity detected with potential for significant infrastructure damage and population displacement.',
      affectedPopulation: 2400000,
      confidence: 94
    },
    {
      id: 'alert-002',
      type: 'flood',
      severity: 'high',
      title: 'Flash Flood Warning',
      location: 'Dubai, UAE',
      timestamp: new Date(Date.now() - 900000),
      description: 'Rapid water level rise in urban areas following unprecedented rainfall. Evacuation routes activated.',
      affectedPopulation: 850000,
      confidence: 87
    },
    {
      id: 'alert-003',
      type: 'cyclone',
      severity: 'critical',
      title: 'Category 4 Cyclone Approaching',
      location: 'Cebu, Philippines',
      timestamp: new Date(Date.now() - 1800000),
      description: 'Tropical cyclone with sustained winds of 240 km/h expected to make landfall within 6 hours.',
      affectedPopulation: 1200000,
      confidence: 91
    },
    {
      id: 'alert-004',
      type: 'wildfire',
      severity: 'high',
      title: 'Wildfire Spreading Rapidly',
      location: 'Riyadh, Saudi Arabia',
      timestamp: new Date(Date.now() - 2700000),
      description: 'Desert fire expanding due to high winds. Critical infrastructure at risk including power stations.',
      affectedPopulation: 450000,
      confidence: 82
    },
    {
      id: 'alert-005',
      type: 'drought',
      severity: 'medium',
      title: 'Severe Drought Conditions',
      location: 'Jakarta, Indonesia',
      timestamp: new Date(Date.now() - 3600000),
      description: 'Water reserves critically low. Agricultural systems failing across metropolitan region.',
      affectedPopulation: 3200000,
      confidence: 78
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setConnectionStatus(prev => prev === 'connected' ? 'updating' : 'connected');
      
      setTimeout(() => {
        setConnectionStatus('connected');
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'earthquake': return 'Zap';
      case 'flood': return 'Waves';
      case 'cyclone': return 'Wind';
      case 'wildfire': return 'Flame';
      case 'drought': return 'Sun';
      default: return 'AlertTriangle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'updating': return 'text-yellow-400';
      case 'disconnected': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-200">Live Alerts</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : connectionStatus === 'updating' ? 'bg-yellow-400 pulse-urgent' : 'bg-red-400'}`} />
            <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus === 'connected' ? 'Live' : connectionStatus === 'updating' ? 'Updating' : 'Offline'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-400">Real-time disaster monitoring</p>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-3 rounded-lg border transition-smooth hover:bg-slate-700/30 cursor-pointer ${getSeverityColor(alert?.severity)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Icon name={getTypeIcon(alert?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-slate-200 truncate">
                    {alert?.title}
                  </h3>
                  <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                    {formatTimeAgo(alert?.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-slate-300">{alert?.location}</span>
                </div>
                
                <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                  {alert?.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-slate-400">
                      {(alert?.affectedPopulation / 1000000)?.toFixed(1)}M affected
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="Target" size={12} color="var(--color-muted-foreground)" />
                    <span className="text-slate-400">{alert?.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Last update: {new Date()?.toLocaleTimeString()}</span>
          <button className="flex items-center space-x-1 hover:text-slate-300 transition-smooth">
            <Icon name="RefreshCw" size={12} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveAlertFeed;