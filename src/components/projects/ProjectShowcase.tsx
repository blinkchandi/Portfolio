"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Desktop,
  DeviceMobile,
  Devices,
  Play,
  Images,
  ArrowUpRight,
  CheckCircle,
} from "@phosphor-icons/react";
import {
  projects,
  getProjectBySlug,
  type ProjectSlug,
  type ProjectFilterGroup,
} from "@/src/lib/projects";
import { ProjectDemo } from "@/src/components/projects/ProjectDemo";
import { Button, buttonClasses } from "@/src/components/ui/Button";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";
import { cn } from "@/src/lib/utils";

type PreviewMode = "preview" | "demo";
type ViewportMode = "duo" | "desktop" | "mobile";
type FilterOption = "Tous" | ProjectFilterGroup;

const FILTERS: readonly FilterOption[] = [
  "Tous",
  "Plateforme Web",
  "ERP",
  "Ticketing",
];

export function ProjectShowcase({ initialSlug }: { initialSlug?: string }) {
  const initialProject = getProjectBySlug(initialSlug);
  const [filter, setFilter] = useState<FilterOption>("Tous");
  const [activeSlug, setActiveSlug] = useState<ProjectSlug>(initialProject.slug);
  const [mode, setMode] = useState<PreviewMode>("preview");
  const [viewport, setViewport] = useState<ViewportMode>("duo");
  const [screenIndex, setScreenIndex] = useState(0);

  const visibleProjects =
    filter === "Tous"
      ? projects
      : projects.filter((p) => p.filterGroup === filter);

  const project =
    visibleProjects.find((p) => p.slug === activeSlug) ?? visibleProjects[0];

  const handleFilterChange = (nextFilter: FilterOption) => {
    setFilter(nextFilter);
    const matching =
      nextFilter === "Tous"
        ? projects
        : projects.filter((p) => p.filterGroup === nextFilter);
    if (!matching.some((p) => p.slug === activeSlug) && matching[0]) {
      setActiveSlug(matching[0].slug);
      setScreenIndex(0);
    }
  };

  const selectProject = (slug: ProjectSlug) => {
    setActiveSlug(slug);
    setScreenIndex(0);
    setMode("preview");
    setViewport("duo");
  };

  const launchDemo = () => {
    setMode("demo");
    if (viewport === "duo") {
      setViewport("desktop");
    }
  };

  if (!project) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center space-y-3">
        <p className="text-sm font-semibold text-fg">
          Aucun projet ne correspond à ce filtre.
        </p>
        <Button
          variant="outline"
          size="md"
          onClick={() => handleFilterChange("Tous")}
        >
          Afficher tous les projets
        </Button>
      </div>
    );
  }

  const activeScreen = project.screens[screenIndex] ?? project.screens[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interactive Filter + Project Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
        <div
          role="tablist"
          aria-label="Sélectionner un projet"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1"
        >
          {visibleProjects.map((item) => {
            const isActive = item.slug === project.slug;
            return (
              <button
                key={item.slug}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => selectProject(item.slug)}
                className={cn(
                  "relative min-h-[44px] sm:min-h-[38px] px-4 py-2 text-sm transition-colors shrink-0 cursor-pointer rounded-xl",
                  isActive
                    ? "text-white font-semibold"
                    : "text-fg-muted hover:text-fg hover:bg-surface"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] mr-1.5 tabular-nums",
                    isActive ? "text-blue-200" : "text-fg-subtle"
                  )}
                >
                  {item.number}
                </span>
                {item.title}
                {isActive && (
                  <motion.span
                    layoutId="project-active-tab"
                    transition={{ duration: 0.3, ease: STUDIO_EASE }}
                    className="absolute inset-0 -z-10 rounded-xl bg-fg shadow-xs"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="Filtrer les projets par catégorie"
          className="flex flex-wrap items-center gap-1.5"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => handleFilterChange(f)}
              className={cn(
                "min-h-[38px] sm:min-h-[32px] px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer border",
                filter === f
                  ? "bg-accent-soft text-accent border-accent/30 font-semibold"
                  : "bg-surface text-fg-subtle border-line hover:text-fg"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Split Layout: Left = Project Information | Right = Desktop & Mobile + Embedded Demo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.26, ease: STUDIO_EASE }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
        >
          {/* LEFT: Project Information */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-surface p-5 sm:p-7 shadow-xs space-y-6 min-w-0">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-xs text-fg-subtle">
                <span className="text-accent font-semibold">
                  {project.number} · {project.category}
                </span>
                <span className="tabular-nums">{project.year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                {project.title}
              </h2>
              <p className="text-sm md:text-base text-fg-muted leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <div className="space-y-4 pt-5 border-t border-line text-sm">
              <div className="space-y-1">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  Enjeu
                </h3>
                <p className="text-fg-muted leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                  Solution
                </h3>
                <p className="text-fg-muted leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <ul className="space-y-2 pt-5 border-t border-line text-sm text-fg">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle
                    size={16}
                    weight="fill"
                    className="text-status shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-canvas border border-line text-xs font-mono text-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-line flex flex-wrap gap-2.5">
              {mode === "preview" ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={launchDemo}
                  className="min-h-[44px]"
                >
                  <Play size={14} weight="fill" />
                  Tester la démo live
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setMode("preview");
                    setViewport("duo");
                  }}
                  className="min-h-[44px]"
                >
                  <Images size={15} />
                  Voir les visuels
                </Button>
              )}
              <Link
                href={`/contact?projet=${encodeURIComponent(project.title)}`}
                className={buttonClasses({
                  variant: "outline",
                  size: "md",
                  className: "min-h-[44px]",
                })}
              >
                Projet similaire
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* RIGHT: Desktop & Mobile Visual Stage + Embedded Live Demo */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-surface p-3.5 sm:p-5 shadow-xs space-y-4 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3.5 border-b border-line">
              <div
                role="group"
                aria-label="Mode d'aperçu"
                className="inline-flex p-1 rounded-xl bg-canvas border border-line"
              >
                <button
                  type="button"
                  aria-pressed={mode === "preview"}
                  onClick={() => setMode("preview")}
                  className={cn(
                    "min-h-[38px] sm:min-h-[32px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                    mode === "preview"
                      ? "bg-surface text-fg shadow-2xs font-semibold"
                      : "text-fg-subtle hover:text-fg"
                  )}
                >
                  <Images size={13} />
                  <span>Visuels</span>
                </button>
                <button
                  type="button"
                  aria-pressed={mode === "demo"}
                  onClick={launchDemo}
                  className={cn(
                    "min-h-[38px] sm:min-h-[32px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                    mode === "demo"
                      ? "bg-accent text-white shadow-2xs font-semibold"
                      : "text-fg-subtle hover:text-fg"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      mode === "demo" ? "bg-emerald-300" : "bg-status"
                    )}
                  />
                  <span>Démo live</span>
                </button>
              </div>

              <div
                role="group"
                className="inline-flex p-1 rounded-xl bg-canvas border border-line"
                aria-label="Choisir l'affichage Desktop ou Mobile"
              >
                {/* Duo mode only offered on >= sm where both frames actually fit */}
                <button
                  type="button"
                  aria-pressed={viewport === "duo"}
                  onClick={() => setViewport("duo")}
                  className={cn(
                    "hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                    viewport === "duo"
                      ? "bg-surface text-fg shadow-2xs font-semibold"
                      : "text-fg-subtle hover:text-fg"
                  )}
                >
                  <Devices size={13} />
                  <span>Duo</span>
                </button>
                <button
                  type="button"
                  aria-pressed={viewport === "desktop"}
                  onClick={() => setViewport("desktop")}
                  className={cn(
                    "min-h-[38px] sm:min-h-[32px] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                    viewport === "desktop"
                      ? "bg-surface text-fg shadow-2xs font-semibold"
                      : viewport === "duo"
                      ? "bg-surface sm:bg-transparent text-fg sm:text-fg-subtle font-semibold sm:font-normal shadow-2xs sm:shadow-none sm:hover:text-fg"
                      : "text-fg-subtle hover:text-fg"
                  )}
                >
                  <Desktop size={13} />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  aria-pressed={viewport === "mobile"}
                  onClick={() => setViewport("mobile")}
                  className={cn(
                    "min-h-[38px] sm:min-h-[32px] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                    viewport === "mobile"
                      ? "bg-surface text-fg shadow-2xs font-semibold"
                      : "text-fg-subtle hover:text-fg"
                  )}
                >
                  <DeviceMobile size={13} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Luminous Preview Stage (Zero overflow at 375px) */}
            <div className="relative min-h-[340px] sm:min-h-[420px] rounded-xl bg-surface-elevated/80 border border-line p-2.5 sm:p-4 flex items-center justify-center overflow-hidden">
              {viewport !== "mobile" && (
                <div
                  className={cn(
                    "w-full min-w-0 rounded-xl overflow-hidden border border-line-strong bg-white shadow-lg",
                    viewport === "duo" && "sm:mr-14"
                  )}
                >
                  <div className="h-8 px-2.5 sm:px-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 truncate bg-white px-2.5 py-0.5 rounded-md border border-slate-200/80 min-w-0">
                      https://{project.demoUrlLabel}
                    </div>
                    <span className="hidden sm:inline font-mono text-[10px] text-slate-400 uppercase shrink-0">
                      {mode === "demo" ? "live" : "desktop"}
                    </span>
                  </div>

                  {mode === "preview" ? (
                    <div className="relative aspect-[16/9] bg-slate-100">
                      <Image
                        src={activeScreen.src}
                        alt={`${project.title} — ${activeScreen.label}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-top"
                        priority={project.number === "01"}
                      />
                    </div>
                  ) : (
                    <div className="h-[385px] bg-white overflow-hidden">
                      <ProjectDemo slug={project.slug} viewport="desktop" />
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Chassis: responsive width w-full max-w-[295px] prevents 375px clipping */}
              {viewport !== "desktop" && (
                <div
                  className={cn(
                    "rounded-[1.85rem] border-[5px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden flex flex-col",
                    viewport === "duo"
                      ? "hidden sm:flex absolute right-3 bottom-3 w-[200px] h-[360px]"
                      : "w-full max-w-[295px] h-[450px] sm:h-[470px]"
                  )}
                >
                  <div className="h-5 bg-slate-900 flex items-center justify-center shrink-0">
                    <span className="w-14 h-2.5 rounded-full bg-slate-700" />
                  </div>

                  <div className="flex-1 bg-white overflow-hidden relative rounded-b-[1.35rem]">
                    {mode === "preview" ? (
                      <div className="h-full flex flex-col bg-white text-slate-900">
                        <div className="relative h-40 bg-slate-100 shrink-0">
                          <Image
                            src={project.mobileImage}
                            alt={`Aperçu mobile ${project.title}`}
                            fill
                            sizes="295px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
                              Interface Mobile
                            </span>
                            <div className="font-bold text-xs mt-0.5 text-slate-900">
                              {project.brand}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-3">
                              {project.tagline}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setMode("demo");
                              setViewport("mobile");
                            }}
                            className="w-full min-h-[38px] py-1.5 rounded-lg bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors cursor-pointer"
                          >
                            Tester sur mobile →
                          </button>
                        </div>
                      </div>
                    ) : (
                      <ProjectDemo slug={project.slug} viewport="mobile" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Context Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              {mode === "preview" ? (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {project.screens.map((screen, idx) => (
                      <button
                        key={screen.src}
                        type="button"
                        aria-pressed={screenIndex === idx}
                        onClick={() => setScreenIndex(idx)}
                        className={cn(
                          "min-h-[36px] sm:min-h-[30px] px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border",
                          screenIndex === idx
                            ? "bg-fg text-white border-fg font-medium"
                            : "bg-canvas text-fg-muted border-line hover:text-fg"
                        )}
                      >
                        0{idx + 1} · {screen.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={launchDemo}
                    className="min-h-[36px] text-xs font-mono font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Play size={11} weight="fill" />
                    Lancer la démo
                  </button>
                </>
              ) : (
                <div className="w-full flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-fg-subtle">
                  <span>Sandbox interactive · manipulez librement</span>
                  <span className="text-status font-semibold">● en direct</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
