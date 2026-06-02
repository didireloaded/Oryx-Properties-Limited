'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';
import { Download, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Report } from '@/types/models';

export default function AnnualReports({ reports }: { reports: Report[] }) {
  return (
    <section className={styles.reportsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Annual Reports</h2>
        
        <div className={styles.reportsGrid}>
          {reports.map((report, i) => (
            <motion.div 
              key={i}
              className={styles.reportCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.reportCover}>
                <Image src={report.url} alt={`Annual Report ${report.year}`} fill style={{ objectFit: 'cover' }} />
                <div className={styles.reportOverlay}>
                  <button className={styles.reportBtn}><Download size={18} /> Download</button>
                  <button className={styles.reportBtn}><ExternalLink size={18} /> View Online</button>
                </div>
              </div>
              <h3 className={styles.reportYear}>{report.year}</h3>
              <p className={styles.reportTitle}>{report.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
