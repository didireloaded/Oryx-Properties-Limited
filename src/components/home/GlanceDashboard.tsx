'use client';

import { motion } from 'framer-motion';
import styles from './home.module.css';

export default function GlanceDashboard() {
  return (
    <section className={styles.glanceSection}>
      <div className="container">
        <div className={styles.glanceGrid}>
          
          <motion.div 
            className={styles.glanceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.glanceLabel}>Portfolio Value</span>
            <span className={styles.glanceValue}>N$ 4.7bn</span>
          </motion.div>

          <motion.div 
            className={styles.glanceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className={styles.glanceLabel}>Total Assets</span>
            <span className={styles.glanceValue}>28</span>
          </motion.div>

          <motion.div 
            className={styles.glanceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <span className={styles.glanceLabel}>Occupancy Rate</span>
            <span className={styles.glanceValue}>96.0%</span>
          </motion.div>

          <motion.div 
            className={styles.glanceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <span className={styles.glanceLabel}>Latest Dividend</span>
            <span className={styles.glanceValue}>52.5c</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
