"use client";

import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Medal } from "@phosphor-icons/react";
import { Card } from "@/src/components/ui/Card";

export function About() {
    return (
        <section id="about" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent font-black uppercase tracking-widest text-sm">À propos</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mt-2 mb-6">Passionné par la technologie, dévoué à l'innovation.</h2>
                        <p className="text-lg text-secondary/70 leading-relaxed mb-6">
                            Depuis plus de 3 ans, je transforme des idées complexes en expériences numériques intuitives. Mon parcours m'a permis d'explorer divers horizons, du développement frontend pointu aux architectures backend scalables.
                        </p>
                        <p className="text-lg text-secondary/70 leading-relaxed mb-8">
                            Je crois fermement que le code est un art fonctionnel. Chaque ligne écrite doit servir l'expérience utilisateur tout en respectant les standards de performance les plus élevés.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Medal size={20} weight="fill" />
                                </div>
                                <span className="font-bold text-secondary">Expert React</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    <Briefcase size={20} weight="fill" />
                                </div>
                                <span className="font-bold text-secondary">5+ Projets Live</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        <Card className="flex flex-col gap-4 border-2 border-secondary/5 rotate-3 hover:rotate-0">
                            <div className="text-accent"><User size={32} weight="duotone" /></div>
                            <div>
                                <h4 className="font-bold text-secondary">Qui suis-je ?</h4>
                                <p className="text-sm text-secondary/60">Un créatif tech curieux de tout ce qui touche au web.</p>
                            </div>
                        </Card>
                        <Card className="flex flex-col gap-4 border-2 border-secondary/5 -rotate-2 hover:rotate-0">
                            <div className="text-accent"><GraduationCap size={32} weight="duotone" /></div>
                            <div>
                                <h4 className="font-bold text-secondary">Formation</h4>
                                <p className="text-sm text-secondary/60">En Master Informatique (Licence déjà obtenue).</p>
                            </div>
                        </Card>
                        <Card className="flex flex-col gap-4 border-2 border-secondary/5 -rotate-3 hover:rotate-0 sm:col-span-2">
                            <div className="text-accent"><Briefcase size={32} weight="duotone" /></div>
                            <div>
                                <h4 className="font-bold text-secondary">Vision</h4>
                                <p className="text-sm text-secondary/60">Bâtir le futur du web avec une approche centrée sur l'humain et l'efficacité technique.</p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
