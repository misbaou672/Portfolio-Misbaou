import { useEffect, useState } from 'react';

type ScrambleTextProps = {
  text: string;
  isDecrypted: boolean;
  delay?: number;
};

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

const reduit = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Caractere brouille, deterministe : le rendu reste pur, le tic le fait scintiller. */
function brouille(char: string, index: number, tic: number) {
  if (char === ' ') return ' ';
  return CHARACTERS[(index * 7 + tic * 13 + char.charCodeAt(0)) % CHARACTERS.length];
}

/**
 * Texte qui se dechiffre lettre a lettre. Le vrai texte est toujours dans le
 * DOM pour les lecteurs d'ecran ; seule la version brouillee est decorative.
 */
export function ScrambleText({ text, isDecrypted, delay = 0 }: ScrambleTextProps) {
  // Nombre de lettres deja revelees ; ne change que dans les minuteries.
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    if (!isDecrypted || reduit()) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeoutId = setTimeout(() => {
      let courant = 0;
      setIteration(0);
      interval = setInterval(() => {
        courant += 1 / 3;
        setIteration(courant);
        if (courant >= text.length) clearInterval(interval);
      }, 25);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [isDecrypted, text, delay]);

  const termine = isDecrypted && (reduit() || iteration >= text.length);
  const revelees = isDecrypted ? iteration : 0;
  const tic = Math.floor(iteration * 3);
  const affiche = termine
    ? text
    : text
        .split('')
        .map((char, index) => (index < revelees ? char : brouille(char, index, tic)))
        .join('');

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={termine ? '' : 'scrambled-text'}>
        {affiche}
      </span>
    </span>
  );
}
