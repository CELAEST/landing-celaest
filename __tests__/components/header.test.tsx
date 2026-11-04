import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Header } from "../../src/components/landing/header";

// Mock next-intl hooks
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      signIn: "Iniciar Sesión",
      signUp: "Registrarse",
    };
    return translations[key] || key;
  },
  useLocale: () => "es",
}));

// Mock navigation hooks
vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock routing constants
vi.mock("@/i18n/routing", () => ({
  routing: { locales: ["en", "es"] },
  localeNames: { en: "English", es: "Español" },
  localeCodes: { en: "EN", es: "ES" },
}));

test("Header renders with Spanish text without overflow classes and preserves desktop styling", () => {
  render(<Header />);

  // Brand Logo
  const brandLink = screen.getByRole("link", { name: /CELAEST/i });
  expect(brandLink).toBeInTheDocument();
  expect(brandLink.className).toContain("tracking-[0.18em]");
  expect(brandLink.className).toContain("sm:tracking-[0.42em]");

  // Sign In Link
  const signInLink = screen.getByText("Iniciar Sesión");
  expect(signInLink).toBeInTheDocument();
  expect(signInLink.className).toContain("whitespace-nowrap");
  expect(signInLink.className).toContain("text-[11px]");
  expect(signInLink.className).toContain("sm:text-sm");

  // Sign Up Link
  const signUpLink = screen.getByText("Registrarse").closest("a");
  expect(signUpLink).toBeInTheDocument();
  expect(signUpLink?.className).toContain("whitespace-nowrap");
  expect(signUpLink?.className).toContain("text-[11px]");
  expect(signUpLink?.className).toContain("sm:text-[13px]");
});
