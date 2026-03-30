"use client";

import { motion } from "framer-motion";
import { GithubLogo, Globe, Cpu, Database, Browser } from "@phosphor-icons/react";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

const projects = [
    {
        title: "ImmoDirect",
        tagline: "Plateforme de vente immobilière",
        tech: ["React", "Node", "Express", "MongoDB"],
        images: ["/projet-1-1.png", "/projet-1-2.png", "/projet-1-4.png"],
        type: "Web Application",
        description: "Une solution innovante facilitant la vente de biens immobiliers (maisons, terrains) avec une mise en relation directe et simplifiée."
    },
    {
        title: "CleanManager ERP",
        tagline: "Gestion administrative pour services de nettoyage",
        tech: ["React", "Node", "Express", "MongoDB"],
        images: ["/projet-2-1.png", "/projet-2-2.png"],
        type: "ERP",
        description: "Système complet de gestion administrative conçu pour optimiser les opérations et le suivi client d'une entreprise de nettoyage."
    },
    {
        title: "ExpertTicketing",
        tagline: "Support client pour cabinet comptable",
        tech: ["Next.js", "GraphQL", "Node", "MongoDB"],
        images: ["/projet-3-1.png", "/projet-3-2.png"],
        type: "Ticketing System",
        description: "Système de ticketing sur mesure permettant aux cabinets d'expertise comptable de gérer efficacement les demandes de leurs clients."
    },
    {
        title: "ExpertResource ERP",
        tagline: "ERP spécialisé Expertise Comptable",
        tech: ["React", "Node", "Express", "MongoDB"],
        images: ["/projet-4-1.png", "/projet-4-2.png"],
        type: "ERP",
        description: "Enterprise Resource Planning complet spécifiquement développé pour les besoins complexes des cabinets d'expertise comptable."
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-accent font-black uppercase tracking-widest text-sm">Portfolio</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-2">Mes Réalisations</h2>
                        <p className="text-secondary/60 mt-4 text-lg">
                            Une sélection de mes travaux les plus significatifs en tant que développeur full-stack.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Card className="group flex flex-col h-full bg-slate-50 border-0 p-0 overflow-hidden">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg px-6 py-2 border-2 border-white rounded-full">Projet Privé</span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs font-bold text-accent uppercase tracking-widest">{project.type}</span>
                                            <h3 className="text-2xl font-bold text-secondary">{project.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-secondary/60 text-base mb-6 leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-3 py-1 bg-white border border-secondary/5 rounded-full text-xs font-semibold text-secondary/70">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
