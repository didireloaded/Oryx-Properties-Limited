'use client';

import { motion } from 'framer-motion';
import styles from './investors.module.css';

import { Event } from '@/types/models';

export default function InvestorCalendar({ events }: { events: Event[] }) {
  return (
    <section className={styles.calendarSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Investor Calendar</h2>
        
        <div className={styles.calendarGrid}>
          {events.map((ev, i) => {
            const dateParts = ev.date ? ev.date.split(' ') : ['', ''];
            const day = dateParts[0];
            const month = dateParts[1] || '';
            return (
              <motion.div 
                key={i}
                className={styles.calendarCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.calDateBox}>
                  <span className={styles.calMonth}>{month}</span>
                  <span className={styles.calDay}>{day}</span>
                </div>
                <div className={styles.calContent}>
                  <h3 className={styles.calTitle}>{ev.title}</h3>
                  <p className={styles.calDesc}>{ev.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
