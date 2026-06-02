'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './investors.module.css';

import { Sector } from '@/types/models';

export default function AssetPerformanceExplorer({ sectors }: { sectors: Sector[] }) {
  const [activeSector, setActiveSector] = useState(sectors[0]);

  return (
    <section className={styles.explorerSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Asset Performance Explorer</h2>
        
        <div className={styles.explorerGrid}>
          {/* Left: Sector Selection */}
          <div className={styles.sectorList}>
            {sectors.map(sector => (
              <button
                key={sector.id}
                className={`${styles.sectorBtn} ${activeSector.id === sector.id ? styles.sectorActive : ''}`}
                onMouseEnter={() => setActiveSector(sector)}
                onClick={() => setActiveSector(sector)}
              >
                <div className={styles.sectorBtnName}>{sector.name}</div>
                <div className={styles.sectorBtnShare}>{sector.share}%</div>
                {activeSector.id === sector.id && (
                  <motion.div layoutId="sectorHighlight" className={styles.sectorHighlight} />
                )}
              </button>
            ))}
          </div>

          {/* Right: Sector Data Panel */}
          <div className={styles.sectorDataPanel}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSector.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={styles.sectorDataContent}
              >
                <h3 className={styles.sectorDataTitle}>{activeSector.name} Portfolio</h3>
                
                <div className={styles.sectorMetricsGrid}>
                  <div className={styles.sMetric}>
                    <span className={styles.sMLabel}>Portfolio Share</span>
                    <span className={styles.sMValue}>{activeSector.share}%</span>
                  </div>
                  <div className={styles.sMetric}>
                    <span className={styles.sMLabel}>Occupancy</span>
                    <span className={styles.sMValue}>{activeSector.occ}%</span>
                  </div>
                  <div className={styles.sMetric}>
                    <span className={styles.sMLabel}>Total Assets</span>
                    <span className={styles.sMValue}>{activeSector.assets}</span>
                  </div>
                </div>

                <div className={styles.sectorTopAssets}>
                  <span className={styles.sMLabel}>Flagship Assets</span>
                  <ul className={styles.sMList}>
                    {activeSector.top.map((asset: string, i: number) => (
                      <li key={i}>{asset}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
