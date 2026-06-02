'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './PortfolioDashboard.module.css';
import AnimatedCounter from '@/components/about/AnimatedCounter';

export default function PortfolioDashboard() {
  return (
    <section className={styles.dashboardSection}>
      <div className="container">
        
        <div className={styles.dashboardGrid}>
          <div className={styles.dashboardHeader}>
            <h2 className={styles.title}>Portfolio Performance</h2>
            <p className={styles.subtitle}>Consistently delivering sustainable long-term earnings growth.</p>
          </div>

          <div className={styles.metricsContainer}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Portfolio Value</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={4.7} prefix="N$" suffix="bn" decimals={1} />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Occupancy</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={96.2} suffix="%" decimals={1} />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Vacancy</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={3.8} suffix="%" decimals={1} />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Total Assets</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={28} />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Total Tenants</div>
              <div className={styles.metricValue}>
                <AnimatedCounter value={256} />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>YOY Growth</div>
              <div className={styles.metricValue} style={{ color: 'var(--color-gold)' }}>
                <AnimatedCounter value={8.4} prefix="+" suffix="%" decimals={1} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
