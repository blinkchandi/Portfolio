import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadSimple, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/src/components/ui/Reveal";
import { buttonClasses } from "@/src/components/ui/Button";
import { SITE_CONFIG } from "@/src/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Brown-Lee Andriamihamina (BlinkChandi) — Développeur Full-Stack en Master Expert IT Dev & Data à Ingetis Paris.",
};

const experiences = [
  {
    period: "Mars — Oct. 2026",
    role: "Développeur Full-Stack Junior",
    place: "DEPANNPC · Antananarivo",
    detail:
      "Conception, analyse des besoins, développement et maintenance d'ERP sur mesure. Réalisation de sites vitrine et sites e-commerce.",
  },
  {
    period: "Mai — Août 2025",
    role: "Stage Développeur Full-Stack",
    place: "DEPANNPC · Antananarivo",
    detail:
      "Conception, développement et maintenance d'un système de gestion universitaire en PWA (React.js & Node.js) en lien avec les équipes design.",
  },
  {
    period: "Oct. — Déc. 2024",
    role: "Stage Développement Mobile",
    place: "JIRAMA · Antananarivo",
    detail:
      "Développement d'une application mobile de gestion de caisse en React Native.",
  },
  {
    period: "Mars — Avr. 2024",
    role: "Stage Découverte Réseau",
    place: "JIRAMA · Antananarivo",
    detail:
      "Apprentissage des bases réseau et simulation d'un réseau de campus sous Cisco Packet Tracer.",
  },
];

const education = [
  {
    period: "Sept. 2026 — présent",
    degree: "Master Expert IT — Dev & Data",
    school: "Ingetis Paris · 62 bis rue Gay-Lussac, Paris",
  },
  {
    period: "2023 — 2025",
    degree: "Licence en Informatique, Risque et Décision",
    school: "ESMIA · Antananarivo, Madagascar",
  },
];

const environments = [
  {
    area: "Web & Mobile",
    items: "React, Next.js, React Native, TypeScript, Tailwind CSS, PWA",
  },
  {
    area: "Backend & APIs",
    items: "Node.js, Express.js, GraphQL, REST, Authentification & 2FA",
  },
  {
    area: "Données & Programmation",
    items: "MongoDB, SQL, Python",
  },
  {
    area: "Savoir-être",
    items: "Autodidacte, Ponctuel, Rigoureux, Esprit d'équipe",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-22 space-y-20">
      {/* Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            04 · À propos
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg leading-tight">
            Curieux de nature, polyvalent par pratique.
          </h1>
          <div className="space-y-4 text-base text-fg-muted leading-relaxed">
            <p>
              Je suis{" "}
              <span className="text-fg font-semibold">
                Brown-Lee Andriamihamina
              </span>{" "}
              (BlinkChandi), développeur Full-Stack basé à{" "}
              <span className="text-fg font-medium">
                Alfortville (Île-de-France)
              </span>{" "}
              et étudiant en{" "}
              <span className="text-fg font-medium">
                Master Expert IT — Dev &amp; Data à Ingetis Paris
              </span>
              .
            </p>
            <p>
              Autodidacte et rigoureux, j&apos;aime comprendre un système en
              profondeur et explorer différents environnements : ERP sur mesure,
              sites vitrine et e-commerce, applications mobiles React Native,
              PWA, Python et bases de données SQL/MongoDB. En dehors du code, je
              retrouve le même goût de la stratégie et de la précision aux
              échecs, en cuisine et au volley-ball.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={SITE_CONFIG.cvPath}
              download={SITE_CONFIG.cvDownloadName}
              className={buttonClasses({ variant: "primary", size: "md" })}
            >
              <DownloadSimple size={16} />
              Télécharger le CV
            </a>
            <Link
              href="/contact"
              className={buttonClasses({ variant: "secondary", size: "md" })}
            >
              Me contacter
              <ArrowUpRight size={15} weight="bold" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-line">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-line-strong bg-white shrink-0">
                <Image
                  src="/avatar_portfolio.png"
                  alt="Emblème BlinkChandi"
                  fill
                  sizes="56px"
                  className="object-cover scale-125"
                />
              </div>
              <div>
                <div className="font-bold text-fg">Brown-Lee</div>
                <div className="text-xs font-mono text-fg-subtle">
                  Master Expert IT Dev &amp; Data · Ingetis Paris
                </div>
              </div>
            </div>

            <dl className="space-y-3 text-xs font-mono">
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">localisation</dt>
                <dd className="text-fg font-medium">
                  Alfortville (Paris), FR
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">langues</dt>
                <dd className="text-fg-muted text-right">
                  Français (DELF B2), Malagasy, Anglais
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-fg-subtle">intérêts</dt>
                <dd className="text-fg-muted text-right">
                  Échecs · Cuisine · Volley-ball
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Timeline & Explored Environments */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-line">
        <Reveal className="lg:col-span-7 space-y-7">
          <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Expériences professionnelles
          </h2>

          <div className="space-y-5 border-l-2 border-line pl-6">
            {experiences.map((exp) => (
              <div
                key={exp.role + exp.period}
                className="relative p-5 rounded-2xl bg-surface border border-line space-y-1.5"
              >
                <span className="absolute -left-[31px] top-6 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-canvas" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-fg">{exp.role}</h3>
                  <span className="font-mono text-[11px] text-fg-subtle">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-accent font-medium">
                  {exp.place}
                </p>
                <p className="text-sm text-fg-muted leading-relaxed pt-1">
                  {exp.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5 space-y-10">
          <div className="space-y-5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Formations
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-5 rounded-2xl bg-surface border border-line space-y-1"
                >
                  <span className="font-mono text-[11px] text-accent font-medium">
                    {edu.period}
                  </span>
                  <h3 className="text-sm font-bold text-fg">{edu.degree}</h3>
                  <p className="text-xs text-fg-muted">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              Compétences &amp; Environnements
            </h2>

            <div className="rounded-2xl border border-line bg-surface divide-y divide-line overflow-hidden shadow-xs">
              {environments.map((env) => (
                <div key={env.area} className="p-4 space-y-1">
                  <div className="text-sm font-bold text-fg">{env.area}</div>
                  <div className="text-xs font-mono text-fg-muted leading-relaxed">
                    {env.items}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
