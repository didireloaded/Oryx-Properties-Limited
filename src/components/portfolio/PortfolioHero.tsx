import React from 'react';
import { motion } from 'framer-motion';
import styles from './PortfolioHero.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';
import Image from 'next/image';

export default function PortfolioHero() {
  return (
    <div className={styles.heroSection}>
      {/* Background Video/Image */}
      <div className={styles.backgroundWrapper}>
        <div className={styles.overlay}></div>
        {/* Placeholder for Cinematic Video - Using high res architectural image for now */}
        <Image 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Portfolio Architecture" 
          fill
          style={{ objectFit: 'cover' }}
          className={styles.bgImage}
        />
      </div>

      <div className={`container ${styles.contentContainer}`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={styles.textContent}
        >
          <h1 className={styles.headline}>A Diversified Property Portfolio Across Namibia</h1>
          <p className={styles.subheadline}>
            28 strategically positioned retail, office, industrial and residential assets.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className={styles.statsGrid}
        >
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Portfolio Value</div>
            <div className={styles.statValue}>
              <AnimatedCounter value={4.7} prefix="N$" suffix="bn" decimals={1} />
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Properties</div>
            <div className={styles.statValue}>
              <AnimatedCounter value={28} />
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Tenants</div>
            <div className={styles.statValue}>
              <AnimatedCounter value={256} />
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Occupancy</div>
            <div className={styles.statValue}>
              <AnimatedCounter value={96} suffix="%" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
