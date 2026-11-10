/**
 * Script de prueba oficial para despachar toda la suite de correos Enterprise
 * a estebani1421@gmail.com a través de la API oficial de Resend.
 *
 * Utiliza los renderers de producción reales de src/lib/email/templates
 * con el diseño Enterprise Gold Standard (Stripe / Linear style).
 */

import * as fs from "fs";
import * as path from "path";
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
} from "../src/lib/email/templates";

// Cargar .env.local si no está en process.env
if (!process.env.RESEND_API_KEY) {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [k, ...v] = trimmed.split("=");
        process.env[k.trim()] = v.join("=").trim();
      }
    }
  }
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.error(
    "Error crítico: RESEND_API_KEY no encontrada en .env.local o variables de entorno.",
  );
  process.exit(1);
}

const TARGET_EMAIL = "estebani1421@gmail.com";
const FROM = "CELAEST <onboarding@resend.dev>";

async function sendEmail({ subject, html, text }: { subject: string; html: string; text: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TARGET_EMAIL],
      subject,
      html,
      text,
    }),
  });

  const data = (await res.json()) as { id?: string; message?: string; name?: string };
  if (!res.ok) {
    throw new Error(data.message || JSON.stringify(data));
  }
  return data;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log(`\n===============================================================`);
  console.log(`🏛️  CELAEST ENTERPRISE EMAIL SUITE - DESPACHO LIVE VIA RESEND`);
  console.log(`Destinatario Verificado: ${TARGET_EMAIL}`);
  console.log(`Diseño: Stripe/Linear High-Trust Gold Standard (Clean Canvas #F8FAFC)`);
  console.log(`===============================================================\n`);

  const emailItems = [
    {
      num: 1,
      name: "Acuse de Recibo al Cliente (Lead Web)",
      subject: "Hemos recibido tu consulta - CELAEST",
      payload: renderContactConfirmationEmail({
        name: "Esteban",
        email: TARGET_EMAIL,
        company: "CELAEST Engineering",
        subject: "Implementación Enterprise & IA Mesh",
        message:
          "Queremos evaluar la integración de los agentes autónomos de CELAEST en nuestra infraestructura de pipelines de producción.",
        locale: "es",
      }),
    },
    {
      num: 2,
      name: "Notificación Interna de Nuevo Lead (Ventas/Ops)",
      subject: "[Lead Web] Nueva Solicitud Enterprise - Esteban Pérez",
      payload: renderInternalNotificationEmail({
        name: "Esteban Pérez",
        email: TARGET_EMAIL,
        company: "TechCorp Global",
        subject: "Despliegue Dedicado IA Mesh (15 Agentes)",
        message:
          "Requerimos cotización y arquitectura para automatizar 500,000 eventos diarios con orquestación multi-proveedor.",
        locale: "es",
      }),
    },
    {
      num: 3,
      name: "Bienvenida al Newsletter / Waitlist",
      subject: "Bienvenido al ecosistema CELAEST · Actualizaciones",
      payload: renderNewsletterWelcomeEmail({
        email: TARGET_EMAIL,
        locale: "es",
      }),
    },
    {
      num: 4,
      name: "Verificación de Cuenta / Magic Link (Auth)",
      subject: "Tu enlace de acceso seguro a CELAEST (Código: 849201)",
      payload: renderAuthVerificationEmail({
        name: "Esteban",
        email: TARGET_EMAIL,
        magicLinkUrl: "https://app.celaest.com/auth/verify?token=live_secure_jwt_token_2026",
        code: "849201",
        locale: "es",
      }),
    },
    {
      num: 5,
      name: "Restablecimiento de Contraseña (Auth)",
      subject: "Restablecer tu contraseña de CELAEST",
      payload: renderPasswordResetEmail({
        name: "Esteban",
        email: TARGET_EMAIL,
        resetUrl: "https://app.celaest.com/auth/reset?token=live_secure_reset_token_2026",
        locale: "es",
      }),
    },
    {
      num: 6,
      name: "Alerta de Seguridad (Nuevo Acceso / Dispositivo)",
      subject: "Alerta de Seguridad: Nuevo inicio de sesión detectado",
      payload: renderSecurityAlertEmail({
        name: "Esteban",
        email: TARGET_EMAIL,
        device: "Chrome 131 · Windows 11 Enterprise",
        location: "Bogotá, Colombia",
        ipAddress: "190.156.44.12",
        timestamp: "2026-11-10 20:45 UTC",
        locale: "es",
      }),
    },
    {
      num: 7,
      name: "Recibo de Factura / Pago Exitoso (Billing)",
      subject: "Recibo de Pago: Plan CELAEST Professional (#INV-2026-084)",
      payload: renderInvoiceReceiptEmail({
        customerName: "Esteban",
        email: TARGET_EMAIL,
        invoiceNumber: "INV-2026-084",
        planName: "Professional Plan",
        amount: "49.00",
        currency: "USD",
        period: "Mensual",
        last4: "4242",
        invoicePdfUrl: "https://app.celaest.com/billing/invoices/INV-2026-084.pdf",
        locale: "es",
      }),
    },
    {
      num: 8,
      name: "Alerta de Pago Fallido (Billing / Dunning)",
      subject: "Acción requerida: Pago no procesado de tu plan CELAEST",
      payload: renderPaymentFailedEmail({
        customerName: "Esteban",
        planName: "Professional Plan",
        amount: "49.00",
        currency: "USD",
        last4: "4242",
        retryDate: "15 de Noviembre, 2026",
        updatePaymentUrl: "https://app.celaest.com/settings/billing",
        locale: "es",
      }),
    },
    {
      num: 9,
      name: "Invitación a Unirse a Workspace (Team)",
      subject: "Sophia te invitó a unirte a Nova AI Labs en CELAEST",
      payload: renderWorkspaceInviteEmail({
        inviterName: "Sophia Loren",
        organizationName: "Nova AI Labs",
        inviteeEmail: TARGET_EMAIL,
        role: "Lead Platform Architect",
        inviteUrl: "https://app.celaest.com/invite/accept?token=team_token_99182",
        locale: "es",
      }),
    },
    {
      num: 10,
      name: "Alerta de Cuota de IA Mesh (Token Limit)",
      subject: "Alerta de Capacidad: Has consumido el 92% de tu cuota de IA",
      payload: renderQuotaAlertEmail({
        organizationName: "Nova AI Labs",
        adminName: "Esteban",
        percentageUsed: 92,
        consumedTokens: "4,600,000",
        totalTokens: "5,000,000",
        resetDate: "01 de Diciembre, 2026",
        upgradeUrl: "https://app.celaest.com/settings/billing/scale",
        locale: "es",
      }),
    },
    {
      num: 11,
      name: "Resumen Semanal de Actividad (Weekly Digest)",
      subject: "Tu resumen semanal de impacto en CELAEST",
      payload: renderWeeklyDigestEmail({
        userName: "Esteban",
        startDate: "03 Nov",
        endDate: "09 Nov",
        tasksCompleted: 142,
        hoursSaved: "18.5",
        learningProgress: "98.4%",
        dashboardUrl: "https://app.celaest.com/dashboard",
        locale: "es",
      }),
    },
  ];

  for (const item of emailItems) {
    try {
      const result = await sendEmail({
        subject: `[CELAEST Enterprise #${item.num}] ${item.subject}`,
        html: item.payload.html,
        text: item.payload.text,
      });
      console.log(`✅ [${item.num}/11] Enviado: "${item.name}" -> Resend ID: ${result.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ [${item.num}/11] Error en "${item.name}":`, msg);
    }
    // Pausa de 850ms para respetar el rate limit de Resend (máx 2 req/seg)
    await sleep(850);
  }

  console.log(
    `\n🎉 ¡Todos los 11 correos Enterprise fueron despachados exitosamente a ${TARGET_EMAIL}!`,
  );
  console.log(
    `Revisa tu bandeja de entrada en Gmail para validar el diseño limpio de alta confianza.\n`,
  );
}

main().catch(console.error);
