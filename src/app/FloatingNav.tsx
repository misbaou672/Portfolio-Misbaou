import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/useTheme';
import styles from './FloatingNav.module.css';

const SECTIONS = [
  { id: 'section-hub', label: 'Hub', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  {
    id: 'section-projects',
    label: 'Projets',
    icon: 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4',
  },
  {
    id: 'section-experience',
    label: 'Parcours',
    icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  },
  {
    id: 'section-about',
    label: 'À propos',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  },
  {
    id: 'section-contact',
    label: 'Contact',
    icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.51L12 13l8-6.49V6H4zm0 2.83V18h16V8.83l-8 6.49-8-6.49z',
  },
];

export function FloatingNav() {
  const [active, setActive] = useState('section-hub');
  const { theme, basculer } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // Bande au milieu de l'ecran : une section plus haute que l'ecran
      // (le parcours au telephone) n'atteint jamais 50 % de visibilite.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Navigation principale">
      <ul className={styles.list}>
        {SECTIONS.map(({ id, label, icon }) => (
          <li key={id}>
            <button
              className={`${styles.btn} ${active === id ? styles.active : ''}`}
              onClick={() => scrollTo(id)}
              aria-current={active === id ? 'true' : undefined}
              aria-label={label}
              title={label}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={icon} />
                {id === 'section-projects' && <polyline points="14 2 14 8 20 8" />}
              </svg>
            </button>
          </li>
        ))}
        <li className={styles.separator} aria-hidden="true" />
        <li>
          <button
            className={styles.btn}
            onClick={basculer}
            aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          >
            {theme === 'dark' ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
