"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight, SlidersHorizontal } from "@phosphor-icons/react";
import { buttonClasses } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

const baseTypes = [
  {
    id: "web",
    label: "Site / Plateforme Web",
    weeks: 2,
    stack: "Next.js · TypeScript · Tailwind",
  },
  {
    id: "erp",
    label: "ERP / Outil Métier",
    weeks: 4,
    stack: "React · Node.js · GraphQL · MongoDB",
  },
  {
    id: "mobile",
    label: "Application Mobile / PWA",
    weeks: 3,
    stack: "React Native · PWA · Node.js",
  },
  {
    id: "refonte",
    label: "Refonte & Audit",
    weeks: 2,
    stack: "Audit UI/Code · Next.js · Core Web Vitals",
  },
];

const featureOptions = [
  { id: "dashboard", label: "Dashboard & KPIs temps réel", extraWeeks: 1 },
  { id: "auth", label: "Comptes, rôles & sécurité 2FA", extraWeeks: 1 },
  { id: "mobile-ui", label: "Parcours Mobile / PWA optimisé", extraWeeks: 1 },
  { id: "api", label: "API sur mesure & base de données", extraWeeks: 1 },
  { id: "seo", label: "SEO technique & performances", extraWeeks: 0.5 },
];

export function ProjectEstimator() {
  const [selectedTypeId, setSelectedTypeId] = useState(baseTypes[1].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "dashboard",
    "auth",
  ]);

  const activeType =
    baseTypes.find((t) => t.id === selectedTypeId) ?? baseTypes[0];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const extraWeeks = selectedFeatures.reduce((sum, id) => {
    const found = featureOptions.find((f) => f.id === id);
    return sum + (found?.extraWeeks ?? 0);
  }, 0);

  const minWeeks = Math.max(1, Math.round(activeType.weeks + extraWeeks));
  const maxWeeks = minWeeks + 2;

  const chosenLabels = featureOptions
    .filter((f) => selectedFeatures.includes(f.id))
    .map((f) => f.label);

  const briefQuery = new URLSearchParams({
    projet: activeType.label,
    ...(chosenLabels.length > 0 ? { details: chosenLabels.join(", ") } : {}),
  }).toString();

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Interactive Selection */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          <SlidersHorizontal size={15} weight="bold" />
          <span>Simulateur de périmètre</span>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-fg">
            1. Quel type de produit souhaitez-vous créer ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {baseTypes.map((type) => {
              const active = type.id === selectedTypeId;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedTypeId(type.id)}
                  className={cn(
                    "text-left p-3.5 rounded-xl border transition-all cursor-pointer",
                    active
                      ? "bg-accent-soft border-accent text-fg shadow-2xs"
                      : "bg-canvas border-line text-fg-muted hover:border-line-strong hover:text-fg"
                  )}
                >
                  <div className="font-semibold text-sm">{type.label}</div>
                  <div className="text-[11px] font-mono text-fg-subtle mt-0.5">
                    {type.stack}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-fg">
            2. Quels modules ou besoins inclure ?
          </h3>
          <div className="flex flex-wrap gap-2">
            {featureOptions.map((opt) => {
              const checked = selectedFeatures.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleFeature(opt.id)}
                  aria-pressed={checked}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer",
                    checked
                      ? "bg-fg text-white border-fg"
                      : "bg-canvas text-fg-muted border-line hover:border-line-strong hover:text-fg"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded-md flex items-center justify-center border",
                      checked
                        ? "bg-accent border-accent text-white"
                        : "border-line-strong bg-surface"
                    )}
                  >
                    {checked && <Check size={11} weight="bold" />}
                  </span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Live Computed Summary */}
      <div className="lg:col-span-5 rounded-xl bg-canvas border border-line p-6 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-fg-subtle">
            <span>Estimation indicative</span>
            <span className="text-status font-semibold">● Temps réel</span>
          </div>

          <div>
            <div className="text-xs font-mono text-fg-subtle">
              Délai moyen estimé
            </div>
            <div className="text-3xl font-bold text-fg mt-1">
              {minWeeks} – {maxWeeks} semaines
            </div>
          </div>

          <div className="pt-4 border-t border-line space-y-2 text-xs">
            <div className="flex justify-between gap-2">
              <span className="font-mono text-fg-subtle">Format</span>
              <span className="font-semibold text-fg text-right">
                {activeType.label}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-mono text-fg-subtle">Stack type</span>
              <span className="font-mono text-fg-muted text-right">
                {activeType.stack}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="font-mono text-fg-subtle">Modules</span>
              <span className="font-semibold text-fg">
                {selectedFeatures.length} sélectionné
                {selectedFeatures.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/contact?${briefQuery}`}
          className={buttonClasses({
            variant: "secondary",
            size: "md",
            className: "w-full",
          })}
        >
          Pré-remplir mon brief
          <ArrowUpRight size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
