import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Governance & Ethics | Oryx Properties',
  description: 'Corporate governance, committees, and ethical standards at Oryx Properties Limited.',
};

export default function GovernancePage() {
  const committees = [
    {
      name: 'Audit & Risk Committee',
      desc: 'Ensures the integrity of financial reporting and the effectiveness of internal controls and risk management.',
      members: ['Mr Marius Muller (Chairperson)', 'Ms Jenny Comalie', 'Mr Stefan Hugo']
    },
    {
      name: 'Remuneration & Nomination Committee (RNC)',
      desc: 'Oversees the nomination of board members and the remuneration policies for executives and staff.',
      members: ['Ms Jenny Comalie (Chairperson)', 'Mr Vetumbuavi Mungunda', 'Mr Matthias Langheld']
    },
    {
      name: 'Investment Committee (IC)',
      desc: 'Reviews and approves property acquisitions, developments, and major capital expenditures.',
      members: ['Mr Marius Muller (Chairperson)', 'Mr Ben Jooste', 'Ms Toini Kondjeni Nkandi']
    }
  ];

  return (
    <main className={styles.main}>
      {/* HEADER SECTION */}
      <section className={styles.pageHeader}>
        <div className={`container ${styles.headerContainer}`}>
          <h1 className={styles.title}>Corporate Governance</h1>
          <p className={styles.subtitle}>
            Upholding the highest standards of transparency, integrity, and ethical business practices.
          </p>
        </div>
      </section>

      {/* COMMITTEES SECTION */}
      <section className={styles.committeesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="h2">Board Committees</h2>
            <p>Our dedicated committees ensure robust oversight across all critical business functions.</p>
          </div>
          
          <div className={styles.grid}>
            {committees.map((committee, idx) => (
              <div key={idx} className={styles.card}>
                <h3 className={styles.cardTitle}>{committee.name}</h3>
                <p className={styles.cardDesc}>{committee.desc}</p>
                <div className={styles.membersList}>
                  <h4>Members:</h4>
                  <ul>
                    {committee.members.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICIES & ETHICS */}
      <section className={styles.policiesSection}>
        <div className="container">
          <div className={styles.policiesWrapper}>
            <div className={styles.textContent}>
              <h2>Ethics & Transparency</h2>
              <p>
                Oryx Properties is committed to conducting business ethically and in compliance with all applicable laws and regulations in Namibia. We maintain a zero-tolerance policy towards fraud, bribery, and corruption.
              </p>
              
              <div className={styles.documentLinks}>
                <Link href="/investors/debenture-trust-deed" className={styles.docLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  Debenture Trust Deed
                </Link>
                <Link href="/investors/dmtnp" className={styles.docLink}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  DMTNP Agreement
                </Link>
              </div>
            </div>
            
            <div className={styles.whistleblowerCard}>
              <h3>Whistleblower Protection</h3>
              <p>We encourage all employees, tenants, and stakeholders to report any unethical behavior safely and anonymously.</p>
              <Link href="/whistleblower" className="btn-primary" style={{marginTop: '1.5rem', display: 'inline-block'}}>
                File a Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
