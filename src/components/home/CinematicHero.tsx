'use client';

import { motion } from 'framer-motion';
import styles from './home.module.css';

export default function CinematicHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBg}>
        <motion.img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Oryx Properties Headquarters" 
          className={styles.heroImage}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
        />
      </div>

      <div className={styles.heroContent}>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Building Long-Term Value Across Namibia
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          A premier listed property fund managing a high-quality, diversified portfolio of retail, industrial, office, and residential assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          <button className={styles.heroAction}>
            Explore The Portfolio
          </button>
        </motion.div>
      </div>
    </section>
  );
}
