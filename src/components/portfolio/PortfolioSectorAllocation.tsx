'use client';

import { motion } from 'framer-motion';
import styles from './PortfolioSectorAllocation.module.css';

const sectors = [
  { name: 'Retail', percent: 64, desc: 'Flagship malls and shopping centres' },
  { name: 'Industrial', percent: 21, desc: 'Strategic logistics and warehousing' },
  { name: 'Office', percent: 10, desc: 'Prime commercial locations' },
  { name: 'Residential', percent: 5, desc: 'Long-term residential assets' }
];

export default function PortfolioSectorAllocation() {
  return (
    <section className={styles.allocationSection}>
      <div className={`container ${styles.gridContainer}`}>
        <div className={styles.leftColumn}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Portfolio Allocation
          </motion.h2>
          
          <div className={styles.sectorDescriptions}>
            {sectors.map((sector, idx) => (
              <motion.div 
                key={sector.name}
                className={styles.sectorItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h4 className={styles.sectorName}>{sector.name}</h4>
                <p className={styles.sectorDesc}>{sector.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.chartWrapper}>
            {sectors.map((sector, idx) => (
              <div key={sector.name} className={styles.barContainer}>
                <div className={styles.barLabel}>
                  <span>{sector.name}</span>
                  <span>{sector.percent}%</span>
                </div>
                <div className={styles.barTrack}>
                  <motion.div 
                    className={styles.barFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${sector.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 + (idx * 0.15) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
