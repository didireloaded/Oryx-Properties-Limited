"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { NewsArticle } from '@/services/NewsService';

export default function ArticleClient({ article }: { article: NewsArticle }) {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <article className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '3rem', fontSize: '0.875rem' }} className="hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to News
        </Link>

        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{article.category}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {article.date}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300, color: 'var(--text-light)', lineHeight: 1.1, marginBottom: '2rem' }}>
            {article.title}
          </h1>
        </header>

        {article.image && (
          <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p><p>Full content for this article is not currently available.</p>` }} />
        
      </article>
    </div>
  );
}
