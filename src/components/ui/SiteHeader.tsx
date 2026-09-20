import { RETOUR_ACCUEIL } from '@/lib/deck';
import styles from './SiteHeader.module.css';

/** Chrome haut, commun a toutes les diapos. */
export function SiteHeader() {
  const rentrer = () => {
    window.dispatchEvent(new Event(RETOUR_ACCUEIL));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.header}>
      <a href="#contact" className={styles.skip}>
        Aller au contact
      </a>
      <button
        type="button"
        className={styles.wordmark}
        onClick={rentrer}
        aria-label="Misbaou DIALLO, retour a l’accueil"
      >
        MISBAOU
      </button>
    </header>
  );
}
