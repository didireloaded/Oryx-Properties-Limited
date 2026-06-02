'use client';

import { motion } from 'framer-motion';
import styles from './home.module.css';
import { Download, ChevronRight } from 'lucide-react';

const news = [
  { date: '15 Sep 2025', title: 'Audited Annual Results for the year ended 30 June 2025' },
  { date: '28 Aug 2025', title: 'Declaration of Final Dividend of 52.50 cents per linked unit' },
  { date: '10 Jul 2025', title: 'Acquisition of Prime Retail Asset in Swakopmund' }
];

const documents = [
  { title: '2025 Integrated Annual Report', type: 'PDF' },
  { title: 'FY25 Results Presentation', type: 'PDF' }
];

export default function InstitutionalTrust() {
  return (
    <section className={styles.trustSection}>
      <div className="container">
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.sectionTitle}>Institutional Trust</h2>
          <p className={styles.sectionDesc}>Committed to transparent governance, rigorous financial reporting, and sustainable stakeholder value creation.</p>
        </motion.div>

        <div className={styles.trustGrid}>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h3 className={styles.trustBlockTitle}>Latest Announcements</h3>
            <div className={styles.newsList}>
              {news.map((item, i) => (
                <div key={i} className={styles.newsItem}>
                  <span className={styles.newsDate}>{item.date}</span>
                  <span className={styles.newsTitle}>{item.title}</span>
                </div>
              ))}
            </div>
            <button className={styles.heroAction} style={{ marginTop: '2rem', border: 'none', padding: 0 }}>
              View All Announcements <ChevronRight size={16} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <h3 className={styles.trustBlockTitle}>Key Documents</h3>
            <div>
              {documents.map((doc, i) => (
                <div key={i} className={styles.docCard}>
                  <span className={styles.docTitle}>{doc.title}</span>
                  <Download size={20} color="var(--color-gold-primary)" />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
