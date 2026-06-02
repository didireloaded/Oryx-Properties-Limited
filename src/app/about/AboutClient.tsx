"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { TeamMember } from '@/services/TeamService';

export default function AboutClient({ teamData }: { teamData: TeamMember[] }) {
  const [selectedPerson, setSelectedPerson] = useState<TeamMember | null>(null);
  const [hoveredPerson, setHoveredPerson] = useState<string | null>(null);

  const directors = teamData.filter(m => m.category === 'directors');
  const executives = teamData.filter(m => m.category === 'executives');

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingBottom: '4rem', paddingTop: '80px' }}>
      
      {/* 1. HERO - DIGITAL ANNUAL REPORT STYLE */}
      <section className="section" style={{ paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '900px' }}>
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, marginBottom: '1rem' }}>
               Company Profile
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-light)', marginBottom: '2rem' }}>
              Building Namibia's Future.
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Oryx Properties is a premier listed property investment fund operating in the Namibian real estate market. We are committed to generating sustainable, long-term returns for our shareholders while actively contributing to the socio-economic development of the communities in which we operate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & VALUES */}
      <section className="section" style={{ backgroundColor: 'transparent', color: 'var(--text-light)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Our Vision</h3>
              <p style={{ fontSize: '1.5rem', color: 'var(--text-light)', lineHeight: 1.6, fontWeight: 300 }}>
                To be the most respected and high-performing property investment fund in Namibia, known for our asset quality, operational excellence, and commitment to sustainability.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Core Values</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Integrity & Transparency', 'Operational Excellence', 'Sustainable Value Creation', 'Stakeholder Centricity'].map((val, i) => (
                  <li key={i} style={{ fontSize: '1.25rem', padding: '1rem 0', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ChevronRight size={16} color="var(--accent-gold)" /> {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 JOURNEY LINK */}
      <section className="section" style={{ backgroundColor: 'transparent', paddingTop: 0, paddingBottom: '4rem' }}>
        <div className="container">
          <div className="glass-panel-10" style={{ padding: '3rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-glass)' }}>
            <div>
              <h3 style={{ fontSize: '2rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '0.5rem' }}>Our Journey</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Discover our path from inception to becoming Namibia's premier property fund.</p>
            </div>
            <a href="/journey" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore the Timeline <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 2.75 GOVERNANCE OVERVIEW */}
      <section className="section" style={{ backgroundColor: 'rgba(15, 20, 35, 0.4)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem' }}>Corporate Governance</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '3rem' }}>
              We uphold the highest standards of transparency, integrity, and ethical business practices. Our dedicated board committees (Audit & Risk, Remuneration & Nomination, and Investment) ensure robust oversight across all critical business functions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'left' }}>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '4px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Audit & Risk</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Ensures integrity of financial reporting and effectiveness of internal controls.</p>
              </div>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '4px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Remuneration</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Oversees board nominations and remuneration policies for executives.</p>
              </div>
              <div className="glass-panel-10" style={{ padding: '1.5rem', borderRadius: '4px' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Investment</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Reviews and approves property acquisitions and major capital expenditures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP (B&W to Color Apple Modal) */}
      <section className="section">
        <div className="container">
          
          <div style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-light)', fontWeight: 300, borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '3rem' }}>Board of Directors</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem' }}>
              {directors.map((person, i) => (
                <div key={i} onClick={() => setSelectedPerson(person)} onMouseEnter={() => setHoveredPerson(person.name)} onMouseLeave={() => setHoveredPerson(null)} style={{ cursor: 'pointer' }}>
                  <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '1rem', overflow: 'hidden', borderRadius: '4px' }}>
                    <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hoveredPerson === person.name ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.5s ease' }} />
                  </div>
                  <h4 style={{ fontSize: '1.125rem', color: 'var(--text-light)', fontWeight: 500 }}>{person.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-light)', fontWeight: 300, borderBottom: '2px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '3rem' }}>Executive Management</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
              {executives.map((person, i) => (
                <div key={i} onClick={() => setSelectedPerson(person)} onMouseEnter={() => setHoveredPerson(person.name)} onMouseLeave={() => setHoveredPerson(null)} style={{ cursor: 'pointer' }}>
                  <div style={{ width: '100%', aspectRatio: '3/4', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '1rem', overflow: 'hidden', borderRadius: '4px' }}>
                     <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hoveredPerson === person.name ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.5s ease' }} />
                  </div>
                  <h4 style={{ fontSize: '1.125rem', color: 'var(--text-light)', fontWeight: 500 }}>{person.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{person.role}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* APPLE-STYLE MODAL */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
            onClick={() => setSelectedPerson(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ background: 'var(--bg-secondary)', width: '90%', maxWidth: '800px', borderRadius: '24px', overflow: 'hidden', display: 'flex', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPerson(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                <X size={20} />
              </button>
              
              <div style={{ width: '40%', backgroundColor: 'var(--text-dark-muted)' }}>
                <img src={selectedPerson.image} alt={selectedPerson.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
              </div>
              <div style={{ width: '60%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{selectedPerson.role}</div>
                <h3 style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.1 }}>{selectedPerson.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>{selectedPerson.bio}</p>
                {selectedPerson.quals && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '1rem' }}>
                    <strong>Qualifications: </strong> {selectedPerson.quals}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
