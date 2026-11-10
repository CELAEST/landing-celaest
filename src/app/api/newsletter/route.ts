import { NextRequest, NextResponse } from "next/server";
import { EmailService } from "@/lib/email/email-service";
import { NewsletterFormData } from "@/lib/email/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-Spam Honeypot
    if (body.website || body.hp) {
      return NextResponse.json({ success: true, message: "Suscrito exitosamente" });
    }

    const { email, locale } = body;

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Por favor proporciona un correo electrónico válido" },
        { status: 400 },
      );
    }

    const formData: NewsletterFormData = {
      email: email.trim().toLowerCase().slice(0, 120),
      locale: locale === "en" ? "en" : "es",
    };

    const result = await EmailService.sendNewsletterWelcome(formData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "No se pudo procesar la suscripción" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        formData.locale === "en"
          ? "Welcome! We've sent a confirmation to your email."
          : "¡Bienvenido! Hemos enviado una confirmación a tu correo.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error interno del servidor";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
