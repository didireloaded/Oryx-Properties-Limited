'use client';

import { motion } from 'framer-motion';
import styles from './home.module.css';

const sectors = [
  { name: 'Retail', share: '64%', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop' },
  { name: 'Industrial', share: '22%', image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7fcce36?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Office', share: '10%', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop' },
  { name: 'Residential', share: '4%', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop' }
];

export default function SectorAllocation() {
  return (
    <section className={styles.sectorSection}>
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.sectionTitle}>A Diversified Portfolio</h2>
          <p className={styles.sectionDesc}>Strategic capital allocation across core Namibian real estate sectors to ensure robust yield and risk mitigation.</p>
        </motion.div>

        <div className={styles.sectorGrid}>
          {sectors.map((sector, index) => (
            <motion.div 
              key={index}
              className={styles.sectorCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            >
              <img src={sector.image} alt={sector.name} className={styles.sectorImg} />
              <div className={styles.sectorOverlay}>
                <h3 className={styles.sectorName}>{sector.name}</h3>
                <span className={styles.sectorShare}>{sector.share}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
