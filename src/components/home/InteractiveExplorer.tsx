"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Browser,
  Database,
  DeviceMobile,
  Cpu,
  ArrowUpRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";
import { cn } from "@/src/lib/utils";

const tracks = [
  {
    id: "web",
    label: "Web & SaaS",
    icon: Browser,
    summary:
      "Interfaces rapides, accessibles et pensées pour la conversion avec Next.js, React et TypeScript.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    deliverables: [
      "Design system cohérent Desktop & Mobile",
      "SEO technique & performances Core Web Vitals",
      "Micro-interactions fluides sans surcharge",
    ],
    projectLink: "/projets?projet=immodirect",
    projectLabel: "Voir ImmoDirect",
  },
  {
    id: "erp",
    label: "ERP & Outils Métier",
    icon: Cpu,
    summary:
      "Logiciels sur mesure qui remplacent les tableurs dispersés : tableaux de bord, facturation, ticketing et droits d'accès.",
    stack: ["React", "Node.js", "Express", "GraphQL", "MongoDB"],
    deliverables: [
      "Tableaux de bord KPI temps réel",
      "Workflows métier (tickets, interventions, comptabilité)",
      "Sécurité renforcée (authentification, 2FA, validation)",
    ],
    projectLink: "/projets?projet=expertresource-erp",
    projectLabel: "Tester ExpertResource ERP",
  },
  {
    id: "mobile",
    label: "Mobile & PWA",
    icon: DeviceMobile,
    summary:
      "Expériences installables et fluides en mobilité : Progressive Web Apps et applications React Native.",
    stack: ["React Native", "PWA", "Responsive UI", "Offline-first"],
    deliverables: [
      "Applications terrain ergonomiques (gestion de caisse, suivi)",
      "Adaptation native des parcours sur petit écran",
      "Déploiement rapide et maintenance unifiée",
    ],
    projectLink: "/projets?projet=cleanmanager-erp",
    projectLabel: "Tester CleanManager Mobile",
  },
  {
    id: "backend",
    label: "APIs, Données & Python",
    icon: Database,
    summary:
      "Fondations serveur propres, modélisation SQL / MongoDB et scripts Python pour les besoins métiers et data.",
    stack: ["Node.js", "Express.js", "GraphQL", "Python", "MongoDB", "SQL"],
    deliverables: [
      "Validation stricte aux limites de confiance",
      "Modélisation SQL & NoSQL orientée performance",
      "Notions réseau & déploiement cloud (Vercel, Docker)",
    ],
    projectLink: "/projets?projet=expertticketing",
    projectLabel: "Tester ExpertTicketing",
  },
];

export function InteractiveExplorer() {
  const [activeId, setActiveId] = useState(tracks[0].id);
  const current = tracks.find((t) => t.id === activeId) ?? tracks[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Interactive Selector */}
      <div className="lg:col-span-5 space-y-2">
        {tracks.map((track) => {
          const Icon = track.icon;
          const isActive = track.id === activeId;
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => setActiveId(track.id)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer",
                isActive
                  ? "bg-surface border-accent/40 shadow-sm ring-1 ring-accent/15"
                  : "bg-surface/60 border-line hover:bg-surface hover:border-line-strong"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    isActive
                      ? "bg-accent text-white"
                      : "bg-surface-elevated text-fg-muted"
                  )}
                >
                  <Icon size={20} weight="duotone" />
                </span>
                <div>
                  <div className="font-semibold text-sm text-fg">
                    {track.label}
                  </div>
                  <div className="text-xs font-mono text-fg-subtle">
                    {track.stack.slice(0, 3).join(" · ")}
                  </div>
                </div>
              </div>
              <span
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  isActive ? "bg-accent" : "bg-transparent"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Live Detail Card */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: STUDIO_EASE }}
            className="rounded-2xl bg-surface border border-line p-7 md:p-8 shadow-xs space-y-6"
          >
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent font-semibold">
                Environnement exploré
              </span>
              <h3 className="text-2xl font-bold text-fg">{current.label}</h3>
              <p className="text-sm md:text-base text-fg-muted leading-relaxed">
                {current.summary}
              </p>
            </div>

            <ul className="space-y-2.5 pt-4 border-t border-line text-sm text-fg">
              {current.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={17}
                    weight="fill"
                    className="text-status shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {current.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-canvas border border-line text-xs font-mono text-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-fg-subtle">
                Exemple concret testable dans le site
              </span>
              <Link
                href={current.projectLink}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
              >
                {current.projectLabel}
                <ArrowUpRight size={15} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
