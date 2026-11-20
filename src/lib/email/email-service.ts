import {
  SendEmailOptions,
  SendEmailResult,
  ContactFormData,
  NewsletterFormData,
  EmailRuntimeConfig,
} from "./types";
import { renderContactConfirmationEmail } from "./templates/contact-confirmation";
import { renderInternalNotificationEmail } from "./templates/internal-notification";
import { renderNewsletterWelcomeEmail } from "./templates/newsletter-welcome";
import { SUPPORT_EMAIL } from "../constants";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "CELAEST <noreply@celaest.com>";

function getRuntimeEnv(config?: EmailRuntimeConfig): {
  apiKey: string | undefined;
  defaultFrom: string;
  internalReceiver: string;
  rateLimitDelayMs: number;
} {
  const procEnv = typeof process !== "undefined" ? process.env : undefined;
  return {
    apiKey: config?.apiKey ?? procEnv?.RESEND_API_KEY,
    defaultFrom: config?.defaultFrom || procEnv?.EMAIL_FROM || DEFAULT_FROM,
    internalReceiver: config?.internalReceiver || procEnv?.EMAIL_INTERNAL_RECEIVER || SUPPORT_EMAIL,
    rateLimitDelayMs: config?.rateLimitDelayMs ?? 550,
  };
}

/**
 * Proveedor de Correos Electrónicos CELAEST (Basado en Resend - Top Tier Deliverability)
 *
 * - Si RESEND_API_KEY está configurada (vía config de Cloudflare Worker o process.env), despacha vía Resend.
 * - Si RESEND_API_KEY no está configurada (en dev local o CI), actúa como Sandbox Logger,
 *   permitiendo pruebas limpias sin credenciales reales.
 */
export class EmailService {
  /**
   * Envía un correo electrónico general vía Resend o Mock Logger
   */
  public static async sendEmail(
    options: SendEmailOptions,
    runtimeConfig?: EmailRuntimeConfig,
  ): Promise<SendEmailResult> {
    const runtime = getRuntimeEnv(runtimeConfig);
    const from = options.from || runtime.defaultFrom;
    const to = Array.isArray(options.to) ? options.to : [options.to];

    // Modo Sandbox (desarrollo local sin credenciales)
    if (!runtime.apiKey) {
      if (runtimeConfig?.strictProvider) {
        return {
          success: false,
          error: "RESEND_API_KEY is not configured in live runtime",
        };
      }
      console.info(
        `[EmailService:Sandbox] RESEND_API_KEY no configurada. Simulando envío:\n` +
          `  From: ${from}\n` +
          `  To: ${to.join(", ")}\n` +
          `  Subject: ${options.subject}\n`,
      );
      return {
        success: true,
        id: `mock_email_${Date.now()}`,
      };
    }

    try {
      const response = await fetch(RESEND_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${runtime.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: options.subject,
          html: options.html,
          text: options.text,
          reply_to: options.replyTo,
          tags: options.tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("[EmailService:Error] Resend API Error:", data);
        return {
          success: false,
          error: data.message || `HTTP ${response.status} de Resend API`,
        };
      }

      return {
        success: true,
        id: data.id,
      };
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido al enviar correo";
      console.error("[EmailService:Exception]", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Procesa un formulario de contacto:
   * 1. Envía notificación interna prioritaria con todos los detalles al equipo de CELAEST.
   * 2. Espera brevemente para respetar el rate limit de Resend y envía acuse de recibo al usuario.
   */
  public static async sendContactEmails(
    data: ContactFormData,
    runtimeConfig?: EmailRuntimeConfig,
  ): Promise<{
    clientResult: SendEmailResult;
    internalResult: SendEmailResult;
  }> {
    const isEs = data.locale !== "en";
    const runtime = getRuntimeEnv(runtimeConfig);

    // 1. Prioridad máxima: notificación interna con los datos del lead (reply_to directo al cliente)
    const notification = renderInternalNotificationEmail(data);
    const internalResult = await this.sendEmail(
      {
        to: runtime.internalReceiver,
        subject: `[Lead Web] ${data.subject || "Nuevo Contacto"} - ${data.name}`,
        html: notification.html,
        text: notification.text,
        replyTo: data.email,
      },
      runtimeConfig,
    );

    // Resend free/pro bursts enforce 2 req/s; pace sequential dispatch when live key is active
    if (runtime.apiKey && runtime.rateLimitDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, runtime.rateLimitDelayMs));
    }

    // 2. Correo de acuse de recibo para el usuario
    const confirmation = renderContactConfirmationEmail(data);
    const clientResult = await this.sendEmail(
      {
        to: data.email,
        subject: isEs
          ? "Hemos recibido tu consulta - CELAEST"
          : "We received your inquiry - CELAEST",
        html: confirmation.html,
        text: confirmation.text,
        replyTo: runtime.internalReceiver,
      },
      runtimeConfig,
    );

    return { clientResult, internalResult };
  }

  /**
   * Procesa una suscripción al newsletter y despacha correo de bienvenida.
   */
  public static async sendNewsletterWelcome(
    data: NewsletterFormData,
    runtimeConfig?: EmailRuntimeConfig,
  ): Promise<SendEmailResult> {
    const isEs = data.locale !== "en";
    const welcome = renderNewsletterWelcomeEmail(data);

    return await this.sendEmail(
      {
        to: data.email,
        subject: isEs
          ? "Bienvenido al ecosistema CELAEST · Actualizaciones"
          : "Welcome to CELAEST · Updates & Architecture",
        html: welcome.html,
        text: welcome.text,
      },
      runtimeConfig,
    );
  }
}
