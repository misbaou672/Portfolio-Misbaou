import { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';
import { Pipeline } from './Pipeline';
import { NodeWrapper } from './NodeWrapper';
import { Launcher } from './Launcher';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Layout.module.css';

export function Layout() {
  const [isExecuted, setIsExecuted] = useState(false);

  // Scroll automatique au lancement vers le nœud "Projets"
  useEffect(() => {
    if (isExecuted) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const prjNode = document.getElementById('node-PRJ');
          if (prjNode) {
            // Forcer le scroll instantané pour éviter que le snap-scroll ne s'emballe
            prjNode.scrollIntoView({ behavior: 'auto' });
            // Refresh ScrollTrigger pour recalculer les positions après l'injection des noeuds
            ScrollTrigger.refresh();
          }
        });
      }, 150);
    }
  }, [isExecuted]);

  return (
    <div className={styles.layout}>
      {/* Le fond "Combo Ultime" */}
      <div className={styles.ultimateBg} aria-hidden="true">
        <div className={styles.noise}></div>
        <div className={styles.grid}></div>
        <div className={styles.halos}></div>
        <div className={styles.typography}>SYSTEM.CORE // MD_</div>
        <div className={styles.scanline}></div>
      </div>

      {isExecuted && <Pipeline />}
      <SiteHeader />
      
      <main className={styles.main}>
        {/* Le Hub est toujours affiché (Page d'accueil) */}
        <NodeWrapper id="HUB" title="Hub.Init()" status="Active">
          <Hub />
          {!isExecuted && (
            <Launcher onLaunch={() => setIsExecuted(true)} />
          )}
        </NodeWrapper>
        
        {/* Les autres sections s'affichent après exécution */}
        {isExecuted && (
          <>
            <NodeWrapper id="PRJ" title="Projects.Load()">
              <Projects />
            </NodeWrapper>
            
            <NodeWrapper id="EXP" title="Experience.Fetch()">
              <Experience />
            </NodeWrapper>
            
            <NodeWrapper id="ABT" title="About.Render()">
              <About />
            </NodeWrapper>
            
            <NodeWrapper id="CNT" title="Contact.Await()">
              <Contact />
            </NodeWrapper>
          </>
        )}
      </main>
    </div>
  );
}
