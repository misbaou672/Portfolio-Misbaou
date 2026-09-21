import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';
import { FloatingNav } from './FloatingNav';
import { AmbientBackground } from './AmbientBackground';
import styles from './Layout.module.css';
export function Layout() {
  return (
    <div className={styles.layout}>
      <AmbientBackground />
      <main className={styles.main}>
        <section id="section-hub" className={styles.section}>
          <Hub />
        </section>

        <section id="section-projects" className={styles.section}>
          <Projects />
        </section>

        <section id="section-experience" className={styles.section}>
          <Experience />
        </section>

        <section id="section-about" className={styles.section}>
          <About />
        </section>

        <section id="section-contact" className={styles.section}>
          <Contact />
        </section>

        <FloatingNav />
      </main>
    </div>
  );
}
