'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';

import { Announcement } from '@/types/models';

export default function LatestAnnouncements({ announcements }: { announcements: Announcement[] }) {
  return (
    <section className={styles.announcementsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Latest Announcements</h2>
        
        <div className={styles.announcementsList}>
          {announcements.map((ann, i) => (
            <motion.div 
              key={i}
              className={styles.announcementCard}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.annMeta}>
                <span className={styles.annDate}>{ann.date}</span>
                <span className={styles.annType}>{ann.category}</span>
              </div>
              <h3 className={styles.annTitle}>{ann.title}</h3>
              <button className={styles.annBtn}>Read Announcement &rarr;</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
