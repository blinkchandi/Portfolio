"use client";

import { motion } from "framer-motion";
import { Code, AppWindow, Database, PaintBrush, CloudArrowUp, Lightning } from "@phosphor-icons/react";
import { Card } from "@/src/components/ui/Card";

const services = [
    {
        title: "Développement Frontend",
        description: "Création d'interfaces réactives et intuitives avec React et Next.js, en mettant l'accent sur la performance et l'expérience utilisateur.",
        icon: Code,
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        title: "Architecture Backend",
        description: "Conception d'APIs robustes et scalables avec Node.js et Express, garantissant une logique métier solide et sécurisée.",
        icon: AppWindow,
        color: "text-indigo-500",
        bg: "bg-indigo-50"
    },
    {
        title: "Base de Données",
        description: "Modélisation et optimisation de bases de données SQL et NoSQL (MongoDB, PostgreSQL) pour une intégrité des données irréprochable.",
        icon: Database,
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    },
    {
        title: "UI/UX Design",
        description: "Conception de maquettes modernes respectant les standards de design actuels pour transformer vos idées en interfaces mémorables.",
        icon: PaintBrush,
        color: "text-pink-500",
        bg: "bg-pink-50"
    },
    {
        title: "Déploiement & Cloud",
        description: "Gestion du cycle de vie des applications et déploiement continu via Docker, AWS ou Vercel pour une disponibilité maximale.",
        icon: CloudArrowUp,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Optimisation SEO",
        description: "Audit et amélioration du référencement naturel pour booster la visibilité de vos projets web sur les moteurs de recherche.",
        icon: Lightning,
        color: "text-cyan-500",
        bg: "bg-cyan-50"
    }
];

export function Services() {
    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent font-black uppercase tracking-widest text-sm">Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-2">Mes Services</h2>
                    <p className="text-secondary/60 mt-4 text-lg">
                        Des solutions sur mesure pour accompagner votre croissance digitale à chaque étape du développement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full border-0 shadow-sm hover:shadow-xl hover:border-accent/10">
                                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 transition-transform group-hover:rotate-12`}>
                                    <service.icon size={32} className={service.color} weight="duotone" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{service.title}</h3>
                                <p className="text-secondary/60 leading-relaxed font-medium">
                                    {service.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
