'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './investors.module.css';

import { Dividend } from '@/types/models';

export default function DividendCentre({ dividendData }: { dividendData: Dividend[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const maxDps = Math.max(...dividendData.map(d => d.dps));

  return (
    <section className={styles.dividendSection}>
      <div className="container">
        <div className={styles.divHeader}>
          <h2 className={styles.sectionTitle}>Dividend History</h2>
          <p className={styles.sectionDesc}>Consistent distributions and yield performance over time.</p>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartYAxis}>
            <span>{maxDps}c</span>
            <span>{Math.round(maxDps / 2)}c</span>
            <span>0c</span>
          </div>

          <div className={styles.chartArea}>
            {dividendData.map((d, i) => {
              const heightPct = (d.dps / maxDps) * 100;
              const isHovered = hovered === i;

              return (
                <div 
                  key={d.year} 
                  className={styles.chartBarGroup}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={styles.barWrapper}>
                    <motion.div 
                      className={styles.barFill}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      style={{ background: isHovered ? 'var(--color-gold)' : 'rgba(212,175,55,0.4)' }}
                    />

                    {isHovered && (
                      <div className={styles.chartTooltip}>
                        <div className={styles.ttYear}>{d.year}</div>
                        <div className={styles.ttRow}>
                          <span>DPS</span>
                          <span>{d.dps}c</span>
                        </div>
                        <div className={styles.ttRow}>
                          <span>Yield</span>
                          <span>{d.yield}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.chartXAxis}>{d.year}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
