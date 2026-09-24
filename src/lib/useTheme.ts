import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

const CLE = 'theme';
const THEME_COLOR: Record<Theme, string> = { light: '#f5f7fb', dark: '#0f1623' };

/** Theme courant, deja pose sur <html> par le script d'index.html. */
function lireTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Bascule clair / sombre. Le choix est memorise ; sans choix, le site
 * reste clair.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(lireTheme);

  const basculer = useCallback(() => {
    const suivant: Theme = lireTheme() === 'dark' ? 'light' : 'dark';
    const racine = document.documentElement;
    if (suivant === 'dark') racine.dataset.theme = 'dark';
    else delete racine.dataset.theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[suivant]);
    try {
      localStorage.setItem(CLE, suivant);
    } catch {
      // Stockage indisponible (navigation privee) : le choix vaut pour la visite.
    }
    setTheme(suivant);
  }, []);

  return { theme, basculer };
}
