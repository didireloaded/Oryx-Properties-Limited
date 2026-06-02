"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Building2, Store, Home, Factory, MapPin, Loader2 } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  description?: string;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const ASSET_CLASSES = [
  { id: 'Retail', name: 'Retail', icon: Store, description: 'Prime shopping centres and retail hubs.', color: '#99232c' },
  { id: 'Office', name: 'Office', icon: Building2, description: 'Premium corporate workspaces and CBD nodes.', color: '#05447f' },
  { id: 'Industrial', name: 'Industrial', icon: Factory, description: 'Logistics, warehousing, and manufacturing hubs.', color: '#38aab7' },
  { id: 'Residential', name: 'Residential', icon: Home, description: 'Sought-after residential estates and complexes.', color: '#b78a2d' }
];

// Rough coordinates mapping for Windhoek and others (for demo purposes)
const COORDS_MAP: Record<string, {lat: number, lng: number}> = {
  'ret-1': { lat: -22.5833, lng: 17.0833 },
  'ret-2': { lat: -22.9575, lng: 14.5053 },
  'ret-3': { lat: -22.5609, lng: 17.0836 },
  'ret-4': { lat: -22.4833, lng: 17.0833 },
  'ret-5': { lat: -22.5700, lng: 17.0800 },
  'off-1': { lat: -22.5650, lng: 17.0850 },
  'res-1': { lat: -22.5900, lng: 17.0900 },
  'res-2': { lat: -22.5950, lng: 17.0950 },
  'res-3': { lat: -22.6000, lng: 17.1000 },
  'ind-1': { lat: -22.6100, lng: 17.0800 },
  'ind-2': { lat: -22.5800, lng: 17.0700 },
  'ind-3': { lat: -22.9500, lng: 14.5000 },
  'ind-4': { lat: -26.5833, lng: 18.1333 },
  'ind-5': { lat: -26.1500, lng: 27.9000 },
};

export default function PortfolioPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch properties from the API
  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({ isLeasing: 'false' });
        if (selectedClass) queryParams.append('type', selectedClass);
        if (searchQuery) queryParams.append('query', searchQuery);

        const res = await fetch(`/api/properties?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    // Simple debounce
    const timeoutId = setTimeout(() => {
      fetchProperties();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedClass, searchQuery]);
  
  const [viewState, setViewState] = useState({
    longitude: 17.0836,
    latitude: -22.5609,
    zoom: 5
  });

  const selectedProperty = useMemo(() => {
    return properties.find(p => p.id === selectedPropertyId);
  }, [selectedPropertyId, properties]);

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* MAP & LISTING SPLIT (No header to maximize map area like Airbnb) */}
      <section style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left: Property List (Sidebar) */}
        <div style={{ width: '450px', backgroundColor: 'var(--bg-secondary)', overflowY: 'auto', borderRight: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '0.5rem' }}>Portfolio Map</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Explore our diversified asset portfolio across retail, industrial, office, and residential sectors.
            </p>
            <input 
              type="text" 
              placeholder="Search properties by name or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-glass)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'var(--text-light)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
              className="focus:border-accent-gold transition-colors"
            />
          </div>

          <div style={{ padding: '1.5rem', flex: 1, position: 'relative' }}>
            {isLoading && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,20,35,0.5)', zIndex: 10 }}>
                <Loader2 size={32} color="var(--accent-gold)" className="animate-spin" />
              </div>
            )}
            <AnimatePresence mode="wait">
              {!selectedClass && !searchQuery ? (
                <motion.div 
                  key="classes"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--text-light)' }}>Asset Classes</h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {ASSET_CLASSES.map(cls => {
                      const Icon = cls.icon;
                      
                      return (
                        <div 
                          key={cls.id}
                          onClick={() => setSelectedClass(cls.id)}
                          className="glass-panel-15 group cursor-pointer" 
                          style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid ' + cls.color, transition: 'all 0.3s' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: `${cls.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon size={18} color={cls.color} />
                              </div>
                              <div>
                                <h3 style={{ fontSize: '1rem', color: 'var(--text-light)', fontWeight: 500 }}>{cls.name}</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>View Properties</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="properties"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button 
                      onClick={() => {
                        setSelectedClass(null);
                        setSearchQuery('');
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.875rem' }}
                      className="hover:text-white transition-colors"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '4px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: '100px' }}>
                      {properties.length} found
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {properties.map(prop => {
                      const isSelected = selectedPropertyId === prop.id;
                      
                      return (
                        <div 
                          key={prop.id} 
                          onClick={() => {
                            setSelectedPropertyId(prop.id);
                            const coords = COORDS_MAP[prop.id] || { lat: -22.5609, lng: 17.0836 };
                            setViewState(prev => ({ ...prev, longitude: coords.lng, latitude: coords.lat, zoom: 12 }));
                          }}
                          className={`glass-panel-15 group cursor-pointer ${isSelected ? 'border-accent-brand' : ''}`} 
                          style={{ borderRadius: '8px', overflow: 'hidden', transition: 'all 0.3s', border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)' }}
                        >
                          <div style={{ display: 'flex', height: '100px' }}>
                            <div style={{ width: '120px', position: 'relative', overflow: 'hidden' }}>
                              <Image src={prop.image} alt={prop.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <h4 style={{ fontSize: '1rem', color: 'var(--text-light)', marginBottom: '0.25rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prop.name}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                <MapPin size={12} /> {prop.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Mapbox Implementation */}
        <div style={{ flex: 1, position: 'relative' }}>
          <Map
            longitude={viewState.longitude}
            latitude={viewState.latitude}
            zoom={viewState.zoom}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ width: '100%', height: '100%' }}
          >
            {properties.map(prop => {
              const coords = COORDS_MAP[prop.id] || { lat: -22.5609, lng: 17.0836 };
              const assetClass = ASSET_CLASSES.find(c => c.id === prop.type);
              const dotColor = assetClass ? assetClass.color : 'var(--accent-gold)';
              const Icon = assetClass ? assetClass.icon : Store;
              
              return (
                <Marker key={prop.id} longitude={coords.lng} latitude={coords.lat} anchor="bottom" onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedPropertyId(prop.id);
                  setViewState(prev => ({ ...prev, longitude: coords.lng, latitude: coords.lat, zoom: 12 }));
                }}>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: selectedPropertyId === prop.id ? 'var(--text-light)' : 'var(--bg-primary)', 
                    color: selectedPropertyId === prop.id ? '#0F172A' : dotColor,
                    padding: '6px 12px', borderRadius: '100px', cursor: 'pointer', 
                    border: '1px solid ' + dotColor,
                    boxShadow: '0 4px 15px ' + dotColor + '40',
                    transition: 'all 0.2s',
                    fontWeight: 600, fontSize: '0.875rem', gap: '0.5rem'
                  }} className="hover:scale-105">
                    <Icon size={14} />
                    {prop.name}
                  </div>
                </Marker>
              );
            })}

            {/* Airbnb Style Popup */}
            {selectedProperty && (
              <Popup
                longitude={(COORDS_MAP[selectedProperty.id] || { lat: -22.5609, lng: 17.0836 }).lng}
                latitude={(COORDS_MAP[selectedProperty.id] || { lat: -22.5609, lng: 17.0836 }).lat}
                anchor="top"
                onClose={() => setSelectedPropertyId(null)}
                closeButton={false}
                closeOnClick={false}
                offset={15}
                className="custom-popup"
              >
                <div style={{ 
                  backgroundColor: 'rgba(15, 20, 35, 0.95)', 
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  width: '300px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-light)'
                }}>
                  <div style={{ height: '160px', position: 'relative' }}>
                    <Image src={selectedProperty.image} alt={selectedProperty.name} fill style={{ objectFit: 'cover' }} />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedPropertyId(null); }}
                      style={{ position: 'absolute', top: '10px', right: '10px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'var(--accent-gold)', color: '#0F172A', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {selectedProperty.type}
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.25rem' }}>{selectedProperty.name}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} /> {selectedProperty.location}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {selectedProperty.description}
                    </p>
                    <Link href={'/portfolio/' + selectedProperty.id} style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-light)', padding: '0.75rem', borderRadius: '8px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s' }} className="hover:border-accent-gold hover:text-accent-gold">
                      More Details
                    </Link>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>

      </section>

    </div>
  );
}
