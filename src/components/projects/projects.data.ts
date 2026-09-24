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
  useCase?: string;
  challenges?: { challenge: string; solution: string }[];
  learnings?: string[];
  features: { title: string; detail: string }[];
  featuresDone?: string[];
  roadmap?: { label: string; status: 'in_progress' | 'planned' }[];
  links: { label: string; href: string }[];
  medias?: {
    src: string;
    alt: string;
    kind?: 'capture' | 'logo';
  }[];
  mediaNote?: string;
  bgThemeImage?: string;
  palette: {
    from: string;
    to: string;
    ink: string;
    glow?: string;
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
      "Projet personnel conçu pour répondre à mes besoins d'organisation. Il centralise le suivi d'objectifs sportifs, la gestion d'habitudes et une To-Do List avec des statistiques simples, un chronomètre et un assistant vocal.",
    useCase:
      "Conçu pour offrir une alternative épurée et sans publicité aux applications de suivi sportif existantes. Il réunit au même endroit l'entraînement physique, la gestion d'habitudes et l'assistant vocal IA.",
    challenges: [
      {
        challenge:
          'Maintenir des performances instantanées lors des changements de rounds en arrière-plan.',
        solution:
          "Utilisation d'API Web Audio synchronisées avec des Web Workers pour éviter toute désynchronisation du chrono.",
      },
      {
        challenge: 'Intégrer un coach IA réactif sans ralentir le rendu du composant React.',
        solution:
          'Mise en place de Server Actions Next.js streaming les réponses textuelles et audio à la volée.',
      },
    ],
    learnings: [
      'Maîtrise de Next.js 16 (App Router) et React 19',
      "Gestion d'états complexes et Web Audio API",
      "Intégration d'APIs IA en streaming de données",
    ],
    features: [
      {
        title: 'Coach IA Intégré',
        detail: 'Accompagnement vocal personnalisé et suivi dynamique du profil.',
      },
      {
        title: 'Architecture Moderne',
        detail: 'Développé avec la dernière stack React 19 et Next.js 16 (App Router).',
      },
      {
        title: 'Chrono Interactif',
        detail: 'Gestionnaire de rondes de boxe configurables avec signaux sonores.',
      },
    ],
    featuresDone: [
      "Système complet de suivi d'objectifs sportifs et cycles d'entraînement hebdomadaires",
      'Timer interactif avec rondes personnalisables et signaux vocaux pour la boxe',
      'Coach IA vocal (Deonte Walter) avec synthèse vocale et réponses adaptatives',
      "Calculateur de dépenses caloriques et graphiques interactifs d'évolution du poids",
      "Journal d'entraînement quotidien avec catégorisation des séances",
      'Mode PWA (Progressive Web App) avec stockage local des préférences',
    ],
    roadmap: [
      {
        label: 'Synchronisation multi-appareils en temps réel via Supabase & PostgreSQL',
        status: 'in_progress',
      },
      {
        label: "Système de notifications Push PWA pour les rappels d'entraînement",
        status: 'in_progress',
      },
      {
        label: "Intégration d'objets connectés (capteurs de fréquence cardiaque Bluetooth)",
        status: 'planned',
      },
      { label: 'Génération de bilans mensuels de performance au format PDF', status: 'planned' },
    ],
    links: [
      { label: 'Site Live', href: 'https://coderouge2mika.vercel.app' },
      { label: 'Repo GitHub', href: 'https://github.com/misbaou672/CodeRouge' },
    ],
    palette: {
      from: 'rgba(225, 29, 72, 0.25)',
      to: 'rgba(159, 18, 57, 0.4)',
      ink: '#f43f5e',
      glow: 'rgba(244, 63, 94, 0.45)',
    },
    bgThemeImage:
      'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1600&auto=format&fit=crop',
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
    useCase:
      'Permet de modéliser le réseau de transport doux parisien pour identifier les zones sous-équipées et optimiser les trajets de régulation de la flotte de vélos.',
    challenges: [
      {
        challenge:
          'Traiter et restituer visuellement plus de 1500 stations sans faire ramer la carte.',
        solution:
          "Application d'une simplification géométrique par triangulation de Delaunay réduisant la complexité de calcul d'interconnexion de O(N²) à O(N log N).",
      },
      {
        challenge:
          "Déterminer le réseau d'interconnexion le plus économique entre toutes les stations.",
        solution:
          "Implémentation de l'algorithme de Kruskal couplé à une structure Union-Find optimisée.",
      },
    ],
    learnings: [
      'Algorithmique spatiale avancée (Delaunay, Kruskal, Dijkstra)',
      'Optimisation de structures de données en Python',
      'Visualisation cartographique interactive (Folium / Leaflet)',
    ],
    features: [
      {
        title: 'Algorithmique Avancée',
        detail: "Implémentation de Kruskal et Delaunay pour l'optimisation spatiale.",
      },
      {
        title: 'Data Science',
        detail: 'Traitement et synchronisation en temps réel de 1500+ stations Métropole.',
      },
      {
        title: "Calcul d'Itinéraires",
        detail: 'Algorithme de Dijkstra réadapté pour la disponibilité des vélos.',
      },
    ],
    featuresDone: [
      "Triangulation de Delaunay et calcul de l'Arbre Couvrant Minimal (MST) du réseau",
      'Carte interactive Folium avec plus de 1500 stations actualisées en direct',
      "Module de calcul d'itinéraire optimal basé sur l'algorithme de Dijkstra",
      'Cartographie thermique (Heatmap) de la disponibilité des vélos électriques',
      'Filtrage géographique par arrondissements et communes de la petite couronne',
      "Tableau d'analyse comparative de la densité des stations par zone",
    ],
    roadmap: [
      {
        label: 'Modèle prédictif du taux de remplissage par Machine Learning (Scikit-Learn)',
        status: 'in_progress',
      },
      {
        label: "API REST FastAPI pour exposer les matrices d'optimisation du réseau",
        status: 'in_progress',
      },
      {
        label: "Exportation des graphes d'optimisation au format GeoJSON & SVG",
        status: 'planned',
      },
      {
        label: "Simulation dynamique de la régulation de flotte par camion d'avitaillement",
        status: 'planned',
      },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/Velib-Optim' }],
    palette: {
      from: 'rgba(3, 105, 161, 0.25)',
      to: 'rgba(12, 74, 110, 0.4)',
      ink: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.45)',
    },
    bgThemeImage:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1600&auto=format&fit=crop',
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
    useCase:
      "Offre aux chercheurs et étudiants un outil centralisé pour observer le réchauffement des océans, suivre l'évolution des températures de surface et extraire des jeux de données fiables.",
    challenges: [
      {
        challenge: "Gérer le volume massif de relevés satellites issus de l'API Copernicus Marine.",
        solution:
          'Mise en cache SQL des requêtes fréquentes et pré-agrégation des moyennes mensuelles.',
      },
      {
        challenge: 'Garantir un code maintenable pour une équipe de plusieurs développeurs.',
        solution:
          "Respect strict du design pattern MVC en PHP 8.4 typé avec gestion d'exceptions centralisée.",
      },
    ],
    learnings: [
      'Architecture logicielle MVC orientée objet en PHP 8.4',
      'Consommation et traitement de données scientifiques (API Copernicus)',
      'Visualisation cartographique et représentations statistiques',
    ],
    features: [
      {
        title: 'Data Océanographique',
        detail: 'Flux API Copernicus Marine synchronisé en temps réel.',
      },
      {
        title: 'Architecture Solide',
        detail: 'Modèle orienté objet strict (MVC) développé sous PHP 8.4.',
      },
      {
        title: 'Cartographie Leaflet',
        detail: 'Superposition interactive des couches thermiques et données satellite.',
      },
    ],
    featuresDone: [
      "Synchronisation automatique avec l'API Copernicus Marine",
      'Cartographie dynamique des océans avec superposition de couches thermiques',
      "Graphiques interactifs Chart.js d'évolution temporelle et historique des températures",
      'Espace administrateur complet pour la modération et gestion des accès',
      'Agrégation statistique spatiale par coordonnées bathymétriques',
      'Moteur de recherche multicritère par zone géographique et date',
    ],
    roadmap: [
      {
        label: "Alertes automatiques par e-mail en cas d'anomalie thermique extrême",
        status: 'in_progress',
      },
      { label: "Exportation des rapports d'analyse sous format PDF et CSV", status: 'in_progress' },
      {
        label: 'Module de prédiction des courants marins par modèles stochastiques',
        status: 'planned',
      },
      {
        label: "Widgets cartographiques intégrables pour sites d'écologie marine",
        status: 'planned',
      },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/SAE3_Real01' }],
    palette: {
      from: 'rgba(5, 150, 105, 0.25)',
      to: 'rgba(6, 78, 59, 0.4)',
      ink: '#34d399',
      glow: 'rgba(52, 211, 153, 0.45)',
    },
    bgThemeImage:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1600&auto=format&fit=crop',
    medias: [
      { src: echoceanMedia, alt: 'Dashboard principal & Synthèse oceanographique' },
      { src: echoceanMapMedia, alt: 'Cartographie interactive des flux marins' },
      { src: echoceanGraphsMedia, alt: "Analyse statistique et courbes d'évolution" },
      { src: echoceanDatabaseMedia, alt: 'Exploration de la base de données' },
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
    useCase:
      "Destiné aux PME et commerçants souhaitant piloter leurs produits, surveiller le niveau des stocks critiques et exporter leurs bilans d'inventaire en un clic.",
    challenges: [
      {
        challenge:
          'Créer une interface de bureau moderne et fluide avec le framework Tkinter natif.',
        solution:
          "Développement d'un thème TTK personnalisé avec gestion des événements système et mise en page réactive.",
      },
      {
        challenge: "Prévenir la perte de données lors des coupures brutales de l'application.",
        solution:
          'Système de sauvegarde atomique avec écriture temporaire et validation par hachage avant écriture JSON/DB.',
      },
    ],
    learnings: [
      "Développement d'applications Desktop orientées objet en Python",
      'Manipulation de fichiers Excel complexes via OpenPyXL',
      "Conception d'ergonomie et interfaces graphiques (GUI)",
    ],
    features: [
      {
        title: 'Gestion Proactive',
        detail: "Système d'alertes en temps réel sur les niveaux de stocks faibles.",
      },
      {
        title: 'Interopérabilité',
        detail: 'Génération et export multi-formats de rapports (Excel, CSV).',
      },
      {
        title: 'Interface Ergonomique',
        detail: 'Thème sombre personnalisé avec composants TTK réactifs.',
      },
    ],
    featuresDone: [
      'Gestion dynamique du catalogue produit et seuils de réapprovisionnement',
      "Module d'alerte visuel et notifications de stock critique en temps réel",
      'Exportateur universel vers fichiers Excel (.xlsx) et CSV avec formattage auto',
      "Annuaire interactif des fournisseurs et historique d'achats",
      "Journal d'audit complet traçant chaque mouvement de stock avec horodatage",
      'Système de recherche instantanée par SKU, catégorie ou fournisseur',
    ],
    roadmap: [
      {
        label: 'Lecteur de code-barres & QR Code via caméra ou scanner USB',
        status: 'in_progress',
      },
      {
        label: 'Migration vers une base de données distante PostgreSQL pour accès réseau',
        status: 'in_progress',
      },
      {
        label: "Impression directe d'étiquettes de stock au format étiqueteuse thermique",
        status: 'planned',
      },
      { label: "Module multi-entrepôts avec suivi des transferts d'inventaire", status: 'planned' },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/GestiStock' }],
    palette: {
      from: 'rgba(124, 58, 237, 0.25)',
      to: 'rgba(76, 29, 149, 0.4)',
      ink: '#c084fc',
      glow: 'rgba(192, 132, 252, 0.45)',
    },
    bgThemeImage:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
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
    useCase:
      'Offre aux indépendants et prestataires de services une solution rapide pour créer des devis sans erreur de calcul, avec gestion de prestations récurrentes (SLA) et édition de PDF officiels.',
    challenges: [
      {
        challenge:
          'Gérer dynamiquement les ajouts et lignes de prestations avec calcul automatique de la TVA sans rechargement de page.',
        solution:
          "Développement d'un moteur de calcul côté client en JavaScript ES6 modulable avec validation PHP stricte côté serveur.",
      },
      {
        challenge: 'Garantir un rendu PDF pixel-perfect identique sur toutes les plateformes.',
        solution:
          "Conception d'un moteur de templates HTML2PDF personnalisé contrôlant la mise en page et les sauts de page.",
      },
    ],
    learnings: [
      'Calculs financiers et règles juridiques de facturation',
      'Génération avancée de documents PDF dynamiques',
      'Développement dynamique ES6 sans dépendances de framework heavy',
    ],
    features: [
      {
        title: 'Business Logic',
        detail: 'Calculs dynamiques intégrant le suivi des abonnements récurrents (SLA).',
      },
      {
        title: 'Génération PDF',
        detail: 'Création de documents officiels formatés et générés à la volée.',
      },
      {
        title: 'Conformité Légale',
        detail: 'Numérotation séquentielle et mentions légales obligatoires.',
      },
    ],
    featuresDone: [
      'Génération à la volée de PDF officiels conformes aux normes légales',
      'Moteur de calcul instantané des taxes (TVA), remises et totaux TTC',
      'Gestion des abonnements récurrents et prestations de maintenance SLA',
      'Numérotation séquentielle automatique des devis et factures',
      "Catalogue d'articles pré-enregistrés avec injection rapide dans le devis",
      'Historique des devis émis avec filtres de recherche par client',
    ],
    roadmap: [
      {
        label: 'Signature électronique sécurisée intégrée directement dans le PDF',
        status: 'in_progress',
      },
      {
        label: 'Relances automatiques des devis non signés après expiration',
        status: 'in_progress',
      },
      {
        label: 'Intégration du paiement en ligne Stripe via lien sécurisé sur le devis',
        status: 'planned',
      },
      {
        label: 'Export comptable au format FEC (Fichier des Écritures Comptables)',
        status: 'planned',
      },
    ],
    links: [{ label: 'Repo GitHub', href: 'https://github.com/misbaou672/Devis-Pro' }],
    palette: {
      from: 'rgba(16, 185, 129, 0.25)',
      to: 'rgba(6, 95, 70, 0.4)',
      ink: '#4ade80',
      glow: 'rgba(74, 222, 128, 0.45)',
    },
    bgThemeImage:
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1600&auto=format&fit=crop',
    medias: [
      { src: devisMedia, alt: 'Interface de création de devis (Formulaire & Calculs)' },
      { src: devis2Media, alt: 'Synthèse du devis & Modalités de règlement' },
      { src: devisPdfMedia, alt: 'Document PDF officiel généré' },
    ],
  },
];
