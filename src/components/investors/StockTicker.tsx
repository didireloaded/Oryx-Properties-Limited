'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRealtimeMarket } from '@/hooks/useRealtimeMarket';
import styles from './investors.module.css';
import { TrendingUp, TrendingDown, Activity, BarChart3, Clock } from 'lucide-react';

function formatPrice(cents: number): string {
  return `N$${(cents / 100).toFixed(2)}`;
}

function formatVolume(vol: number): string {
  if (vol >= 1_000_000) return `${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `${(vol / 1_000).toFixed(1)}K`;
  return vol.toString();
}

function formatMarketCap(val: number): string {
  if (val >= 1_000_000_000) return `N$${(val / 1_000_000_000).toFixed(2)}bn`;
  if (val >= 1_000_000) return `N$${(val / 1_000_000).toFixed(1)}M`;
  return `N$${val.toLocaleString()}`;
}

export default function StockTicker() {
  const { data, isLive, lastFlash } = useRealtimeMarket();

  const isPositive = data.change >= 0;
  const changeColor = isPositive ? '#22c55e' : '#ef4444';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const flashClass = lastFlash === 'up'
    ? styles.tickerFlashUp
    : lastFlash === 'down'
    ? styles.tickerFlashDown
    : '';

  const timeStr = data.updated_at
    ? new Date(data.updated_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.tickerBar}>
        {/* Live indicator */}
        <div className={styles.tickerLive}>
          <span className={`${styles.liveDot} ${isLive ? styles.liveDotActive : ''}`} />
          <span className={styles.liveLabel}>{isLive ? 'LIVE' : 'CONNECTING'}</span>
        </div>

        {/* Ticker symbol + exchange */}
        <div className={styles.tickerSymbol}>
          <span className={styles.tickerSymbolText}>ORY</span>
          <span className={styles.tickerExchange}>NSX</span>
        </div>

        {/* Price */}
        <AnimatePresence mode="wait">
          <motion.div
            key={data.price}
            className={`${styles.tickerPrice} ${flashClass}`}
            initial={{ opacity: 0.6, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatPrice(data.price)}
          </motion.div>
        </AnimatePresence>

        {/* Change */}
        <div className={styles.tickerChange} style={{ color: changeColor }}>
          <TrendIcon size={14} />
          <span>{isPositive ? '+' : ''}{(data.change / 100).toFixed(2)}</span>
          <span className={styles.tickerChangePct}>({isPositive ? '+' : ''}{data.change_pct.toFixed(2)}%)</span>
        </div>

        {/* Divider */}
        <div className={styles.tickerDivider} />

        {/* Stats */}
        <div className={styles.tickerStat}>
          <BarChart3 size={12} />
          <span className={styles.tickerStatLabel}>Vol</span>
          <span className={styles.tickerStatValue}>{formatVolume(data.volume)}</span>
        </div>

        <div className={styles.tickerStat}>
          <Activity size={12} />
          <span className={styles.tickerStatLabel}>H/L</span>
          <span className={styles.tickerStatValue}>{formatPrice(data.high)} / {formatPrice(data.low)}</span>
        </div>

        <div className={styles.tickerStat}>
          <span className={styles.tickerStatLabel}>Mkt Cap</span>
          <span className={styles.tickerStatValue}>{formatMarketCap(data.market_cap)}</span>
        </div>

        <div className={styles.tickerStat}>
          <span className={styles.tickerStatLabel}>NAV</span>
          <span className={styles.tickerStatValue}>N${data.nav.toFixed(2)}</span>
        </div>

        {/* Timestamp */}
        <div className={styles.tickerTime}>
          <Clock size={11} />
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
