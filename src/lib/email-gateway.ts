import { Resend } from "resend";

export interface EmailMessage {
  readonly from: string;
  readonly to: string;
  readonly replyTo: string;
  readonly subject: string;
  readonly text: string;
}

export type EmailSendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly error: string };

// Dependency Inversion Principle (DIP): actions depend on this interface, not on Resend directly.
export interface EmailGateway {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export class ResendEmailGateway implements EmailGateway {
  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    const resend = new Resend(this.apiKey);
    const response = await resend.emails.send({
      from: message.from,
      to: message.to,
      subject: message.subject,
      replyTo: message.replyTo,
      text: message.text,
    });

    if (response.error) {
      console.error(response.error);
      return { ok: false, error: "Erreur lors de l'envoi de l'email." };
    }

    return { ok: true };
  }
}

export function createDefaultEmailGateway(): EmailGateway | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_api_key_here") {
    return null;
  }
  return new ResendEmailGateway(apiKey);
}
