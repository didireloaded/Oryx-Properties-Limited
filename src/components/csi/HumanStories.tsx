'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';

export default function HumanStories() {
  return (
    <section className={styles.storiesSection}>
      <div className={styles.storyFullscreenImage}>
        <div className={styles.storyOverlay} />
        <img 
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" 
          alt="Community Member" 
        />
        
        <div className={`container ${styles.storyContentContainer}`}>
          <motion.div 
            className={styles.storyQuoteWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <blockquote className={styles.storyQuote}>
              "The support from Oryx Properties didn't just rebuild our classrooms; it restored dignity and hope to our entire community."
            </blockquote>
            <cite className={styles.storyCite}>— Community Leader, Hardap Region</cite>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
