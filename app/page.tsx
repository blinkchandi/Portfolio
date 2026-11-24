import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, SlidersHorizontal } from "@phosphor-icons/react/dist/ssr";
import { SelectedWork } from "@/src/components/home/SelectedWork";
import { InteractiveExplorer } from "@/src/components/home/InteractiveExplorer";
import { Reveal } from "@/src/components/ui/Reveal";
import { buttonClasses } from "@/src/components/ui/Button";

export default function HomePage() {
  return (
    <div>
      {/* HERO — Luminous, airy, interactive */}
      <section className="relative bg-hairline-grid border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <Reveal className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line shadow-2xs font-mono text-xs text-fg-muted">
                <span className="w-2 h-2 rounded-full bg-status animate-pulse" />
                <span>Brown-Lee · Full-Stack · Ouvert aux collaborations</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-[3.5rem] font-bold tracking-[-0.035em] text-fg leading-[1.06] text-balance">
                Des applications{" "}
                <span className="text-accent">web, ERP &amp; mobiles</span>{" "}
                claires, rapides et testables en direct.
              </h1>

              <p className="text-base md:text-lg text-fg-muted max-w-xl leading-relaxed">
                Développeur Full-Stack curieux et polyvalent, j&apos;aime
                explorer plusieurs environnements pour transformer un besoin
                métier exigeant en produit intuitif et fiable.
              </p>

              {/* Hick's Law: 1 clear primary CTA + 1 secondary CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/projets"
                  className={buttonClasses({
                    variant: "secondary",
                    size: "lg",
                    className: "min-h-[46px]",
                  })}
                >
                  <Play size={15} weight="fill" />
                  Tester les démos
                </Link>
                <Link
                  href="/services"
                  className={buttonClasses({
                    variant: "outline",
                    size: "lg",
                    className: "min-h-[46px]",
                  })}
                >
                  <SlidersHorizontal size={16} />
                  Estimer un projet
                </Link>
              </div>
            </Reveal>

            {/* Luminous Studio Identity Card */}
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-surface shadow-sm overflow-hidden">
                <div className="px-4 sm:px-5 py-4 border-b border-line flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="relative w-10 h-10 rounded-full overflow-hidden border border-line-strong bg-white shrink-0">
                      <Image
                        src="/avatar_portfolio.png"
                        alt="Emblème BlinkChandi"
                        fill
                        sizes="40px"
                        className="object-cover scale-125"
                        priority
                      />
                    </span>
                    <div className="leading-tight min-w-0">
                      <div className="text-sm font-bold text-fg truncate">
                        Brown-Lee Andriamihamina
                      </div>
                      <div className="text-xs font-mono text-fg-subtle truncate">
                        blinkchandi · Paris / Alfortville
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-status border border-emerald-200 font-mono text-[11px] font-medium shrink-0">
                    Disponible
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  <Link
                    href="/projets?projet=expertresource-erp"
                    className="group relative block aspect-[16/10] rounded-xl overflow-hidden border border-line bg-surface-elevated"
                  >
                    <Image
                      src="/projet-4-3.png"
                      alt="Tableau de bord comptable ExpertResource ERP réalisé par Brown-Lee"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      priority
                    />
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-fg/85 text-white font-mono text-[10px] backdrop-blur-xs">
                      Réalisation réelle · ExpertResource ERP
                    </span>
                  </Link>

                  <div className="grid grid-cols-3 gap-2 text-center tabular-nums">
                    <div className="p-2.5 rounded-xl bg-canvas border border-line">
                      <div className="text-base font-bold text-fg">4</div>
                      <div className="text-[11px] font-mono text-fg-subtle">
                        Démos live
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-canvas border border-line">
                      <div className="text-sm sm:text-base font-bold text-fg">
                        Web + App
                      </div>
                      <div className="text-[11px] font-mono text-fg-subtle">
                        Multi-env
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-canvas border border-line">
                      <div className="text-base font-bold text-fg">&lt; 24h</div>
                      <div className="text-[11px] font-mono text-fg-subtle">
                        Réponse
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PROJECTS GALLERY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-8 sm:space-y-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              01 · Réalisations interactives
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg">
              Sélectionnez un projet, testez son interface en direct.
            </h2>
          </div>
          <Link
            href="/projets"
            className="text-sm font-mono font-medium text-accent hover:text-accent-hover inline-flex items-center gap-1"
          >
            Ouvrir le studio projets
            <ArrowUpRight size={15} />
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <SelectedWork />
        </Reveal>
      </section>

      {/* INTERACTIVE ENVIRONMENT EXPLORER */}
      <section className="bg-surface/60 border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-10">
          <Reveal className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              02 · Polyvalence technique
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-fg">
              Explorez les environnements sur lesquels j&apos;interviens.
            </h2>
            <p className="text-sm md:text-base text-fg-muted">
              Cliquez sur un domaine pour voir la stack, les livrables concrets
              et une démonstration associée.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <InteractiveExplorer />
          </Reveal>
        </div>
      </section>

      {/* CLEAN LIGHT CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <div className="rounded-3xl bg-surface border border-line p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Prêt à avancer ?
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-fg">
                Construisons un outil qui sert vraiment vos utilisateurs.
              </h2>
              <p className="text-sm md:text-base text-fg-muted">
                Configurez votre besoin en 30 secondes dans l&apos;estimateur ou
                envoyez-moi directement un message.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/services"
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                Configurer un projet
              </Link>
              <Link
                href="/contact"
                className={buttonClasses({ variant: "secondary", size: "lg" })}
              >
                Discuter ensemble
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
