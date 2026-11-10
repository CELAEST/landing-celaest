import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailService } from "@/lib/email/email-service";
import { renderContactConfirmationEmail } from "@/lib/email/templates/contact-confirmation";
import { renderInternalNotificationEmail } from "@/lib/email/templates/internal-notification";
import { renderNewsletterWelcomeEmail } from "@/lib/email/templates/newsletter-welcome";

describe("Email Service & Templates Quality Gate", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Template Generation", () => {
    it("renders contact confirmation email in Spanish correctly", () => {
      const { html, text } = renderContactConfirmationEmail({
        name: "Carlos Mendoza",
        email: "carlos@acme.corp",
        company: "ACME Corp",
        subject: "Implementación Enterprise",
        message: "Deseamos cotizar automatización de procesos.",
        locale: "es",
      });

      expect(html).toContain("Hemos recibido tu mensaje");
      expect(html).toContain("Carlos Mendoza");
      expect(html).toContain("ACME Corp");
      expect(html).toContain("Implementación Enterprise");
      expect(text).toContain("Carlos Mendoza");
      expect(text).toContain("ACME Corp");
    });

    it("renders contact confirmation email in English correctly", () => {
      const { html, text } = renderContactConfirmationEmail({
        name: "Sarah Connor",
        email: "sarah@tech.io",
        subject: "AI Mesh Integration",
        message: "Need consulting on AI agent orchestration.",
        locale: "en",
      });

      expect(html).toContain("We have received your message");
      expect(html).toContain("Sarah Connor");
      expect(html).toContain("AI Mesh Integration");
      expect(text).toContain("Sarah Connor");
    });

    it("renders internal notification email with lead details", () => {
      const { html, text } = renderInternalNotificationEmail({
        name: "Elena Rostova",
        email: "elena@quantum.ai",
        company: "Quantum AI Labs",
        subject: "Alianza Estratégica",
        message: "Reunión técnica para evaluar modelos compartidos.",
        locale: "es",
      });

      expect(html).toContain("NUEVO LEAD CELAEST");
      expect(html).toContain("Elena Rostova");
      expect(html).toContain("elena@quantum.ai");
      expect(html).toContain("Quantum AI Labs");
      expect(text).toContain("Elena Rostova");
    });

    it("renders newsletter welcome email with branding and perks", () => {
      const { html, text } = renderNewsletterWelcomeEmail({
        email: "developer@corp.com",
        locale: "es",
      });

      expect(html).toContain("Bienvenido al ecosistema CELAEST");
      expect(html).toContain("Lanzamientos anticipados");
      expect(text).toContain("CELAEST Inc.");
    });
  });

  describe("EmailService Dispatch Logic", () => {
    it("runs in sandbox mode when RESEND_API_KEY is not set", async () => {
      const spyInfo = vi.spyOn(console, "info").mockImplementation(() => {});

      const result = await EmailService.sendEmail({
        to: "test@example.com",
        subject: "Prueba Sandbox",
        html: "<p>Hola</p>",
      });

      expect(result.success).toBe(true);
      expect(result.id).toMatch(/^mock_email_/);
      expect(spyInfo).toHaveBeenCalled();
    });

    it("handles contact flow in sandbox mode returning success for both client and internal", async () => {
      const { clientResult, internalResult } = await EmailService.sendContactEmails({
        name: "Juan Perez",
        email: "juan@empresa.com",
        message: "Consulta sobre planes",
        locale: "es",
      });

      expect(clientResult.success).toBe(true);
      expect(internalResult.success).toBe(true);
    });

    it("handles newsletter flow in sandbox mode successfully", async () => {
      const result = await EmailService.sendNewsletterWelcome({
        email: "subscriber@empresa.com",
        locale: "es",
      });

      expect(result.success).toBe(true);
    });
  });
});
