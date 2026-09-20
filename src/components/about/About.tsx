import { useRef } from 'react';
import styles from './About.module.css';
import { gsap, useGSAP } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Centres d'interet et langues repris du CV, qui fait foi : le site et le CV
 * doivent dire la meme chose, un recruteur ayant souvent les deux sous les
 * yeux. Le site annoncait un espagnol B1 absent du CV, et un anglais B2 la ou
 * le CV dit intermediaire.
 */
const INTERESTS = ['Boxe', 'Défi technique', 'Algorithmique', 'Musculation', 'Veille Techno'];
const LANGUES = ['Français', 'Anglais professionnel'];

/** Ecran 04, A propos. Photo, recit, formation, centres d'interet. */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(sectionRef.current!.querySelectorAll(`.${styles.side}, .${styles.story} > *`), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.about} id="a-propos" aria-label="À propos">
      <div className={styles.grid}>
        <aside className={styles.side}>
          <div className={styles.photo}>
            <div className={styles.avatarFallback}>
              <span className={styles.avatarInitials}>MD</span>
              <span className={styles.avatarSub}>Misbaou Diallo</span>
            </div>
          </div>
          <p className={styles.id}>
            Misbaou DIALLO
            <br />
            Paris / Île-de-France
          </p>
        </aside>

        <div className={styles.story}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Développeur Full-Stack</span>
            <span className={`${styles.titleLine} ${styles.accent}`}>
              Automatisation &amp; Backend
            </span>
            <span className={styles.titleCity}>Paris / Île-de-France</span>
          </h2>

          <div className={styles.body}>
            <div className={styles.read}>
              <p className={styles.lede}>
                Concevoir des applications web robustes, automatiser des processus métier et
                structurer des architectures backend performantes.
              </p>

              <div className={styles.recit}>
                <p>Étudiant en 3e année de BUT Informatique à l'IUT de Créteil-Vitry (UPEC).</p>
                <p>
                  Expérience au service informatique de la RATP (DSI) en développement et gestion de
                  données.
                </p>
              </div>

              <p className={styles.objectif}>
                <span className={styles.label}>Objectif</span> À la recherche d'une alternance d'un
                an en Développement Full-Stack, Backend ou Automatisation (rythme 1 sem. / 1 sem.,
                disponible dès septembre 2026).
              </p>
            </div>

            <div className={styles.cols}>
              <div>
                <h3 className={styles.label}>Formation &amp; Diplômes</h3>
                <p className={styles.block}>
                  <strong>BUT Informatique</strong>, IUT Créteil-Vitry (UPEC)
                  <br />
                  <span className={styles.meta}>3e année (2024 - 2027)</span>
                </p>
              </div>
              <div>
                <h3 className={styles.label}>Ce qui m’anime</h3>
                <ul className={styles.chips}>
                  {INTERESTS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className={styles.label}>Langues</h3>
                <ul className={styles.chips}>
                  {LANGUES.map((langue) => (
                    <li key={langue}>{langue}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
