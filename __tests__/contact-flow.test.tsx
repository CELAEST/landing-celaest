import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { buildContactFallbackBody, buildGmailComposeUrl, buildMailtoUrl } from "@/lib/contact";
import { handleContactPost } from "@/lib/email/contact-processor";
import { ContactProvider } from "@/components/contact/contact-context";
import { ContactTriggerLink } from "@/components/contact/contact-trigger-link";
import esMessages from "@/i18n/messages/es.json";

vi.mock("next-intl", () => ({
  useLocale: () => "es",
  useTranslations: (namespace: string) => {
    const dict =
      namespace === "contactModal" ? (esMessages.contactModal as Record<string, unknown>) : {};

    const resolveKey = (key: string): unknown => {
      return key.split(".").reduce<unknown>((acc, part) => {
        if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
          return (acc as Record<string, unknown>)[part];
        }
        return undefined;
      }, dict);
    };

    const fn = (key: string, params?: Record<string, string>) => {
      const value = resolveKey(key);
      if (typeof value !== "string") return key;
      if (!params) return value;
      return Object.entries(params).reduce((str, [k, v]) => str.replace(`{${k}}`, v), value);
    };
    fn.raw = (key: string) => resolveKey(key);
    return fn;
  },
}));

describe("Contact Flow, Gmail Links & Edge Processor", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds valid Gmail Web compose and mailto URLs with UTF-8 parameters", () => {
    const body = buildContactFallbackBody({
      name: "Carlos Méndez",
      company: "Andes Tech",
      replyEmail: "carlos@andes.co",
      message: "Necesitamos automatizar facturación.",
      locale: "es",
    });
    const gmailUrl = buildGmailComposeUrl({
      subject: "Consulta Plan Empresarial",
      body,
    });
    const mailtoUrl = buildMailtoUrl({
      subject: "Consulta Plan Empresarial",
    });

    const parsed = new URL(gmailUrl);
    expect(parsed.origin + parsed.pathname).toBe("https://mail.google.com/mail/");
    expect(parsed.searchParams.get("to")).toBe("support@celaest.com");
    expect(parsed.searchParams.get("su")).toBe("Consulta Plan Empresarial");
    expect(parsed.searchParams.get("body")).toContain("Carlos Méndez");
    expect(parsed.searchParams.get("body")).toContain("Andes Tech");
    expect(mailtoUrl).toBe("mailto:support@celaest.com?subject=Consulta%20Plan%20Empresarial");
  });

  it("rejects invalid JSON and hostile negative domain inputs with 400", async () => {
    const badJsonReq = new Request("https://celaest.com/api/contact", {
      method: "POST",
      body: "{bad-json",
    });
    expect((await handleContactPost(badJsonReq)).status).toBe(400);

    const shortNameReq = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A",
        email: "laura@empresa.com",
        message: "Mensaje suficientemente largo",
      }),
    });
    expect((await handleContactPost(shortNameReq)).status).toBe(400);

    const badEmailReq = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Laura Gómez",
        email: "not-an-email",
        message: "Mensaje suficientemente largo",
      }),
    });
    expect((await handleContactPost(badEmailReq)).status).toBe(400);

    const shortMsgReq = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Laura Gómez",
        email: "laura@empresa.com",
        message: "Hola",
      }),
    });
    expect((await handleContactPost(shortMsgReq)).status).toBe(400);
  });

  it("silently accepts honeypot spam without invoking external mail providers", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const req = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot",
        email: "bot@spam.test",
        message: "Buy cheap links",
        website: "https://spam.test",
      }),
    });

    const res = await handleContactPost(req, {
      apiKey: "re_test_key",
      strictProvider: true,
    });
    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns 503 with a prefilled Gmail fallback URL when strictProvider lacks an API key", async () => {
    const req = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Sofía Restrepo",
        email: "sofia@startup.co",
        company: "Startup CO",
        subject: "Consulta Plan Empresarial",
        message: "Queremos cotizar Malla IA BYOK.",
        locale: "es",
      }),
    });

    const res = await handleContactPost(req, {
      strictProvider: true,
      internalReceiver: "celaest.oficial@gmail.com",
    });

    expect(res.status).toBe(503);
    const data = (await res.json()) as {
      success: boolean;
      code: string;
      fallbackGmailUrl: string;
    };
    expect(data.success).toBe(false);
    expect(data.code).toBe("PROVIDER_NOT_CONFIGURED");
    expect(data.fallbackGmailUrl).toContain("https://mail.google.com/mail/");
    expect(data.fallbackGmailUrl).toContain("Consulta+Plan+Empresarial");
  });

  it("dispatches internal lead email first to configured Gmail receiver and then sends confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: "re_msg_123" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const req = new Request("https://celaest.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Mateo Silva",
        email: "mateo@cliente.co",
        company: "Cliente SAS",
        subject: "Consulta Plan Empresarial",
        message: "Interesados en automatizar operaciones y WhatsApp.",
        locale: "es",
      }),
    });

    const res = await handleContactPost(req, {
      apiKey: "re_live_mock",
      defaultFrom: "CELAEST <noreply@celaest.com>",
      internalReceiver: "celaest.oficial@gmail.com",
      rateLimitDelayMs: 0,
      strictProvider: true,
    });

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const firstCallBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(firstCallBody.to).toEqual(["celaest.oficial@gmail.com"]);
    expect(firstCallBody.reply_to).toBe("mateo@cliente.co");
    expect(firstCallBody.from).toBe("CELAEST <noreply@celaest.com>");

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    expect(secondCallBody.to).toEqual(["mateo@cliente.co"]);
  });

  it("opens ContactModal from ContactTriggerLink, submits to /api/contact, and shows fallback Gmail CTA when 503", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({
          success: false,
          code: "PROVIDER_NOT_CONFIGURED",
          error: "Usa Gmail directamente.",
          fallbackGmailUrl:
            "https://mail.google.com/mail/?view=cm&fs=1&to=support%40celaest.com&su=Consulta+Plan+Empresarial",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          message: "Tu consulta llegó directo al equipo de CELAEST.",
        }),
      });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <ContactProvider>
        <ContactTriggerLink subject="Consulta Plan Empresarial" source="pricing_enterprise">
          Contactar Ventas
        </ContactTriggerLink>
      </ContactProvider>,
    );

    const trigger = screen.getByRole("link", { name: "Contactar Ventas" });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByLabelText("Asunto")).toHaveValue("Consulta Plan Empresarial");

    fireEvent.change(screen.getByLabelText("Nombre completo *"), {
      target: { value: "Laura Gómez" },
    });
    fireEvent.change(screen.getByLabelText("Tu correo electrónico *"), {
      target: { value: "laura@empresa.co" },
    });
    fireEvent.change(screen.getByLabelText("¿En qué podemos ayudarte? *"), {
      target: { value: "Queremos implementar automatizaciones en Finanzas." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Usa Gmail directamente.");
    });
    expect(screen.getByRole("link", { name: "Enviar este mensaje por Gmail" })).toHaveAttribute(
      "href",
      "https://mail.google.com/mail/?view=cm&fs=1&to=support%40celaest.com&su=Consulta+Plan+Empresarial",
    );

    // Retry succeeds cleanly
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await waitFor(() => {
      expect(screen.getByText("Mensaje enviado")).toBeInTheDocument();
    });
  });
});
