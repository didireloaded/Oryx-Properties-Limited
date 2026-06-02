"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '@/services/NewsService';

export default function NewsClient({ newsData }: { newsData: NewsArticle[] }) {
  const marketAnnouncements = newsData.filter(n => n.type === 'market' || n.category === 'Financial Result' || n.category === 'Trading Statement' || n.category === 'Corporate Action' || n.category === 'Board Change');
  const corporateNews = newsData.filter(n => n.type === 'corporate' || n.category === 'Development' || n.category === 'Sustainability' || n.category === 'Strategic Acquisition');

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* 1. MASTHEAD (Hero) */}
      <section style={{ padding: '4rem 0 2rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600, marginBottom: '1rem' }}>
               Media & Publications
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-light)' }}>
              Corporate Intelligence
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PUBLICATION LAYOUT */}
      <section className="section" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '6rem' }}>
            
            {/* LEFT COLUMN: Feature Editorial (Corporate News) */}
            <div>
              <div style={{ borderBottom: '2px solid var(--text-light)', paddingBottom: '1rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Corporate Developments</h2>
              </div>

              {corporateNews.length > 0 && (
                <>
                  {/* Lead Story */}
                  <Link href={`/news/${corporateNews[0].id}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '4rem', cursor: 'pointer' }} className="group">
                    <div style={{ position: 'relative', width: '100%', height: '450px', marginBottom: '2rem', overflow: 'hidden' }}>
                      <Image src={corporateNews[0].image} alt={corporateNews[0].title} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" priority />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{corporateNews[0].category}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {corporateNews[0].date}</span>
                    </div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.2, marginBottom: '1rem', transition: 'color 0.2s', color: 'var(--text-light)' }} className="group-hover:text-accent-gold">{corporateNews[0].title}</h3>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{corporateNews[0].excerpt}</p>
                  </Link>

                  {/* Secondary Stories */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    {corporateNews.slice(1).map((news, i) => (
                      <Link href={`/news/${news.id}`} key={i} style={{ display: 'block', textDecoration: 'none', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', cursor: 'pointer' }} className="group">
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                          <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{news.category}</span>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.3, marginBottom: '1rem', transition: 'color 0.2s', color: 'var(--text-light)' }} className="group-hover:text-accent-gold">{news.title}</h3>
                        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>{news.excerpt}</p>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {news.date}</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT COLUMN: Market Feed (SENS/NENS) */}
            <div className="glass-panel-05" style={{ padding: '2.5rem', borderRadius: '12px' }}>
              <div style={{ borderBottom: '2px solid var(--text-light)', paddingBottom: '1rem', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Market Announcements</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {marketAnnouncements.map((announcement, i) => (
                  <Link href={`/news/${announcement.id}`} key={i} style={{ display: 'block', textDecoration: 'none', padding: '1.5rem 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }} className="group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{announcement.category}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{announcement.date}</div>
                    </div>
                    <h4 style={{ fontSize: '1.125rem', color: 'var(--text-light)', lineHeight: 1.4, transition: 'color 0.2s' }} className="group-hover:text-accent-gold">
                      {announcement.title}
                    </h4>
                  </Link>
                ))}
              </div>

              <a href="/investors" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: '2rem', textDecoration: 'none' }}>
                Go to Investor Centre <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
