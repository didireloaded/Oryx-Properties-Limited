'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './investors.module.css';
import { X } from 'lucide-react';
import Image from 'next/image';
import { TeamMember } from '@/types/models';

export default function ManagementGovernance({ management }: { management: TeamMember[] }) {
  const [activeExec, setActiveExec] = useState<number | null>(null);

  const execData = management.find(m => m.id === activeExec);

  return (
    <section className={styles.govSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Management & Governance</h2>
        
        <div className={styles.govGrid}>
          {management.map((exec) => (
            <motion.div 
              key={exec.id}
              className={styles.execCard}
              onClick={() => setActiveExec(exec.id)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.execImageWrapper}>
                <Image src={exec.image} alt={exec.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 className={styles.execName}>{exec.name}</h3>
              <p className={styles.execRole}>{exec.role}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeExec && execData && (
            <>
              {/* Apple-style heavy blur backdrop */}
              <motion.div 
                className={styles.modalBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveExec(null)}
              />
              
              <div className={styles.modalWrapper}>
                <motion.div 
                  className={styles.execModal}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <button className={styles.closeBtn} onClick={() => setActiveExec(null)}>
                    <X size={24} />
                  </button>
                  
                  <div className={styles.modalImageWrapper}>
                    <Image src={execData.image} alt={execData.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  
                  <div className={styles.modalContent}>
                    <h3 className={styles.modalTitle}>{execData.name}</h3>
                    <h4 className={styles.modalRole}>{execData.role}</h4>
                    
                    <div className={styles.modalBioBlock}>
                      <h5>Biography</h5>
                      <p>{execData.bio}</p>
                    </div>

                    <div className={styles.modalBioBlock}>
                      <h5>Qualifications</h5>
                      <p>{execData.quals}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
