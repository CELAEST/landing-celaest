export interface AnalyticsEventPayload {
  name: string;
  params: Record<string, string>;
}

/**
 * Maps anchor clicks to structured GA4 / Clarity conversion events without
 * scattering tracking handlers across UI components.
 */
export function resolveClickConversionEvent(
  rawHref: string | null,
  sourcePath: string,
  ctaLabel: string,
): AnalyticsEventPayload | null {
  if (!rawHref) return null;

  const trimmed = rawHref.trim();
  if (!trimmed || trimmed === "#") return null;

  const cleanLabel = ctaLabel.trim().slice(0, 80);

  if (trimmed.startsWith("mailto:")) {
    return {
      name: "cta_contact_click",
      params: { source_path: sourcePath, cta_label: cleanLabel },
    };
  }

  if (trimmed.includes("#pricing")) {
    return {
      name: "cta_pricing_click",
      params: { source_path: sourcePath, cta_label: cleanLabel },
    };
  }

  if (trimmed.includes("dashboard.celaest.com")) {
    try {
      const url = new URL(trimmed);
      const mode = url.searchParams.get("mode");
      const tab = url.searchParams.get("tab");
      const plan = url.searchParams.get("plan") || "default";
      const billingCycle = url.searchParams.get("billing_cycle") || "default";

      if (mode === "signup") {
        return {
          name: "cta_signup_click",
          params: {
            plan,
            billing_cycle: billingCycle,
            source_path: sourcePath,
            cta_label: cleanLabel,
          },
        };
      }

      if (mode === "signin") {
        return {
          name: "cta_signin_click",
          params: { source_path: sourcePath, cta_label: cleanLabel },
        };
      }

      if (tab === "marketplace") {
        return {
          name: "cta_marketplace_click",
          params: { source_path: sourcePath, cta_label: cleanLabel },
        };
      }

      if (tab === "docs") {
        return {
          name: "cta_docs_click",
          params: { source_path: sourcePath, cta_label: cleanLabel },
        };
      }

      return {
        name: "cta_dashboard_click",
        params: { source_path: sourcePath, cta_label: cleanLabel },
      };
    } catch {
      return null;
    }
  }

  if (/^\/(es|en)?\/?solutions(\/[a-z-]+)?/.test(trimmed)) {
    return {
      name: "solution_explore_click",
      params: {
        target_path: trimmed,
        source_path: sourcePath,
        cta_label: cleanLabel,
      },
    };
  }

  return null;
}
