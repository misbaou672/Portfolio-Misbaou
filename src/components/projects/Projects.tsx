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
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Réf mutable pour bloquer ScrollTrigger quand une fiche est ouverte
  const isFicheOpen = useRef(open !== null);
  useEffect(() => {
    isFicheOpen.current = open !== null;
  }, [open]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /**
         * L'entree ne joue que sur l'opacite : cette section ne doit jamais
         * porter de `transform`.
         *
         * Elle contient la fiche projet et sa vue agrandie, toutes deux en
         * `position: fixed`. Or un `transform`, meme une identite laissee par
         * GSAP en fin d'animation, fait de l'element un bloc de reference :
         * les descendants fixes se calent alors sur la section au lieu de la
         * fenetre. La fiche cessait de couvrir l'ecran et se retrouvait dans
         * le flux de la page, sous le contenu de l'accueil.
         *
         * `clearProps` n'y suffisait pas : au telephone, la barre d'URL qui se
         * masque au defilement rafraichit ScrollTrigger, qui rejoue l'entree
         * et repose le transform. D'ou une fiche qui se deglinguait au fil du
         * defilement.
         */
        gsap.from(sectionRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const handleOpen = (index: number) => {
    const tile = document.querySelector(`[data-tile-id="${PROJECTS[index].id}"]`);
    setOriginRect(tile ? tile.getBoundingClientRect() : null);
    setOpen(index);
  };

  return (
    <section ref={sectionRef} className={styles.projects} id="projets" aria-label="Projets">
      <Filmstrip active={active} onActivate={setActive} onOpen={handleOpen} />

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
