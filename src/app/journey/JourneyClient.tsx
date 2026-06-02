"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TimelineEvent } from '@/services/TimelineService';

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `N$${(value / 1000000000).toFixed(2)} Billion`;
  return `N$${(value / 1000000).toFixed(0)} Million`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card-premium" style={{ padding: '1rem', borderRadius: '8px' }}>
        <p style={{ color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.25rem' }}>{label}</p>
        <p style={{ color: 'var(--accent-gold)' }}>{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function JourneyClient({ timelineData }: { timelineData: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Growth Counter Logic
  const counterValue = useTransform(scrollYProgress, [0.1, 0.4], [188000000, 4167000000]);
  const [displayValue, setDisplayValue] = useState("N$188 Million");

  useEffect(() => {
    return counterValue.on("change", (latest) => {
      setDisplayValue(formatCurrency(latest));
    });
  }, [counterValue]);

  // Scroll Progress for Timeline Line
  const timelineProgress = useTransform(scrollYProgress, [0.3, 0.8], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ backgroundColor: '#0F172A', color: 'var(--text-light)' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, background: 'linear-gradient(to bottom, rgba(15,23,42,0.4), #0F172A)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.5, backgroundImage: 'url("/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg")' }} />
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.1 }}
          >
            Two Decades of Creating Value
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}
          >
            From a N$188 million portfolio in 2002 to over N$4 billion in assets.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ fontSize: '2rem', fontWeight: 200, color: 'var(--accent-gold)', textShadow: '0 0 20px rgba(183,138,45,0.3)', letterSpacing: '2px' }}
          >
            2002 <span style={{ opacity: 0.5, margin: '0 1rem' }}>→</span> 2024
          </motion.div>
        </div>
      </section>

      {/* 2. GROWTH COUNTER EXPERIENCE */}
      <section style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 5, backgroundColor: '#0F172A' }}>
        <motion.div 
          style={{ textAlign: 'center', opacity: useTransform(scrollYProgress, [0.05, 0.1, 0.4, 0.5], [0, 1, 1, 0]) }}
        >
          <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#94A3B8', marginBottom: '1rem' }}>Portfolio Value</p>
          <h2 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 200, background: 'linear-gradient(to right, #F8FAFC, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontVariantNumeric: 'tabular-nums' }}>
            {displayValue}
          </h2>
        </motion.div>
      </section>

      {/* 3. SCROLL TIMELINE */}
      <section style={{ position: 'relative', paddingTop: '10vh', paddingBottom: '20vh', zIndex: 10, backgroundColor: '#0F172A' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', background: 'rgba(255,255,255,0.05)', top: 0 }} />
          <motion.div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', height: timelineProgress, background: 'var(--accent-gold)', top: 0, boxShadow: '0 0 10px rgba(183,138,45,0.5)' }} />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ 
                  display: 'flex', 
                  justifyContent: isLeft ? 'flex-start' : 'flex-end', 
                  marginBottom: '8rem',
                  position: 'relative',
                  width: '100%'
                }}
              >
                <div style={{ 
                  position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                  width: item.isMilestone ? '20px' : '12px', height: item.isMilestone ? '20px' : '12px',
                  borderRadius: '50%', backgroundColor: item.isMilestone ? 'var(--accent-gold)' : '#1E293B',
                  border: `2px solid ${item.isMilestone ? '#0F172A' : 'var(--accent-gold)'}`,
                  zIndex: 2, transition: 'all 0.3s'
                }} />

                <div style={{ width: 'calc(50% - 4rem)' }}>
                  <div className="glass-card-premium" style={{ padding: '2.5rem', borderRadius: '12px' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 200, color: 'var(--text-light)', marginBottom: '0.5rem', lineHeight: 1 }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 500, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.formattedValue}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '1rem', color: '#F8FAFC' }}>
                      {item.event}
                    </h3>
                    <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6 }}>
                      {item.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. DATA VISUALIZATION SECTION */}
      <section style={{ padding: '8rem 0', backgroundColor: '#172033', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem', textAlign: 'center' }}>Portfolio Growth Journey</h2>
            <p style={{ color: '#94A3B8', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
              Visualizing over two decades of consistent, strategic asset accumulation and value creation.
            </p>
            
            <div style={{ height: '500px', width: '100%', padding: '2rem', background: 'rgba(15,20,35,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#475569" tick={{ fill: '#94A3B8' }} tickMargin={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: '#94A3B8' }} tickFormatter={(val) => `${(val/1000000000).toFixed(1)}B`} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. MAJOR ACQUISITIONS (BENTO GRID) */}
      <section style={{ padding: '8rem 0', backgroundColor: '#0F172A', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem' }}>Cornerstone Acquisitions</h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px' }}>
              Strategic properties that fundamentally transformed our portfolio scale and sector diversification.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', gridAutoRows: 'minmax(250px, auto)' }}>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card-premium" style={{ gridColumn: 'span 8', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("/images/portfolio/Brand-X-Dunes-Mall_0145-min-700x840.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, mixBlendMode: 'overlay' }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ backgroundColor: 'var(--accent-gold)', color: '#0F172A', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'inline-block' }}>FLAGSHIP RETAIL</span>
                <h3 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>Maerua Mall Node</h3>
                <p style={{ color: '#CBD5E1', maxWidth: '400px' }}>Continually expanded since 2002, remaining our largest and most valuable integrated retail asset.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="glass-card-premium" style={{ gridColumn: 'span 4', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'inline-block' }}>2024 ACQUISITION</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Dunes Mall</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Strategic coastal expansion pushing portfolio beyond N$4 Billion.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="glass-card-premium" style={{ gridColumn: 'span 5', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#CBD5E1', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem', display: 'inline-block' }}>MIXED-USE</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Gustav Voigts Centre</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Dominant CBD asset featuring AVANI Hotel and major retail anchors.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="glass-card-premium" style={{ gridColumn: 'span 7', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.5rem' }}>Elisenheim Urban Village</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.875rem', maxWidth: '300px' }}>Pioneering residential and retail node development serving northern Windhoek.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
