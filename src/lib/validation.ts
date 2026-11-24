export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; data: ContactPayload; honeypot?: false }
  | { ok: true; honeypot: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactForm(formData: FormData): ValidationResult {
  if (readField(formData, "website")) {
    return { ok: true, honeypot: true };
  }

  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const projectType = readField(formData, "projectType") || "Non précisé";
  const budget = readField(formData, "budget") || "À définir";
  const message = readField(formData, "message");

  if (!name || !email || !message) {
    return { ok: false, error: "Veuillez remplir tous les champs obligatoires." };
  }

  if (name.length > 120) {
    return { ok: false, error: "Le nom ne doit pas dépasser 120 caractères." };
  }

  if (email.length > 160 || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Veuillez saisir une adresse email valide." };
  }

  if (message.length < 10) {
    return {
      ok: false,
      error: "Merci de détailler un peu votre besoin (10 caractères minimum).",
    };
  }

  if (message.length > 3000) {
    return {
      ok: false,
      error: "Le message ne doit pas dépasser 3000 caractères.",
    };
  }

  return {
    ok: true,
    data: { name, email, projectType, budget, message },
  };
}
