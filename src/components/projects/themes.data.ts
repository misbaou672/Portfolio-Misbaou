import coderougeStyleDeVie from './media/themes/coderouge-style-de-vie.jpg';
import coderougeSacDeFrappe from './media/themes/coderouge-sac-de-frappe.jpg';
import coderougeChronometre from './media/themes/coderouge-chronometre.jpg';
import velibStation from './media/themes/velib-station.jpg';
import velibReseauNeurones from './media/themes/velib-reseau-neurones.jpg';
import velibGraphe from './media/themes/velib-graphe.jpg';
import eauroreOcean from './media/themes/eaurore-ocean.jpg';
import eauroreSatellites from './media/themes/eaurore-satellites.jpg';
import eauroreDataScience from './media/themes/eaurore-data-science.jpg';
import gestistockEntrepot from './media/themes/gestistock-entrepot.jpg';
import gestistockStocks from './media/themes/gestistock-stocks.jpg';
import gestistockPalettes from './media/themes/gestistock-palettes.jpg';
import devisSignature from './media/themes/devis-signature.jpg';
import devisCalculs from './media/themes/devis-calculs.jpg';
import devisTableaux from './media/themes/devis-tableaux.jpg';

export type ThemeImage = { src: string; label: string };

/**
 * Illustrations thematiques par projet : cartes de la colonne de droite et
 * calques flous de l'arriere-plan de la fiche projet.
 */
export const THEME_IMAGES: Record<string, ThemeImage[]> = {
  'velib-optim': [
    { src: velibStation, label: 'Station Vélib Métropole' },
    { src: velibReseauNeurones, label: 'Réseau de Neurones & IA' },
    { src: velibGraphe, label: 'Graphe Algorithmique' },
  ],
  coderouge: [
    { src: coderougeStyleDeVie, label: 'Style de vie & Entraînement' },
    { src: coderougeSacDeFrappe, label: 'Sac de Frappe' },
    { src: coderougeChronometre, label: 'Chronomètre & Équipement' },
  ],
  'sae3-real01': [
    { src: eauroreOcean, label: 'Océan & Environnement Marin' },
    { src: eauroreSatellites, label: 'Données Satellites' },
    { src: eauroreDataScience, label: 'Analyse & Data Science' },
  ],
  gestistock: [
    { src: gestistockEntrepot, label: 'Entrepôt Logistique' },
    { src: gestistockStocks, label: 'Gestion des Stocks' },
    { src: gestistockPalettes, label: 'Manutention & Palettes' },
  ],
  'createur-devis': [
    { src: devisSignature, label: 'Signature de Contrat' },
    { src: devisCalculs, label: 'Calculs & Devis' },
    { src: devisTableaux, label: 'Tableaux Financiers' },
  ],
};
