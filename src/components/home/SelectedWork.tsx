"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Play,
  Desktop,
  DeviceMobile,
} from "@phosphor-icons/react";
import { projects } from "@/src/lib/projects";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";
import { cn } from "@/src/lib/utils";

export function SelectedWork() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = projects[activeIdx] ?? projects[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Touch-friendly Project Selector (no hover-only trap on mobile!) */}
      <div
        role="tablist"
        aria-label="Sélectionner une réalisation"
        className="lg:col-span-5 divide-y divide-line border-y border-line"
      >
        {projects.map((project, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={project.slug}
              onMouseEnter={() => setActiveIdx(idx)}
              className={cn(
                "py-3 px-2.5 sm:px-3 sm:-mx-3 rounded-xl transition-colors flex items-center justify-between gap-3",
                isActive ? "bg-surface shadow-2xs" : "hover:bg-surface/60"
              )}
            >
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(idx)}
                className="flex-1 min-w-0 min-h-[44px] flex items-center gap-3.5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-lg"
              >
                <span
                  className={cn(
                    "font-mono text-xs shrink-0 font-semibold tabular-nums",
                    isActive ? "text-accent" : "text-fg-subtle"
                  )}
                >
                  {project.number}
                </span>
                <div className="min-w-0">
                  <h3
                    className={cn(
                      "text-base font-semibold tracking-tight truncate transition-colors",
                      isActive ? "text-fg" : "text-fg-muted"
                    )}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-fg-subtle mt-0.5 truncate">
                    {project.category} · {project.tech.slice(0, 3).join(" / ")}
                  </p>
                </div>
              </button>

              <Link
                href={`/projets?projet=${project.slug}`}
                aria-label={`Ouvrir ${project.title}`}
                className={cn(
                  "w-11 h-11 rounded-xl inline-flex items-center justify-center shrink-0 transition-colors",
                  isActive
                    ? "bg-accent-soft text-accent hover:bg-accent hover:text-white"
                    : "text-fg-subtle hover:text-fg hover:bg-canvas"
                )}
              >
                <ArrowUpRight size={17} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Live Visual Preview Frame */}
      <div className="lg:col-span-7 min-w-0">
        <Link
          href={`/projets?projet=${current.slug}`}
          className="group block rounded-2xl border border-line bg-surface overflow-hidden shadow-sm hover:shadow-md hover:border-line-strong transition-all"
        >
          <div className="px-3.5 sm:px-4 py-3 border-b border-line bg-canvas/70 flex items-center justify-between gap-2 text-[11px] font-mono text-fg-subtle">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex gap-1 shrink-0">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
              </span>
              <span className="truncate">{current.demoUrlLabel}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-accent font-semibold shrink-0">
              <Desktop size={13} />
              <DeviceMobile size={13} />
              Démo live
            </span>
          </div>

          <div className="relative aspect-[16/9] bg-surface-elevated overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: STUDIO_EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={current.screens[0].src}
                  alt={`${current.title} — ${current.screens[0].label}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-fg text-xs font-semibold shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
              <Play size={11} weight="fill" />
              Tester la démo
            </div>
          </div>

          <div className="px-4 sm:px-5 py-4 border-t border-line flex items-center justify-between gap-4">
            <p className="text-sm text-fg-muted truncate">{current.tagline}</p>
            <span className="text-xs font-mono font-semibold text-accent shrink-0">
              Ouvrir →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
