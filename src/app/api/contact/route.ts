import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email/email-service";
import { ContactFormData } from "@/lib/email/types";

// Validador básico de email RFC 5322 simplificado
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Anti-Spam Honeypot: si el campo oculto "website" o "hp" viene lleno, es un bot
    if (body.website || body.hp) {
      return NextResponse.json({ success: true, message: "Mensaje recibido correctamente" });
    }

    const { name, email, company, subject, message, locale } = body;

    // 2. Validación de campos obligatorios
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "El nombre es obligatorio y debe tener al menos 2 caracteres" },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Por favor proporciona un correo electrónico válido" },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "El mensaje debe tener al menos 5 caracteres" },
        { status: 400 },
      );
    }

    const formData: ContactFormData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      company: company && typeof company === "string" ? company.trim().slice(0, 100) : undefined,
      subject: subject && typeof subject === "string" ? subject.trim().slice(0, 150) : undefined,
      message: message.trim().slice(0, 3000),
      locale: locale === "en" ? "en" : "es",
    };

    // 3. Envío de correos
    const { clientResult, internalResult } = await EmailService.sendContactEmails(formData);

    if (!internalResult.success && !clientResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: internalResult.error || "No se pudo procesar el envío del correo",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        formData.locale === "en"
          ? "Your inquiry has been sent successfully. Check your inbox for confirmation."
          : "Tu consulta ha sido enviada con éxito. Revisa tu bandeja de entrada.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error interno del servidor";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
