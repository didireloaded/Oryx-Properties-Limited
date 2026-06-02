'use client';

import { motion } from 'framer-motion';
import styles from '@/app/about/about.module.css';

const pins = [
  { top: '35%', left: '48%', label: 'Tsumeb' },
  { top: '55%', left: '45%', label: 'Windhoek' },
  { top: '65%', left: '30%', label: 'Swakopmund' },
  { top: '75%', left: '55%', label: 'Keetmanshoop' },
];

export default function NamibiaFootprint() {
  return (
    <section className={styles.footprintSection}>
      <div className="container">
        <div className={styles.footprintHeader}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            National Footprint
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            A commanding presence across Namibia's most strategic economic nodes.
          </motion.p>
        </div>

        <div className={styles.mapContainer}>
          {/* Using a stylized SVG path for Namibia */}
          <svg viewBox="0 0 400 400" className={styles.namibiaMap} preserveAspectRatio="xMidYMid meet">
            <motion.path 
              d="M150,20 L250,20 L300,50 L310,150 L280,250 L250,350 L200,380 L150,350 L100,250 L80,150 L100,80 Z" 
              fill="#12161E"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {pins.map((pin, index) => (
            <motion.div
              key={pin.label}
              className={styles.mapPin}
              style={{ top: pin.top, left: pin.left }}
              initial={{ opacity: 0, scale: 0, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20, 
                delay: 0.8 + (index * 0.2) 
              }}
            >
              <div className={styles.pinDot} />
              <div className={styles.pinLabel}>{pin.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
