"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [sharePrice, setSharePrice] = useState<{ price: number, changePercent: number } | null>(null);

  useEffect(() => {
    fetch('/api/market-data')
      .then(res => res.json())
      .then(data => {
        if (data && data.metrics) {
          setSharePrice({
            price: data.metrics.currentPrice,
            changePercent: data.metrics.dailyChangePercent
          });
        }
      })
      .catch(console.error);
  }, []);
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* 1. HERO */}
      <section style={{ height: '90vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,20,35,0.9) 0%, rgba(15,20,35,0.4) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '800px' }}>
            
            {/* Live Stock Metric Widget */}
            {sharePrice && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', borderRadius: '100px', marginBottom: '2rem' }}
              >
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>ORYX Share Price</div>
                <div style={{ color: 'var(--text-light)', fontWeight: 600 }}>N$ {sharePrice.price.toFixed(2)}</div>
                <div style={{ color: sharePrice.changePercent >= 0 ? '#10B981' : '#EF4444', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {sharePrice.changePercent >= 0 ? '▲' : '▼'} {Math.abs(sharePrice.changePercent).toFixed(1)}%
                </div>
              </motion.div>
            )}

            <h1 style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontWeight: 300, lineHeight: 1.1 }}>
              Building Namibia's Future Through Strategic Investment.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
              Oryx Properties is Namibia's premier listed property fund, delivering sustainable long-term yields through a meticulously managed, diversified real estate portfolio.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/investors" className="btn-primary" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none' }}>
                Investor Centre
              </Link>
              <Link href="/portfolio" className="btn-primary">
                Explore Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PORTFOLIO SNAPSHOT (10% Glass) */}
      <section style={{ marginTop: '-4rem', position: 'relative', zIndex: 20 }} className="container">
        <div className="glass-panel-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '3rem', borderRadius: '4px' }}>
          <div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Portfolio Value</div>
            <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300 }}>N$ 3.4B</div>
          </div>
          <div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Properties</div>
            <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300 }}>30</div>
          </div>
          <div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Occupancy Rate</div>
            <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300 }}>94.2%</div>
          </div>
          <div>
            <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>GLA</div>
            <div style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300 }}>181,000m²</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ASSETS & MAP PREVIEW */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '0.5rem' }}>Prime Asset Quality</h2>
              <p style={{ color: 'var(--text-muted)' }}>Showcasing high-yield regional anchors.</p>
            </div>
            <Link href="/portfolio" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>
              View Full Portfolio <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden' }} className="group cursor-pointer">
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }} className="group-hover:scale-105" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,20,35,0.9), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
                <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>Retail • Walvis Bay</div>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '0.5rem' }}>Dunes Mall</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Premium regional shopping centre driving coastal economic growth.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div style={{ position: 'relative', flex: 1, borderRadius: '4px', overflow: 'hidden' }} className="group cursor-pointer">
                 <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/OryxProp_SM_PostTemplates-007-1-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }} className="group-hover:scale-105" />
                 <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,20,35,0.9), transparent)' }} />
                 <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                    <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '0.25rem' }}>Industrial • Prosperita</div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-light)', fontWeight: 300 }}>Industrial Hub</h3>
                 </div>
               </div>
               
               {/* Map Preview Placeholder for Homepage */}
               <div className="glass-panel-10" style={{ flex: 1, borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ width: '48px', height: '48px', border: '1px solid var(--accent-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-gold)', borderRadius: '50%' }} />
                  </div>
                  <h4 style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>National Footprint</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Interactive map of our 30 properties across Namibia.</p>
                  <Link href="/portfolio" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem' }}>Open Map</Link>
               </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}
