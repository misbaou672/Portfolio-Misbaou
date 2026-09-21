import { useState, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

const Icons = {
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Copy: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  MapPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  ChevronDown: ({ open }: { open: boolean }) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
};

const SUBJECT_CHIPS = [
  'Proposition d\'alternance',
  'Projet web / Automatisation',
  'Échange technique',
  'Autre demande'
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECT_CHIPS[0]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'misbaou.diallo@etu.u-pec.fr';

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll(`.${styles.fadeUp}`), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });
  }, { scope: sectionRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div ref={sectionRef} className={styles.container}>
      <header className={`${styles.header} ${styles.fadeUp}`}>
        <h2 className={styles.title}>Me contacter</h2>
        <p className={styles.subtitle}>
          N'hésitez pas à me contacter par email ou via le formulaire ci-dessous.
        </p>
      </header>

      {/* 2-COLUMN GRID LAYOUT */}
      <div className={styles.grid}>
        {/* LEFT COLUMN: UNIFIED MASTER INFO PANEL WITH RICH DEPTH */}
        <div className={`${styles.infoCol} ${styles.fadeUp}`}>
          <div className={styles.masterContactCard}>
            <div className={styles.ambientGlow}></div>

            {/* AVAILABILITY BADGE */}
            <div className={styles.statusCard}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>En recherche d'alternance — Île-de-France</span>
            </div>

            {/* EMAIL QUICK COPY CARD */}
            <div className={styles.emailBlock}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}><Icons.Mail /></span>
                <div>
                  <span className={styles.cardLabel}>Adresse Email Directe</span>
                  <a href={`mailto:${emailAddress}`} className={styles.cardValue}>{emailAddress}</a>
                </div>
              </div>
              <button 
                type="button" 
                onClick={handleCopyEmail}
                className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`}
              >
                {copied ? (
                  <>
                    <Icons.Check />
                    Copié !
                  </>
                ) : (
                  <>
                    <Icons.Copy />
                    Copier l'email
                  </>
                )}
              </button>
            </div>

            <div className={styles.cardDivider}></div>

            {/* METADATA INFO */}
            <div className={styles.metaRow}>
              <div className={styles.metaBox}>
                <Icons.MapPin />
                <div>
                  <span className={styles.metaTitle}>Localisation</span>
                  <span className={styles.metaSub}>Paris / Île-de-France</span>
                </div>
              </div>

              <div className={styles.metaBox}>
                <Icons.Clock />
                <div>
                  <span className={styles.metaTitle}>Réponse</span>
                  <span className={styles.metaSub}>Sous 24h</span>
                </div>
              </div>
            </div>

            <div className={styles.cardDivider}></div>

            {/* SOCIAL / NETWORK LINKS */}
            <div className={styles.socialBox}>
              <span className={styles.socialTitle}>Réseaux professionnels :</span>
              <div className={styles.socialLinks}>
                <a href="https://www.linkedin.com/in/misbaou-diallo14082005/" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  <Icons.Linkedin />
                  LinkedIn
                </a>
                <a href="https://github.com/misbaou672" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  <Icons.Github />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EXPANDABLE FORM DRAWER */}
        <div className={`${styles.formCol} ${isFormOpen ? styles.formColOpen : ''} ${styles.fadeUp}`}>
          <div className={`${styles.expandableForm} ${isFormOpen ? styles.expandableFormOpen : ''}`}>
            {submitted ? (
              <div className={styles.successState}>
                <span className={styles.successIcon}><Icons.Check /></span>
                <h3>Message bien reçu !</h3>
                <p>Merci pour votre message, je vous recontacterai rapidement.</p>
                <button 
                  type="button" 
                  className={styles.resetBtn} 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                >
                  Rédiger un autre message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.subjectBlock}>
                  <label className={styles.label}>Objet de votre message :</label>
                  <div className={styles.chipsRow}>
                    {SUBJECT_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setSelectedSubject(chip)}
                        className={`${styles.chipBtn} ${selectedSubject === chip ? styles.chipActive : ''}`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.fieldsRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Nom complet</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input} 
                      placeholder="Votre nom" 
                    />
                  </div>
                  
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Adresse Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.input} 
                      placeholder="votre.email@exemple.fr" 
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={styles.textarea} 
                    placeholder="Saisissez votre message..."
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Icons.Send />
                  <span>Envoyer le message</span>
                </button>
              </form>
            )}
          </div>

          <button 
            type="button"
            className={`${styles.toggleFormBtn} ${isFormOpen ? styles.toggleFormBtnOpen : ''}`}
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            <div className={styles.toggleFormLeft}>
              <span className={styles.toggleIcon}><Icons.Send /></span>
              <div>
                <span className={styles.toggleTitle}>
                  {isFormOpen ? 'Fermer le formulaire' : 'M\'envoyer un message'}
                </span>
                <span className={styles.toggleSubtitle}>
                  {isFormOpen ? 'Cliquez pour replier' : 'Formulaire rapide de contact'}
                </span>
              </div>
            </div>
            <Icons.ChevronDown open={isFormOpen} />
          </button>
        </div>
      </div>
    </div>
  );
}
