import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { ScrambleText } from './ScrambleText';
import styles from './Experience.module.css';

type Step = {
  title: string;
  period: string;
  lines: string[];
};

const STEPS: Step[] = [
  {
    title: 'RATP (DSI), Stagiaire Développement & Automatisation',
    period: 'Avril à Juin 2026, Paris / IDF',
    lines: [
      'Conception de workflows n8n et ZennoPoster pour extraction, traitement et optimisation automatisée des données.',
      'Implémentation de patterns sécurisés (MVC, Singleton, requêtes préparées), optimisation des performances avec cache serveur.',
      'Data & Analytics avec Python (NumPy, Pandas) et création de tableaux de bord Power BI/DAX.',
      "Configuration d'environnements Linux multi-services (SMTP, SSH, DHCP, FTP, DNS) et topologies réseau Cisco.",
    ],
  },
  {
    title: 'BUT Informatique (3ᵉ année), IUT Créteil-Vitry (UPEC)',
    period: 'Depuis septembre 2024, Université Paris Est Créteil',
    lines: [
      'Développement logiciel et matériel. Conception et mise en œuvre de systèmes informatiques complets.',
    ],
  },
  {
    title: 'Baccalauréat Général',
    period: 'Juillet 2024, Lycée Darius Milhaud',
    lines: ['Spécialités Mathématiques, Physique-Chimie.', 'Option Mathématiques Expertes.'],
  },
];

export function Experience() {
  const compact = useMediaQuery('(max-width: 900px)');
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (!compact) {
      inputRef.current?.focus();
    }
  }, [compact]);

  const handleCommand = (cmd: string) => {
    if (cmd.trim() === './decrypt.sh') {
      setIsDecrypted(true);
      setInputValue('');
    } else {
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  return (
    <section className={styles.experience} id="experience" aria-label="Expérience">
      <div className={styles.inner}>
        <header className={styles.intro}>
          {compact ? (
            <>
              <h2 className={styles.title}>Mon Parcours</h2>
              <p className={styles.text}>
                Mon parcours académique et mes expériences professionnelles, de mon stage à la DSI
                RATP jusqu'à mon BUT 3 à l'UPEC.
              </p>
            </>
          ) : (
            <>
              <h2 className={styles.title}>
                Mon
                <br />
                Parcours
              </h2>
              <p className={styles.text}>
                Exécutez le script de décryptage pour accéder aux données sécurisées de mon profil.
              </p>
            </>
          )}
        </header>

        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <span className={styles.tBtnRed}></span>
              <span className={styles.tBtnYellow}></span>
              <span className={styles.tBtnGreen}></span>
            </div>
            <div className={styles.terminalTitle}>misbaou@portfolio:~</div>
          </div>
          <div className={styles.terminalBody}>
            {!isDecrypted && (
              <div className={styles.systemAlert}>
                <p className={styles.error}>[SYSTEM] ACCESS DENIED. DATA ENCRYPTED.</p>
                <p className={styles.hint}>
                  [HINT] Try executing the decryption script:{' '}
                  <button
                    className={styles.hintBtn}
                    onClick={() => {
                      setInputValue('./decrypt.sh');
                      handleCommand('./decrypt.sh');
                    }}
                  >
                    ./decrypt.sh
                  </button>
                </p>
              </div>
            )}

            <div className={styles.terminalContent}>
              {STEPS.map((step, index) => (
                <article key={index} className={styles.card}>
                  <h3>
                    <ScrambleText text={step.title} isDecrypted={isDecrypted} delay={index * 500} />
                  </h3>
                  <p className={styles.period}>
                    <ScrambleText
                      text={step.period}
                      isDecrypted={isDecrypted}
                      delay={index * 500 + 200}
                    />
                  </p>
                  {step.lines.map((line, lIndex) => (
                    <p key={lIndex} className={styles.line}>
                      <ScrambleText
                        text={line}
                        isDecrypted={isDecrypted}
                        delay={index * 500 + 400 + lIndex * 150}
                      />
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <div className={styles.terminalPromptWrapper}>
              <span className={styles.promptArrow}>➜</span>
              <span className={styles.promptPath}>~/experience</span>
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
                disabled={isDecrypted}
                placeholder={
                  isDecrypted ? 'Decryption complete.' : 'Type command or click hint above...'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
