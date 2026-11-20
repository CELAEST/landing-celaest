import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import esMessages from "../../src/i18n/messages/es.json";
import enMessages from "../../src/i18n/messages/en.json";
import { DEFAULT_EN_PRICING, DEFAULT_ES_PRICING } from "../../src/lib/geo-pricing";
import { PricingSection } from "../../src/components/landing/pricing-section";

let currentLocale: "es" | "en" = "es";

function resolveMessage(obj: unknown, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((acc, seg) => {
    if (acc && typeof acc === "object" && seg in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[seg];
    }
    return undefined;
  }, obj);
}

vi.mock("next-intl", () => ({
  useLocale: () => currentLocale,
  useTranslations: (ns?: string) => {
    const dict = currentLocale === "es" ? esMessages : enMessages;
    const base = ns ? resolveMessage(dict, ns) : dict;
    const fn = (key: string, values?: Record<string, unknown>) => {
      const raw = resolveMessage(base, key);
      if (typeof raw !== "string") return key;
      if (!values) return raw;
      return raw.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
    };
    fn.raw = (key: string) => resolveMessage(base, key);
    return fn;
  },
}));

describe("PricingSection & Geo-Pricing Alignment (Zero Discrepancy)", () => {
  beforeEach(() => {
    currentLocale = "es";
    window.localStorage.clear();
  });

  it("matches authoritative backend CO & US prices in default geo-pricing contexts", () => {
    const esStarter = DEFAULT_ES_PRICING.plans.find((p) => p.plan_code === "starter");
    const esPro = DEFAULT_ES_PRICING.plans.find((p) => p.plan_code === "pro");
    const esEnterprise = DEFAULT_ES_PRICING.plans.find((p) => p.plan_code === "enterprise");

    expect(esStarter?.local_price_monthly).toBe(0);
    expect(esPro?.local_price_monthly).toBe(73000);
    expect(esPro?.local_price_yearly).toBe(720000);
    expect(esEnterprise?.local_price_monthly).toBe(250000);
    expect(esEnterprise?.local_price_yearly).toBe(2500000);

    const enStarter = DEFAULT_EN_PRICING.plans.find((p) => p.plan_code === "starter");
    const enPro = DEFAULT_EN_PRICING.plans.find((p) => p.plan_code === "pro");
    const enEnterprise = DEFAULT_EN_PRICING.plans.find((p) => p.plan_code === "enterprise");

    expect(enStarter?.local_price_monthly).toBe(0);
    expect(enPro?.local_price_monthly).toBe(29);
    expect(enPro?.local_price_yearly).toBe(288);
    expect(enEnterprise?.local_price_monthly).toBe(99);
    expect(enEnterprise?.local_price_yearly).toBe(990);
  });

  it("maintains strict ES/EN pricing schema parity without legacy tier keys", () => {
    expect(Object.keys(esMessages.pricing.plans)).toEqual(["starter", "pro", "enterprise"]);
    expect(Object.keys(enMessages.pricing.plans)).toEqual(["starter", "pro", "enterprise"]);
    expect(esMessages.pricing.plans.starter.price).toBe("0");
    expect(esMessages.pricing.plans.pro.price).toBe("29");
    expect(esMessages.pricing.plans.enterprise.price).toBe("99");
  });

  it("renders Starter ($0 forever), Pro (73.000 COP / $29 USD), and Enterprise (250.000 COP / $99 USD) with real signup routes", () => {
    render(<PricingSection />);

    // Plan names and Starter free state
    expect(screen.getByRole("heading", { name: "Starter" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Enterprise" })).toBeInTheDocument();
    expect(screen.getByText("para siempre")).toBeInTheDocument();
    expect(screen.getByText("Sin tarjeta de crédito requerida")).toBeInTheDocument();

    // Exact Colombia monthly amounts
    expect(screen.getByText("73.000")).toBeInTheDocument();
    expect(screen.getByText("250.000")).toBeInTheDocument();

    // Real quotas strip
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("500K")).toBeInTheDocument();
    expect(screen.getByText("1.0M")).toBeInTheDocument();
    expect(screen.getByText("2 Miembros")).toBeInTheDocument();
    expect(screen.getByText("15 Miembros")).toBeInTheDocument();
    expect(screen.getByText("Ilimitado")).toBeInTheDocument();

    // Direct checkout URLs for starter, pro, enterprise
    const ctaLinks = screen.getAllByRole("link", { name: "Comenzar" });
    expect(ctaLinks).toHaveLength(3);
    expect(ctaLinks[0].getAttribute("href")).toContain("plan=starter");
    expect(ctaLinks[1].getAttribute("href")).toContain("plan=pro&billing_cycle=monthly");
    expect(ctaLinks[2].getAttribute("href")).toContain("plan=enterprise&billing_cycle=monthly");

    // Switching to yearly keeps Starter at $0 and updates Pro/Enterprise to real CO yearly totals
    fireEvent.click(screen.getByRole("tab", { name: /Anual/i }));
    expect(screen.getByText("720.000")).toBeInTheDocument();
    expect(screen.getByText("2.500.000")).toBeInTheDocument();
    expect(screen.getByText("para siempre")).toBeInTheDocument();
    expect(ctaLinks[1].getAttribute("href")).toContain("plan=pro&billing_cycle=yearly");
    expect(ctaLinks[2].getAttribute("href")).toContain("plan=enterprise&billing_cycle=yearly");
  });

  it("renders US/USD default pricing cleanly in English locale", () => {
    currentLocale = "en";
    render(<PricingSection />);

    expect(screen.getByText("forever")).toBeInTheDocument();
    expect(screen.getByText("No credit card required")).toBeInTheDocument();
    expect(screen.getByText("29.00")).toBeInTheDocument();
    expect(screen.getByText("99.00")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: /Yearly/i }));
    expect(screen.getByText("288.00")).toBeInTheDocument();
    expect(screen.getByText("990.00")).toBeInTheDocument();
  });
});
