"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  Play,
  Copy,
  Check,
  DownloadSimple,
  Compass,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { PRIMARY_NAV_LINKS, SITE_CONFIG } from "@/src/config/site";
import { projects } from "@/src/lib/projects";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";

interface QuickCommand {
  readonly label: string;
  readonly group: "Navigation" | "Démos";
  readonly href: string;
}

const NAVIGATION_COMMANDS: readonly QuickCommand[] = PRIMARY_NAV_LINKS.map(
  (link) => ({
    label: `Aller à · ${link.name}`,
    group: "Navigation",
    href: link.href,
  })
);

// Single Source of Truth: derived dynamically from `projects`.
const DEMO_COMMANDS: readonly QuickCommand[] = projects.map((project) => ({
  label: `Démo live · ${project.title} (${project.category})`,
  group: "Démos",
  href: `/projets?projet=${project.slug}`,
}));

const ALL_COMMANDS: readonly QuickCommand[] = [
  ...NAVIGATION_COMMANDS,
  ...DEMO_COMMANDS,
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const normalized = query.trim().toLowerCase();
  const filteredCommands = ALL_COMMANDS.filter((item) =>
    item.label.toLowerCase().includes(normalized)
  );

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      handleClose();
      router.push("/contact");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={handleClose}
          className="fixed inset-0 z-[60] bg-slate-900/35 backdrop-blur-xs flex items-start justify-center pt-20 sm:pt-24 px-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Palette de navigation rapide"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: STUDIO_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-surface border border-line-strong shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-line flex items-center gap-3">
              <MagnifyingGlass
                size={18}
                className="text-fg-subtle shrink-0"
              />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une page, une démo ou une action..."
                aria-label="Rechercher dans le portfolio"
                className="w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
              />
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer la palette"
                className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-surface-elevated text-fg-subtle hover:text-fg cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto p-2 space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.href}
                  type="button"
                  onClick={() => {
                    handleClose();
                    router.push(cmd.href);
                  }}
                  className="w-full min-h-[44px] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm text-fg hover:bg-accent-soft hover:text-accent transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    {cmd.group === "Démos" ? (
                      <Play
                        size={14}
                        weight="fill"
                        className="text-accent shrink-0"
                      />
                    ) : (
                      <Compass
                        size={15}
                        className="text-fg-subtle shrink-0"
                      />
                    )}
                    <span className="truncate">{cmd.label}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle shrink-0">
                    {cmd.group}
                  </span>
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <p className="py-6 text-center text-xs text-fg-subtle">
                  Aucun résultat pour « {query} ».
                </p>
              )}
            </div>

            <div className="px-3 py-2.5 border-t border-line bg-canvas flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-line text-fg-muted hover:text-fg cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-status" />
                      Email copié
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      Copier email
                    </>
                  )}
                </button>
                <a
                  href={SITE_CONFIG.cvPath}
                  download={SITE_CONFIG.cvDownloadName}
                  onClick={handleClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-line text-fg-muted hover:text-fg"
                >
                  <DownloadSimple size={13} />
                  CV PDF
                </a>
              </div>
              <span className="font-mono text-[10px] text-fg-subtle">
                {SITE_CONFIG.brand} · Navigation rapide
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
