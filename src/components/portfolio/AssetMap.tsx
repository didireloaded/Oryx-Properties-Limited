'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AssetMap.module.css';

const regions = [
  { 
    id: 'windhoek', 
    name: 'Windhoek', 
    top: '55%', left: '45%', 
    assets: 12, 
    sectors: ['Retail', 'Office', 'Industrial', 'Residential'] 
  },
  { 
    id: 'walvis', 
    name: 'Walvis Bay', 
    top: '60%', left: '25%', 
    assets: 3, 
    sectors: ['Retail', 'Industrial'] 
  },
  { 
    id: 'tsumeb', 
    name: 'Tsumeb', 
    top: '35%', left: '48%', 
    assets: 2, 
    sectors: ['Retail'] 
  },
  { 
    id: 'keetmanshoop', 
    name: 'Keetmanshoop', 
    top: '75%', left: '55%', 
    assets: 1, 
    sectors: ['Retail'] 
  }
];

export default function AssetMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className={styles.mapSection}>
      <div className="container">
        
        <div className={styles.header}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            National Footprint
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.subtitle}
          >
            Strategically distributed across Namibia&apos;s core economic nodes.
          </motion.p>
        </div>

        <div className={styles.mapWrapper}>
          <svg viewBox="0 0 400 400" className={styles.svgMap} preserveAspectRatio="xMidYMid meet">
            <motion.path 
              d="M150,20 L250,20 L300,50 L310,150 L280,250 L250,350 L200,380 L150,350 L100,250 L80,150 L100,80 Z" 
              fill="#0a0f19"
              stroke="rgba(212, 175, 55, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {regions.map((region, index) => (
            <div 
              key={region.id}
              className={styles.pinContainer}
              style={{ top: region.top, left: region.left }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <motion.div
                className={styles.pinMarker}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.8 + (index * 0.1) }}
              />

              <AnimatePresence>
                {hoveredRegion === region.id && (
                  <motion.div 
                    className={styles.tooltip}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className={styles.tooltipTitle}>{region.name}</h4>
                    <div className={styles.tooltipAssets}>{region.assets} Assets</div>
                    <div className={styles.tooltipSectors}>
                      {region.sectors.map(sector => (
                        <span key={sector} className={styles.sectorTag}>{sector}</span>
                      ))}
                    </div>
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
