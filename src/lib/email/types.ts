/**
 * Definiciones de tipos para el subsistema de correos electrónicos de CELAEST.
 */

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  locale?: "es" | "en";
}

export interface NewsletterFormData {
  email: string;
  locale?: "es" | "en";
}
