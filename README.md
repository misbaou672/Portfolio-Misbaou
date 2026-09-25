# Portfolio — Misbaou DIALLO

**[portfolio-misbaou.vercel.app](https://portfolio-misbaou.vercel.app)**

Portfolio personnel de **Misbaou Diallo**, développeur back-end et automatisation, en route vers le DevOps et le DevSecOps. Étudiant en BUT Informatique (parcours Développement logiciel) à l'UPEC, en recherche d'une alternance d'un an à partir de septembre 2026.

Cinq écrans : **Hub**, **Projets**, **Parcours**, **À propos**, **Contact**. Thème clair par défaut, thème sombre au choix, fond en courbes de niveau généré.

## Stack

| Domaine     | Choix                                                  |
| ----------- | ------------------------------------------------------ |
| **Build**   | Vite + React 19 + TypeScript (SPA, une seule route)    |
| **Anim**    | GSAP (`@gsap/react`, ScrollTrigger)                    |
| **Style**   | CSS Modules + jetons CSS (`src/styles/tokens.css`)     |
| **Polices** | Outfit, Inter, JetBrains Mono, Space Grotesk           |
| **SEO**     | `sitemap.xml`, `robots.txt`, JSON-LD, carte de partage |

## Structure

```
public/
  relief.svg      Fond en courbes de niveau, tuile de 800 px sans couture
  og.jpg          Carte de partage (source : tools/og/index.html)
src/
  app/            Providers, Layout, navigation flottante, fond ambiant
  components/
    ui/           Curseur, en-tête, index des sections
    hub/          Accueil : identité, stack, accès rapides
    projects/     Pellicule GSAP et fiche projet détaillée
    experience/   Parcours : stage et formation, effet de déchiffrement
    about/        Savoir-faire, savoir-être, langues, centres d'intérêt
    contact/      Email à objet prérempli, réseaux
  lib/            GSAP, thème, constantes du diaporama
  styles/         tokens.css, global.css, fonts.css
vite/seo.ts       Génère sitemap.xml et robots.txt au build
tools/og/         Gabarit de la carte de partage
```

## Démarrage

Node.js **22 ou plus** (voir `engines` dans `package.json`).

```bash
npm install
npm run dev        # serveur de développement
npm run build      # typecheck + build de production
npm run preview    # sert le build localement
```

## Scripts

| Script                 | Action                                   |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Serveur de développement Vite            |
| `npm run build`        | `tsc -b` puis build Vite                 |
| `npm run preview`      | Sert le build de production              |
| `npm run typecheck`    | Vérification des types seule             |
| `npm run lint`         | ESLint, zéro avertissement toléré        |
| `npm run format`       | Prettier en écriture                     |
| `npm run format:check` | Prettier en vérification (utilisé en CI) |

## Déploiement

Déployé sur Vercel à chaque poussée sur `main`.

Une seule variable à renseigner : **`VITE_SITE_URL`**, l'adresse publique du site. Elle alimente l'URL canonique, l'`og:url`, l'image de partage, le `sitemap.xml`, le `robots.txt` et le JSON-LD. Sans elle, le build retombe sur l'adresse Vercel de production et le signale en console.

## Mes autres projets

- **Devis Pro** — [dépôt](https://github.com/misbaou672/Devis-Pro) · création et édition de devis métier, génération PDF
- **CodeRouge** — [dépôt](https://github.com/misbaou672/CodeRouge) · suivi d'objectifs sportifs, habitudes et assistants IA
- **Vélib Optim** — [dépôt](https://github.com/misbaou672/Velib-Optim) · optimisation algorithmique du réseau Vélib
- **GestiStock** — [dépôt](https://github.com/misbaou672/GestiStock) · gestion d'inventaire et de stock
- **Eaurore** — [dépôt](https://github.com/misbaou672/SAE3_Real01) · plateforme océanographique, PHP 8.4 en MVC

## Me joindre

- **Email** — [misbaou.diallo@etu.u-pec.fr](mailto:misbaou.diallo@etu.u-pec.fr)
- **LinkedIn** — [misbaou-diallo14082005](https://www.linkedin.com/in/misbaou-diallo14082005/)
- **GitHub** — [misbaou672](https://github.com/misbaou672)
- **Root-Me** — [wvbsim](https://www.root-me.org/wvbsim)
- **TryHackMe** — [misbaou.diallo](https://tryhackme.com/p/misbaou.diallo)
