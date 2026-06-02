'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';
import { useRealtimeMarket } from '@/hooks/useRealtimeMarket';

function formatMarketCap(val: number): string {
  if (val >= 1_000_000_000) return `N$${(val / 1_000_000_000).toFixed(1)}bn`;
  if (val >= 1_000_000) return `N$${(val / 1_000_000).toFixed(1)}M`;
  return `N$${val.toLocaleString()}`;
}

export default function OryxAtAGlance() {
  const { data, isLive } = useRealtimeMarket();

  const sharePrice = `N$${(data.price / 100).toFixed(2)}`;
  const marketCap = formatMarketCap(data.market_cap);

  return (
    <div className={styles.stickyGlanceWrapper}>
      <motion.div 
        className={styles.glancePanel}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h4 className={styles.glanceTitle}>
          Oryx At A Glance
          {isLive && (
            <span className={styles.liveBadge}>
              <span className={styles.liveBadgeDot} />
              LIVE
            </span>
          )}
        </h4>
        
        <div className={styles.glanceRow}>
          <span className={styles.glanceLabel}>Share Price</span>
          <span className={styles.glanceValue}>{sharePrice}</span>
        </div>

        <div className={styles.glanceRow}>
          <span className={styles.glanceLabel}>Market Cap</span>
          <span className={styles.glanceValue}>{marketCap}</span>
        </div>

        <div className={styles.glanceRow}>
          <span className={styles.glanceLabel}>NAV / Unit</span>
          <span className={styles.glanceValue}>N${data.nav.toFixed(2)}</span>
        </div>

        <div className={styles.glanceRow}>
          <span className={styles.glanceLabel}>Latest DPS</span>
          <span className={styles.glanceValue}>52.5c</span>
        </div>

        <div className={styles.glanceRow}>
          <span className={styles.glanceLabel}>Occupancy</span>
          <span className={styles.glanceValue}>96%</span>
        </div>
      </motion.div>
    </div>
  );
}
