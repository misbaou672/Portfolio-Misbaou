import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Pipeline.module.css';

export function Pipeline() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      progressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      },
    );
  });

  return (
    <div className={styles.pipeline} aria-hidden="true">
      <div className={styles.track}>
        <div ref={progressRef} className={styles.progress}></div>
      </div>
    </div>
  );
}
