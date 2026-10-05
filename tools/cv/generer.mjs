/*
  Regenere les PDF des CV a partir de leur source HTML.

  Les deux pages referencent `/photo.jpg` et `/fonts/*.woff2` en chemins
  absolus : une impression depuis `file://` perdrait la photo et les polices.
  On sert donc `public/` en HTTP le temps de l'impression.

  Chaque CV doit tenir sur une seule page A4. Le script compte les pages du
  PDF produit et echoue au-dela, parce qu'un debordement ne se voit pas a
  l'ecran : une regle `@media screen` donne une mise en page differente de
  celle de l'impression.
*/
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const racine = resolve(import.meta.dirname, '../../public');

const CV = [
  { source: 'cv.html', sortie: 'cv.pdf' },
  { source: 'cv-stage.html', sortie: 'cv-stage.pdf' },
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

/* Le binaire varie selon la distribution ; `CHROMIUM` permet de forcer. */
async function trouverNavigateur() {
  if (process.env.CHROMIUM) return process.env.CHROMIUM;
  const candidats = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable'];
  const dossiers = (process.env.PATH ?? '').split(':').filter(Boolean);
  for (const nom of candidats) {
    for (const dossier of dossiers) {
      try {
        if ((await readdir(dossier)).includes(nom)) return join(dossier, nom);
      } catch {
        /* dossier du PATH absent ou illisible : on passe au suivant */
      }
    }
  }
  throw new Error(
    'Aucun navigateur Chromium trouve. Installe-le, ou donne le chemin via CHROMIUM=/chemin/vers/chromium.',
  );
}

function servir() {
  const serveur = createServer(async (requete, reponse) => {
    const chemin = join(racine, decodeURIComponent(new URL(requete.url, 'http://x').pathname));
    if (!chemin.startsWith(racine)) {
      reponse.writeHead(403).end();
      return;
    }
    try {
      const contenu = await readFile(chemin);
      reponse.writeHead(200, {
        'Content-Type': TYPES[extname(chemin)] ?? 'application/octet-stream',
      });
      reponse.end(contenu);
    } catch {
      reponse.writeHead(404).end();
    }
  });
  return new Promise((ok) => serveur.listen(0, '127.0.0.1', () => ok(serveur)));
}

function imprimer(navigateur, url, destination) {
  return new Promise((ok, echec) => {
    const processus = spawn(
      navigateur,
      [
        '--headless',
        '--disable-gpu',
        '--no-pdf-header-footer',
        `--print-to-pdf=${destination}`,
        url,
      ],
      { stdio: 'ignore' },
    );
    processus.on('error', echec);
    processus.on('exit', (code) =>
      code === 0 ? ok() : echec(new Error(`${navigateur} a termine avec le code ${code}`)),
    );
  });
}

/* Skia encode le texte en sous-ensembles de glyphes : le contenu n'est pas
   lisible en clair, mais les objets /Page restent comptables. */
function compterPages(fichier) {
  return (readFileSync(fichier, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

const navigateur = await trouverNavigateur();
const serveur = await servir();
const { port } = serveur.address();
let deborde = false;

try {
  for (const { source, sortie } of CV) {
    const destination = join(racine, sortie);
    await imprimer(navigateur, `http://127.0.0.1:${port}/${source}`, destination);
    const pages = compterPages(destination);
    const taille = Math.round(readFileSync(destination).length / 1024);
    if (pages === 1) {
      console.log(`  ${sortie} — 1 page, ${taille} Ko`);
    } else {
      console.error(`  ${sortie} — ${pages} pages, ${taille} Ko  <-- doit tenir sur une page`);
      deborde = true;
    }
  }
} finally {
  serveur.close();
}

if (deborde) {
  console.error('\nUn CV deborde sur plusieurs pages. Raccourcis le contenu avant de committer.');
  process.exit(1);
}
