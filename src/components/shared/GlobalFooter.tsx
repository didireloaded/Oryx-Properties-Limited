'use client';

import Link from 'next/link';
import styles from '../home/home.module.css';

export default function GlobalFooter() {
  return (
    <footer className={styles.footerSection}>
      <div className="container">
        <div className={styles.footerGrid}>
          
          <div>
            <h2 className={styles.footerBrand}>Oryx Properties</h2>
            <p className={styles.footerDesc}>
              A premium listed property fund building long-term value across Namibia through strategic asset management and sustainable investment.
            </p>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Platform</h4>
            <ul className={styles.footerList}>
              <li><Link href="/portfolio">Portfolio Intelligence</Link></li>
              <li><Link href="/investors">Investor Centre</Link></li>
              <li><Link href="/csi">Sustainability</Link></li>
              <li><Link href="/about">Corporate Overview</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Legal</h4>
            <ul className={styles.footerList}>
              <li><Link href="/governance">Governance</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Use</Link></li>
              <li><Link href="#">PAIA Manual</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.footerColTitle}>Connect</h4>
            <ul className={styles.footerList}>
              <li><Link href="/contact">Service Portal</Link></li>
              <li><Link href="/leasing">Leasing Enquiries</Link></li>
              <li><Link href="#">LinkedIn</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} Oryx Properties Limited. All rights reserved.</span>
          <span>Listed on the Namibian Stock Exchange (NSX: ORY)</span>
        </div>
      </div>
    </footer>
  );
}
