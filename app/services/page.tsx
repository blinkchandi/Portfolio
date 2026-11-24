import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ProjectEstimator } from "@/src/components/services/ProjectEstimator";
import { Reveal } from "@/src/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services & Simulateur",
  description:
    "Applications web, ERP métier, mobile/PWA et simulateur interactif de périmètre pour préparer votre projet.",
};

const domains = [
  {
    num: "01",
    title: "Applications Web & Plateformes",
    desc: "Sites sur mesure, portails clients et SaaS en Next.js et React, pensés pour la fluidité, l'accessibilité et le référencement.",
    stack: "Next.js · React · TypeScript · Tailwind",
  },
  {
    num: "02",
    title: "ERP & Outils Métier",
    desc: "Tableaux de bord, gestion comptable, ticketing, facturation ou suivi d'interventions conçus pour structurer vos opérations.",
    stack: "Node.js · Express · GraphQL · MongoDB / SQL",
  },
  {
    num: "03",
    title: "Mobile & Progressive Web Apps",
    desc: "Applications utilisables sur le terrain comme au bureau : PWA installables, sécurité 2FA et applications mobiles React Native.",
    stack: "PWA · React Native · Auth & 2FA",
  },
  {
    num: "04",
    title: "Refonte, Audit & Performance",
    desc: "Reprise d'existant, simplification d'interfaces complexes, correction de dette technique et amélioration des performances.",
    stack: "Audit UI/Code · Accessibilité · Déploiement",
  },
];

const process = [
  {
    step: "01",
    title: "Cadrage clair",
    desc: "Un échange direct pour cerner votre besoin réel, écarter le superflu et fixer un périmètre lisible.",
  },
  {
    step: "02",
    title: "Itérations visibles",
    desc: "Vous suivez l'avancement sur des versions testables régulièrement, sur Desktop comme sur Mobile.",
  },
  {
    step: "03",
    title: "Livraison durable",
    desc: "Code TypeScript maintenable, validation sécurisée et accompagnement à la mise en production.",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-22 space-y-20">
      <Reveal className="max-w-2xl space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          03 · Services &amp; Accompagnement
        </span>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
          Des solutions sur mesure, configurables selon votre besoin.
        </h1>
        <p className="text-base text-fg-muted leading-relaxed">
          Utilisez le simulateur ci-dessous pour estimer un premier périmètre ou
          explorez mes 4 domaines d&apos;intervention.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ProjectEstimator />
      </Reveal>

      {/* 2x2 Clean Capabilities Grid */}
      <Reveal delay={0.08}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {domains.map((item) => (
            <div
              key={item.num}
              className="p-7 rounded-2xl border border-line bg-surface hover:border-line-strong hover:shadow-xs transition-all flex flex-col justify-between gap-6"
            >
              <div className="space-y-2.5">
                <span className="font-mono text-xs font-semibold text-accent">
                  {item.num}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-fg">
                  {item.title}
                </h2>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-line">
                <span className="font-mono text-[11px] text-fg-subtle">
                  {item.stack}
                </span>
                <Link
                  href={`/contact?projet=${encodeURIComponent(item.title)}`}
                  className="text-xs font-mono font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 shrink-0"
                >
                  Discuter
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Process */}
      <section className="space-y-8 pt-6 border-t border-line">
        <Reveal className="space-y-1.5">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Méthode
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg">
            Une collaboration simple et transparente.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {process.map((p, idx) => (
            <Reveal
              key={p.step}
              delay={idx * 0.06}
              className="p-6 rounded-2xl bg-surface border border-line space-y-2"
            >
              <span className="font-mono text-xs font-semibold text-accent">
                Étape {p.step}
              </span>
              <h3 className="text-base font-bold text-fg">{p.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
