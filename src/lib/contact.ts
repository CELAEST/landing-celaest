import { SUPPORT_EMAIL } from "./constants";

export interface ContactLinkOptions {
  to?: string;
  subject?: string;
  body?: string;
}

/**
 * Builds a pre-filled Gmail Web compose URL so browser-only Gmail users
 * can message CELAEST in one click without relying on OS mailto handlers.
 */
export function buildGmailComposeUrl(options: ContactLinkOptions = {}): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: options.to || SUPPORT_EMAIL,
  });

  if (options.subject) {
    params.set("su", options.subject);
  }
  if (options.body) {
    params.set("body", options.body);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Builds an RFC 6068 mailto URL for native desktop/mobile mail clients.
 */
export function buildMailtoUrl(options: ContactLinkOptions = {}): string {
  const to = options.to || SUPPORT_EMAIL;
  const queryParts: string[] = [];

  if (options.subject) {
    queryParts.push(`subject=${encodeURIComponent(options.subject)}`);
  }
  if (options.body) {
    queryParts.push(`body=${encodeURIComponent(options.body)}`);
  }

  return queryParts.length > 0 ? `mailto:${to}?${queryParts.join("&")}` : `mailto:${to}`;
}

/**
 * Formats contact form fields into a crisp fallback email body for Gmail compose links.
 */
export function buildContactFallbackBody(options: {
  name?: string;
  company?: string;
  replyEmail?: string;
  message?: string;
  locale?: "es" | "en";
}): string {
  const isEn = options.locale === "en";
  const lines: string[] = [];

  if (options.name) {
    lines.push(`${isEn ? "Name" : "Nombre"}: ${options.name}`);
  }
  if (options.company) {
    lines.push(`${isEn ? "Company" : "Empresa"}: ${options.company}`);
  }
  if (options.replyEmail) {
    lines.push(`${isEn ? "Email" : "Correo"}: ${options.replyEmail}`);
  }
  if (options.message) {
    if (lines.length > 0) lines.push("");
    lines.push(options.message);
  }

  return lines.join("\n");
}
