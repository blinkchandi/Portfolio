import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/src/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-fg-subtle">
        <div className="space-y-1.5">
          <p className="font-semibold text-sm text-fg">
            {SITE_CONFIG.brand}
            <span className="text-accent">.</span>{" "}
            <span className="font-normal text-fg-muted">
              — {SITE_CONFIG.ownerName}
            </span>
          </p>
          <p className="font-mono text-[11px]">
            © {new Date().getFullYear()} · {SITE_CONFIG.locationFull}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-fg-muted hover:text-accent transition-colors inline-flex items-center gap-1 py-1.5"
          >
            {SITE_CONFIG.email}
            <ArrowUpRight size={12} />
          </a>
          <a
            href={SITE_CONFIG.cvPath}
            download={SITE_CONFIG.cvDownloadName}
            className="text-fg-muted hover:text-fg transition-colors py-1.5"
          >
            CV (PDF)
          </a>
          <Link
            href="/projets"
            className="text-fg-muted hover:text-fg transition-colors py-1.5"
          >
            Démos
          </Link>
          <Link
            href="/contact"
            className="text-accent hover:text-accent-hover font-medium transition-colors py-1.5"
          >
            Contact →
          </Link>
        </div>
      </div>
    </footer>
  );
}
