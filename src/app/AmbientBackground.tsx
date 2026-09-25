import styles from './AmbientBackground.module.css';

export function AmbientBackground() {
  return (
    <div className={styles.bgWrapper} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbCyan}`}></div>
      <div className={`${styles.orb} ${styles.orbEmerald}`}></div>
      <div className={`${styles.orb} ${styles.orbSky}`}></div>
      <div className={styles.scanline}></div>
    </div>
  );
}
