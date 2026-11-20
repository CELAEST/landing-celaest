import { describe, it, expect } from "vitest";
import { resolveClickConversionEvent } from "@/lib/analytics-events";

describe("Analytics Conversion Event Resolver", () => {
  it("tracks signup clicks with plan and billing cycle parameters", () => {
    const event = resolveClickConversionEvent(
      "https://dashboard.celaest.com/?mode=signup&plan=pro&billing_cycle=yearly",
      "/es/solutions/lingua",
      "Activar CELAEST Lingua",
    );

    expect(event).toEqual({
      name: "cta_signup_click",
      params: {
        plan: "pro",
        billing_cycle: "yearly",
        source_path: "/es/solutions/lingua",
        cta_label: "Activar CELAEST Lingua",
      },
    });
  });

  it("tracks signin, marketplace, docs, and solution navigation clicks", () => {
    expect(
      resolveClickConversionEvent(
        "https://dashboard.celaest.com/?mode=signin",
        "/es",
        "Iniciar Sesión",
      )?.name,
    ).toBe("cta_signin_click");

    expect(
      resolveClickConversionEvent(
        "https://dashboard.celaest.com/?tab=marketplace",
        "/es",
        "Explorar Todos los Productos",
      )?.name,
    ).toBe("cta_marketplace_click");

    expect(
      resolveClickConversionEvent("/es/solutions/ai-mesh", "/es/solutions", "Explorar solución")
        ?.name,
    ).toBe("solution_explore_click");

    expect(
      resolveClickConversionEvent(
        "mailto:support@celaest.com",
        "/es/faq",
        "Escribir a support@celaest.com",
      )?.name,
    ).toBe("cta_contact_click");
  });

  it("ignores empty or non-conversion anchor links", () => {
    expect(resolveClickConversionEvent(null, "/es", "")).toBeNull();
    expect(resolveClickConversionEvent("#", "/es", "")).toBeNull();
    expect(resolveClickConversionEvent("https://github.com/celaest", "/es", "GitHub")).toBeNull();
  });
});
