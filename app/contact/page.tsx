import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/src/components/contact/ContactForm";
import { Reveal } from "@/src/components/ui/Reveal";
import { SITE_CONFIG } from "@/src/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Échangeons autour de votre projet web, ERP ou mobile. Réponse directe sous 24h.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ projet?: string; details?: string }>;
}) {
  const { projet, details } = await searchParams;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-22">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-5 space-y-8">
          <header className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              05 · Contact
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
              Parlons simplement de votre projet.
            </h1>
            <p className="text-base text-fg-muted leading-relaxed">
              Un brief complet ou juste une idée à explorer : écrivez-moi et je
              reviens vers vous avec des pistes concrètes.
            </p>
          </header>

          <dl className="rounded-2xl border border-line bg-surface divide-y divide-line text-sm overflow-hidden shadow-xs">
            <div className="p-4 flex items-center justify-between gap-4">
              <dt className="font-mono text-xs text-fg-subtle">email</dt>
              <dd>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-fg font-medium hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  {SITE_CONFIG.email}
                  <ArrowUpRight size={13} />
                </a>
              </dd>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <dt className="font-mono text-xs text-fg-subtle">téléphone</dt>
              <dd>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="text-fg font-medium hover:text-accent transition-colors"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <dt className="font-mono text-xs text-fg-subtle">basé à</dt>
              <dd className="text-fg-muted">{SITE_CONFIG.locationShort}</dd>
            </div>
            <div className="p-4 flex items-center justify-between gap-4">
              <dt className="font-mono text-xs text-fg-subtle">statut</dt>
              <dd className="inline-flex items-center gap-2 text-status font-medium">
                <span className="w-2 h-2 rounded-full bg-status" />
                Ouvert aux missions
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <ContactForm initialSubject={projet} initialDetails={details} />
        </Reveal>
      </div>
    </div>
  );
}
