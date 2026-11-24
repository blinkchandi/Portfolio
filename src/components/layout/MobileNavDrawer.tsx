"use client";

import Link from "next/link";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { PRIMARY_NAV_LINKS, SITE_CONFIG } from "@/src/config/site";
import { buttonClasses } from "@/src/components/ui/Button";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";
import { cn } from "@/src/lib/utils";

interface MobileNavDrawerProps {
  open: boolean;
  pathname: string;
  onClose: () => void;
}

export function MobileNavDrawer({
  open,
  pathname,
  onClose,
}: MobileNavDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: STUDIO_EASE }}
          className="md:hidden bg-surface border-b border-line shadow-lg"
        >
          <div className="max-w-6xl mx-auto px-5 py-4 space-y-4">
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV_LINKS.map((link, idx) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors",
                        active
                          ? "bg-fg text-white font-medium"
                          : "text-fg-muted hover:text-fg hover:bg-surface-elevated"
                      )}
                    >
                      <span>{link.name}</span>
                      <span
                        className={cn(
                          "font-mono text-[11px]",
                          active ? "text-white/70" : "text-fg-subtle"
                        )}
                      >
                        0{idx + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile parity: primary CTA + CV access never lost on mobile */}
            <div className="pt-3 border-t border-line grid grid-cols-2 gap-2.5">
              <a
                href={SITE_CONFIG.cvPath}
                download={SITE_CONFIG.cvDownloadName}
                onClick={onClose}
                className={buttonClasses({
                  variant: "outline",
                  size: "md",
                  className: "min-h-[44px] w-full",
                })}
              >
                <DownloadSimple size={15} />
                CV PDF
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className={buttonClasses({
                  variant: "secondary",
                  size: "md",
                  className: "min-h-[44px] w-full",
                })}
              >
                Collaborer
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
