'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';
import { useRealtimeMarket } from '@/hooks/useRealtimeMarket';

function formatMarketCapBn(val: number): number {
  return parseFloat((val / 1_000_000_000).toFixed(1));
}

export default function InvestorHero() {
  const { data, isLive } = useRealtimeMarket();

  const marketCapBn = formatMarketCapBn(data.market_cap);

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.heroHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className={styles.heroTitle}>Investment Performance Dashboard</h1>
          <p className={styles.heroSubtitle}>
            Real-time insights, portfolio health, and historical growth metrics for Oryx Properties shareholders.
          </p>
        </motion.div>

        <div className={styles.heroMetricsGrid}>
          <motion.div 
            className={styles.glassCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.glassValue}>
              <AnimatedCounter value={4.7} prefix="N$" suffix="bn" decimals={1} />
            </div>
            <div className={styles.glassLabel}>Portfolio Value</div>
          </motion.div>

          <motion.div 
            className={styles.glassCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.glassValue}>
              <AnimatedCounter value={marketCapBn} prefix="N$" suffix="bn" decimals={1} />
            </div>
            <div className={styles.glassLabel}>
              Market Cap
              {isLive && (
                <span className={styles.liveBadge}>
                  <span className={styles.liveBadgeDot} />
                  LIVE
                </span>
              )}
            </div>
          </motion.div>

          <motion.div 
            className={styles.glassCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.glassValue}>
              <AnimatedCounter value={96} suffix="%" />
            </div>
            <div className={styles.glassLabel}>Occupancy</div>
          </motion.div>

          <motion.div 
            className={styles.glassCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.glassValue}>
              <AnimatedCounter value={28} />
            </div>
            <div className={styles.glassLabel}>Properties</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
