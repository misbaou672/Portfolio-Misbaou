import { useRef } from 'react';
import styles from './About.module.css';
import { gsap, useGSAP } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    label: 'Formation',
    title: 'BUT Informatique (3ᵉ année)',
    detail: 'Parcours Développement logiciel · IUT de Créteil-Vitry, UPEC (2024 – 2027)',
  },
  {
    label: 'Stage',
    title: 'Réseaux & services informatiques',
    detail: 'RATP — DSP 49 · Lagny / Lilas / Belliard',
  },
  {
    label: 'Spécialités',
    title: 'Python, n8n, Backend & Linux',
    detail: 'Architectures web, SQL & Power BI',
  },
  {
    label: 'Objectif',
    title: 'Full-stack à dominante back-end',
    detail: 'Vers les pratiques DevOps & DevSecOps',
  },
];

const SKILLS = [
  // Back-end et donnees
  'Back-end & architecture MVC (PHP)',
  'Programmation orientée objet (Java, Python, PHP)',
  'API REST & design patterns',
  'Bases de données (MySQL, PostgreSQL, MongoDB)',
  'React & TypeScript',
  // Systemes, infra et securite
  'Administration Linux & réseaux (SSH, DNS, DHCP, FTP)',
  'Virtualisation (VirtualBox, VM multi-services)',
  'Docker & conteneurisation',
  'Git & GitHub (branches, PR, revue)',
  'CI/CD (GitHub Actions)',
  'Cybersécurité (Root-Me, TryHackMe)',
  // Automatisation, data et methode
  'Automatisation (n8n, Python)',
  'Tableaux de bord Power BI',
  'SEO technique (données structurées, sitemap)',
  'Gestion de projet Agile',
];

const SOFT_SKILLS = [
  'Travail en équipe',
  'Autonomie',
  'Résolution de problèmes',
  'Rigueur & discipline',
  'Communication technique',
  'Adaptabilité',
];

const INTERESTS = [
  'Boxe anglaise',
  'Musculation',
  'Défis algorithmiques (Root-Me)',
  'Veille technologique',
];
const LANGUAGES = ['Français (langue maternelle)', 'Peul (bilingue)', 'Anglais (B1/B2)'];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.from(sectionRef.current.querySelectorAll(`.${styles.fadeUp}`), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className={styles.container}>
      <header className={`${styles.header} ${styles.fadeUp}`}>
        <h2 className={styles.title}>À propos</h2>
        <p className={styles.subtitle}>
          Mon parcours académique, mes compétences techniques et humaines, et mes centres d'intérêt.
        </p>
      </header>

      {/* OPEN EDITORIAL LAYOUT */}
      <div className={styles.openContent}>
        {/* ROW 1: KEY HIGHLIGHTS */}
        <div className={`${styles.sectionBlock} ${styles.fadeUp}`}>
          <span className={styles.sectionLabel}>Parcours & Focus</span>
          <div className={styles.highlightsGrid}>
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className={styles.itemRow}>
                <span className={styles.itemLabel}>{item.label}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <span className={styles.itemDetail}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: SAVOIR-FAIRE TECHNIQUE */}
        <div className={`${styles.sectionBlock} ${styles.fadeUp}`}>
          <span className={styles.sectionLabel}>Savoir-faire technique</span>
          <div className={styles.pillsRow}>
            {SKILLS.map((skill) => (
              <span key={skill} className={styles.skillPill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ROW 3: SAVOIR-ÊTRE */}
        <div className={`${styles.sectionBlock} ${styles.fadeUp}`}>
          <span className={styles.sectionLabel}>Savoir-être</span>
          <div className={styles.pillsRow}>
            {SOFT_SKILLS.map((soft) => (
              <span key={soft} className={styles.softPill}>
                {soft}
              </span>
            ))}
          </div>
        </div>

        {/* ROW 4: CENTRES D'INTÉRÊT & LANGUES */}
        <div className={`${styles.bottomSplit} ${styles.fadeUp}`}>
          <div className={styles.splitBlock}>
            <span className={styles.sectionLabel}>Centres d'intérêt</span>
            <div className={styles.pillsRow}>
              {INTERESTS.map((interest) => (
                <span key={interest} className={styles.interestPill}>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.splitBlock}>
            <span className={styles.sectionLabel}>Langues</span>
            <div className={styles.pillsRow}>
              {LANGUAGES.map((lang) => (
                <span key={lang} className={styles.langPill}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
