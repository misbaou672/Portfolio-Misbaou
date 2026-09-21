import { useState, useRef, useEffect } from 'react';

import { PROJECTS } from './projects.data';
import { Filmstrip } from './Filmstrip';
import { ProjectView } from './ProjectView';
import styles from './Projects.module.css';
import { gsap, useGSAP } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section Projets en défilement vertical.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'stage'>('grid');
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const isFicheOpen = useRef(open !== null);
  useEffect(() => {
    isFicheOpen.current = open !== null;
  }, [open]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  const handleOpen = (index: number) => {
    const tile = document.querySelector(`[data-tile-id="${PROJECTS[index].id}"]`);
    setOriginRect(tile ? tile.getBoundingClientRect() : null);
    setOpen(index);
  };

  return (
    <section ref={sectionRef} className={styles.projects} id="projets" aria-label="Projets">
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <h2 className={styles.sectionTitle}>Projets Réalisés</h2>
          <p className={styles.sectionSub}>
            Découvrez mes réalisations en développement web, algorithmique et automatisation.
          </p>
        </div>

        {/* VIEW MODE SWITCHER */}
        <div className={styles.viewToggle}>
          <button
            type="button"
            className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Grille
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${viewMode === 'stage' ? styles.toggleActive : ''}`}
            onClick={() => setViewMode('stage')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M12 3v4"/></svg>
            Scène 3D
          </button>
        </div>
      </div>

      {viewMode === 'stage' ? (
        <Filmstrip active={active} onActivate={setActive} onOpen={handleOpen} />
      ) : (
        <div className={styles.projectsGrid}>
          {PROJECTS.map((project, index) => {
            const previewImg = project.medias && project.medias.length > 0 ? project.medias[0].src : null;
            return (
              <article
                key={project.id}
                data-tile-id={project.id}
                className={styles.gridCard}
                onClick={() => handleOpen(index)}
              >
                <div
                  className={styles.cardImageCover}
                  style={{
                    backgroundImage: previewImg
                      ? `linear-gradient(180deg, rgba(13, 19, 34, 0.2) 0%, rgba(13, 19, 34, 0.9) 100%), url(${previewImg})`
                      : `linear-gradient(135deg, ${project.palette.from}, ${project.palette.to})`
                  }}
                >
                  <span className={styles.cardIndex}>{project.index}</span>
                  <span className={styles.cardKind}>{project.kind}</span>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{project.name}</h3>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>
                  <p className={styles.cardPitch}>{project.pitch}</p>
                  <div className={styles.cardStack}>
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className={styles.stackTag}>{tech}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className={styles.stackTagMore}>+{project.stack.length - 4}</span>
                    )}
                  </div>
                  <div className={styles.cardAction}>
                    <span>Voir les détails</span>
                    <span className={styles.actionArrow}>→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {open !== null && (
        <ProjectView
          project={PROJECTS[open]}
          originRect={originRect}
          onClose={() => setOpen(null)}
          onNext={open < PROJECTS.length - 1 ? () => handleOpen(open + 1) : undefined}
          onPrev={open > 0 ? () => handleOpen(open - 1) : undefined}
        />
      )}
    </section>
  );
}
