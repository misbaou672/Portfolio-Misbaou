import { SiteHeader } from '@/components/ui/SiteHeader';
import { Hub } from '@/components/hub/Hub';
import { Projects } from '@/components/projects/Projects';
import { Experience } from '@/components/experience/Experience';
import { About } from '@/components/about/About';
import { Contact } from '@/components/contact/Contact';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.layout}>
      <SiteHeader />
      <main className={styles.main}>
        <Hub />
        <Projects />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}
