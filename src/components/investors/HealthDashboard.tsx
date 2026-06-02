'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';

export default function HealthDashboard() {
  return (
    <section className={styles.healthSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Portfolio Health</h2>
        
        <div className={styles.healthGrid}>
          <motion.div 
            className={styles.healthCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.healthHeader}>
              <span className={styles.healthDot}></span>
              <span>Live Status</span>
            </div>
            <div className={styles.healthValue}>96%</div>
            <div className={styles.healthLabel}>Occupancy Rate</div>
          </motion.div>

          <motion.div 
            className={styles.healthCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.healthHeader}>
              <span className={styles.healthDot} style={{ background: '#ef4444' }}></span>
              <span>Live Status</span>
            </div>
            <div className={styles.healthValue}>4%</div>
            <div className={styles.healthLabel}>Vacancy Rate</div>
          </motion.div>

          <motion.div 
            className={styles.healthCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.healthHeader}>
              <span>Metric</span>
            </div>
            <div className={styles.healthValue}>256</div>
            <div className={styles.healthLabel}>Total Tenants</div>
          </motion.div>

          <motion.div 
            className={styles.healthCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.healthHeader}>
              <span>Metric</span>
            </div>
            <div className={styles.healthValue}>6.2 Yrs</div>
            <div className={styles.healthLabel}>WALE</div>
          </motion.div>

          <motion.div 
            className={styles.healthCard}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.healthHeader}>
              <span>Metric</span>
            </div>
            <div className={styles.healthValue}>171,833</div>
            <div className={styles.healthLabel}>GLA (m²)</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
