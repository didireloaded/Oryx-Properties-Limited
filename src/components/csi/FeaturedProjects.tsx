'use client';

import { motion } from 'framer-motion';
import styles from './csi.module.css';

const projects = [
  {
    id: 'groendraai',
    name: 'Groendraai Primary School',
    summary: 'Supporting access to education for children in the Hardap region.',
    outcome: 'Upgraded facilities and consistent provision of educational materials for 350+ students annually.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'cafo',
    name: 'Church Alliance for Orphans (CAFO)',
    summary: 'Providing critical funding and resources to vulnerable children across Namibia.',
    outcome: 'Sustained financial support enabling holistic care, nutrition, and schooling for orphaned youth.',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'orange-babies',
    name: 'Orange Babies Namibia',
    summary: 'Assisting in the fight against HIV/AIDS transmission from mothers to babies.',
    outcome: 'Funded medical interventions and community support structures saving hundreds of infant lives.',
    image: 'https://images.unsplash.com/photo-1593113514676-1300a8940801?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function FeaturedProjects() {
  return (
    <section className={styles.projectsSection}>
      <div className="container">
        <h2 className={styles.projectsSectionTitle}>Featured Impact Projects</h2>
        
        <div className={styles.projectsList}>
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              className={styles.projectEditorial}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.projectImageWrapper}>
                <img src={project.image} alt={project.name} className={styles.projectImage} />
              </div>
              <div className={styles.projectContent}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectSummary}>{project.summary}</p>
                <div className={styles.projectOutcome}>
                  <strong>Impact:</strong> {project.outcome}
                </div>
                <button className={styles.projectBtn}>View Story &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
