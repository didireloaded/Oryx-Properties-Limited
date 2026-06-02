'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './contact.module.css';

type Department = 'Leasing' | 'Investor Relations' | 'Corporate Office' | 'Careers';

export default function SmartContactPortal() {
  const [activeDept, setActiveDept] = useState<Department>('Leasing');

  const departments: { id: Department; label: string }[] = [
    { id: 'Leasing', label: 'Available Spaces' },
    { id: 'Investor Relations', label: 'Reports & Shareholders' },
    { id: 'Corporate Office', label: 'General Enquiries' },
    { id: 'Careers', label: 'Opportunities' }
  ];

  return (
    <section className={styles.portalSection}>
      <div className="container">
        
        {/* Department Selector */}
        <div className={styles.selectorGrid}>
          {departments.map((dept) => (
            <button
              key={dept.id}
              className={`${styles.selectorCard} ${activeDept === dept.id ? styles.activeCard : ''}`}
              onClick={() => setActiveDept(dept.id)}
            >
              <div className={styles.selectorLabel}>{dept.id}</div>
              <div className={styles.selectorSublabel}>{dept.label}</div>
              {activeDept === dept.id && (
                <motion.div layoutId="activeHighlight" className={styles.activeHighlight} />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Form & Intelligence Panel */}
        <div className={styles.portalGrid}>
          
          <div className={styles.formCol}>
            <AnimatePresence mode="wait">
              <motion.form 
                key={activeDept}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={styles.smartForm}
                onSubmit={(e) => e.preventDefault()}
              >
                <div className={styles.formHeader}>
                  <h3>{activeDept} Enquiry</h3>
                  <p>Please provide your details and our {activeDept} team will respond shortly.</p>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Company (Optional)</label>
                    <input type="text" placeholder="Company Name" />
                  </div>
                </div>

                {activeDept === 'Leasing' && (
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Space Required (sqm)</label>
                      <input type="text" placeholder="e.g. 150 sqm" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Preferred Location</label>
                      <select>
                        <option>Maerua Mall</option>
                        <option>Gustav Voigts Centre</option>
                        <option>Dunes Mall</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeDept === 'Investor Relations' && (
                  <div className={styles.formGroup}>
                    <label>Enquiry Type</label>
                    <select>
                      <option>Financial Reports</option>
                      <option>Dividend Information</option>
                      <option>AGM Query</option>
                      <option>Other</option>
                    </select>
                  </div>
                )}

                {activeDept === 'Careers' && (
                  <div className={styles.formGroup}>
                    <label>Area of Interest</label>
                    <select>
                      <option>Property Management</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Facilities</option>
                    </select>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea rows={5} placeholder="How can we assist you?"></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message &rarr;
                </button>
              </motion.form>
            </AnimatePresence>
          </div>

          <div className={styles.intelligenceCol}>
            <div className={styles.intelligencePanel}>
              <h3>Corporate Office</h3>
              
              <div className={styles.intelBlock}>
                <div className={styles.intelLabel}>Phone</div>
                <div className={styles.intelValue}>+264 61 423 201</div>
              </div>

              <div className={styles.intelBlock}>
                <div className={styles.intelLabel}>Email</div>
                <div className={styles.intelValue}>admin@oryxprop.com</div>
              </div>

              <div className={styles.intelBlock}>
                <div className={styles.intelLabel}>Location</div>
                <div className={styles.intelValue}>
                  Maerua Mall Office Tower<br />
                  2nd Floor<br />
                  Windhoek, Namibia
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
