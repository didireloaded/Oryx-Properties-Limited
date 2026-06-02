'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './csi.module.css';

const impactLocations = [
  { id: 'windhoek', name: 'Windhoek', top: '55%', left: '45%', desc: 'CAFO, Orange Babies, Solar PV, Mayoral Relief' },
  { id: 'rehoboth', name: 'Rehoboth', top: '65%', left: '43%', desc: 'Community welfare and educational support' },
  { id: 'katutura', name: 'Katutura', top: '53%', left: '46%', desc: 'Youth sports and educational bursaries' },
  { id: 'hardap', name: 'Hardap', top: '70%', left: '48%', desc: 'Groendraai Primary School' },
  { id: 'walvis', name: 'Walvis Bay', top: '60%', left: '25%', desc: 'Coastal cleanup and community health' }
];

export default function NamibiaImpactMap() {
  const [activeLoc, setActiveLoc] = useState<string | null>(null);

  return (
    <section className={styles.impactMapSection}>
      <div className="container">
        <h2 className={styles.mapTitle}>National Impact Footprint</h2>
        
        <div className={styles.mapContainer}>
          <svg viewBox="0 0 400 400" className={styles.mapSvg} preserveAspectRatio="xMidYMid meet">
            <motion.path 
              d="M150,20 L250,20 L300,50 L310,150 L280,250 L250,350 L200,380 L150,350 L100,250 L80,150 L100,80 Z" 
              fill="#0a0f19"
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {impactLocations.map((loc, idx) => (
            <div 
              key={loc.id} 
              className={styles.mapMarkerWrapper}
              style={{ top: loc.top, left: loc.left }}
              onClick={() => setActiveLoc(activeLoc === loc.id ? null : loc.id)}
            >
              <motion.div 
                className={`${styles.mapMarker} ${activeLoc === loc.id ? styles.markerActive : ''}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.2 }}
              />

              <AnimatePresence>
                {activeLoc === loc.id && (
                  <motion.div 
                    className={styles.mapTooltip}
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <h4>{loc.name}</h4>
                    <p>{loc.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
