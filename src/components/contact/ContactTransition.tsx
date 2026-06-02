'use client';

import { motion } from 'framer-motion';
import styles from './contact.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContactTransition() {
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
          <h2 className={styles.transitionTitle}>Building Long-Term Value Across Namibia</h2>
          
          <div className={styles.transitionLinks}>
            <Link href="/investors" className={styles.transitionLink}>
              <span>Investor Links</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/portfolio" className={styles.transitionLink}>
              <span>Portfolio</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/about" className={styles.transitionLink}>
              <span>Governance</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/careers" className={styles.transitionLink}>
              <span>Careers</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
