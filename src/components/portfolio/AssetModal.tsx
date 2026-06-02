import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, ArrowRight } from 'lucide-react';
import styles from './AssetModal.module.css';
import { Property } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface AssetModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetModal({ property, isOpen, onClose }: AssetModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && property && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.backdrop}
            onClick={onClose}
          />
          
          <div className={styles.modalContainer} onClick={(e) => {
            // Close if clicking outside the content block
            if (e.target === e.currentTarget) onClose();
          }}>
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.modalContent}
            >
              <button className={styles.closeBtn} onClick={onClose}>
                <X size={24} />
              </button>

              <div className={styles.imageSection}>
                <Image src={property.image} alt={property.name} fill style={{ objectFit: 'cover' }} className={styles.image} />
                <div className={styles.imageOverlay}></div>
                <div className={styles.heroInfo}>
                  <div className={styles.badge}>{property.type}</div>
                  <h2 className={styles.title}>{property.name}</h2>
                  <div className={styles.location}>
                    <MapPin size={16} />
                    {property.location}
                  </div>
                </div>
              </div>

              <div className={styles.dataSection}>
                <div className={styles.description}>
                  {property.description}
                </div>

                <div className={styles.metricsGrid}>
                  <div className={styles.metric}>
                    <span className={styles.mLabel}>Valuation</span>
                    <span className={styles.mValue}>{property.valuation}</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.mLabel}>GLA</span>
                    <span className={styles.mValue}>{property.gla}m²</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.mLabel}>Occupancy</span>
                    <span className={styles.mValue}>{property.occupancy}%</span>
                  </div>
                  <div className={styles.metric}>
                    <span className={styles.mLabel}>WALE</span>
                    <span className={styles.mValue}>{property.wale || '-'}</span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <Link href={`/portfolio/${property.id}`} className={styles.primaryBtn} onClick={() => {
                    // Slight delay could be added, but simple link is fine
                    document.body.style.overflow = 'unset';
                  }}>
                    View Full Asset <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
