'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CsiTransition() {
  return (
    <section className={styles.transitionSection}>
      <div className="container">
        <motion.div 
          className={styles.transitionContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className={styles.transitionTitle}>Building More Than Property</h2>
          
          <div className={styles.transitionLinks}>
            <Link href="/about" className={styles.transitionLink}>
              <span>Leadership</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/about" className={styles.transitionLink}>
              <span>Governance</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/investors" className={styles.transitionLink}>
              <span>Investors</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
