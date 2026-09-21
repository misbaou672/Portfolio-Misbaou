import { useEffect, useState } from 'react';
import styles from './FloatingNav.module.css';

const SECTIONS = [
  { id: 'section-hub', label: 'Hub', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'section-projects', label: 'Projets', icon: 'M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4' },
  { id: 'section-experience', label: 'Parcours', icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z' },
  { id: 'section-about', label: 'À propos', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'section-contact', label: 'Contact', icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.51L12 13l8-6.49V6H4zm0 2.83V18h16V8.83l-8 6.49-8-6.49z' }
];

export function FloatingNav() {
  const [active, setActive] = useState('section-hub');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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
              aria-label={label}
              title={label}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
                {id === 'section-projects' && <polyline points="14 2 14 8 20 8" />}
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
