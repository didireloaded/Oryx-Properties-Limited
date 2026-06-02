'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';

export default function PerformanceDashboard() {
  return (
    <section className={styles.perfDashboardSection}>
      <div className="container">
        <motion.div 
          className={styles.dashboardHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Investment Performance</h2>
          <p className={styles.sectionDesc}>High-level portfolio and equity metrics for the current reporting period.</p>
        </motion.div>

        <div className={styles.dashboardGrid}>
          <motion.div 
            className={styles.dashboardCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className={styles.dashLabel}>Portfolio Value</span>
            <span className={styles.dashValue}>N$ 4.7bn</span>
          </motion.div>

          <motion.div 
            className={styles.dashboardCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.dashLabel}>Net Asset Value (NAV)</span>
            <span className={styles.dashValue}>N$ 21.45</span>
          </motion.div>

          <motion.div 
            className={styles.dashboardCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className={styles.dashLabel}>Occupancy</span>
            <span className={styles.dashValue}>96.0%</span>
          </motion.div>

          <motion.div 
            className={styles.dashboardCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.dashLabel}>Vacancy</span>
            <span className={styles.dashValue}>4.0%</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
