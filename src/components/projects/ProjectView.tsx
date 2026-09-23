import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import { RETOUR_ACCUEIL } from '@/lib/deck';
import { gsap, useGSAP } from '@/lib/gsap';
import type { Project } from './projects.data';
import { THEME_IMAGES, THEME_MOTIFS } from './themes.data';
import styles from './ProjectView.module.css';

type Props = {
  project: Project;
  originRect: DOMRect | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
};

const Icons = {
  Maximize: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Terminal: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Compass: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Cpu: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  ),
  Layers: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  CheckItem: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Clock: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px' }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Target: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: '-1px' }}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  CodeTag: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px', opacity: 0.85 }}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.9 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Award: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.9 }}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
};

export function ProjectView({ project, onClose, onNext, onPrev }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project.id]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Lock/freeze page scrolling while cursor is over the hero section
      e.preventDefault();
      e.stopPropagation();

      const medias = project.medias;
      if (!medias || medias.length <= 1) return;

      const total = medias.length;
      const now = Date.now();
      if (now - lastWheelTime.current < 160) return;
      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % total);
      } else if (e.deltaY < 0) {
        setCurrentImageIndex((prev) => (prev - 1 + total) % total);
      }
    };

    heroEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      heroEl.removeEventListener('wheel', handleWheel);
    };
  }, [project.medias]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const lightboxEl = lightboxRef.current;
    if (!lightboxEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const medias = project.medias;
      if (!medias || medias.length <= 1) return;

      const total = medias.length;
      const now = Date.now();
      if (now - lastWheelTime.current < 160) return;
      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % total);
      } else if (e.deltaY < 0) {
        setCurrentImageIndex((prev) => (prev - 1 + total) % total);
      }
    };

    lightboxEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      lightboxEl.removeEventListener('wheel', handleWheel);
    };
  }, [isLightboxOpen, project.medias]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const progress = Math.min(1, Math.max(0, scrollTop / 500));
    setScrollProgress(progress);
    setPageProgress(scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0);

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  const fermeture = useRef(false);
  const fermer = useCallback(() => {
    if (fermeture.current) return;
    fermeture.current = true;

    const root = rootRef.current;
    if (!root) {
      onClose();
      return;
    }

    gsap.to(root, {
      autoAlpha: 0,
      scale: 0.98,
      duration: 0.3,
      ease: 'power3.inOut',
      onComplete: onClose
    });
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fermer();
      if (e.key === 'ArrowRight' && onNext && !isLightboxOpen) onNext();
      if (e.key === 'ArrowLeft' && onPrev && !isLightboxOpen) onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fermer, onNext, onPrev, isLightboxOpen]);

  useEffect(() => {
    window.addEventListener(RETOUR_ACCUEIL, fermer);
    return () => window.removeEventListener(RETOUR_ACCUEIL, fermer);
  }, [fermer]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
  }, [project.id]); // Re-focus quand le projet change

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    // clearProps : un transform residuel ferait defiler le fond fixe avec le contenu.
    gsap.fromTo(root, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out', clearProps: 'transform' });
    gsap.fromTo(root.querySelectorAll(`.${styles.reveal}`), 
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
    );
  }, { scope: rootRef, dependencies: [project.id] });

  const theme = {
    '--p-accent': project.palette.ink,
    '--p-ink': `color-mix(in srgb, ${project.palette.ink} 16%, #ffffff)`,
    '--p-muted': `color-mix(in srgb, ${project.palette.ink} 22%, #94a3b8)`,
    '--p-border': `color-mix(in srgb, ${project.palette.ink} 30%, rgba(255, 255, 255, 0.1))`,
    '--p-from': project.palette.from,
    '--p-to': project.palette.to,
    '--p-glow': project.palette.glow || 'rgba(56, 189, 248, 0.4)',
  } as CSSProperties;

  const themeImages = THEME_IMAGES[project.id] ?? [];
  const bgImages = themeImages.length > 0
    ? themeImages.map((image) => image.src)
    : project.bgThemeImage
      ? [project.bgThemeImage]
      : [];
  const motif = THEME_MOTIFS[project.id];

  return (
    <div ref={rootRef} className={styles.root} style={theme} onScroll={handleScroll}>
      <div className={styles.bgWrapper} aria-hidden="true">
        {bgImages.map((imgSrc, idx) => {
          // Fondu enchaine : chaque illustration domine a son tiers de la page.
          const position = pageProgress * Math.max(0, bgImages.length - 1);
          const weight = Math.max(0, 1 - Math.abs(position - idx));
          return (
            <div
              key={imgSrc}
              className={styles.bgImage}
              style={{ backgroundImage: `url(${imgSrc})`, opacity: weight }}
            />
          );
        })}
        {motif && (
          <div className={styles.bgMotifFade}>
            <div
              className={`${styles.bgMotif} ${styles[`motif-${motif}`]}`}
              style={{ transform: `translate3d(0, ${-pageProgress * 120}px, 0)` }}
            />
          </div>
        )}
        <div className={styles.bgVignette} />
      </div>
      <header className={styles.topNav}>
        <button ref={closeRef} type="button" className={styles.close} onClick={fermer}>
          &larr; Retour
        </button>
        <div className={styles.projectNav}>
          {onPrev && <button className={styles.navBtn} onClick={onPrev}>&larr; Projet Précédent</button>}
          {onNext && <button className={styles.navBtn} onClick={onNext}>Projet Suivant &rarr;</button>}
        </div>
      </header>

      <div className={styles.container}>
        {/* HEADER AREA */}
        <div className={`${styles.headerArea} ${styles.reveal}`}>
          <h1 className={styles.bgTitle}>{project.name}</h1>
          <div className={styles.headerMeta}>
            <span className={styles.metaBadge}>{project.year}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaText}>{project.kind}</span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaText}>{project.role}</span>
          </div>
        </div>

        {/* 2-COLUMN BALANCED LAYOUT */}
        <div className={styles.grid}>
          {/* MAIN COLUMN (LEFT - 65%) */}
          <div className={styles.mainCol}>
            {/* HERO MEDIA */}
            <div className={`${styles.mediaCol} ${styles.reveal}`}>
              <div ref={heroRef} className={styles.hero} onClick={() => setIsLightboxOpen(true)}>
                {project.medias && project.medias.length > 0 ? (
                  <>
                    <img
                      className={styles.heroImage}
                      src={project.medias[currentImageIndex].src}
                      alt={project.medias[currentImageIndex].alt}
                    />
                    <div className={styles.heroOverlay}>
                      <span className={styles.heroOverlayBtn}>
                        <Icons.Maximize />
                        {project.medias.length > 1
                          ? `Molette : image ${currentImageIndex + 1}/${project.medias.length} • Clic pour agrandir`
                          : 'Clic pour agrandir l\'image'}
                      </span>
                    </div>
                    {project.medias.length > 1 && (
                      <div className={styles.heroPagination} onClick={(e) => e.stopPropagation()}>
                        {project.medias.map((_, idx) => (
                          <button 
                            key={idx}
                            type="button"
                            aria-label={`Image ${idx + 1}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(idx);
                            }}
                            className={`${styles.heroDot} ${idx === currentImageIndex ? styles.heroDotActive : ''}`} 
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <span className={styles.heroLabel}>Aperçu non disponible</span>
                )}
              </div>
              {project.mediaNote && <p className={styles.mediaNote}>{project.mediaNote}</p>}
            </div>

            {/* PITCH & CAS D'USAGE */}
            <div className={`${styles.sectionBlock} ${styles.reveal}`}>
              <span className={styles.label}>À propos du projet</span>
              <p className={styles.pitch}>{project.pitch}</p>
              {project.useCase && (
                <div className={styles.useCaseCard}>
                  <span className={styles.useCaseBadge}>
                    <Icons.Info />
                    Contexte et utilité
                  </span>
                  <p>{project.useCase}</p>
                </div>
              )}
            </div>

            {/* DÉFIS TECHNIQUES & SOLUTIONS */}
            {project.challenges && project.challenges.length > 0 && (
              <div className={`${styles.sectionBlock} ${styles.reveal}`}>
                <span className={styles.label}>
                  <Icons.Terminal />
                  Défis techniques et solutions
                </span>
                <div className={styles.challengesGrid}>
                  {project.challenges.map((item, idx) => (
                    <div key={idx} className={styles.challengeCard}>
                      <div className={styles.challengePart}>
                        <span className={styles.challengeLabel}>Problème</span>
                        <p>{item.challenge}</p>
                      </div>
                      <div className={styles.solutionPart}>
                        <span className={styles.solutionLabel}>Solution</span>
                        <p>{item.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FONCTIONNALITÉS IMPLÉMENTÉES */}
            {project.featuresDone && project.featuresDone.length > 0 && (
              <div className={`${styles.sectionBlock} ${styles.reveal}`}>
                <span className={styles.label}>
                  <Icons.CheckCircle />
                  Fonctionnalités développées
                </span>
                <div className={styles.doneGrid}>
                  {project.featuresDone.map((item, idx) => (
                    <div key={idx} className={styles.doneCard}>
                      <span className={styles.checkIcon}><Icons.CheckItem /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROADMAP / À VENIR */}
            {project.roadmap && project.roadmap.length > 0 && (
              <div className={`${styles.sectionBlock} ${styles.reveal}`}>
                <span className={styles.label}>
                  <Icons.Compass />
                  Perspectives et évolutions
                </span>
                <div className={styles.roadmapList}>
                  {project.roadmap.map((item, idx) => (
                    <div key={idx} className={styles.roadmapCard}>
                      <span className={`${styles.badge} ${item.status === 'in_progress' ? styles.badgeProgress : styles.badgePlanned}`}>
                        {item.status === 'in_progress' ? (
                          <>
                            <Icons.Clock />
                            En développement
                          </>
                        ) : (
                          <>
                            <Icons.Target />
                            À venir
                          </>
                        )}
                      </span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR COLUMN (RIGHT - 35%) */}
          <aside className={styles.sidebarCol}>
            <div className={styles.stickySidebar}>
              {/* LIENS & ACTIONS */}
              {project.links.length > 0 && (
                <div className={`${styles.sidebarSection} ${styles.reveal}`}>
                  <span className={styles.label}>Liens utiles</span>
                  <nav className={styles.actionButtons} aria-label="Liens du projet">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                        <span>{link.label}</span>
                        <Icons.ExternalLink />
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* STACK TECHNIQUE */}
              <div className={`${styles.sidebarSection} ${styles.reveal}`}>
                <span className={styles.label}>
                  <Icons.Cpu />
                  Technologies
                </span>
                <ul className={styles.stackTags}>
                  {project.stack.map((tech) => (
                    <li key={tech} className={styles.techTag}>
                      <Icons.CodeTag />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* COMPÉTENCES & ACQUIS */}
              {project.learnings && project.learnings.length > 0 && (
                <div className={`${styles.sidebarSection} ${styles.reveal}`}>
                  <span className={styles.label}>
                    <Icons.Layers />
                    Compétences appliquées
                  </span>
                  <ul className={styles.learningsList}>
                    {project.learnings.map((item, idx) => (
                      <li key={idx}>
                        <span className={styles.learningBullet}><Icons.Award /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* POINTS FORTS (FEATURES) */}
              <div className={`${styles.sidebarSection} ${styles.reveal}`}>
                <span className={styles.label}>Spécificités</span>
                <div className={styles.metrics}>
                  {project.features.map((feature) => (
                    <div key={feature.title} className={styles.metric}>
                      <strong>
                        <Icons.Sparkle />
                        {feature.title}
                      </strong>
                      <span>{feature.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARTES VISUELLES EN COLONNE DE DROITE (ZONE "ICI") AVEC UNBLUR AU SCROLL */}
              {themeImages.map((item, idx) => {
                const blurValue = Math.max(0, 18 - scrollProgress * 22 - idx * 4);
                return (
                  <div key={idx} className={`${styles.sidebarImageCard} ${styles.reveal}`}>
                    <img
                      src={item.src}
                      alt={item.label}
                      className={styles.sidebarImage}
                      style={{
                        filter: `blur(${blurValue}px) brightness(0.9) saturate(1.2)`,
                        transform: `scale(${1 + scrollProgress * 0.05})`,
                      }}
                    />
                    <div className={styles.sidebarImageTag}>
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      {/* BOTTOM PINNED FOOTER BAR */}
      <div className={`${styles.bottomBar} ${isAtBottom ? styles.bottomBarActive : ''}`}>
        <span className={styles.bottomBarText}>Découvrir la suite</span>
        <div className={styles.bottomNavButtons}>
          {onNext && <button onClick={onNext} className={styles.bottomNavBtn}>Projet Suivant &rarr;</button>}
          <button onClick={fermer} className={styles.bottomCloseBtn}>Fermer</button>
        </div>
      </div>

      {/* LIGHTBOX MODE */}
      {isLightboxOpen && project.medias && typeof document !== 'undefined' && createPortal(
        <div ref={lightboxRef} className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
          <button className={styles.lightboxClose} onClick={() => setIsLightboxOpen(false)} aria-label="Fermer la vue agrandie">&times;</button>
          
          <div className={styles.lightboxContent} onClick={(e) => {
            if (project.medias && project.medias.length > 1) {
              e.stopPropagation();
              setCurrentImageIndex((i) => (i + 1) % project.medias!.length);
            }
          }}>
            <img 
              src={project.medias[currentImageIndex].src} 
              alt={project.medias[currentImageIndex].alt} 
              className={styles.lightboxImg} 
            />
            <div className={styles.lightboxHint}>
              {project.medias.length > 1
                ? `Image ${currentImageIndex + 1} / ${project.medias.length} • Molette ou clic pour faire défiler`
                : project.medias[currentImageIndex].alt}
            </div>
          </div>

          {project.medias.length > 1 && (
            <>
              <button 
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setCurrentImageIndex((i) => (i === 0 ? project.medias!.length - 1 : i - 1)); 
                }}
                aria-label="Image précédente"
              >
                &#8249;
              </button>
              <button 
                className={`${styles.lightboxNav} ${styles.lightboxNext}`} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setCurrentImageIndex((i) => (i === project.medias!.length - 1 ? 0 : i + 1)); 
                }}
                aria-label="Image suivante"
              >
                &#8250;
              </button>
              <div className={styles.heroPagination} style={{ bottom: '28px' }} onClick={(e) => e.stopPropagation()}>
                {project.medias.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Image ${idx + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`${styles.heroDot} ${idx === currentImageIndex ? styles.heroDotActive : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
