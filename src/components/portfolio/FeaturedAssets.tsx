'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeaturedAssets.module.css';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function FeaturedAssets() {
  const featured = [
    {
      id: "1",
      name: "Maerua Mall",
      location: "Windhoek",
      type: "Retail Asset",
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2126&auto=format&fit=crop",
      description: "Namibia's premier shopping destination, anchoring the prime retail node of the capital.",
      occupancy: "98% Occupancy"
    },
    {
      id: "5",
      name: "Dunes Mall",
      location: "Walvis Bay",
      type: "Retail Asset",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop",
      description: "The coast's largest and most vibrant retail environment.",
      occupancy: "95% Occupancy"
    },
    {
      id: "3",
      name: "Gustav Voigts Centre",
      location: "Windhoek",
      type: "Mixed Use",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      description: "A mixed-use commercial icon in the heart of Windhoek's central business district.",
      occupancy: "97% Occupancy"
    }
  ];

  return (
    <section className={styles.featuredSection}>
      <div className="container">
        
        {featured.map((asset, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div key={asset.id} className={`${styles.assetRow} ${isReversed ? styles.reversed : ''}`}>
              <motion.div 
                className={styles.imageCol}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative' }}
              >
                <Image src={asset.image} alt={asset.name} fill style={{ objectFit: 'cover' }} />
              </motion.div>

              <motion.div 
                className={styles.dataCol}
                initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.metaData}>
                  <span>{asset.type}</span>
                  <span>{asset.location}</span>
                  <span className={styles.highlight}>{asset.occupancy}</span>
                </div>
                <h3 className={styles.assetName}>{asset.name}</h3>
                <p className={styles.assetDesc}>{asset.description}</p>
                <Button href={`/portfolio/${asset.id}`} variant="outline" className={styles.viewBtn}>
                  View Asset &rarr;
                </Button>
              </motion.div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
