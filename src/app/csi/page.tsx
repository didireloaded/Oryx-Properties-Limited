"use client";

import { motion } from 'framer-motion';
import { Sun, Droplets, Leaf, ArrowRight, BookOpen, Heart, Shield } from 'lucide-react';

export default function CSIPage() {
  return (
    <main style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>


      {/* 1. HERO - ESG REPORT */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '900px' }}>
            <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Shield size={16} /> Environmental, Social & Governance
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 300, lineHeight: 1.1, marginBottom: '2rem', color: 'var(--text-light)' }}>
              Sustainability Report
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              At Oryx Properties, sustainable capital allocation isn't just a compliance exercise—it's a core operational strategy. We are committed to minimizing our environmental footprint while maximizing our societal impact across Namibia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ENVIRONMENTAL IMPACT (Metrics) */}
      <section className="section bg-secondary" style={{ marginTop: '4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--text-light)', fontWeight: 300, marginBottom: '0.5rem' }}>Environmental Stewardship</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Operational metrics driving energy independence and resource conservation.</p>
            </div>
            <div style={{ color: 'var(--text-dark-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>FY2024 Data</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {/* Solar Metric */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: '4px', borderTop: '4px solid var(--accent-gold)' }}>
              <Sun size={40} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
              <div style={{ fontSize: '3.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1, marginBottom: '0.5rem' }}>6.2 <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>MWp</span></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Solar Generation Capacity</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Extensive photovoltaic rollouts across Maerua Mall and Dunes Mall, significantly reducing reliance on the national grid and lowering operational carbon emissions.
              </p>
            </motion.div>

            {/* Water Metric */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: '4px', borderTop: '4px solid #3b82f6' }}>
              <Droplets size={40} color="#3b82f6" style={{ marginBottom: '2rem' }} />
              <div style={{ fontSize: '3.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1, marginBottom: '0.5rem' }}>45 <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>%</span></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Water Recycling Rate</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Implementation of greywater harvesting and smart irrigation systems across our retail portfolio to address Namibia's acute water scarcity challenges.
              </p>
            </motion.div>

            {/* Efficiency Metric */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-panel" style={{ padding: '3rem 2rem', borderRadius: '4px', borderTop: '4px solid #10b981' }}>
              <Leaf size={40} color="#10b981" style={{ marginBottom: '2rem' }} />
              <div style={{ fontSize: '3.5rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1, marginBottom: '0.5rem' }}>A+ <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>Rating</span></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Energy Efficiency</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                Comprehensive HVAC retrofitting and LED lighting integration across 80% of our commercial office nodes, securing premium efficiency certifications.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL INVESTMENT (Editorial Layout) */}
      <section className="section bg-primary">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div style={{ height: '700px', borderRadius: '4px', overflow: 'hidden' }}>
              <img src="/images/portfolio/Dagbreek-school-Fortitude-Property-Group-27-700x840.jpg" alt="Dagbreek School Initiative" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div>
              <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={16} /> Community Upliftment
              </div>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--text-light)', fontWeight: 300, lineHeight: 1.2 }}>Strategic Educational Investments</h2>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                We believe that the long-term prosperity of our property portfolio is intrinsically linked to the social and economic health of the communities we serve. Our Corporate Social Investment (CSI) mandate strictly focuses on foundational education and youth empowerment.
              </p>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem' }}>
                In 2024, Oryx Properties directed substantial funding toward the Dagbreek School for the Intellectually Impaired, financing critical infrastructure upgrades and specialized educational resources to foster inclusive development.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={24} color="var(--accent-gold)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', color: 'var(--text-light)' }}>N$ 1.2 Million Deployed</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Direct educational infrastructure funding in FY2024.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GOVERNANCE LINK */}
      <section className="section bg-warm" style={{ padding: '6rem 0' }}>
        <div className="container text-center">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Shield size={48} color="var(--accent-gold)" style={{ margin: '0 auto 2rem auto' }} />
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-dark)', fontWeight: 300, marginBottom: '1.5rem' }}>ESG Governance Framework</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-dark-muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
              Our sustainability initiatives are governed by strict board-level oversight. We ensure full compliance with the King IV Report on Corporate Governance, embedding ethical leadership and transparency into our corporate DNA.
            </p>
            <a href="/investor-centre" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-primary)', color: '#fff' }}>
              View Governance Policies in Investor Centre <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
