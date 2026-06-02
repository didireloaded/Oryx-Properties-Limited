'use client';

import { motion } from 'framer-motion';
import styles from './contact.module.css';
import { MapPin, ArrowRight } from 'lucide-react';

export default function InteractiveOfficeMap() {
  return (
    <section className={styles.officeMapSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Interactive Office Experience</h2>
        
        <div className={styles.mapContainer}>
          <svg viewBox="0 0 800 400" className={styles.darkSvgMap} preserveAspectRatio="xMidYMid meet">
            {/* Abstract map outline representing Windhoek / Namibia */}
            <motion.path 
              d="M100,50 L700,50 L750,200 L650,350 L150,350 L50,200 Z" 
              fill="#0a0f19"
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Maerua Mall Marker */}
          <div className={styles.mapMarkerWrapper} style={{ top: '50%', left: '45%' }}>
            <motion.div 
              className={styles.mapMarker}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <MapPin size={20} color="var(--color-primary-navy)" />
            </motion.div>
            
            <motion.div 
              className={styles.mapTooltip}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            >
              <h4>Maerua Mall Office Tower</h4>
              <p>Windhoek</p>
              <button className={styles.directionsBtn}>
                Get Directions <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
