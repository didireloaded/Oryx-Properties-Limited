'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';

export default function CsiHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay} />
        {/* Full-screen emotional photography (Namibian communities/students) */}
        <img 
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop" 
          alt="Community Impact in Namibia" 
          className={styles.heroImage}
        />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={styles.headline}>Creating Long-Term Value Beyond Property</h1>
          <p className={styles.subheadline}>
            Oryx invests in communities, education, environmental sustainability and social welfare across Namibia.
          </p>
        </motion.div>

        <motion.div 
          className={styles.metricsGrid}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>
              <AnimatedCounter value={45} prefix="+" />
            </div>
            <div className={styles.metricLabel}>Community Projects</div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>
              <AnimatedCounter value={120} prefix="+" />
            </div>
            <div className={styles.metricLabel}>Youth Initiatives</div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>
              <AnimatedCounter value={15} />
            </div>
            <div className={styles.metricLabel}>Environmental Programmes</div>
          </div>
          <div className={styles.metricItem}>
            <div className={styles.metricValue}>
              <AnimatedCounter value={22} />
            </div>
            <div className={styles.metricLabel}>Years of Impact</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
