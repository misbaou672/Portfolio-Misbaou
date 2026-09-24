import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Hub.module.css';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/misbaou672',
    path: 'M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.28 5.69.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/misbaou-diallo14082005/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z',
  },
  {
    label: 'Root-Me',
    href: 'https://www.root-me.org/wvbsim',
    path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm2 4v2h2V8H6zm4 0v2h8V8h-8zm-4 4v2h8v-2H6zm0 4v2h4v-2H6z',
  },
  {
    label: 'TryHackMe',
    href: 'https://tryhackme.com/p/misbaou.diallo',
    path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v6h-2V7zm0 8h2v2h-2v-2z',
  },
];

export function Hub() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;
      gsap.from(rootRef.current.querySelectorAll('[data-rise]'), {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={styles.heroContainer}>
      <div className={styles.contentLeft}>
        <div className={styles.badge} data-rise>
          <span className={styles.dot}></span>À la recherche d'une alternance — Île-de-France
        </div>

        <h1 className={styles.title} data-rise>
          MISBAOU
          <br />
          DIALLO
        </h1>

        <h2 className={styles.role} data-rise>
          Étudiant en BUT Informatique (3ᵉ année)
        </h2>

        <p className={styles.bio} data-rise>
          Étudiant à l'UPEC et ancien stagiaire à la RATP (DSP 49), je développe des applications
          web et j'automatise des tâches pour simplifier les processus. Je me dirige vers le
          back-end et les pratiques DevOps / DevSecOps.
        </p>

        <div className={styles.actions} data-rise>
          <a href="#section-projects" className={styles.btnPrimary}>
            Découvrir mes projets
          </a>
          <a href="#section-contact" className={styles.btnSecondary}>
            Me contacter
          </a>
        </div>

        <div className={styles.statsRow} data-rise>
          <div className={styles.statItem}>
            <strong>11</strong>
            <span>Projets réalisés</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <strong>Ex-stagiaire</strong>
            <span>RATP — DSP 49</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <strong>BUT 3</strong>
            <span>Info UPEC</span>
          </div>
        </div>

        <div className={styles.socials} data-rise>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: MODERN DEV CONSOLE CARD */}
      <div className={styles.contentRight} data-rise>
        <div className={styles.ambientGlow}></div>
        <div className={styles.devCardWrap}>
          <div className={styles.devCard}>
            <div className={styles.devCardHeader}>
              <div className={styles.winButtons}>
                <span className={styles.wBtnRed}></span>
                <span className={styles.wBtnYellow}></span>
                <span className={styles.wBtnGreen}></span>
              </div>
              <span className={styles.winTitle}>misbaou@dev:~$</span>
            </div>
            <div className={styles.devCardBody}>
              <div className={styles.devAvatarBadge}>
                <span className={styles.avatarInitials}>MD</span>
              </div>
              <div className={styles.devMetaList}>
                <div className={styles.devMetaRow}>
                  <span className={styles.promptSign}>&gt;</span>
                  <span className={styles.metaLabel}>Profil:</span>
                  <span className={styles.metaVal}>Web &amp; Automatisation</span>
                </div>
                <div className={styles.devMetaRow}>
                  <span className={styles.promptSign}>&gt;</span>
                  <span className={styles.metaLabel}>Stage:</span>
                  <span className={styles.metaVal}>RATP — DSP 49</span>
                </div>
                <div className={styles.devMetaRow}>
                  <span className={styles.promptSign}>&gt;</span>
                  <span className={styles.metaLabel}>Études:</span>
                  <span className={styles.metaVal}>BUT 3 Informatique UPEC</span>
                </div>
              </div>
              <div className={styles.techStackRow}>
                <span className={styles.techTag}>Python</span>
                <span className={styles.techTag}>n8n</span>
                <span className={styles.techTag}>React</span>
                <span className={styles.techTag}>Linux</span>
                <span className={styles.techTag}>SQL</span>
              </div>
            </div>
          </div>

          <div className={styles.floatingTag} style={{ top: '-14px', right: '-10%' }}>
            Root-Me 450 pts
          </div>
          <div className={styles.floatingTag} style={{ bottom: '18%', left: '-15%' }}>
            React / Node.js
          </div>
          <div className={styles.floatingTag} style={{ top: '65%', right: '-15%' }}>
            Automatisation
          </div>
        </div>
      </div>
    </div>
  );
}
