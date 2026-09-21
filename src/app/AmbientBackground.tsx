import styles from './AmbientBackground.module.css';

export function AmbientBackground() {
  return (
    <div className={styles.bgWrapper} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orbCyan}`}></div>
      <div className={`${styles.orb} ${styles.orbEmerald}`}></div>
      <div className={`${styles.orb} ${styles.orbPurple}`}></div>
      <div className={styles.gridOverlay}></div>
      <div className={styles.scanline}></div>
    </div>
  );
}
