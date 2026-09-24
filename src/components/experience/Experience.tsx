import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleText } from './ScrambleText';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

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
      'Automatisation de workflows avec n8n et ZennoPoster : extraction, transformation et traitement de données.',
      'Développement backend en PHP (architecture MVC, requêtes préparées) et optimisation des requêtes.',
      'Analyse de données avec Python (NumPy, Pandas) et création de tableaux de bord Power BI.',
      "Configuration et administration de services Linux (SSH, DHCP, DNS, FTP) et manipulation d'équipements réseau.",
    ],
    skills: ['Python', 'n8n', 'Linux', 'Power BI', 'MVC'],
  },
  {
    id: 'upec',
    role: 'BUT Informatique, 3ᵉ année',
    company: 'IUT Créteil-Vitry (UPEC)',
    period: 'Depuis sept. 2024',
    location: 'Créteil, Île-de-France',
    lines: [
      'Formation pluridisciplinaire couvrant le développement logiciel, les réseaux, les bases de données, la cybersécurité et la gestion de projet.',
      "Projets en équipe : applications web full-stack, SAE (Situations d'Apprentissage et d'Évaluation), stages en entreprise.",
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

type TerminalTheme = 'default' | 'matrix' | 'dracula' | 'amber';
const TERMINAL_THEMES: TerminalTheme[] = ['default', 'matrix', 'dracula', 'amber'];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Le parcours se dechiffre tout seul quand il arrive a l'ecran : l'effet
  // reste, mais un recruteur n'a plus rien a faire pour le lire.
  const [isDecrypted, setIsDecrypted] = useState(preferMoinsDAnimations);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>(["Tape 'help' pour voir les commandes."]);
  const [theme, setTheme] = useState<TerminalTheme>('default');

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

  useGSAP(
    () => {
      if (!termRef.current) return;
      gsap.from(termRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: termRef.current,
          start: 'top 90%',
        },
      });
    },
    { scope: sectionRef },
  );

  /** Rejoue l'effet de dechiffrement. */
  const rejouer = () => {
    setIsDecrypted(false);
    requestAnimationFrame(() => setIsDecrypted(true));
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === './decrypt.sh' || trimmed === 'decrypt') {
      rejouer();
      setLogs((prev) => [...prev, `$ ${cmd}`, '[SYSTEM] Dechiffrement relance.']);
    } else if (trimmed.startsWith('theme')) {
      const targetTheme = trimmed.split(' ')[1] as TerminalTheme;
      if (TERMINAL_THEMES.includes(targetTheme)) {
        setTheme(targetTheme);
        setLogs((prev) => [...prev, `$ ${cmd}`, `[SYSTEM] Theme applique : ${targetTheme}`]);
      } else {
        setLogs((prev) => [
          ...prev,
          `$ ${cmd}`,
          'Themes : default, matrix, dracula, amber. Exemple : theme matrix',
        ]);
      }
    } else if (trimmed === 'help') {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        'Commandes disponibles :',
        '  ./decrypt.sh   rejoue le dechiffrement du parcours',
        '  theme <nom>    default, matrix, dracula, amber',
        '  ls             liste les fichiers',
        '  whoami         utilisateur courant',
        '  clear          vide la console',
      ]);
    } else if (trimmed === 'ls') {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        'ratp_dsi.md  upec_but3.md  bac_general.md  decrypt.sh*',
      ]);
    } else if (trimmed === 'whoami') {
      setLogs((prev) => [...prev, `$ ${cmd}`, 'misbaou@portfolio (invite)']);
    } else if (trimmed === 'clear') {
      setLogs([]);
    } else {
      setLogs((prev) => [...prev, `$ ${cmd}`, `bash: ${cmd}: commande introuvable. Tape 'help'.`]);
    }

    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  const themeClass = styles[`theme_${theme}`] || '';

  return (
    <div ref={sectionRef} className={styles.container}>
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

      {/* Petit terminal pour les curieux : la lecture du parcours n'en depend plus. */}
      <div ref={termRef} className={`${styles.terminal} ${themeClass}`}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons} aria-hidden="true">
            <span className={styles.tBtnRed}></span>
            <span className={styles.tBtnYellow}></span>
            <span className={styles.tBtnGreen}></span>
          </div>

          <div className={styles.themeSelector} role="group" aria-label="Thème du terminal">
            {TERMINAL_THEMES.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.themePill} ${theme === t ? styles.themeActive : ''}`}
                aria-pressed={theme === t}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.terminalBody}>
          {logs.length > 0 && (
            <div className={styles.logsConsole} aria-live="polite">
              {logs.map((log, index) => (
                <div key={index} className={styles.logLine}>
                  {log}
                </div>
              ))}
            </div>
          )}

          <div className={styles.promptWrapper} onClick={() => inputRef.current?.focus()}>
            <span className={styles.promptArrow} aria-hidden="true">
              ➜
            </span>
            <span className={styles.promptPath} aria-hidden="true">
              ~/parcours
            </span>
            <span className={styles.promptSign} aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.terminalInput}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Commande du terminal"
              placeholder="help, ls, theme matrix..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
