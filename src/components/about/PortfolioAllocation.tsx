'use client';

import { motion } from 'framer-motion';
import styles from '@/app/about/about.module.css';
import AnimatedCounter from './AnimatedCounter';

const portfolioData = [
  { sector: 'Retail', value: 64 },
  { sector: 'Industrial', value: 21 },
  { sector: 'Office', value: 10 },
  { sector: 'Residential', value: 5 },
];

export default function PortfolioAllocation() {
  return (
    <div className={styles.portfolioSection}>
      <div className={styles.portfolioContainer}>
        
        <div className={styles.portfolioChartSide}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.portfolioTitle}
          >
            Built on a Diversified Property Portfolio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.portfolioSubtitle}
          >
            Oryx owns and manages strategically positioned retail, industrial, office and residential assets across Namibia.
          </motion.p>

          <div className={styles.chartContainer}>
            {portfolioData.map((item, index) => (
              <div key={item.sector} className={styles.chartRow}>
                <div className={styles.chartLabel}>
                  <span>{item.sector}</span>
                  <AnimatedCounter value={item.value} suffix="%" />
                </div>
                <div className={styles.barTrack}>
                  <motion.div 
                    className={styles.barFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.portfolioMetricsSide}>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter value={4.7} prefix="N$" suffix="bn" decimals={1} />
              </div>
              <div className={styles.metricLabel}>Portfolio Value</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter value={28} />
              </div>
              <div className={styles.metricLabel}>Properties</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter value={96} suffix="%" />
              </div>
              <div className={styles.metricLabel}>Occupancy</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter value={1.5} prefix="N$" suffix="bn" decimals={1} />
              </div>
              <div className={styles.metricLabel}>Market Cap</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
