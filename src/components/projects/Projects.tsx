import { useState } from 'react';

import { PROJECTS } from './projects.data';
import { Filmstrip } from './Filmstrip';
import { ProjectView } from './ProjectView';
import styles from './Projects.module.css';

/**
 * Section Projets en défilement vertical.
 */
export function Projects() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const handleOpen = (index: number) => {
    const tile = document.querySelector(`[data-tile-id="${PROJECTS[index].id}"]`);
    setOriginRect(tile ? tile.getBoundingClientRect() : null);
    setOpen(index);
  };

  return (
    <section className={styles.projects} id="projets" aria-label="Projets">
      <Filmstrip active={active} onActivate={setActive} onOpen={handleOpen} />

      {open !== null && (
        <ProjectView
          project={PROJECTS[open]}
          originRect={originRect}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
