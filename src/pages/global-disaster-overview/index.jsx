// src/pages/global-disaster-overview/index.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import LocationTree from './components/LocationTree';
import LiveAlertFeed from './components/LiveAlertFeed';
import InteractiveGlobe from './components/InteractiveGlobe';

const GlobalDisasterOverview = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const metricsData = [
    {
      title: 'Active Disasters',
      value: 47,
      unit: 'events',
      change: '+3',
      changeType: 'increase',
      icon: 'AlertTriangle',
      severity: 'critical',
      confidence: 94
    },
    {
      title: 'Affected Population',
      value: 8200000,
      unit: 'people',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      severity: 'high',
      confidence: 87
    },
    {
      title: 'Infrastructure at Risk',
      value: 1247,
      unit: 'assets',
      change: '+8%',
      changeType: 'increase',
      icon: 'Building2',
      severity: 'high',
      confidence: 91
    },
    {
      title: 'Displacement Estimates',
      value: 2100000,
      unit: 'displaced',
      change: '+15%',
      changeType: 'increase',
      icon: 'MapPin',
      severity: 'critical',
      confidence: 82
    }
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Disaster Overview - CIF-AI Dashboard</title>
        <meta
          name="description"
          content="Real-time global disaster monitoring and cascading impact analysis with 3D visualization"
        />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Metrics Dashboard */}
        <div className="px-6 py-6 border-b border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Global Disaster Overview
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of climate disasters and cascading impacts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                severity={metric?.severity}
                confidence={metric?.confidence}
              />
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-24 gap-6 h-[calc(100vh-300px)]">
            {/* Location Tree Sidebar */}
            <div className="col-span-24 lg:col-span-4">
              <LocationTree
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>

            {/* Interactive Globe */}
            <div className="col-span-24 lg:col-span-18 xl:col-span-18">
              <div className="bg-slate-800 border border-slate-700 rounded-lg h-full">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-200">
                        3D Global Disaster Map
                      </h2>
                      <p className="text-xs text-slate-400">
                        Interactive visualization with real-time hazard overlays
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-slate-300">Live Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 h-[calc(100%-80px)]">
                  <InteractiveGlobe
                    selectedLocation={selectedLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
              </div>
            </div>

            {/* Live Alert Feed */}
            <div className="col-span-24 lg:col-span-2 xl:col-span-2">
              <LiveAlertFeed />
            </div>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="px-6 pb-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">
                  Location Details: {selectedLocation?.name || selectedLocation?.title}
                </h3>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-slate-700 rounded transition-smooth"
                >
                  <span className="sr-only">Close details</span>
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Severity Level</h4>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedLocation?.severity === 'critical'
                          ? 'bg-red-400'
                          : selectedLocation?.severity === 'high'
                          ? 'bg-orange-400'
                          : selectedLocation?.severity === 'medium'
                          ? 'bg-yellow-400'
                          : 'bg-green-400'
                      }`}
                    />
                    <span className="text-slate-200 capitalize">
                      {selectedLocation?.severity}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Active Events</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.activeDisasters || selectedLocation?.magnitude || 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Affected Population</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.affectedPopulation
                      ? (selectedLocation?.affectedPopulation / 1000000)?.toFixed(1) + 'M'
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GlobalDisasterOverview;

/*
// src/pages/global-disaster-overview/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/ui/Header";
import MetricCard from "./components/MetricCard";
import LocationTree from "./components/LocationTree";
import LiveAlertFeed from "./components/LiveAlertFeed";
import CesiumGlobe from "@/components/globe/CesiumGlobe";
import { placePopup } from "@/components/globe/placePopup";
import { loadAllData } from "@/utils/dataLoader";

// Small popup rendered above the selected node (uses placePopup to anchor to coords)
function SelectedPopup({ viewer, node }) {
  const [style, setStyle] = useState({ display: "none" });

  useEffect(() => {
    if (!viewer || !node) {
      setStyle((s) => ({ ...s, display: "none" }));
      return;
    }
    // Create a fake element to compute transform, then store inline style
    const temp = document.createElement("div");
    temp.style.position = "absolute";
    temp.style.transform = "translate(0,0)";
    document.body.appendChild(temp);
    placePopup(viewer, node.lon, node.lat, temp);
    const transform = temp.style.transform;
    document.body.removeChild(temp);
    setStyle({
      display: "block",
      position: "absolute",
      transform,
      pointerEvents: "auto",
      zIndex: 10,
    });
  }, [viewer, node]);

  if (!node) return null;

  return (
    <div
      style={style}
      className="rounded-md bg-[#1E293B]/90 text-white shadow-lg p-3 min-w-[240px] border border-white/10"
    >
      <div className="text-sm font-semibold">{node.name ?? node.id}</div>
      <div className="text-xs opacity-80 mt-1">
        Severity: <span className="capitalize">{node.severity ?? "N/A"}</span>
        <br />
        Displaced: {node.displaced ?? "N/A"}
        <br />
        Confidence: {node.confidence ? Math.round(node.confidence * 100) + "%" : "—"}
      </div>
    </div>
  );
}

const GlobalDisasterOverview = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [viewer, setViewer] = useState(null); // Cesium Viewer instance (from CesiumGlobe)
  const [selectedForGlobe, setSelectedForGlobe] = useState(null); // {lon,lat,zoomKm,tiltDeg}
  const [selectedNode, setSelectedNode] = useState(null); // for popup content

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  // ---- Demo alerts (replace with your real dataset binding) ----
  const alerts = useMemo(
    () => [
      { id: "UAE", name: "United Arab Emirates", lon: 54.37, lat: 24.45, severity: "High", displaced: 1250, confidence: 0.85 },
      { id: "Dubai", name: "Dubai", lon: 55.27, lat: 25.20, severity: "Critical", displaced: 520, confidence: 0.9 },
      { id: "Riyadh", name: "Riyadh", lon: 46.72, lat: 24.71, severity: "Medium", displaced: 220, confidence: 0.75 },
      { id: "Jeddah", name: "Jeddah", lon: 39.19, lat: 21.49, severity: "Low", displaced: 80, confidence: 0.6 },
    ],
    []
  );

  // Basic lookup if the LocationTree gives us a name instead of coords
  const coordIndex = useMemo(() => {
    const map = new Map();
    alerts.forEach((a) => map.set((a.name || a.id).toLowerCase(), a));
    return map;
  }, [alerts]);

  // When the sidebar tree selects something, update the globe selection + show popup
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Normalize possible shapes from the tree: {lon,lat} or {coordinates} or {name}
    let node = null;

    if (location?.lon != null && location?.lat != null) {
      node = { lon: location.lon, lat: location.lat, name: location.name || location.title || "Selected", severity: location.severity, displaced: location.displaced, confidence: location.confidence };
    } else if (Array.isArray(location?.coordinates) && location.coordinates.length >= 2) {
      node = { lon: location.coordinates[0], lat: location.coordinates[1], name: location.name || location.title || "Selected", severity: location.severity, displaced: location.displaced, confidence: location.confidence };
    } else if (location?.name || location?.title) {
      const key = (location.name || location.title).toLowerCase();
      const hit = coordIndex.get(key);
      if (hit) node = { ...hit };
    }

    if (node) {
      setSelectedForGlobe({ lon: node.lon, lat: node.lat, zoomKm: 900, tiltDeg: 35 });
      setSelectedNode(node);
    } else {
      // fallback: clear selection
      setSelectedForGlobe(null);
      setSelectedNode(null);
    }
  };

  const metricsData = [
    { title: "Active Disasters", value: 47, unit: "events", change: "+3", changeType: "increase", icon: "AlertTriangle", severity: "critical", confidence: 94 },
    { title: "Affected Population", value: 8200000, unit: "people", change: "+12%", changeType: "increase", icon: "Users", severity: "high", confidence: 87 },
    { title: "Infrastructure at Risk", value: 1247, unit: "assets", change: "+8%", changeType: "increase", icon: "Building2", severity: "high", confidence: 91 },
    { title: "Displacement Estimates", value: 2100000, unit: "displaced", change: "+15%", changeType: "increase", icon: "MapPin", severity: "critical", confidence: 82 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Disaster Overview - CIF-AI Dashboard</title>
        <meta
          name="description"
          content="Real-time global disaster monitoring and cascading impact analysis with 3D visualization"
        />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Metrics Dashboard *///}
        /*<div className="px-6 py-6 border-b border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Global Disaster Overview</h1>
            <p className="text-muted-foreground">Real-time monitoring of climate disasters and cascading impacts worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>
        </div>

        {/* Main Dashboard Grid *///}
        /*<div className="px-6 py-6">
          <div className="grid grid-cols-24 gap-6 h-[calc(100vh-300px)]">
            {/* Location Tree Sidebar *///}
            /*<div className="col-span-24 lg:col-span-4">
              <LocationTree onLocationSelect={handleLocationSelect} selectedLocation={selectedLocation} />
            </div>

            {/* Cesium Globe *///}
            /*<div className="col-span-24 lg:col-span-18 xl:col-span-18 relative">
              <div className="bg-slate-800 border border-slate-700 rounded-lg h-full overflow-hidden relative">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-200">3D Global Disaster Map</h2>
                      <p className="text-xs text-slate-400">Interactive visualization with real-time hazard overlays</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-slate-300">Live Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Globe container *///}
                /*<div className="h-[calc(100%-80px)] relative">
                  <CesiumGlobe
                    alerts={alerts}
                    selected={selectedForGlobe}
                    onReady={setViewer}
                  />
                  {/* Popup overlay *///}
                  /*<SelectedPopup viewer={viewer} node={selectedNode} />
                </div>
              </div>
            </div>

            {/* Live Alert Feed *///}
            /*<div className="col-span-24 lg:col-span-2 xl:col-span-2">
              <LiveAlertFeed />
            </div>
          </div>
        </div>

        {/* Selected Location Details *///}
        /*{selectedLocation && (
          <div className="px-6 pb-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">
                  Location Details: {selectedLocation?.name || selectedLocation?.title}
                </h3>
                <button
                  onClick={() => {
                    setSelectedLocation(null);
                    setSelectedNode(null);
                    setSelectedForGlobe(null);
                  }}
                  className="p-2 hover:bg-slate-700 rounded transition-smooth"
                >
                  <span className="sr-only">Close details</span>×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Severity Level</h4>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedLocation?.severity === "critical"
                          ? "bg-red-400"
                          : selectedLocation?.severity === "high"
                          ? "bg-orange-400"
                          : selectedLocation?.severity === "medium"
                          ? "bg-yellow-400"
                          : "bg-green-400"
                      }`}
                    />
                    <span className="text-slate-200 capitalize">{selectedLocation?.severity ?? "n/a"}</span>
                  </div>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Active Events</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.activeDisasters || selectedLocation?.magnitude || "N/A"}
                  </span>
                </div>

                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Affected Population</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.affectedPopulation
                      ? (selectedLocation.affectedPopulation / 1_000_000).toFixed(1) + "M"
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GlobalDisasterOverview;
*/















/*
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import LocationTree from './components/LocationTree';
import LiveAlertFeed from './components/LiveAlertFeed';
import InteractiveGlobe from './components/InteractiveGlobe';

const GlobalDisasterOverview = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const metricsData = [
    {
      title: 'Active Disasters',
      value: 47,
      unit: 'events',
      change: '+3',
      changeType: 'increase',
      icon: 'AlertTriangle',
      severity: 'critical',
      confidence: 94
    },
    {
      title: 'Affected Population',
      value: 8200000,
      unit: 'people',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      severity: 'high',
      confidence: 87
    },
    {
      title: 'Infrastructure at Risk',
      value: 1247,
      unit: 'assets',
      change: '+8%',
      changeType: 'increase',
      icon: 'Building2',
      severity: 'high',
      confidence: 91
    },
    {
      title: 'Displacement Estimates',
      value: 2100000,
      unit: 'displaced',
      change: '+15%',
      changeType: 'increase',
      icon: 'MapPin',
      severity: 'critical',
      confidence: 82
    }
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Disaster Overview - CIF-AI Dashboard</title>
        <meta name="description" content="Real-time global disaster monitoring and cascading impact analysis with 3D visualization" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Metrics Dashboard *///}
        /*
        <div className="px-6 py-6 border-b border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Global Disaster Overview
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of climate disasters and cascading impacts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                unit={metric?.unit}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                severity={metric?.severity}
                confidence={metric?.confidence}
              />
            ))}
          </div>
        </div>*/

        {/* Main Dashboard Grid */}
        /*<div className="px-6 py-6">
          <div className="grid grid-cols-24 gap-6 h-[calc(100vh-300px)]">
            {/* Location Tree Sidebar *///}
            /*<div className="col-span-24 lg:col-span-4">
              <LocationTree 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>

            {/* Interactive Globe *///}
            /*<div className="col-span-24 lg:col-span-18 xl:col-span-18">
              <div className="bg-slate-800 border border-slate-700 rounded-lg h-full">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-200">
                        3D Global Disaster Map
                      </h2>
                      <p className="text-xs text-slate-400">
                        Interactive visualization with real-time hazard overlays
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-slate-300">Live Updates</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 h-[calc(100%-80px)]">
                  <InteractiveGlobe 
                    selectedLocation={selectedLocation}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
              </div>
            </div>*/

            /*{/* Live Alert Feed *///}
            /*<div className="col-span-24 lg:col-span-2 xl:col-span-2">
              <LiveAlertFeed />
            </div>
          </div>
        </div>*/

        //{/* Selected Location Details */}
        /*{selectedLocation && (
          <div className="px-6 pb-6">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">
                  Location Details: {selectedLocation?.name || selectedLocation?.title}
                </h3>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-slate-700 rounded transition-smooth"
                >
                  <span className="sr-only">Close details</span>
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Severity Level</h4>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedLocation?.severity === 'critical' ? 'bg-red-400' :
                      selectedLocation?.severity === 'high' ? 'bg-orange-400' :
                      selectedLocation?.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`} />
                    <span className="text-slate-200 capitalize">{selectedLocation?.severity}</span>
                  </div>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Active Events</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.activeDisasters || selectedLocation?.magnitude || 'N/A'}
                  </span>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Affected Population</h4>
                  <span className="text-xl font-bold text-slate-200">
                    {selectedLocation?.affectedPopulation ? 
                      (selectedLocation?.affectedPopulation / 1000000)?.toFixed(1) + 'M' : 'N/A'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GlobalDisasterOverview;*/