'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';

export default function EnvironmentalResponsibility() {
  return (
    <section className={styles.envSection}>
      <div className={styles.envBackground}>
        <div className={styles.envOverlay} />
        <img 
          src="https://images.unsplash.com/photo-1509391366360-12000c0f8629?q=80&w=2070&auto=format&fit=crop" 
          alt="Solar Panels" 
        />
      </div>
      
      <div className={`container ${styles.envContainer}`}>
        <motion.div 
          className={styles.envHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Environmental Responsibility</h2>
          <p>Commitment to sustainable operations, carbon footprint reduction, and resource efficiency across the portfolio.</p>
        </motion.div>

        <div className={styles.envMetricsGrid}>
          <motion.div 
            className={styles.envMetricCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.envMetricValue}>
              <AnimatedCounter value={1.5} decimals={1} suffix="MW" />
            </div>
            <div className={styles.envMetricLabel}>Renewable Energy Capacity</div>
          </motion.div>

          <motion.div 
            className={styles.envMetricCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.envMetricValue}>
              <AnimatedCounter value={5} suffix="+" />
            </div>
            <div className={styles.envMetricLabel}>Water Saving Initiatives</div>
          </motion.div>

          <motion.div 
            className={styles.envMetricCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.envMetricValue}>
              <AnimatedCounter value={100} suffix="%" />
            </div>
            <div className={styles.envMetricLabel}>Commitment to ESG</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
