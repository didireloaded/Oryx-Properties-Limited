'use client';

import { motion } from 'framer-motion';
import styles from './contact.module.css';
import Link from 'next/link';
import { ArrowRight, FileText, PieChart, Users } from 'lucide-react';

export default function InvestorContactBlock() {
  return (
    <section className={styles.investorBlockSection}>
      <div className={`container ${styles.investorContainer}`}>
        <motion.div 
          className={styles.investorContent}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.investorTitle}>Investor Relations</h2>
          <p className={styles.investorDesc}>
            Oryx Properties is committed to transparent, timely, and comprehensive communication with our shareholders and the broader investment community.
          </p>
          <Link href="/investors" className={styles.investorCta}>
            Investor Center <ArrowRight size={20} />
          </Link>
        </motion.div>

        <motion.div 
          className={styles.investorLinksGrid}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a href="#" className={styles.invLinkCard}>
            <PieChart size={32} color="var(--color-gold)" />
            <h4>Latest Results</h4>
            <span>View FY23 Financials &rarr;</span>
          </a>
          <a href="#" className={styles.invLinkCard}>
            <FileText size={32} color="var(--color-gold)" />
            <h4>Annual Reports</h4>
            <span>Download PDF &rarr;</span>
          </a>
          <a href="#" className={styles.invLinkCard}>
            <Users size={32} color="var(--color-gold)" />
            <h4>Investor Enquiries</h4>
            <span>Contact IR Team &rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
