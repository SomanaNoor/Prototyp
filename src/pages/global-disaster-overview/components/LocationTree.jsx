import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LocationTree = ({ onLocationSelect, selectedLocation }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['global', 'middle-east', 'asia-pacific']));

  const locationData = [
    {
      id: 'global',
      name: 'Global Overview',
      type: 'global',
      activeDisasters: 47,
      severity: 'critical',
      children: [
        {
          id: 'middle-east',
          name: 'Middle East & North Africa',
          type: 'region',
          activeDisasters: 12,
          severity: 'high',
          children: [
            {
              id: 'uae',
              name: 'United Arab Emirates',
              type: 'country',
              activeDisasters: 3,
              severity: 'medium',
              children: [
                { id: 'dubai', name: 'Dubai', type: 'city', activeDisasters: 1, severity: 'medium' },
                { id: 'abu-dhabi', name: 'Abu Dhabi', type: 'city', activeDisasters: 2, severity: 'high' }
              ]
            },
            {
              id: 'saudi',
              name: 'Saudi Arabia',
              type: 'country',
              activeDisasters: 4,
              severity: 'high',
              children: [
                { id: 'riyadh', name: 'Riyadh', type: 'city', activeDisasters: 2, severity: 'high' },
                { id: 'jeddah', name: 'Jeddah', type: 'city', activeDisasters: 2, severity: 'medium' }
              ]
            }
          ]
        },
        {
          id: 'asia-pacific',
          name: 'Asia Pacific',
          type: 'region',
          activeDisasters: 18,
          severity: 'critical',
          children: [
            {
              id: 'philippines',
              name: 'Philippines',
              type: 'country',
              activeDisasters: 8,
              severity: 'critical',
              children: [
                { id: 'manila', name: 'Manila', type: 'city', activeDisasters: 3, severity: 'critical' },
                { id: 'cebu', name: 'Cebu', type: 'city', activeDisasters: 2, severity: 'high' }
              ]
            },
            {
              id: 'indonesia',
              name: 'Indonesia',
              type: 'country',
              activeDisasters: 6,
              severity: 'high',
              children: [
                { id: 'jakarta', name: 'Jakarta', type: 'city', activeDisasters: 3, severity: 'high' },
                { id: 'surabaya', name: 'Surabaya', type: 'city', activeDisasters: 1, severity: 'medium' }
              ]
            }
          ]
        },
        {
          id: 'americas',
          name: 'Americas',
          type: 'region',
          activeDisasters: 11,
          severity: 'high',
          children: [
            {
              id: 'usa',
              name: 'United States',
              type: 'country',
              activeDisasters: 7,
              severity: 'high',
              children: [
                { id: 'miami', name: 'Miami', type: 'city', activeDisasters: 2, severity: 'high' },
                { id: 'houston', name: 'Houston', type: 'city', activeDisasters: 1, severity: 'medium' }
              ]
            }
          ]
        }
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20';
      case 'high': return 'bg-orange-500/20';
      case 'medium': return 'bg-yellow-500/20';
      case 'low': return 'bg-green-500/20';
      default: return 'bg-slate-500/20';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'global': return 'Globe';
      case 'region': return 'Map';
      case 'country': return 'Flag';
      case 'city': return 'MapPin';
      default: return 'Circle';
    }
  };

  const toggleExpanded = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded?.has(nodeId)) {
      newExpanded?.delete(nodeId);
    } else {
      newExpanded?.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleLocationClick = (location) => {
    onLocationSelect(location);
  };

  const renderNode = (node, depth = 0) => {
    const isExpanded = expandedNodes?.has(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;
    const isSelected = selectedLocation?.id === node?.id;

    return (
      <div key={node?.id} className="w-full">
        <div
          className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-smooth hover:bg-slate-700/50 ${
            isSelected ? 'bg-primary/20 border border-primary/30' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => handleLocationClick(node)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  toggleExpanded(node?.id);
                }}
                className="p-1 hover:bg-slate-600 rounded transition-smooth"
              >
                <Icon 
                  name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                  size={14} 
                  color="var(--color-muted-foreground)" 
                />
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            
            <div className={`p-1 rounded ${getSeverityBg(node?.severity)}`}>
              <Icon 
                name={getTypeIcon(node?.type)} 
                size={14} 
                color={getSeverityColor(node?.severity)?.replace('text-', 'var(--color-')} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate block">
                {node?.name}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSeverityBg(node?.severity)} ${getSeverityColor(node?.severity)}`}>
              {node?.activeDisasters}
            </span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node?.children?.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg h-full">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200">Locations</h2>
          <Icon name="Search" size={16} color="var(--color-muted-foreground)" />
        </div>
        <p className="text-xs text-slate-400 mt-1">Navigate global disaster zones</p>
      </div>
      <div className="p-2 max-h-96 overflow-y-auto">
        {locationData?.map(node => renderNode(node))}
      </div>
    </div>
  );
};

export default LocationTree;