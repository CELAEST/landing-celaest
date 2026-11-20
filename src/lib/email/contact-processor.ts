import { EmailService } from "./email-service";
import { ContactFormData, EmailRuntimeConfig, NewsletterFormData } from "./types";
import { buildContactFallbackBody, buildGmailComposeUrl } from "../contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

async function parseJsonObject(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  return Boolean(body.website || body.hp);
}

/**
 * Shared runtime-agnostic POST processor for /api/contact (Next.js Route + Cloudflare Worker).
 */
export async function handleContactPost(
  request: Request,
  runtimeConfig?: EmailRuntimeConfig,
): Promise<Response> {
  const body = await parseJsonObject(request);
  if (!body) {
    return jsonResponse({ success: false, error: "Invalid JSON payload" }, 400);
  }

  if (isHoneypotTriggered(body)) {
    return jsonResponse({ success: true, message: "Mensaje recibido correctamente" });
  }

  const { name, email, company, subject, message, locale } = body;
  const resolvedLocale: "es" | "en" = locale === "en" ? "en" : "es";
  const isEn = resolvedLocale === "en";

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return jsonResponse(
      {
        success: false,
        error: isEn
          ? "Please enter your name (at least 2 characters)."
          : "El nombre es obligatorio y debe tener al menos 2 caracteres.",
      },
      400,
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return jsonResponse(
      {
        success: false,
        error: isEn
          ? "Please provide a valid email address."
          : "Por favor proporciona un correo electrónico válido.",
      },
      400,
    );
  }

  if (!message || typeof message !== "string" || message.trim().length < 5) {
    return jsonResponse(
      {
        success: false,
        error: isEn
          ? "Your message must be at least 5 characters."
          : "El mensaje debe tener al menos 5 caracteres.",
      },
      400,
    );
  }

  const formData: ContactFormData = {
    name: name.trim().slice(0, 100),
    email: email.trim().toLowerCase().slice(0, 120),
    company: company && typeof company === "string" ? company.trim().slice(0, 100) : undefined,
    subject: subject && typeof subject === "string" ? subject.trim().slice(0, 150) : undefined,
    message: message.trim().slice(0, 3000),
    locale: resolvedLocale,
  };

  const fallbackGmailUrl = buildGmailComposeUrl({
    subject: formData.subject || (isEn ? "CELAEST Sales Inquiry" : "Consulta Comercial CELAEST"),
    body: buildContactFallbackBody({
      name: formData.name,
      company: formData.company,
      replyEmail: formData.email,
      message: formData.message,
      locale: resolvedLocale,
    }),
  });

  if (runtimeConfig?.strictProvider && !runtimeConfig.apiKey) {
    return jsonResponse(
      {
        success: false,
        code: "PROVIDER_NOT_CONFIGURED",
        fallbackGmailUrl,
        error: isEn
          ? "Direct delivery is being activated. Please send your message in one click via Gmail below."
          : "El envío automático está pendiente de activación. Puedes enviarlo en un clic directo por Gmail aquí abajo.",
      },
      503,
    );
  }

  const { internalResult } = await EmailService.sendContactEmails(formData, runtimeConfig);

  if (!internalResult.success) {
    return jsonResponse(
      {
        success: false,
        code: "DELIVERY_FAILED",
        fallbackGmailUrl,
        error:
          internalResult.error ||
          (isEn
            ? "Could not send email automatically. Please open Gmail below."
            : "No se pudo enviar automáticamente. Usa el botón de Gmail aquí abajo."),
      },
      502,
    );
  }

  return jsonResponse({
    success: true,
    message: isEn
      ? "Your inquiry was sent to CELAEST. Check your inbox for confirmation."
      : "Tu consulta llegó directo al equipo de CELAEST. Revisa tu bandeja para confirmar.",
  });
}

/**
 * Shared runtime-agnostic POST processor for /api/newsletter (Next.js Route + Cloudflare Worker).
 */
export async function handleNewsletterPost(
  request: Request,
  runtimeConfig?: EmailRuntimeConfig,
): Promise<Response> {
  const body = await parseJsonObject(request);
  if (!body) {
    return jsonResponse({ success: false, error: "Invalid JSON payload" }, 400);
  }

  if (isHoneypotTriggered(body)) {
    return jsonResponse({ success: true, message: "Suscrito exitosamente" });
  }

  const { email, locale } = body;
  const resolvedLocale: "es" | "en" = locale === "en" ? "en" : "es";
  const isEn = resolvedLocale === "en";

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return jsonResponse(
      {
        success: false,
        error: isEn
          ? "Please provide a valid email address."
          : "Por favor proporciona un correo electrónico válido.",
      },
      400,
    );
  }

  if (runtimeConfig?.strictProvider && !runtimeConfig.apiKey) {
    return jsonResponse(
      {
        success: false,
        code: "PROVIDER_NOT_CONFIGURED",
        error: isEn
          ? "Newsletter delivery is temporarily unavailable."
          : "La suscripción automática está temporalmente deshabilitada.",
      },
      503,
    );
  }

  const formData: NewsletterFormData = {
    email: email.trim().toLowerCase().slice(0, 120),
    locale: resolvedLocale,
  };

  const result = await EmailService.sendNewsletterWelcome(formData, runtimeConfig);

  if (!result.success) {
    return jsonResponse(
      { success: false, error: result.error || "No se pudo procesar la suscripción" },
      502,
    );
  }

  return jsonResponse({
    success: true,
    message: isEn
      ? "Welcome! We've sent a confirmation to your email."
      : "¡Bienvenido! Hemos enviado una confirmación a tu correo.",
  });
}
