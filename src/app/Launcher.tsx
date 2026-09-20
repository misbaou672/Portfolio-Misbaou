import { useState } from 'react';
import styles from './Launcher.module.css';

export function Launcher({ onLaunch }: { onLaunch: () => void }) {
  const [isStarting, setIsStarting] = useState(false);

  const handleClick = () => {
    setIsStarting(true);
    // Petit délai pour laisser jouer l'animation de la barre de progression
    setTimeout(() => {
      onLaunch();
    }, 1500);
  };

  return (
    <div className={`${styles.launcher} ${isStarting ? styles.fadeOut : ''}`}>
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.header}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.title}>terminal — bash</span>
          </div>
          <div className={styles.body}>
            <p className={styles.line}>&gt; Initializing MD_Portfolio_v2.0...</p>
            <p className={styles.line}>&gt; Loading dependencies: [OK]</p>
            <p className={styles.line}>&gt; Awaiting manual execution...</p>
            
            <div className={styles.actionArea}>
              <button 
                className={`${styles.button} ${isStarting ? styles.executing : ''}`}
                onClick={handleClick}
                disabled={isStarting}
              >
                {isStarting ? 'EXECUTING...' : 'EXECUTE WORKFLOW'}
              </button>
            </div>

            {isStarting && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
