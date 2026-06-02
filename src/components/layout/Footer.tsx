import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', padding: '6rem 0 2rem 0' }}>
      <div className={`container ${styles.footerContainer}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
        
        <div className={styles.brandColumn}>
          <Image src="/images/brand/oryx-logo.png" alt="Oryx Properties Limited" width={150} height={48} style={{ height: '48px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '1.5rem' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Oryx Properties Limited</p>
        </div>

        <div className={styles.linkGroup}>
          <Link href="/portfolio" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Portfolio</Link>
          <Link href="/investors" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Investor Centre</Link>
          <Link href="/investors#governance" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Governance</Link>
        </div>

        <div className={styles.linkGroup}>
          <Link href="/csi" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>CSR</Link>
          <Link href="/careers" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Careers</Link>
          <Link href="/contact" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Contact</Link>
        </div>

        <div className={styles.linkGroup}>
          <Link href="/investors#reports" style={{ display: 'block', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>Annual Reports</Link>
        </div>
        
      </div>
      
      <div className={styles.bottomBar} style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '2rem' }}>
        <div className={`container ${styles.bottomContainer}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>&copy; {new Date().getFullYear()} Oryx Properties Limited.</p>
        </div>
      </div>
    </footer>
  );
};
