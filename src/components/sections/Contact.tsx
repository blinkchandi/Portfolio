"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeSimple, Phone, MapPin, InstagramLogo, GithubLogo, LinkedinLogo, PaperPlaneTilt, CheckCircle, WarningCircle, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { sendEmail } from "@/src/lib/actions";

export function Contact() {
    const [isPending, setIsPending] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setError(null);
        setMessageSent(false);

        const formData = new FormData(event.currentTarget);
        const result = await sendEmail(formData);

        setIsPending(false);
        if (result.success) {
            setMessageSent(true);
            (event.target as HTMLFormElement).reset();
        } else {
            setError(result.error || "Une erreur est survenue.");
        }
    }

    return (
        <section id="contact" className="py-24 bg-secondary text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 transform translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <span className="text-accent font-black uppercase tracking-widest text-sm">Contact</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-8">Travaillons ensemble sur votre prochain projet.</h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                                    <EnvelopeSimple size={24} weight="bold" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-tighter">Email</p>
                                    <p className="text-lg font-medium">brownmihamina@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                                    <Phone size={24} weight="bold" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-tighter">Téléphone</p>
                                    <p className="text-lg font-medium">+261 34 04 909 08</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                                    <MapPin size={24} weight="bold" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/40 font-bold uppercase tracking-tighter">Localisation</p>
                                    <p className="text-lg font-medium">Antananarivo, Madagascar</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[InstagramLogo, GithubLogo, LinkedinLogo].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300">
                                    <Icon size={24} weight="bold" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md p-8 shadow-2xl">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Nom</label>
                                        <input name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white" placeholder="Votre nom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email</label>
                                        <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors text-white" placeholder="votre@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-white/60">Message</label>
                                    <textarea name="message" rows={4} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none text-white" placeholder="Comment puis-je vous aider ?" />
                                </div>

                                {messageSent && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center gap-3 border border-emerald-500/30">
                                        <CheckCircle size={24} weight="bold" />
                                        <span className="font-semibold">Message envoyé avec succès !</span>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-lg bg-rose-500/20 text-rose-300 flex items-center gap-3 border border-rose-500/30">
                                        <WarningCircle size={24} weight="bold" />
                                        <span className="font-semibold">{error}</span>
                                    </motion.div>
                                )}

                                <Button disabled={isPending} className="w-full gap-2 py-4 shadow-lg shadow-accent/20" variant="primary">
                                    {isPending ? (
                                        <>Envoi en cours <CircleNotch size={20} weight="bold" className="animate-spin" /></>
                                    ) : (
                                        <>Envoyer le message <PaperPlaneTilt size={20} weight="bold" /></>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>

                <div className="mt-24 pt-8 border-t border-white/5 text-center text-white/40 text-sm">
                    © {new Date().getFullYear()} BlinkChandi Portfolio. Tous droits réservés.
                </div>
            </div>
        </section>
    );
}
