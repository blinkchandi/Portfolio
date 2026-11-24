"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PRIMARY_NAV_LINKS, SITE_CONFIG } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { STUDIO_EASE } from "@/src/components/ui/Reveal";
import { buttonClasses } from "@/src/components/ui/Button";
import { CommandPalette } from "@/src/components/layout/CommandPalette";
import { MobileNavDrawer } from "@/src/components/layout/MobileNavDrawer";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileMenuOpen(false);
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 border-b",
          scrolled
            ? "bg-surface/90 backdrop-blur-md border-line shadow-xs"
            : "bg-canvas/80 backdrop-blur-sm border-transparent"
        )}
      >
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        />

        <nav
          aria-label="Navigation principale"
          className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-3"
        >
          {/* Brand */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-lg min-w-0"
          >
            <span className="relative w-8 h-8 rounded-full overflow-hidden border border-line-strong bg-white shrink-0">
              <Image
                src="/avatar_portfolio.png"
                alt={SITE_CONFIG.brand}
                fill
                sizes="32px"
                className="object-cover scale-125 group-hover:scale-135 transition-transform duration-300"
              />
            </span>
            <div className="leading-tight min-w-0">
              <span className="block text-sm font-bold tracking-tight text-fg truncate">
                {SITE_CONFIG.brand}
                <span className="text-accent">.</span>
              </span>
              <span className="block text-[10px] font-mono text-fg-subtle truncate">
                {SITE_CONFIG.ownerShortName} · {SITE_CONFIG.roleLabel}
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 bg-surface border border-line rounded-xl p-1 shadow-2xs">
            {PRIMARY_NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 inline-block px-3.5 py-1.5 text-sm transition-colors duration-200 rounded-lg",
                      active
                        ? "text-white font-medium"
                        : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ duration: 0.32, ease: STUDIO_EASE }}
                        className="absolute inset-0 -z-10 rounded-lg bg-fg shadow-xs"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Interactive Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Ouvrir la navigation rapide (Ctrl+K)"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-line bg-surface text-xs text-fg-muted hover:border-line-strong hover:text-fg transition-colors cursor-pointer"
            >
              <MagnifyingGlass size={14} />
              <span>Accès rapide</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-elevated border border-line text-fg-subtle">
                Ctrl K
              </kbd>
            </button>
            <Link
              href="/contact"
              className={buttonClasses({ variant: "secondary", size: "sm" })}
            >
              Collaborer
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Mobile Controls (44x44px minimum touch targets per Fitts's Law) */}
          <div className="md:hidden flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setPaletteOpen(true);
              }}
              aria-label="Ouvrir la recherche rapide"
              className="w-11 h-11 rounded-xl border border-line bg-surface text-fg-muted hover:text-fg inline-flex items-center justify-center cursor-pointer"
            >
              <MagnifyingGlass size={18} />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              className="w-11 h-11 rounded-xl border border-line bg-surface text-fg inline-flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </nav>

        <MobileNavDrawer
          open={mobileMenuOpen}
          pathname={pathname}
          onClose={() => setMobileMenuOpen(false)}
        />
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
