import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmailService } from "@/lib/email/email-service";
import {
  renderContactConfirmationEmail,
  renderInternalNotificationEmail,
  renderNewsletterWelcomeEmail,
  renderAuthVerificationEmail,
  renderPasswordResetEmail,
  renderSecurityAlertEmail,
  renderInvoiceReceiptEmail,
  renderPaymentFailedEmail,
  renderWorkspaceInviteEmail,
  renderQuotaAlertEmail,
  renderWeeklyDigestEmail,
} from "@/lib/email/templates";

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

    it("renders auth verification email with one-time code and magic link", () => {
      const { html, text } = renderAuthVerificationEmail({
        name: "Carlos",
        email: "carlos@acme.corp",
        magicLinkUrl: "https://app.celaest.com/auth/verify?token=xyz",
        code: "982341",
        locale: "es",
      });

      expect(html).toContain("Inicia sesión en CELAEST");
      expect(html).toContain("982341");
      expect(html).toContain("https://app.celaest.com/auth/verify?token=xyz");
      expect(text).toContain("982341");
    });

    it("renders password reset email with secure alert callout", () => {
      const { html, text } = renderPasswordResetEmail({
        name: "Valeria",
        email: "valeria@tech.io",
        resetUrl: "https://app.celaest.com/auth/reset?token=abc",
        locale: "es",
      });

      expect(html).toContain("Restablecimiento de contraseña");
      expect(html).toContain("https://app.celaest.com/auth/reset?token=abc");
      expect(text).toContain("Restablecer Contraseña");
    });

    it("renders security alert email with device, IP and location details", () => {
      const { html, text } = renderSecurityAlertEmail({
        name: "Esteban",
        email: "esteban@celaest.com",
        device: "Chrome 131 / Windows 11",
        location: "Bogotá, Colombia",
        ipAddress: "190.156.44.12",
        timestamp: "2026-11-10 20:30 UTC",
        locale: "es",
      });

      expect(html).toContain("Nuevo inicio de sesión detectado");
      expect(html).toContain("Chrome 131 / Windows 11");
      expect(html).toContain("190.156.44.12");
      expect(text).toContain("Bogotá, Colombia");
    });

    it("renders B2B invoice receipt with formatted currency and invoice number", () => {
      const { html, text } = renderInvoiceReceiptEmail({
        customerName: "Acme Enterprises",
        email: "billing@acme.corp",
        invoiceNumber: "INV-2026-881",
        planName: "Enterprise Platinum",
        amount: "990.00",
        currency: "USD",
        period: "Anual",
        last4: "8891",
        locale: "es",
      });

      expect(html).toContain("INV-2026-881");
      expect(html).toContain("990.00 USD");
      expect(html).toContain("Enterprise Platinum");
      expect(text).toContain("8891");
    });

    it("renders payment failed email with retry date and warning callout", () => {
      const { html, text } = renderPaymentFailedEmail({
        customerName: "Startup Inc",
        planName: "Professional",
        amount: "49.00",
        currency: "USD",
        last4: "4242",
        retryDate: "15 de Noviembre, 2026",
        updatePaymentUrl: "https://app.celaest.com/settings/billing",
        locale: "es",
      });

      expect(html).toContain("Pago no procesado");
      expect(html).toContain("49.00 USD");
      expect(html).toContain("15 de Noviembre, 2026");
      expect(text).toContain("Startup Inc");
    });

    it("renders workspace invitation with inviter, organization and role", () => {
      const { html, text } = renderWorkspaceInviteEmail({
        inviterName: "Sophia Loren",
        organizationName: "Nova AI Labs",
        inviteeEmail: "dev@nova.ai",
        role: "Lead Architect",
        inviteUrl: "https://app.celaest.com/invite/accept?id=nova123",
        locale: "es",
      });

      expect(html).toContain("Sophia Loren te invitó a unirte a Nova AI Labs");
      expect(html).toContain("Lead Architect");
      expect(html).toContain("Nova AI Labs");
      expect(text).toContain("Sophia Loren");
    });

    it("renders workspace quota alert with token consumption stats", () => {
      const { html, text } = renderQuotaAlertEmail({
        organizationName: "Omni Corp",
        adminName: "Alex Rivera",
        percentageUsed: 92,
        consumedTokens: "4,600,000",
        totalTokens: "5,000,000",
        resetDate: "01 de Diciembre",
        upgradeUrl: "https://app.celaest.com/settings/billing/scale",
        locale: "es",
      });

      expect(html).toContain("92%");
      expect(html).toContain("4,600,000 / 5,000,000");
      expect(html).toContain("Omni Corp");
      expect(text).toContain("Alex Rivera");
    });

    it("renders weekly digest with metrics summary row", () => {
      const { html, text } = renderWeeklyDigestEmail({
        userName: "Esteban",
        startDate: "03 Nov",
        endDate: "09 Nov",
        tasksCompleted: 142,
        hoursSaved: "18.5",
        learningProgress: "98.4%",
        dashboardUrl: "https://app.celaest.com/dashboard",
        locale: "es",
      });

      expect(html).toContain("Tu resumen semanal de CELAEST");
      expect(html).toContain("142");
      expect(html).toContain("18.5h");
      expect(html).toContain("98.4%");
      expect(text).toContain("Esteban");
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
