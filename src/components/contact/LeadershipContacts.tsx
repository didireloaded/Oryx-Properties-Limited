'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './contact.module.css';
import { X, Mail, Phone } from 'lucide-react';

const departments = [
  {
    id: 'leasing',
    name: 'Leasing',
    team: 'Nicole van Wyk & Leasing Department',
    email: 'letting1@oryxprop.com',
    phone: '+264 61 423 200',
    desc: 'For all space requirements, tenant relations, and lease agreements.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
  },
  {
    id: 'ir',
    name: 'Investor Relations',
    team: 'Finance & IR Team',
    email: 'investors@oryxprop.com',
    phone: '+264 61 423 201',
    desc: 'For shareholders, analysts, and institutional investors.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    team: 'Corporate Communications',
    email: 'marketing@oryxprop.com',
    phone: '+264 61 423 202',
    desc: 'For media enquiries, branding, and promotional activities.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'corporate',
    name: 'Corporate Office',
    team: 'Executive Secretariat',
    email: 'admin@oryxprop.com',
    phone: '+264 61 423 200',
    desc: 'For general corporate matters and governance.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop'
  }
];

export default function LeadershipContacts() {
  const [activeDept, setActiveDept] = useState<string | null>(null);

  const activeData = departments.find(d => d.id === activeDept);

  return (
    <section className={styles.leadershipSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Need A Specific Department?</h2>
        
        <div className={styles.leadershipGrid}>
          {departments.map((dept) => (
            <motion.div 
              key={dept.id}
              className={styles.leadershipCard}
              onClick={() => setActiveDept(dept.id)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3>{dept.name}</h3>
              <span className={styles.viewLink}>View Contact &rarr;</span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {activeDept && activeData && (
            <>
              {/* Apple-style heavy blur backdrop */}
              <motion.div 
                className={styles.modalBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveDept(null)}
              />
              
              <div className={styles.modalWrapper}>
                <motion.div 
                  className={styles.contactModal}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                  <button className={styles.closeBtn} onClick={() => setActiveDept(null)}>
                    <X size={24} />
                  </button>
                  
                  <div className={styles.modalImageWrapper}>
                    <img src={activeData.image} alt={activeData.name} />
                  </div>
                  
                  <div className={styles.modalContent}>
                    <h3 className={styles.modalTitle}>{activeData.name}</h3>
                    <h4 className={styles.modalTeam}>{activeData.team}</h4>
                    <p className={styles.modalDesc}>{activeData.desc}</p>
                    
                    <div className={styles.modalContacts}>
                      <a href={`mailto:${activeData.email}`} className={styles.contactLink}>
                        <Mail size={18} /> {activeData.email}
                      </a>
                      <a href={`tel:${activeData.phone}`} className={styles.contactLink}>
                        <Phone size={18} /> {activeData.phone}
                      </a>
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
