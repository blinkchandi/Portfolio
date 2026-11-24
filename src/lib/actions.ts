"use server";

import { SITE_CONFIG } from "@/src/config/site";
import {
  createDefaultEmailGateway,
  type EmailGateway,
} from "@/src/lib/email-gateway";
import { validateContactForm, type ContactPayload } from "@/src/lib/validation";

export type SendEmailResult =
  | { readonly success: true; readonly error?: never }
  | { readonly success?: false; readonly error: string };

function formatContactEmailText(payload: ContactPayload): string {
  return [
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Type de projet: ${payload.projectType}`,
    `Budget indicatif: ${payload.budget}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export async function sendEmailWithGateway(
  formData: FormData,
  gateway: EmailGateway | null
): Promise<SendEmailResult> {
  const parsed = validateContactForm(formData);

  if (!parsed.ok) {
    return { error: parsed.error };
  }

  // Silently accept spam bots caught by the hidden honeypot field.
  if (parsed.honeypot) {
    return { success: true };
  }

  if (!gateway) {
    console.error("Erreur: RESEND_API_KEY est manquante dans .env.local");
    return {
      error:
        "Le service d'envoi d'email n'est pas configuré (clé API manquante).",
    };
  }

  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_EMAIL || SITE_CONFIG.email;

  try {
    const result = await gateway.send({
      from,
      to,
      subject: `[Portfolio] ${parsed.data.projectType} — ${parsed.data.name}`,
      replyTo: parsed.data.email,
      text: formatContactEmailText(parsed.data),
    });

    return result.ok ? { success: true } : { error: result.error };
  } catch (error) {
    console.error(error);
    return { error: "Une erreur inattendue est survenue." };
  }
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
  return sendEmailWithGateway(formData, createDefaultEmailGateway());
}
