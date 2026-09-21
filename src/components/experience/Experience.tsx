import { useState, useRef } from 'react';
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
      'Configuration et administration de services Linux (SSH, DHCP, DNS, FTP) et manipulation d\'équipements réseau.',
    ],
    skills: ['Python', 'n8n', 'Linux', 'Power BI', 'MVC']
  },
  {
    id: 'upec',
    role: 'BUT Informatique, 3ᵉ année',
    company: 'IUT Créteil-Vitry (UPEC)',
    period: 'Depuis sept. 2024',
    location: 'Créteil, Île-de-France',
    lines: [
      'Formation pluridisciplinaire couvrant le développement logiciel, les réseaux, les bases de données, la cybersécurité et la gestion de projet.',
      'Projets en équipe : applications web full-stack, SAE (Situations d\'Apprentissage et d\'Évaluation), stages en entreprise.',
    ],
    skills: ['React', 'Node.js', 'SQL', 'Réseaux', 'Agile']
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
    skills: ['Mathématiques', 'Logique', 'Physique']
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDecrypted, setIsDecrypted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [theme, setTheme] = useState<'default' | 'matrix' | 'dracula' | 'amber'>('default');

  useGSAP(() => {
    if (!termRef.current) return;
    gsap.from(termRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });
  }, { scope: sectionRef });

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === './decrypt.sh' || trimmed === 'decrypt') {
      setIsDecrypted(true);
      setLogs((prev) => [...prev, `$ ${cmd}`, '[SYSTEM] Decryption key accepted. Access granted.']);
    } else if (trimmed.startsWith('theme')) {
      const targetTheme = trimmed.split(' ')[1];
      if (['default', 'matrix', 'dracula', 'amber'].includes(targetTheme)) {
        setTheme(targetTheme as 'default' | 'matrix' | 'dracula' | 'amber');
        setLogs((prev) => [...prev, `$ ${cmd}`, `[SYSTEM] Theme apply: ${targetTheme}`]);
      } else {
        setLogs((prev) => [...prev, `$ ${cmd}`, 'Available themes: default, matrix, dracula, amber. Example: theme matrix']);
      }
    } else if (trimmed === 'help') {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        'Available commands:',
        '  ./decrypt.sh - Decrypt career data',
        '  theme <name> - Switch theme (default, matrix, dracula, amber)',
        '  ls           - List directory files',
        '  clear        - Clear terminal console',
        '  whoami       - Display current user'
      ]);
    } else if (trimmed === 'ls') {
      setLogs((prev) => [
        ...prev,
        `$ ${cmd}`,
        'ratp_dsi.enc  upec_but3.enc  bac_general.enc  decrypt.sh*'
      ]);
    } else if (trimmed === 'whoami') {
      setLogs((prev) => [...prev, `$ ${cmd}`, 'misbaou@macbook-pro (Guest User)']);
    } else if (trimmed === 'clear') {
      setLogs([]);
    } else {
      setLogs((prev) => [...prev, `$ ${cmd}`, `bash: command not found: ${cmd}. Type 'help' for available commands.`]);
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
        <p className={styles.subtitle}>
          Expériences professionnelles et parcours académique.
        </p>
      </header>

      {/* TERMINAL MACOS */}
      <div ref={termRef} className={`${styles.terminal} ${themeClass}`}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <span className={styles.tBtnRed} title="Fermer"></span>
            <span className={styles.tBtnYellow} title="Réduire"></span>
            <span className={styles.tBtnGreen} title="Agrandir"></span>
          </div>

          {/* THEME PICKER CHIPS */}
          <div className={styles.themeSelector}>
            {(['default', 'matrix', 'dracula', 'amber'] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.themePill} ${theme === t ? styles.themeActive : ''}`}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className={styles.terminalHeaderAction}>
            <button
              className={styles.quickDecryptBtn}
              onClick={() => {
                setIsDecrypted(true);
                setLogs((prev) => [...prev, '$ ./decrypt.sh', '[SYSTEM] Decryption key accepted. Access granted.']);
              }}
            >
              {isDecrypted ? 'Déchiffré' : 'Déchiffrer'}
            </button>
          </div>
        </div>

        <div className={styles.terminalBody}>
          {!isDecrypted && (
            <div className={styles.systemAlert}>
              <div className={styles.errorLine}>
                <span className={styles.alertIcon}>[ACCÈS RESTREINT]</span>
                <span>Les données de parcours sont chiffrées en mémoire.</span>
              </div>
              <div className={styles.hintLine}>
                <span>Exécutez le script de déchiffrement : </span>
                <button
                  type="button"
                  className={styles.hintBtn}
                  onClick={() => {
                    setInputValue('./decrypt.sh');
                    handleCommand('./decrypt.sh');
                  }}
                >
                  ./decrypt.sh
                </button>
              </div>
            </div>
          )}

          {logs.length > 0 && (
            <div className={styles.logsConsole}>
              {logs.map((log, index) => (
                <div key={index} className={styles.logLine}>{log}</div>
              ))}
            </div>
          )}

          <div className={styles.terminalContent}>
            {STEPS.map((step, index) => (
              <article key={step.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.role}>
                    <ScrambleText text={step.role} isDecrypted={isDecrypted} delay={index * 300} />
                  </h3>
                  <span className={styles.company}>
                    <ScrambleText text={`@ ${step.company}`} isDecrypted={isDecrypted} delay={index * 300 + 100} />
                  </span>
                </div>

                <div className={styles.metaLine}>
                  <span className={styles.period}>
                    <ScrambleText text={step.period} isDecrypted={isDecrypted} delay={index * 300 + 200} />
                  </span>
                  <span className={styles.metaDot}>•</span>
                  <span className={styles.location}>
                    <ScrambleText text={step.location} isDecrypted={isDecrypted} delay={index * 300 + 250} />
                  </span>
                </div>

                <ul className={styles.descList}>
                  {step.lines.map((line, lIndex) => (
                    <li key={lIndex}>
                      <ScrambleText
                        text={line}
                        isDecrypted={isDecrypted}
                        delay={index * 300 + 350 + lIndex * 100}
                      />
                    </li>
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
            ))}
          </div>

          <div className={styles.promptWrapper} onClick={() => inputRef.current?.focus()}>
            <span className={styles.promptArrow}>➜</span>
            <span className={styles.promptPath}>~/parcours</span>
            <span className={styles.promptSign}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.terminalInput}
              autoComplete="off"
              spellCheck="false"
              placeholder={isDecrypted ? "Entrez une commande (ex: help, ls, clear)..." : "Tapez ./decrypt.sh ou cliquez sur le bouton..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
