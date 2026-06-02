'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';

const distribution = [
  { label: 'Youth Development', percent: 40, color: 'var(--color-primary-navy)' },
  { label: 'Social Welfare', percent: 30, color: 'rgba(10, 15, 30, 0.8)' },
  { label: 'Environment', percent: 20, color: 'rgba(10, 15, 30, 0.6)' },
  { label: 'Community Support', percent: 10, color: 'var(--color-gold)' }
];

export default function ImpactDistribution() {
  return (
    <section className={styles.distSection}>
      <div className="container">
        <h2 className={styles.distTitle}>Impact Distribution</h2>
        <div className={styles.distVisualContainer}>
          <div className={styles.distBarWrapper}>
            {distribution.map((item, idx) => (
              <motion.div
                key={item.label}
                className={styles.distBarSegment}
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.distBarLabel}>{item.percent}%</span>
              </motion.div>
            ))}
          </div>
          <div className={styles.distLegend}>
            {distribution.map((item) => (
              <div key={item.label} className={styles.legendItem}>
                <div className={styles.legendDot} style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
