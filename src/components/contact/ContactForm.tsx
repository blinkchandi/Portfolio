"use client";

import { useState } from "react";
import {
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/Button";
import { sendEmail } from "@/src/lib/actions";

const PROJECT_TYPES = [
  "Application Web / SaaS",
  "ERP / Outil métier",
  "Mobile / PWA",
  "Refonte & Performance",
  "Autre projet",
] as const;

const BUDGET_RANGES = [
  "À définir ensemble",
  "< 1 000 €",
  "1 000 € – 3 000 €",
  "3 000 € – 8 000 €",
  "> 8 000 €",
] as const;

const MAX_MESSAGE_LENGTH = 3000;

const fieldClass =
  "w-full min-h-[44px] rounded-xl border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent focus:bg-surface transition-colors";

// Discriminated union: impossible states (e.g., pending + error + success) cannot coexist.
type SubmissionState =
  | { readonly status: "idle" }
  | { readonly status: "submitting" }
  | { readonly status: "success" }
  | { readonly status: "error"; readonly message: string };

interface ContactFormProps {
  initialSubject?: string;
  initialDetails?: string;
}

export function ContactForm({
  initialSubject,
  initialDetails,
}: ContactFormProps) {
  const defaultMessage = initialSubject
    ? `Bonjour Brown-Lee, je souhaite échanger autour d'un projet « ${initialSubject} »${
        initialDetails ? ` incluant : ${initialDetails}` : ""
      }.`
    : "";

  const [messageText, setMessageText] = useState(defaultMessage);
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  const isSubmitting = submission.status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission({ status: "submitting" });

    try {
      const formData = new FormData(form);
      const result = await sendEmail(formData);

      if (result.success) {
        setSubmission({ status: "success" });
        form.reset();
        setMessageText("");
        return;
      }

      setSubmission({
        status: "error",
        message: result.error || "Une erreur est survenue lors de l'envoi.",
      });
    } catch {
      setSubmission({
        status: "error",
        message: "Impossible de contacter le serveur. Veuillez réessayer.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6 md:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-name"
              className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
            >
              Nom *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={120}
              placeholder="Votre nom ou entreprise"
              className={fieldClass}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-email"
              className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
            >
              Email *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={160}
              placeholder="vous@entreprise.com"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label
              htmlFor="contact-project-type"
              className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
            >
              Type de projet
            </label>
            <select
              id="contact-project-type"
              name="projectType"
              defaultValue={initialSubject || PROJECT_TYPES[0]}
              className={fieldClass}
            >
              {initialSubject &&
                !PROJECT_TYPES.includes(
                  initialSubject as (typeof PROJECT_TYPES)[number]
                ) && <option value={initialSubject}>{initialSubject}</option>}
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-budget"
              className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
            >
              Budget indicatif
            </label>
            <select
              id="contact-budget"
              name="budget"
              defaultValue={BUDGET_RANGES[0]}
              className={fieldClass}
            >
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
            >
              Message *
            </label>
            <span className="font-mono text-[10px] text-fg-subtle tabular-nums">
              {messageText.length} / {MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={MAX_MESSAGE_LENGTH}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Décrivez brièvement le contexte, l'objectif ou l'échéance..."
            className={`${fieldClass} resize-y`}
          />
        </div>

        {submission.status === "success" && (
          <div
            role="status"
            className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2.5 text-sm font-medium"
          >
            <CheckCircle size={18} weight="fill" className="shrink-0" />
            <span>Message envoyé avec succès ! Réponse sous 24h ouvrées.</span>
          </div>
        )}

        {submission.status === "error" && (
          <div
            role="alert"
            className="p-3.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-2.5 text-sm font-medium"
          >
            <WarningCircle size={18} weight="fill" className="shrink-0" />
            <span>{submission.message}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="secondary"
          size="lg"
          className="w-full min-h-[48px]"
        >
          {isSubmitting ? (
            <>
              Envoi en cours
              <CircleNotch size={16} className="animate-spin" />
            </>
          ) : (
            <>
              Envoyer le message
              <PaperPlaneTilt size={16} weight="bold" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
