"use client";

import { motion } from 'framer-motion';
import { Users, Briefcase, Heart, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* 1. HERO */}
      <section style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 300, color: 'var(--text-light)', marginBottom: '1rem', lineHeight: 1.1 }}>Join Our Team</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
              Shape the future of Namibia's property landscape. We are always looking for driven professionals to join our institutional property fund.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. LIFE AT ORYX */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div>
               <h2 style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '1.5rem' }}>Life at Oryx</h2>
               <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                 Working at Oryx Properties means engaging with Namibia's most significant real estate assets. We foster a culture of excellence, governance, and continuous professional development.
               </p>
               <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                 Our team is composed of industry leaders in asset management, finance, property development, and corporate governance. We invest in our people because they are the foundation of our portfolio's success.
               </p>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-panel-10" style={{ padding: '2rem', borderRadius: '4px', textAlign: 'center' }}>
                   <Award size={32} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto' }} />
                   <h4 style={{ color: 'var(--text-light)' }}>Performance Driven</h4>
                </div>
                <div className="glass-panel-10" style={{ padding: '2rem', borderRadius: '4px', textAlign: 'center' }}>
                   <Users size={32} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto' }} />
                   <h4 style={{ color: 'var(--text-light)' }}>Collaborative Culture</h4>
                </div>
                <div className="glass-panel-10" style={{ padding: '2rem', borderRadius: '4px', textAlign: 'center' }}>
                   <Heart size={32} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto' }} />
                   <h4 style={{ color: 'var(--text-light)' }}>Comprehensive Benefits</h4>
                </div>
                <div className="glass-panel-10" style={{ padding: '2rem', borderRadius: '4px', textAlign: 'center' }}>
                   <Briefcase size={32} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto' }} />
                   <h4 style={{ color: 'var(--text-light)' }}>Career Growth</h4>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. CURRENT VACANCIES */}
      <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '0.5rem' }}>Current Opportunities</h2>
              <p style={{ color: 'var(--text-muted)' }}>Join our expanding corporate and asset management teams.</p>
            </div>
            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              General Enquiries <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--border-glass)' }}>
            {[
              { role: 'Senior Asset Manager', dept: 'Asset Management', location: 'Windhoek', type: 'Full-Time' },
              { role: 'Financial Accountant', dept: 'Finance', location: 'Windhoek', type: 'Full-Time' },
              { role: 'Property Administrator', dept: 'Operations', location: 'Walvis Bay', type: 'Full-Time' }
            ].map((job, i) => (
              <div key={i} className="group cursor-pointer" style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '0.5rem', transition: 'color 0.2s' }} className="group-hover:text-gold">{job.role}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <span>{job.dept}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="group-hover:border-gold">
                   <ArrowRight size={16} color="var(--text-light)" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
