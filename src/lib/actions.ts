"use server";

import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === "re_your_api_key_here") {
        console.error("Erreur: RESEND_API_KEY est manquante dans .env.local");
        return { error: "Le service d'envoi d'email n'est pas configuré (Clé API manquante)." };
    }

    const resend = new Resend(apiKey);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Veuillez remplir tous les champs." };
    }

    try {
        const data = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "brownmihamina@gmail.com",
            subject: `Nouveau message de ${name} via Portfolio`,
            replyTo: email,
            text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (data.error) {
            console.error(data.error);
            return { error: "Erreur lors de l'envoi de l'email." };
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Une erreur inattendue est survenue." };
    }
}
