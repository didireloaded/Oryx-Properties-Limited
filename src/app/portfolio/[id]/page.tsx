"use client";

import { motion } from 'framer-motion';
import { MapPin, Building, FileText, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Mocking the specific data to ensure the layout is built correctly.
  // In production, this would pull from the scraped JSON based on the ID.
  const propertyName = params.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* 1. HERO GALLERY */}
      <section style={{ height: '70vh', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)' }} />
        
        <div className="container" style={{ position: 'absolute', bottom: '4rem', left: '0', right: '0', zIndex: 10 }}>
          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
             <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
               Retail Asset
            </div>
            <h1 style={{ fontSize: '4.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1 }}>{propertyName}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}><MapPin size={18} color="var(--accent-gold)" /> Walvis Bay, Namibia</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}><Building size={18} color="var(--accent-gold)" /> 27,000m² GLA</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ASSET DETAILS & LEASING */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '6rem' }}>
            
            {/* Description & Specs */}
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '2rem' }}>Property Description</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                {propertyName} is a dominant regional asset strategically positioned to capture the coastal market. Featuring high-quality finishes, extensive parking infrastructure, and a robust tenant mix anchored by national blue-chip retailers, it delivers consistent high-yield performance for the fund.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Acquisition Date</div>
                  <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>2018</div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Valuation</div>
                  <div style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginTop: '0.5rem' }}>N$ 650 Million</div>
                </div>
              </div>

              {/* Documentation */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem' }}>Property Documentation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#" className="glass-panel-15 group" style={{ padding: '1.5rem', borderRadius: '4px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FileText size={20} color="var(--accent-gold)" />
                    <span style={{ color: 'var(--text-light)', fontSize: '1rem' }}>Tenant Mix & Floor Plan (PDF)</span>
                  </div>
                  <ExternalLink size={16} color="var(--text-muted)" className="group-hover:text-gold" />
                </a>
              </div>
            </div>

            {/* Leasing Side Panel */}
            <div>
              <div className="glass-panel-15" style={{ padding: '2.5rem', borderRadius: '4px', position: 'sticky', top: '120px' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '1rem' }}>Leasing Information</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                  Explore available units within {propertyName}. Our leasing team is ready to assist with institutional and commercial requirements.
                </p>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '4px', marginBottom: '2rem' }}>
                   <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', fontWeight: 300, lineHeight: 1 }}>3</div>
                   <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>Available Units</div>
                </div>
                <Link href="/leasing" className="btn-primary" style={{ width: '100%' }}>View Leasing Options</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
