export type Ton = 1 | 2 | 3;
export type Outil = { nom: string; ton: Ton };
export type Famille = { titre: string; outils: Outil[] };

export const STACK: Famille[] = [
  {
    titre: 'Langages & Frameworks',
    outils: [
      { nom: 'Python', ton: 1 },
      { nom: 'Java', ton: 1 },
      { nom: 'PHP 8', ton: 1 },
      { nom: 'JavaScript', ton: 2 },
      { nom: 'React', ton: 2 },
      { nom: 'Node.js', ton: 2 },
      { nom: 'C', ton: 1 },
    ],
  },
  {
    titre: 'Bases de données & Automation',
    outils: [
      { nom: 'MySQL', ton: 1 },
      { nom: 'SQLite', ton: 1 },
      { nom: 'PostgreSQL', ton: 1 },
      { nom: 'n8n', ton: 2 },
      { nom: 'Power BI', ton: 2 },
    ],
  },
  {
    titre: 'Infra & Systèmes',
    outils: [
      { nom: 'Linux', ton: 3 },
      { nom: 'Git', ton: 3 },
      { nom: 'Docker', ton: 3 },
      { nom: 'Cisco Packet Tracer', ton: 3 },
    ],
  },
];
