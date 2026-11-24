export type ProjectSlug =
  | "immodirect"
  | "cleanmanager-erp"
  | "expertticketing"
  | "expertresource-erp";

export type ProjectFilterGroup = "Plateforme Web" | "ERP" | "Ticketing";

export interface ProjectScreen {
  src: string;
  label: string;
}

export interface ProjectItem {
  slug: ProjectSlug;
  number: string;
  title: string;
  brand: string;
  category: string;
  filterGroup: ProjectFilterGroup;
  tagline: string;
  year: string;
  role: string;
  problem: string;
  solution: string;
  impact: string;
  highlights: string[];
  tech: string[];
  demoUrlLabel: string;
  accentHex: string;
  screens: ProjectScreen[];
  mobileImage: string;
}

export const projects: ProjectItem[] = [
  {
    slug: "immodirect",
    number: "01",
    title: "ImmoDirect",
    brand: "NAS IMMO",
    category: "Plateforme Immobilière",
    filterGroup: "Plateforme Web",
    tagline:
      "Recherche immobilière multicritère, gestion de favoris et prise de visite directe.",
    year: "2026",
    role: "UI Design & Développement Full-Stack",
    problem:
      "Les acquéreurs perdaient du temps sur des catalogues lents pour comparer villas, appartements et terrains par commune et budget.",
    solution:
      "Plateforme web rapide avec moteur de filtres croisés (type, prix, surface, localisation), favoris synchronisés et fiches biens claires.",
    impact:
      "Parcours fluide sur ordinateur comme sur mobile, pensé pour transformer les visites en demandes qualifiées.",
    highlights: [
      "Catalogue dynamique avec filtres croisés prix, surface et commune",
      "Système de favoris instantané et fiches biens détaillées",
      "Interface responsive optimisée pour la recherche mobile",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    demoUrlLabel: "app.nas-immo.re/catalogue",
    accentHex: "#2563EB",
    screens: [
      {
        src: "/projet-1-4.png",
        label: "Catalogue & Filtres croisés",
      },
      {
        src: "/projet-1-1.png",
        label: "Vitrine NAS IMMO",
      },
      {
        src: "/projet-1-2.png",
        label: "Biens mis en avant",
      },
    ],
    mobileImage: "/projet-1-2.png",
  },
  {
    slug: "cleanmanager-erp",
    number: "02",
    title: "CleanManager ERP",
    brand: "ERP Nettoyage",
    category: "ERP Opérationnel",
    filterGroup: "ERP",
    tagline:
      "Pilotage centralisé des équipes, interventions, contrats et facturation.",
    year: "2026",
    role: "Architecture Backend & Interface Métier",
    problem:
      "Suivi éclaté entre tableurs et appels pour planifier les agents terrain, contrôler les pointages et relancer les factures impayées.",
    solution:
      "ERP centralisé combinant tableau de bord financier, planning d'interventions, suivi des équipes/sites et alertes facturation.",
    impact:
      "Visibilité temps réel sur le chiffre d'affaires et les opérations quotidiennes pour réduire les oublis et accélérer les encaissements.",
    highlights: [
      "Dashboard analytique : suivi du CA et volume d'interventions",
      "Gestion unifiée clients, contrats, équipes, sites et factures",
      "Alertes instantanées sur les retards et factures impayées",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    demoUrlLabel: "erp.cleanmanager.app/dashboard",
    accentHex: "#0284C7",
    screens: [
      {
        src: "/projet-2-2.png",
        label: "Tableau de bord KPI & CA",
      },
      {
        src: "/projet-2-1.png",
        label: "Authentification ERP",
      },
    ],
    mobileImage: "/projet-2-2.png",
  },
  {
    slug: "expertticketing",
    number: "03",
    title: "ExpertTicketing",
    brand: "Afym Audit Expertise",
    category: "Ticketing Métier",
    filterGroup: "Ticketing",
    tagline:
      "Gestion des tickets juridiques et sociaux pour cabinet d'expertise comptable.",
    year: "2026",
    role: "Développement Full-Stack Next.js & GraphQL",
    problem:
      "Les demandes clients s'accumulaient par email sans visibilité fiable sur les priorités ni les échéances dépassées.",
    solution:
      "Portail collaborateur organisé par pôles (Juridique / Social) avec création de tickets, filtres instantanés et alertes de retard.",
    impact:
      "Priorisation immédiate des dossiers urgents et suivi clair de la charge de chaque collaborateur.",
    highlights: [
      "Alertes automatiques sur les tickets urgents ou en retard",
      "Filtrage instantané par statut, priorité et pôle métier",
      "Création rapide et suivi de cycle de vie complet des demandes",
    ],
    tech: ["Next.js", "GraphQL", "Node.js", "MongoDB"],
    demoUrlLabel: "tickets.afym-expertise.fr/dashboard",
    accentHex: "#0F766E",
    screens: [
      {
        src: "/projet-3-1.png",
        label: "Dashboard & Alertes retard",
      },
      {
        src: "/projet-3-2.png",
        label: "Tickets Juridiques & Filtres",
      },
    ],
    mobileImage: "/projet-3-2.png",
  },
  {
    slug: "expertresource-erp",
    number: "04",
    title: "ExpertResource ERP",
    brand: "Afym PWA",
    category: "ERP Comptable PWA",
    filterGroup: "ERP",
    tagline:
      "Suite comptable, rapprochement bancaire, paie et authentification 2FA en PWA.",
    year: "2026",
    role: "Architecture Full-Stack & Sécurité PWA",
    problem:
      "Besoin d'un outil unifié et sécurisé pour centraliser timesheets, facturation, exercices comptables et rapprochement bancaire.",
    solution:
      "Application PWA avec vérification 2FA (code TOTP 6 chiffres), suivi des exercices comptables et rapprochement en un clic.",
    impact:
      "Saisie comptable fiabilisée, contrôle strict des accès sensibles et utilisation fluide sur desktop comme en mobilité.",
    highlights: [
      "Dashboard comptable : écritures, rapprochements et alertes",
      "Gestion multi-exercices, journaux (VT, AC, BQ) et paie",
      "Authentification renforcée à deux facteurs (2FA)",
    ],
    tech: ["React", "PWA", "Node.js", "Express", "MongoDB"],
    demoUrlLabel: "erp.afym-expertise.mg/comptabilite",
    accentHex: "#0E5A6D",
    screens: [
      {
        src: "/projet-4-3.png",
        label: "Tableau de bord Comptable",
      },
      {
        src: "/projet-4-2.png",
        label: "Sécurité & 2FA (TOTP)",
      },
      {
        src: "/projet-4-1.png",
        label: "Connexion PWA Afym",
      },
    ],
    mobileImage: "/projet-4-2.png",
  },
];

export function getProjectBySlug(slug?: string | null): ProjectItem {
  return projects.find((p) => p.slug === slug) ?? projects[0];
}
