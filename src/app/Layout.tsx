import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';
import { FloatingNav } from './FloatingNav';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <section id="section-hub" className={`${styles.section} ${styles.sectionLight}`}>
          <Hub />
        </section>

        <section id="section-projects" className={`${styles.section} ${styles.sectionDark}`}>
          <Projects />
        </section>

        <section id="section-experience" className={`${styles.section} ${styles.sectionAlt}`}>
          <Experience />
        </section>

        <section id="section-about" className={`${styles.section} ${styles.sectionLight}`}>
          <About />
        </section>

        <section id="section-contact" className={`${styles.section} ${styles.sectionAlt}`}>
          <Contact />
        </section>
        
        <FloatingNav />
      </main>
    </div>
  );
}
