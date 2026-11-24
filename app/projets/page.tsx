import type { Metadata } from "next";
import { ProjectShowcase } from "@/src/components/projects/ProjectShowcase";
import { Reveal } from "@/src/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Projets & Démos",
  description:
    "Études de cas avec visuels Desktop & Mobile et démos interactives intégrées.",
};

export default async function ProjetsPage({
  searchParams,
}: {
  searchParams: Promise<{ projet?: string }>;
}) {
  const { projet } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-22 space-y-12">
      <Reveal className="max-w-2xl space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          02 · Studio Projets &amp; Démos
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
          Explorez mes réalisations et testez leurs interfaces.
        </h1>
        <p className="text-base text-fg-muted leading-relaxed">
          À gauche, les détails métier et techniques. À droite, les aperçus
          Desktop &amp; Mobile ainsi qu&apos;une démo interactive testable
          directement dans la page.
        </p>
      </Reveal>

      <ProjectShowcase initialSlug={projet} />
    </div>
  );
}
