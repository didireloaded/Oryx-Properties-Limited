import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import styles from './AssetCard.module.css';
import { Property } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export default function AssetCard({ property, onClick }: { property: Property, onClick?: (p: Property) => void }) {
  const isAvailable = property.availableSpaces && property.availableSpaces.length > 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={styles.card}
    >
      <Link href={`/portfolio/${property.id}`} className={styles.cardLink} onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(property);
        }
      }}>
        <div className={styles.imageContainer}>
          <Image src={property.image} alt={property.name} fill style={{ objectFit: 'cover' }} className={styles.image} />
          <div className={styles.badge}>{property.type}</div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.locationInfo}>
            <MapPin size={14} />
            <span>{property.location}</span>
          </div>
          
          <h3 className={styles.title}>{property.name}</h3>
          
          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <span className={styles.mLabel}>GLA</span>
              <span className={styles.mValue}>{property.gla}m²</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.mLabel}>Occupancy</span>
              <span className={styles.mValue}>{property.occupancy}%</span>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={`${styles.status} ${isAvailable ? styles.statusAvail : styles.statusFull}`}>
              <div className={styles.statusDot}></div>
              {isAvailable ? 'Space Available' : 'Fully Let'}
            </div>
            
            <div className={styles.action}>
              <span className={styles.actionText}>View Asset</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
