'use client';

import { motion } from 'framer-motion';
import styles from './contact.module.css';

export default function ContactHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay} />
        {/* Placeholder for Maerua Mall aerial */}
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Oryx Head Office" 
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
          <h1 className={styles.headline}>Let's Start The Conversation</h1>
          <p className={styles.subheadline}>
            Connect with our leasing, investor relations, marketing and corporate teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
