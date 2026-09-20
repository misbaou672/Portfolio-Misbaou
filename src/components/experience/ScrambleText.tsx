import { useEffect, useState } from 'react';

type ScrambleTextProps = {
  text: string;
  isDecrypted: boolean;
  delay?: number;
};

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

export function ScrambleText({ text, isDecrypted, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [scrambling, setScrambling] = useState(!isDecrypted);

  useEffect(() => {
    if (!isDecrypted) {
      // Scrambled state
      const randomText = text
        .split('')
        .map((char) =>
          char === ' ' ? ' ' : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        )
        .join('');
      // eslint-disable-next-line
      setDisplayText(randomText);

      setScrambling(true);
      return;
    }

    // Start decrypting after delay
    const timeoutId = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join('');
        });

        if (iteration >= text.length) {
          clearInterval(interval);
          setScrambling(false);
        }

        iteration += 1 / 3; // Adjust speed here
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isDecrypted, text, delay]);

  return <span className={scrambling ? 'scrambled-text' : ''}>{displayText}</span>;
}
