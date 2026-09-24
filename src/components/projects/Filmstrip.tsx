import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';
import { PROJECTS } from './projects.data';
import styles from './Filmstrip.module.css';

type Props = {
  active: number;
  onActivate: (index: number) => void;
  onOpen: (index: number) => void;
};

const TILE = 224; // 280px * 0.8 scale
const ACTIVE = 280;
const GAP = 16;
/** Distance de doigt avant de changer de tuile. */
const SEUIL_TACTILE = 40;

/** Position horizontale d'une tuile par rapport au centre (tuile active = 0). */
function posFor(offset: number): number {
  if (offset === 0) return 0;
  const base = ACTIVE / 2 + GAP + TILE / 2;
  const extra = (Math.abs(offset) - 1) * (TILE + GAP);
  return Math.sign(offset) * (base + extra);
}

/**
 * Pellicule : tuiles identiques, projet actif verrouille au centre.
 *
 * Motif « toolbar » a tabulation glissante : la pellicule ne prend qu'un seul
 * arret de tabulation, les fleches deplacent le focus d'une tuile a l'autre.
 * L'ancien montage (`role="listbox"` avec des `<button role="option">`)
 * n'etait pas valide : une listbox n'accepte pas d'enfants focalisables, et
 * les tuiles restaient inatteignables au clavier une par une.
 */
export function Filmstrip({ active, onActivate, onOpen }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const legendeRef = useRef<HTMLParagraphElement>(null);
  const nomLegendeRef = useRef<HTMLSpanElement>(null);

  /**
   * Le nom du projet choisi emerge de la tuile active.
   *
   * Les tuiles ne portent plus leur nom : la legende seule le dit. Elle part
   * du bas de la tuile active et descend se poser a sa place, pour que le
   * nom paraisse sortir de la vignette plutot que d'apparaitre de nulle part.
   *
   * Les deux reperes sont mesures au vol. Celui de la tuile reste fiable
   * pendant sa transition : une tuile ne se deplace qu'en X et ne change que
   * d'echelle horizontale, son bas ne bouge pas. Et la tuile active etant
   * toujours centree, il n'y a pas d'ecart horizontal a rattraper.
   */
  useGSAP(
    () => {
      const legende = legendeRef.current;
      const nomLegende = nomLegendeRef.current;
      const tuile = stripRef.current?.querySelector<HTMLElement>(
        `[data-tile-id="${PROJECTS[active].id}"]`,
      );
      if (!legende || !nomLegende || !tuile) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Remise a plat avant de mesurer. Une frappe rapide au clavier
           relance l'animation alors que la precedente court encore : sans ce
           `set`, le repere d'arrivee serait pris sur une legende encore
           reduite et decalee, et la suivante viserait cette position-la. */
        gsap.set(legende, { clearProps: 'transform,opacity' });

        const arrivee = nomLegende.getBoundingClientRect();
        const depart = tuile.getBoundingClientRect();
        if (!arrivee.height) return;
        /* Une reduction franche mais constante : sans nom sur la tuile, il n'y
           a plus de corps de depart a mesurer, et un rapport tire de la
           vignette suivrait son echelle au lieu de la typographie. */
        const echelle = 0.6;

        /**
         * `fromTo` et non `from`. `from` anime depuis les valeurs donnees
         * jusqu'a celles trouvees sur l'element : en enchainant les fleches,
         * la nouvelle animation prenait pour arrivee l'etat a mi-course de la
         * precedente, et la legende restait petite et pale a mi-chemin. Avec
         * `fromTo`, les deux bouts sont ecrits, le point de chute ne depend
         * plus de l'instant ou on relance.
         */
        gsap.fromTo(
          legende,
          {
            y: depart.bottom - arrivee.top,
            scaleX: echelle,
            scaleY: echelle,
            opacity: 0,
          },
          {
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            overwrite: true,
          },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [active], scope: wrapRef },
  );

  /** Deplace la selection et emmene le focus avec elle. */
  const moveTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), PROJECTS.length - 1);
    onActivate(next);
    stripRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tile-id="${PROJECTS[next].id}"]`)
      ?.focus();
  };

  /**
   * Glissement horizontal sur la pellicule : il change de projet, pas d'ecran.
   *
   * Ecouteurs natifs et non props React : React delegue les siens a la racine
   * du document, donc ils s'executent apres l'ecouteur natif du diaporama,
   * pose sur la fenetre. Un `stopPropagation` depuis une prop React arriverait
   * trop tard. Poses directement sur la pellicule, ils remontent avant lui et
   * peuvent l'arreter, sinon un meme geste changerait la tuile et l'ecran.
   *
   * La selection change sans emmener le focus : un glissement n'est pas une
   * navigation au clavier, et deplacer le focus ferait apparaitre l'anneau de
   * mise au point sur un ecran tactile.
   */
  const depart = useRef<{ x: number; y: number } | null>(null);
  /* Ecrit dans un effet et non pendant le rendu : une ecriture pendant le
     rendu laisserait la ref sur les valeurs d'un rendu abandonne, React
     pouvant rendre deux fois avant de valider. Le geste arrive apres. */
  const etat = useRef({ active, onActivate });
  useEffect(() => {
    etat.current = { active, onActivate };
  }, [active, onActivate]);

  useEffect(() => {
    const zone = stripRef.current;
    if (!zone) return;

    const onStart = (e: globalThis.TouchEvent) => {
      const t = e.touches[0];
      depart.current = t ? { x: t.clientX, y: t.clientY } : null;
    };

    const onEnd = (e: globalThis.TouchEvent) => {
      const debut = depart.current;
      depart.current = null;
      const fin = e.changedTouches[0];
      if (!debut || !fin) return;

      const dx = debut.x - fin.clientX;
      const dy = debut.y - fin.clientY;
      if (Math.abs(dx) < SEUIL_TACTILE || Math.abs(dx) <= Math.abs(dy)) return;

      e.stopPropagation();
      const { active: courant, onActivate: choisir } = etat.current;
      choisir(Math.min(Math.max(courant + Math.sign(dx), 0), PROJECTS.length - 1));
    };

    // Pour éviter de bloquer la page entière (scroll trap), on ne preventDefault
    // que si on change effectivement de tuile (si on n'est pas en butée).
    let lastWheelTime = 0;
    const onWheel = (e: globalThis.WheelEvent) => {
      const now = performance.now();
      if (now - lastWheelTime < 400) {
        e.preventDefault();
        return;
      }

      const { active: courant, onActivate: choisir } = etat.current;
      const sens = Math.sign(e.deltaY);
      const cible = courant + sens;

      if (cible >= 0 && cible <= PROJECTS.length - 1) {
        e.preventDefault();
        lastWheelTime = now;
        choisir(cible);
      }
    };

    zone.addEventListener('touchstart', onStart, { passive: true });
    zone.addEventListener('touchend', onEnd, { passive: true });
    zone.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      zone.removeEventListener('touchstart', onStart);
      zone.removeEventListener('touchend', onEnd);
      zone.removeEventListener('wheel', onWheel);
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveTo(active + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveTo(active - 1);
        break;
      case 'Home':
        e.preventDefault();
        moveTo(0);
        break;
      case 'End':
        e.preventDefault();
        moveTo(PROJECTS.length - 1);
        break;
    }
  };

  const projet = PROJECTS[active];

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {/* Plus de compteur ici : il est sous le nom du projet, la ou l'oeil se
          pose. L'afficher aux deux bouts de l'ecran ne l'apprenait pas mieux. */}
      <h2 className={styles.kicker}>Mes projets</h2>

      <div
        ref={stripRef}
        className={styles.strip}
        role="toolbar"
        aria-label="Projets"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
      >
        {PROJECTS.map((project, i) => {
          const offset = i - active;
          const current = i === active;
          const previewImage =
            project.medias && project.medias.length > 0 ? project.medias[0].src : null;
          return (
            <button
              key={project.id}
              id={`tile-${project.id}`}
              data-tile-id={project.id}
              type="button"
              /* Un seul arret de tabulation pour toute la pellicule. */
              tabIndex={current ? 0 : -1}
              aria-current={current ? 'true' : undefined}
              className={`${styles.tile} ${current ? styles.current : ''}`}
              style={{
                ['--pos' as string]: posFor(offset),
                ['--dim' as string]: Math.min(Math.abs(offset), 6),
                ['--ink' as string]: project.palette.ink,
                ['--glow' as string]: project.palette.glow || 'rgba(56, 189, 248, 0.35)',
                background: previewImage
                  ? `linear-gradient(180deg, rgba(13, 19, 34, 0) 35%, rgba(13, 19, 34, 0.88) 100%), url(${previewImage}) center/cover no-repeat`
                  : `linear-gradient(165deg, ${project.palette.from}, ${project.palette.to})`,
              }}
              onClick={() => (current ? onOpen(i) : moveTo(i))}
            >
              <span className={styles.idx}>{project.index}</span>
              {/* La tuile ne porte plus son nom en clair : la legende l'affiche
                  juste dessous. Il reste ici pour l'annonce vocale, sans quoi le
                  bouton ne dirait plus de quel projet il s'agit. */}
              <span className={styles.sr}>
                {project.name} — {current ? 'Ouvrir la fiche du projet' : 'Selectionner ce projet'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Le nom du projet choisi, puis ce qu'il faut savoir avant d'ouvrir :
          son rang, sa nature et son annee. Masque aux lecteurs d'ecran, la
          tuile annoncant deja son nom et son `aria-current`. */}
      <p
        ref={legendeRef}
        className={styles.legende}
        style={{ ['--ink-actif' as string]: projet.palette.ink } as CSSProperties}
        aria-hidden="true"
      >
        <span ref={nomLegendeRef} className={styles.legendeNom}>
          {projet.name}
        </span>
        <span className={styles.legendeMeta}>
          {projet.index} / {PROJECTS.length.toString().padStart(2, '0')}
          <i>·</i>
          {projet.kind}
          <i>·</i>
          {projet.year}
        </span>
      </p>

      {/* Boutons precedent / suivant : le glissement n'est pas evident au
          doigt, et la souris n'a pas d'autre moyen de parcourir. */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => moveTo(active - 1)}
          disabled={active === 0}
          aria-label="Projet précédent"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button type="button" className={styles.openBtn} onClick={() => onOpen(active)}>
          Voir le projet
        </button>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => moveTo(active + 1)}
          disabled={active === PROJECTS.length - 1}
          aria-label="Projet suivant"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <p className={styles.hint}>
        Glisse pour parcourir, touche la tuile centrale pour l’ouvrir.
        <span className={styles.hintKeys}> Au clavier : flèches, puis Entrée.</span>
      </p>
    </div>
  );
}
