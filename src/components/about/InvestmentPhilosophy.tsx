'use client';

import { motion } from 'framer-motion';
import styles from '@/app/about/about.module.css';

const philosophies = [
  {
    title: 'Diversified Portfolio',
    description: 'Mitigating risk and ensuring stable returns by balancing retail, industrial, office, and residential assets.'
  },
  {
    title: 'Strategic Locations',
    description: 'Acquiring properties in high-demand nodes to guarantee long-term tenant retention and asset appreciation.'
  },
  {
    title: 'Quality Tenants',
    description: 'Partnering with blue-chip and national brands to secure dependable and predictable income streams.'
  },
  {
    title: 'Sustainable Growth',
    description: 'Investing in environmentally responsible upgrades and future-proofing assets for long-term viability.'
  }
];

export default function InvestmentPhilosophy() {
  return (
    <section className={styles.philosophySection}>
      <div className="container">
        <motion.h2 
          className={styles.philosophyHeading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built For Long-Term Value
        </motion.h2>

        <div className={styles.bentoGrid}>
          {philosophies.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.bentoCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className={styles.bentoTitle}>{item.title}</h4>
              <div className={styles.bentoContent}>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
