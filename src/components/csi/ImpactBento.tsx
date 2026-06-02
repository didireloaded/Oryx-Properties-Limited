'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './csi.module.css';
import { Plus, X } from 'lucide-react';

const impactAreas = [
  {
    id: 'youth',
    title: 'Youth Development',
    summary: 'Empowering the next generation through education and sports.',
    projects: ['Groendraai Primary School upgrades', 'Tertiary bursary programs', 'Local youth sports sponsorships']
  },
  {
    id: 'environment',
    title: 'Environmental Preservation',
    summary: 'Protecting Namibia’s natural heritage for future generations.',
    projects: ['Rooftop Solar PV installations', 'Water harvesting systems', 'Waste recycling programs']
  },
  {
    id: 'welfare',
    title: 'Social Welfare',
    summary: 'Supporting the most vulnerable members of our society.',
    projects: ['Church Alliance for Orphans (CAFO)', 'Orange Babies Namibia', 'Cancer Association support']
  },
  {
    id: 'citizenship',
    title: 'Corporate Citizenship',
    summary: 'Stepping up during national crises and empowering local communities.',
    projects: ['Mayoral Relief Fund contributions', 'Employee volunteer programs', 'Disaster response initiatives']
  }
];

export default function ImpactBento() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className={styles.bentoSection}>
      <div className="container">
        <h2 className={styles.bentoSectionTitle}>Core Impact Pillars</h2>
        
        <div className={styles.bentoGrid}>
          {impactAreas.map((area) => (
            <motion.div 
              key={area.id}
              layoutId={`card-${area.id}`}
              className={styles.bentoCard}
              onClick={() => setExpandedId(area.id)}
              whileHover={{ scale: expandedId === null ? 1.02 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 layoutId={`title-${area.id}`} className={styles.bentoCardTitle}>
                {area.title}
              </motion.h3>
              <motion.div className={styles.bentoCardIcon}>
                <Plus size={24} color="var(--color-gold)" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {expandedId && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.bentoOverlay}
                onClick={() => setExpandedId(null)}
              />
              <div className={styles.bentoExpandedWrapper}>
                {impactAreas.filter(a => a.id === expandedId).map(area => (
                  <motion.div 
                    key={`expanded-${area.id}`}
                    layoutId={`card-${area.id}`}
                    className={styles.bentoExpandedCard}
                  >
                    <button 
                      className={styles.bentoCloseBtn}
                      onClick={() => setExpandedId(null)}
                    >
                      <X size={24} />
                    </button>
                    <motion.h3 layoutId={`title-${area.id}`} className={styles.bentoExpandedTitle}>
                      {area.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={styles.bentoExpandedSummary}
                    >
                      {area.summary}
                    </motion.p>
                    <motion.ul 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={styles.bentoProjectList}
                    >
                      {area.projects.map((project, idx) => (
                        <li key={idx}>{project}</li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
