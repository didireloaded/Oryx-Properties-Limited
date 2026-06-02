'use client';

import { motion } from 'framer-motion';
import styles from '@/app/about/about.module.css';

export default function VisionMissionCards() {
  return (
    <section className={styles.vmSection}>
      <div className={styles.vmGrid}>
        
        <motion.div 
          className={styles.vmCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className={styles.vmBackground} 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)' }}
          />
          <div className={styles.vmOverlay} />
          <div className={styles.vmContent}>
            <h3 className={styles.vmTitle}>Vision</h3>
            <p className={styles.vmText}>
              To remain at the forefront of the Namibian listed property sector.
            </p>
            <p className={styles.vmSubtext}>
              To nurture Oryx's Namibian heritage through innovative and progressive solutions that create sustainable economic, social and environmental value for stakeholders.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className={styles.vmCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div 
            className={styles.vmBackground} 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop)' }}
          />
          <div className={styles.vmOverlay} />
          <div className={styles.vmContent}>
            <h3 className={styles.vmTitle}>Mission</h3>
            <p className={styles.vmText}>
              Acquire premium-quality retail, industrial, office and residential properties and investments in property.
            </p>
            <p className={styles.vmSubtext}>
              Drive sustainable long-term earnings growth and capital appreciation through quality tenants and growing income streams.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
