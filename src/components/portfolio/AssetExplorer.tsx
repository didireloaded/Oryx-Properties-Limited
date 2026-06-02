import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Layers, Building, Loader2 } from 'lucide-react';
import styles from './AssetExplorer.module.css';
import AssetCard from './AssetCard';
import { Property } from '@/types';
import AssetModal from './AssetModal';

export default function AssetExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeLocation, setActiveLocation] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/properties');
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching properties for explorer:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'All' || prop.type.includes(activeType);
    const matchesLocation = activeLocation === 'All' || prop.location === activeLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  const uniqueSectors = ['All', ...Array.from(new Set(properties.map(p => p.type.split(' / ')[0])))];
  const uniqueLocations = ['All', ...Array.from(new Set(properties.map(p => p.location)))];

  return (
    <section className={styles.explorerSection} id="explore">
      <div className="container">
        <div className={styles.header}>
          <h2 className="h2" style={{ fontFamily: "'Times New Roman', serif", fontWeight: 400 }}>Asset Explorer</h2>
          <p className="body-large" style={{ color: '#64748b' }}>Discover and analyze our strategic properties.</p>
        </div>

        <div className={styles.controlsBar}>
          <div className={styles.searchBox}>
            <Search size={20} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by asset name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filtersWrapper}>
            <div className={styles.filterGroup}>
              <Layers size={16} className={styles.filterIcon} />
              <select className={styles.select} value={activeType} onChange={e => setActiveType(e.target.value)}>
                {uniqueSectors.map(sector => (
                  <option key={sector} value={sector}>{sector === 'All' ? 'All Sectors' : sector}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <MapPin size={16} className={styles.filterIcon} />
              <select className={styles.select} value={activeLocation} onChange={e => setActiveLocation(e.target.value)}>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.resultsMeta}>
          Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'asset' : 'assets'}
        </div>

        <motion.div layout className={styles.grid}>
          <AnimatePresence>
            {filteredProperties.length > 0 ? (
              filteredProperties.map(prop => (
                <AssetCard key={prop.id} property={prop} onClick={setSelectedProperty} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.emptyState}
              >
                <Building size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                <h3 className="h3">No matching assets</h3>
                <p>Try adjusting your search criteria or filters to find what you&apos;re looking for.</p>
                <button 
                  className={styles.resetBtn}
                  onClick={() => { setSearchTerm(''); setActiveType('All'); setActiveLocation('All'); }}
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AssetModal 
        property={selectedProperty} 
        isOpen={!!selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </section>
  );
}
