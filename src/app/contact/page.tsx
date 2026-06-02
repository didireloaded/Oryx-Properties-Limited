"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Building, Briefcase, UserPlus, ArrowRight, ChevronLeft, Send, Loader2, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formType, setFormType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSelectType = (type: string) => {
    setFormType(type);
    setIsSuccess(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: formType })
      });
      
      if (res.ok) {
        setIsSuccess(true);
      } else {
        console.error('Failed to submit form');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main style={{ backgroundColor: 'transparent', minHeight: '100vh', display: 'flex' }}>
      
      {/* LEFT COLUMN: Architectural Photography */}
      <section style={{ width: '40%', position: 'relative', display: 'none' }} className="lg-block">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/portfolio/OryxProp_SM_PostTemplates-007-1-700x840.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(20%) brightness(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,20,35,0.2), rgba(15,20,35,1))' }} />
        
        <div style={{ position: 'absolute', bottom: '4rem', left: '4rem', zIndex: 10 }}>
           <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Head Office</div>
           <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <MapPin size={20} color="var(--accent-gold)" /> Maerua Mall Office Tower, Windhoek
           </div>
        </div>
      </section>

      {/* RIGHT COLUMN: The Concierge Experience */}
      <section style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
        
        <div style={{ padding: '8rem 4rem 4rem 4rem', maxWidth: '900px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-light)', marginBottom: '1rem' }}>
              {formType ? `Contact ${formType}` : 'Corporate Concierge'}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '4rem' }}>
              {formType 
                ? 'Please fill out the form below and our team will get back to you shortly.' 
                : 'Direct your inquiry to the appropriate department. Our teams are committed to responding to institutional and corporate requests with priority.'}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!formType ? (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
            
            {/* 1. Investor Relations */}
            <div onClick={() => handleSelectType('Investor Relations')} className="glass-panel-20 group" style={{ padding: '2rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={24} color="var(--accent-gold)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Investor Relations</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Financial performance, corporate governance, and shareholder inquiries.</p>
                </div>
              </div>
              <ArrowRight size={24} color="var(--accent-gold)" className="group-hover:translate-x-2" style={{ transition: 'transform 0.3s' }} />
            </div>

            {/* 2. Leasing Enquiries */}
            <div onClick={() => handleSelectType('Leasing Department')} className="glass-panel-20 group" style={{ padding: '2rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={24} color="var(--accent-gold)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Leasing Department</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Retail, office, and industrial space availability across the portfolio.</p>
                </div>
              </div>
              <ArrowRight size={24} color="var(--accent-gold)" className="group-hover:translate-x-2" style={{ transition: 'transform 0.3s' }} />
            </div>

            {/* 3. General Corporate */}
            <div onClick={() => handleSelectType('General Corporate')} className="glass-panel-20 group" style={{ padding: '2rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={24} color="var(--accent-gold)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>General Corporate</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Careers, media inquiries, and general administration.</p>
                </div>
              </div>
              <ArrowRight size={24} color="var(--accent-gold)" className="group-hover:translate-x-2" style={{ transition: 'transform 0.3s' }} />
            </div>

              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={() => setFormType(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.875rem', marginBottom: '2rem' }}
                  className="hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Directory
                </button>

                {isSuccess ? (
                  <div style={{ backgroundColor: 'rgba(56, 170, 183, 0.1)', border: '1px solid var(--accent-brand)', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><CheckCircle size={48} color="var(--accent-brand)" /></div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}>Inquiry Received</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Thank you for contacting our {formType} team. We will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Full Name *</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }} className="focus:border-accent-gold" />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Email Address *</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }} className="focus:border-accent-gold" />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none' }} className="focus:border-accent-gold" />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--text-light)', outline: 'none', resize: 'vertical' }} className="focus:border-accent-gold"></textarea>
                    </div>
                    <button type="submit" disabled={isSubmitting} style={{ backgroundColor: 'var(--accent-gold)', color: '#0F172A', padding: '1rem 2rem', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', gap: '4rem' }}>
             <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Direct Line</div>
                <div style={{ color: 'var(--text-light)', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="var(--accent-gold)" /> +264 61 423 201
                </div>
             </div>
             <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Corporate Email</div>
                <div style={{ color: 'var(--text-light)', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="var(--accent-gold)" /> info@oryxprop.com
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* Global Style for the split layout to work responsive-ish */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .lg-block { display: block !important; }
        }
      `}} />
    </main>
  );
}
