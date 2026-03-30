"use client";

import { useState, useEffect } from "react";
import { DownloadSimple, ArrowDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/Button";

export function Hero() {
    const [displayText, setDisplayText] = useState("");
    const fullText = "Développeur Full-Stack Passionné";

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-60">
            {/* Background decoration */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-2 lg:order-1"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-widest uppercase mb-6">
                        Disponible pour de nouveaux projets
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-sans text-secondary leading-[1.1] mb-6">
                        Salut, je suis <span className="text-accent">Brown-Lee</span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-medium text-secondary/60 mb-8 min-h-[1.5em] font-mono">
                        {displayText}
                        <span className="inline-block w-1 h-8 bg-accent ml-1 animate-pulse" />
                    </p>
                    <p className="text-lg text-secondary/70 max-w-xl mb-10 leading-relaxed">
                        Je conçois et développe des applications web performantes, scalables et centrées sur l'utilisateur. Mon approche combine design épuré et excellence technique.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            Mes Projets
                        </Button>
                        <a href="/brown-cv.pdf.pdf" download="CV_Brown-Lee.pdf">
                            <Button size="lg" variant="outline" className="gap-2">
                                Télécharger CV <DownloadSimple size={20} weight="bold" />
                            </Button>
                        </a>
                    </div>
                </motion.div>

                {/* Visual content / Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="order-1 lg:order-2 flex justify-center"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-accent rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                            <img
                                src="/avatar_portfolio.png"
                                alt="Brown-Lee"
                                className="w-full h-full object-cover scale-[1.3] transform transition-transform duration-700 group-hover:scale-[1.45]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-xs font-bold uppercase tracking-widest text-secondary/40">Défiler</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-accent"
                >
                    <ArrowDown size={24} weight="bold" />
                </motion.div>
            </motion.div>
        </section>
    );
}
