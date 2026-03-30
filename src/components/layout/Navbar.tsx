"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/Button";

const navLinks = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#about" },
    { name: "Projets", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-secondary/5 py-3" : "bg-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter text-secondary"
                >
                    BlinkChandi<span className="text-accent">.</span>
                </motion.div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <motion.li
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <a
                                href={link.href}
                                className="text-sm font-medium text-secondary/70 hover:text-accent transition-colors"
                            >
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                    <motion.li
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button size="sm" variant="primary">Recrutez-moi</Button>
                    </motion.li>
                </ul>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-secondary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-secondary/5 overflow-hidden"
                    >
                        <ul className="flex flex-col gap-4 p-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-lg font-medium text-secondary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <Button className="w-full">Recrutez-moi</Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
