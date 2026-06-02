"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} glass-nav`} style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, border: 'none', background: scrolled ? 'rgba(15, 20, 35, 0.85)' : 'rgba(15, 20, 35, 0.3)' }}>
      <div className={`container ${styles.navContainer}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className={styles.logo} style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/brand/oryx-logo-official.webp" alt="Oryx Properties Limited" width={150} height={40} style={{ height: '40px', width: 'auto' }} />
        </Link>
        
        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Home</Link>
          <Link href="/about" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>About</Link>
          <Link href="/portfolio" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Portfolio</Link>
          <Link href="/leasing" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Leasing</Link>
          <Link href="/investors" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Investor Centre</Link>
          <Link href="/news" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>News</Link>
          <Link href="/csi" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>CSR</Link>
          <Link href="/careers" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Careers</Link>
          <Link href="/contact" className={styles.link} style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-light)', textDecoration: 'none' }}>Contact</Link>
        </div>

        <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};
