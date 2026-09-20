import cr1Media from './media/cr-1.png';
import cr2Media from './media/cr-2.png';
import cr3Media from './media/cr-3.png';
import cr4Media from './media/cr-4.png';
import cr5Media from './media/cr-5.png';
import cr6Media from './media/cr-6.png';
import cr7Media from './media/cr-7.png';
import cr8Media from './media/cr-8.png';
import cr9Media from './media/cr-9.png';
import cr10Media from './media/cr-10.png';
import velib1Media from './media/velib-1.jpg';
import velib2Media from './media/velib-2.jpg';
import velib3Media from './media/velib-3.jpg';
import velib4Media from './media/velib-4.jpg';
import echoceanMedia from './media/echocean.jpg';
import echoceanMapMedia from './media/echocean-map.jpg';
import echoceanGraphsMedia from './media/echocean-graphs.jpg';
import echoceanDatabaseMedia from './media/echocean-database.jpg';
import echoceanAdminMedia from './media/echocean-admin.jpg';
import echoceanAboutMedia from './media/echocean-about.jpg';
import gs1Media from './media/gestistock-1.jpg';
import gs2Media from './media/gestistock-2.jpg';
import gs3Media from './media/gestistock-3.jpg';
import gs4Media from './media/gestistock-4.jpg';
import devisMedia from './media/devis.png';
import devis2Media from './media/devis-2.png';
import devisPdfMedia from './media/devis-pdf.png';

export type Project = {
  id: string;
  index: string;
  name: string;
  year: string;
  kind: string;
  role: string;
  stack: string[];
  pitch: string;
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
  medias?: {
    src: string;
    alt: string;
    kind?: 'capture' | 'logo';
  }[];
  mediaNote?: string;
  palette: {
    from: string;
    to: string;
    ink: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: 'coderouge',
    index: '01',
    name: 'CodeRouge',
    year: '2026',
    kind: 'Application Web Full-Stack',
    role: 'Architecture & Développement Full-Stack',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Turbopack', 'TailwindCSS'],
    pitch:
      "Application web haute performance conçue pour le suivi d'entraînement et la préparation physique en boxe. Intègre un journal de séances interactif, un cockpit d'analyse du poids et de la récupération, un timer de rounds personnalisable et des coachs IA interactifs.",
    metrics: [
      { value: '42+', label: 'Séances suivies' },
      { value: 'Coach IA', label: 'Accompagnement vocal' },
    ],
    links: [
      { label: 'Site Live', href: 'https://coderouge2mika.vercel.app' },
      { label: 'Repo GitHub', href: 'https://github.com/misbaou672/CodeRouge' },
    ],
    palette: { from: '#fef2f2', to: '#fee2e2', ink: '#991b1b' },
    medias: [
      { src: cr1Media, alt: 'Tableau de bord : Accueil & Objectif du jour' },
      { src: cr2Media, alt: "Planning d'entraînement & Cycles hebdomadaires" },
      { src: cr3Media, alt: 'Timer interactif de rounds' },
      { src: cr4Media, alt: 'Journal de suivi des séances' },
      { src: cr5Media, alt: 'Guide technique & Glossaire du boxeur' },
      { src: cr6Media, alt: 'Coach IA : Deonte Walter' },
      { src: cr7Media, alt: 'Carrière & Palmarès' },
      { src: cr8Media, alt: 'Réglages du profil & Notifications' },
      { src: cr9Media, alt: 'Suivi de progression' },
      { src: cr10Media, alt: 'Statistiques & Graphiques de poids' },
    ],
  },
  {
    id: 'velib-optim',
    index: '02',
    name: 'Vélib Optim',
    year: '2025',
    kind: 'Algorithmique & Data Science',
    role: 'Conception & Algorithmes Python',
    stack: [
      'Python 3',
      'Théorie des Graphes',
      'Delaunay',
      'Kruskal & Prim',
      'Folium',
      'API OpenData',
    ],
    pitch:
      "Outil d'analyse et d'optimisation spatiale du réseau Vélib en Île-de-France (1500+ stations). Implémentation d'algorithmes de triangulation de Delaunay et d'arbres couvrants minimaux (MST) pour optimiser le maillage du réseau et minimiser les distances d'interconnexion.",
    metrics: [
      { value: '1 518', label: 'Stations synchronisées' },
      { value: '10.3 ms', label: 'Exécution Kruskal' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/Velib-Optim' }],
    palette: { from: '#eff6ff', to: '#dbeafe', ink: '#1e40af' },
    medias: [
      {
        src: velib1Media,
        alt: 'Carte interactive et réseau de stations (Triangulation de Delaunay)',
      },
      { src: velib2Media, alt: "Calcul d'itinéraire optimal (Algorithme de Dijkstra)" },
      { src: velib3Media, alt: 'Cockpit Analytics et état des stations en temps réel' },
      { src: velib4Media, alt: 'Carte de chaleur des disponibilités de vélos électriques' },
    ],
  },
  {
    id: 'sae3-real01',
    index: '03',
    name: 'Eaurore',
    year: '2025',
    kind: 'Plateforme Web Océanographique',
    role: 'Développement Full-Stack (MVC)',
    stack: ['PHP 8.4', 'Architecture MVC', 'API Copernicus', 'Leaflet.js', 'Chart.js', 'MySQL'],
    pitch:
      "Plateforme scientifique complète dédiée à l'analyse et à la visualisation de données océanographiques globales. Synchronisation directe avec l'API Copernicus Marine (température, salinité, hauteur de mer), cartographie interactive et graphiques d'agrégation temporelle.",
    metrics: [
      { value: 'Copernicus', label: 'Flux API temps réel' },
      { value: 'MVC Stricte', label: 'Modèle orienté objet' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/SAE3_Real01' }],
    palette: { from: '#f8fafc', to: '#e2e8f0', ink: '#0f172a' },
    medias: [
      { src: echoceanMedia, alt: 'Dashboard principal & Synthèse oceanographique' },
      { src: echoceanMapMedia, alt: 'Cartographie interactive des flux marins' },
      { src: echoceanGraphsMedia, alt: "Analyse statistique et courbes d'évolution" },
      { src: echoceanDatabaseMedia, alt: 'Exploration de la base de données' },
      { src: echoceanAdminMedia, alt: "Console d'administration" },
      { src: echoceanAboutMedia, alt: 'Présentation & Méthodologie du projet' },
    ],
  },
  {
    id: 'gestistock',
    index: '04',
    name: 'GestiStock',
    year: '2025',
    kind: 'Logiciel de Bureau (GUI)',
    role: 'Développement Python & UI Tkinter',
    stack: ['Python 3', 'Tkinter / TTK', 'Stockage JSON', 'OpenPyXL', 'Export CSV & Excel'],
    pitch:
      "Application desktop professionnelle de gestion d'inventaire et de stock. Comprend un système d'alertes configurables sur les ruptures de stock, un annuaire interactif de gestion des fournisseurs et des fonctions d'importation/exportation multi-formats (CSV, XLSX).",
    metrics: [
      { value: 'Stock Faible', label: 'Alertes en temps réel' },
      { value: 'Excel / CSV', label: 'Export multi-formats' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/GestiStock' }],
    palette: { from: '#f5f3ff', to: '#ede9fe', ink: '#5b21b6' },
    medias: [
      { src: gs1Media, alt: 'Tableau de bord : Gestion du catalogue produits' },
      { src: gs2Media, alt: 'Tableau de bord : Historique des ventes' },
      { src: gs3Media, alt: 'Tableau de bord : Annuaire des fournisseurs' },
      { src: gs4Media, alt: 'Tableau de bord : Rapports et bilans de stock' },
    ],
  },
  {
    id: 'createur-devis',
    index: '05',
    name: 'Devis Pro',
    year: '2026',
    kind: 'Solution Web Métier',
    role: 'Développement Full-Stack',
    stack: ['PHP 8 OOP', 'JavaScript ES6+', 'HTML5 / CSS3', 'Génération PDF', 'MySQL'],
    pitch:
      "Application web métier de création et d'édition de devis professionnels. Prise en charge des prestations ponctuelles et des abonnements récurrents à long terme (maintenance SLA), calculs dynamiques instantanés en JavaScript et moteur de rendu PDF personnalisé.",
    metrics: [
      { value: 'Abonnements', label: 'Suivi récurrent & SLA' },
      { value: 'PDF Pro', label: 'Génération à la volée' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/Devis-Pro' }],
    palette: { from: '#f0fdf4', to: '#dcfce7', ink: '#166534' },
    medias: [
      { src: devisMedia, alt: 'Interface de création de devis (Formulaire & Calculs)' },
      { src: devis2Media, alt: 'Synthèse du devis & Modalités de règlement' },
      { src: devisPdfMedia, alt: 'Document PDF officiel généré' },
    ],
  },
];
