"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LeasingPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeasingProperties() {
      try {
        const res = await fetch('/api/properties?isLeasing=true');
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching leasing properties:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeasingProperties();
  }, []);

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. HEADER */}
      <section style={{ padding: '6rem 0 4rem 0', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ padding: '0 2rem', margin: '0 auto', maxWidth: '1400px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '1rem' }}>Leasing Opportunities</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
              Explore available retail, office, and industrial spaces across our premier portfolio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. LEASING LISTING */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-secondary)', flex: 1 }}>
        <div className="container" style={{ padding: '0 2rem', margin: '0 auto', maxWidth: '1400px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', position: 'relative', minHeight: '300px' }}>
            {isLoading ? (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={32} color="var(--accent-gold)" className="animate-spin" />
              </div>
            ) : properties.map((prop, index) => (
              <motion.div 
                key={prop.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass-panel-15 group" style={{ borderRadius: '4px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={prop.image} alt={prop.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="group-hover:scale-105" />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--accent-brand)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>
                      AVAILABLE
                    </div>
                  </div>
                  
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: 'var(--accent-brand)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{prop.type} • {prop.location}</div>
                    <h4 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '1rem', fontWeight: 400 }}>{prop.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{prop.description}</p>
                    
                    {prop.availableSpaces && prop.availableSpaces.length > 0 && (
                      <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-primary)', padding: '1rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '1px' }}>Available Units</div>
                        {prop.availableSpaces.map((space: any, i: number) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', borderBottom: i !== prop.availableSpaces.length - 1 ? '1px solid var(--border-glass)' : 'none', paddingBottom: i !== prop.availableSpaces.length - 1 ? '0.5rem' : 0, marginBottom: i !== prop.availableSpaces.length - 1 ? '0.5rem' : 0 }}>
                            <span style={{ color: 'var(--text-light)' }}>{space.unit}</span>
                            <span style={{ color: 'var(--accent-brand)', fontWeight: 500 }}>{space.size}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <a href={`mailto:info@oryxprop.com?subject=Enquiry regarding ${prop.name}`} style={{ display: 'inline-block', backgroundColor: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-light)', textAlign: 'center', padding: '0.75rem', borderRadius: '4px', textDecoration: 'none', transition: 'all 0.3s' }} className="hover:border-[var(--accent-brand)] hover:text-[var(--accent-brand)]">
                      Enquire Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!isLoading && properties.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>No leasing opportunities available at this time.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
