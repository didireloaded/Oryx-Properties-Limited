'use client';

import { motion } from 'framer-motion';
import styles from './contact.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';

export default function AnimatedContactMetrics() {
  return (
    <section className={styles.metricsSection}>
      <div className={`container ${styles.metricsGrid}`}>
        <motion.div 
          className={styles.metricItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.metricValue}>
            <AnimatedCounter value={28} />
          </div>
          <div className={styles.metricLabel}>Assets</div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.metricValue}>
            <AnimatedCounter value={256} />
          </div>
          <div className={styles.metricLabel}>Tenants</div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.metricValue}>
            <AnimatedCounter value={4.7} prefix="N$" suffix="bn" decimals={1} />
          </div>
          <div className={styles.metricLabel}>Portfolio</div>
        </motion.div>

        <motion.div 
          className={styles.metricItem}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.metricValue}>
            <AnimatedCounter value={96} suffix="%" />
          </div>
          <div className={styles.metricLabel}>Occupancy</div>
        </motion.div>
      </div>
    </section>
  );
}
