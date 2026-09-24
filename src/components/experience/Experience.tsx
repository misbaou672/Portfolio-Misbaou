import { useEffect, useRef, useState } from 'react';
import { ScrambleText } from './ScrambleText';
import styles from './Experience.module.css';

type Step = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  lines: string[];
  skills: string[];
};

const STEPS: Step[] = [
  {
    id: 'ratp',
    role: 'Stagiaire Développement & Automatisation',
    company: 'DSI RATP',
    period: 'Avril – Juin 2026',
    location: 'Paris, Île-de-France',
    lines: [
      'Automatisation de workflows avec ZennoPoster : extraction, transformation et traitement de données.',
      'Analyse et modélisation de données avec Power Query et DAX, puis restitution en tableaux de bord Power BI.',
      'Montée en compétences sur les fondamentaux de la cyberdéfense.',
    ],
    skills: ['ZennoPoster', 'Power Query', 'DAX', 'Power BI', 'Cyberdéfense'],
  },
  {
    id: 'upec',
    role: 'BUT Informatique, 3ᵉ année — parcours Développement logiciel',
    company: 'IUT Créteil-Vitry (UPEC)',
    period: 'Depuis sept. 2024',
    location: 'Créteil, Île-de-France',
    lines: [
      "Parcours Développement logiciel : conception, développement et validation d'applications.",
      'Formation pluridisciplinaire couvrant le développement logiciel, les réseaux, les bases de données et la gestion de projet.',
      'Projets en équipe sur plusieurs semaines, en conditions proches de celles du métier : applications web full-stack, cahier des charges, livrable et soutenance.',
    ],
    skills: ['React', 'Node.js', 'SQL', 'Réseaux', 'Agile'],
  },
  {
    id: 'bac',
    role: 'Baccalauréat Général',
    company: 'Lycée Darius Milhaud',
    period: 'Obtenu en 2024',
    location: 'Le Kremlin-Bicêtre',
    lines: [
      'Spécialités Mathématiques & Physique-Chimie, avec option Mathématiques Expertes.',
      'Base solide en logique formelle et raisonnement analytique.',
    ],
    skills: ['Mathématiques', 'Logique', 'Physique'],
  },
];

/** Vrai si l'appareil demande moins d'animations. */
function preferMoinsDAnimations() {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);

  // Le parcours se dechiffre tout seul quand il arrive a l'ecran : l'effet
  // reste, mais un recruteur n'a plus rien a faire pour le lire.
  const [isDecrypted, setIsDecrypted] = useState(preferMoinsDAnimations);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el || isDecrypted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsDecrypted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isDecrypted]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Parcours</h2>
        <p className={styles.subtitle}>Expériences professionnelles et parcours académique.</p>
      </header>

      <ol ref={timelineRef} className={styles.timeline}>
        {STEPS.map((step, index) => (
          <li key={step.id} className={styles.step}>
            <span className={styles.marker} aria-hidden="true" />
            <article className={styles.card}>
              <div className={styles.metaLine}>
                <span className={styles.period}>{step.period}</span>
                <span className={styles.location}>{step.location}</span>
              </div>
              <h3 className={styles.role}>
                <ScrambleText text={step.role} isDecrypted={isDecrypted} delay={index * 250} />
              </h3>
              <p className={styles.company}>
                <ScrambleText
                  text={step.company}
                  isDecrypted={isDecrypted}
                  delay={index * 250 + 100}
                />
              </p>

              <ul className={styles.descList}>
                {step.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <div className={styles.skillsTags}>
                {step.skills.map((skill) => (
                  <span key={skill} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
