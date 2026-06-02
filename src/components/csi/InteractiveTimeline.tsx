'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './csi.module.css';

const timelineData = [
  { year: 2018, project: 'Initiated the Groendraai Primary School support program.' },
  { year: 2019, project: 'Launched the first phase of rooftop solar PV installations.' },
  { year: 2020, project: 'Established the Mayoral Relief Fund for pandemic support.' },
  { year: 2021, project: 'Partnered with CAFO to support 150+ vulnerable children.' },
  { year: 2022, project: 'Completed water harvesting projects at Maerua Mall.' },
  { year: 2023, project: 'Expanded tertiary bursary program for Namibian youth.' },
  { year: 2024, project: 'Sponsored Orange Babies Namibia to fight HIV/AIDS.' },
  { year: 2025, project: 'Launching the unified Environmental Stewardship framework.' }
];

export default function InteractiveTimeline() {
  const [activeYear, setActiveYear] = useState(2024);

  return (
    <section className={styles.timelineSection}>
      <div className="container">
        <h2 className={styles.timelineTitle}>Impact Over Time</h2>
        
        <div className={styles.timelineWrapper}>
          <div className={styles.timelineScroll}>
            {timelineData.map((item) => (
              <button 
                key={item.year}
                className={`${styles.timelineYearBtn} ${activeYear === item.year ? styles.activeYear : ''}`}
                onClick={() => setActiveYear(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>

          <div className={styles.timelineContentWrapper}>
            <AnimatePresence mode="wait">
              {timelineData.filter(d => d.year === activeYear).map((data) => (
                <motion.div
                  key={data.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={styles.timelineContent}
                >
                  <span className={styles.timelineHighlightYear}>{data.year}</span>
                  <p className={styles.timelineProject}>{data.project}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
