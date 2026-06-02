'use client';

import { useState } from 'react';
import { HistoricalData } from '@/types/models';
import styles from './investors.module.css';

export default function GrowthTimeline({ historicalData }: { historicalData: HistoricalData[] }) {
  const [year, setYear] = useState<number>(2026);
  const data = historicalData.find(d => d.year === year) || historicalData[historicalData.length - 1];

  return (
    <section className={styles.growthSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Historical Growth</h2>
        
        <div className={styles.growthWrapper}>
          
          <div className={styles.sliderContainer}>
            <div className={styles.sliderLabels}>
              <span>2018</span>
              <span className={styles.activeYearLabel}>{year}</span>
              <span>2026</span>
            </div>
            <input 
              type="range" 
              min="2018" 
              max="2026" 
              step="1" 
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value))}
              className={styles.yearSlider}
            />
          </div>

          <div className={styles.growthMetricsGrid}>
            <div className={styles.growthMetric}>
              <span className={styles.growthLabel}>Portfolio Value</span>
              <span className={styles.growthValue}>
                N${data.value.toFixed(1)}bn
              </span>
            </div>

            <div className={styles.growthMetric}>
              <span className={styles.growthLabel}>Market Cap</span>
              <span className={styles.growthValue}>
                N${data.cap.toFixed(1)}bn
              </span>
            </div>

            <div className={styles.growthMetric}>
              <span className={styles.growthLabel}>Occupancy</span>
              <span className={styles.growthValue}>
                {data.occ}%
              </span>
            </div>

            <div className={styles.growthMetric}>
              <span className={styles.growthLabel}>Dividend (DPS)</span>
              <span className={styles.growthValue}>
                {data.div}c
              </span>
            </div>

            <div className={styles.growthMetric}>
              <span className={styles.growthLabel}>Properties</span>
              <span className={styles.growthValue}>
                {data.props}
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
