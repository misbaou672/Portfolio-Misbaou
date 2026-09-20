# Portfolio — Misbaou DIALLO

Portfolio personnel de **Misbaou Diallo**, Développeur Full-Stack & Automatisation. Un **diaporama interactif** de cinq écrans : Hub, Projets, Expérience (Terminal Hacker), À Propos, Contact.

L'interface arbore un thème **Clean & Light Professional**, combinant élégance corporative et éléments geek/tech interactifs (GSAP, ScrambleText, Terminal).

## 🚀 Stack & Technologies

| Domaine     | Choix                                                          |
| ----------- | -------------------------------------------------------------- |
| **Build**   | Vite + React 19 + TypeScript (SPA)                             |
| **Anim**    | GSAP (`@gsap/react`), Lenis (Smooth Scroll)                    |
| **Style**   | CSS Modules + Jetons CSS (`src/styles/tokens.css`)             |
| **Navig.**  | Diaporama plein écran avec GSAP Observer                       |
| **Polices** | `Anton`, `Space Grotesk`, `JetBrains Mono`, `Instrument Serif` |

## 📦 Structure du projet

```
src/
  app/            Points d'entrée : Providers, App, Layout
  components/
    ui/           Curseur personnalisé, barre de navigation, liens
    hub/          Hero section, Bento-box des compétences
    projects/     Pellicule GSAP, affichage détaillé des projets (ProjectView)
    experience/   Terminal Hacker interactif (Expériences RATP, UPEC)
    about/        Récit personnel, présentation
    contact/      Coordonnées, liens GitHub, LinkedIn, TryHackMe
  data/           Données des projets, compétences, etc.
  lib/            Configurations GSAP, Hooks
  styles/         Fichiers globaux (tokens.css, reset.css, global.css)
```

## 🛠️ Démarrage Rapide

Assurez-vous d'avoir Node.js installé (version 20+ recommandée).

```bash
# 1. Installation des dépendances
npm install

# 2. Lancement du serveur de développement
npm run dev

# 3. Build pour la production
npm run build
```

## ✨ Scripts disponibles

| Script            | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Lance le serveur de développement Vite      |
| `npm run build`   | Typecheck (`tsc`) + Build optimisé (`vite`) |
| `npm run preview` | Lance un serveur local pour tester le build |
| `npm run lint`    | Vérification ESLint                         |

## 🔗 Liens Sociaux

- **LinkedIn** : [misbaou-diallo14082005](https://www.linkedin.com/in/misbaou-diallo14082005/)
- **GitHub** : [misbaou672](https://github.com/misbaou672)
- **Root-Me** : [wvbsim](https://www.root-me.org/wvbsim)
- **TryHackMe** : [misbaou.diallo](https://tryhackme.com/p/misbaou.diallo)

---

_Développé avec ☕ et beaucoup de ❤️ par Misbaou DIALLO._
