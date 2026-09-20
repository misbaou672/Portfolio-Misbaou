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

## 📂 Mes Autres Projets Publics

Voici quelques-uns de mes principaux projets publics et leurs dépôts GitHub :

- **Devis Pro** : [github.com/misbaou672/Devis-Pro](https://github.com/misbaou672/Devis-Pro) — *Créateur de devis métier et génération PDF.*
- **CodeRouge** : [github.com/misbaou672/CodeRouge](https://github.com/misbaou672/CodeRouge) — *Application d'accompagnement vocal et sportif.*
- **Velib-Optim** : [github.com/misbaou672/Velib-Optim](https://github.com/misbaou672/Velib-Optim) — *Optimisation algorithmique des stations Vélib.*
- **GestiStock** : [github.com/misbaou672/GestiStock](https://github.com/misbaou672/GestiStock) — *Mini logiciel de gestion des stocks logistiques.*
- **SAE3_Real01 (EchOcean)** : [github.com/misbaou672/SAE3_Real01](https://github.com/misbaou672/SAE3_Real01) — *Modèle orienté objet strict (MVC) et cartographie interactive.*

**Et aussi :**
- **Auriance** : [github.com/misbaou672/Auriance](https://github.com/misbaou672/Auriance)
- **HAM_projet_jeu** : [github.com/misbaou672/HAM_projet_jeu](https://github.com/misbaou672/HAM_projet_jeu) — *Programmation d'un jeu vidéo.*
- **Diplomaat** : [github.com/misbaou672/Diplomaat](https://github.com/misbaou672/Diplomaat)
- **dashboard_alternance** : [github.com/misbaou672/dashboard_alternance](https://github.com/misbaou672/dashboard_alternance)
- **jeu** : [github.com/misbaou672/jeu](https://github.com/misbaou672/jeu)

## 🔗 Liens Sociaux

- **LinkedIn** : [misbaou-diallo14082005](https://www.linkedin.com/in/misbaou-diallo14082005/)
- **GitHub** : [misbaou672](https://github.com/misbaou672)
- **Root-Me** : [wvbsim](https://www.root-me.org/wvbsim)
- **TryHackMe** : [misbaou.diallo](https://tryhackme.com/p/misbaou.diallo)

---

_Développé avec ☕ et beaucoup de ❤️ par Misbaou DIALLO._
