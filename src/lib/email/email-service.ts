import { SendEmailOptions, SendEmailResult, ContactFormData, NewsletterFormData } from "./types";
import { renderContactConfirmationEmail } from "./templates/contact-confirmation";
import { renderInternalNotificationEmail } from "./templates/internal-notification";
import { renderNewsletterWelcomeEmail } from "./templates/newsletter-welcome";
import { SUPPORT_EMAIL } from "../constants";

const RESEND_API_URL = "https://api.resend.com/emails";

/**
 * Proveedor de Correos Electrónicos CELAEST (Basado en Resend - Top Tier Deliverability)
 *
 * - Si RESEND_API_KEY está configurada, despacha correos a través de la infraestructura de Resend.
 * - Si RESEND_API_KEY no está configurada (en dev local o CI), actúa como Sandbox Logger,
 *   mostrando el contenido en la consola sin fallar, permitiendo pruebas y CI limpios.
 */
export class EmailService {
  private static apiKey: string | undefined = process.env.RESEND_API_KEY;
  private static defaultFrom: string = process.env.EMAIL_FROM || "CELAEST <onboarding@resend.dev>";
  private static internalReceiver: string = process.env.EMAIL_INTERNAL_RECEIVER || SUPPORT_EMAIL;

  /**
   * Envía un correo electrónico general vía Resend o Mock Logger
   */
  public static async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const from = options.from || this.defaultFrom;
    const to = Array.isArray(options.to) ? options.to : [options.to];

    // Modo Sandbox (desarrollo local sin credenciales)
    if (!this.apiKey) {
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
          Authorization: `Bearer ${this.apiKey}`,
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
   * 1. Envía notificación interna con todos los detalles al equipo de CELAEST.
   * 2. Envía correo de confirmación y acuse de recibo al usuario que escribió.
   */
  public static async sendContactEmails(data: ContactFormData): Promise<{
    clientResult: SendEmailResult;
    internalResult: SendEmailResult;
  }> {
    const isEs = data.locale !== "en";

    // 1. Correo de acuse de recibo para el usuario
    const confirmation = renderContactConfirmationEmail(data);
    const clientResult = await this.sendEmail({
      to: data.email,
      subject: isEs ? "Hemos recibido tu consulta - CELAEST" : "We received your inquiry - CELAEST",
      html: confirmation.html,
      text: confirmation.text,
      replyTo: this.internalReceiver,
    });

    // 2. Correo de notificación interna para el equipo CELAEST
    const notification = renderInternalNotificationEmail(data);
    const internalResult = await this.sendEmail({
      to: this.internalReceiver,
      subject: `[Lead Web] ${data.subject || "Nuevo Contacto"} - ${data.name}`,
      html: notification.html,
      text: notification.text,
      replyTo: data.email, // Responder directo al cliente desde el cliente de correo
    });

    return { clientResult, internalResult };
  }

  /**
   * Procesa una suscripción al newsletter y despacha correo de bienvenida.
   */
  public static async sendNewsletterWelcome(data: NewsletterFormData): Promise<SendEmailResult> {
    const isEs = data.locale !== "en";
    const welcome = renderNewsletterWelcomeEmail(data);

    return await this.sendEmail({
      to: data.email,
      subject: isEs
        ? "Bienvenido al ecosistema CELAEST · Actualizaciones"
        : "Welcome to CELAEST · Updates & Architecture",
      html: welcome.html,
      text: welcome.text,
    });
  }
}
