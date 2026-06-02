'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';

export default function ImpactPhilosophy() {
  return (
    <section className={styles.philosophySection}>
      <div className="container">
        <motion.div 
          className={styles.philosophyContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.philosophyStatement}>
            We believe property should create value beyond buildings.
          </h2>
          <div className={styles.philosophyLine} />
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.philosophyImageWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img 
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop" 
          alt="Environmental impact" 
          className={styles.philosophyImage}
        />
      </motion.div>
    </section>
  );
}
