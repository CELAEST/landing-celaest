"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Mail,
  X,
} from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { buildContactFallbackBody, buildGmailComposeUrl } from "@/lib/contact";
import type { ContactModalPreset } from "./contact-context";

interface ContactModalProps {
  isOpen: boolean;
  preset: ContactModalPreset;
  onClose: () => void;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactModal({ isOpen, preset, onClose }: ContactModalProps) {
  const t = useTranslations("contactModal");
  const locale = useLocale() === "en" ? "en" : "es";
  const titleId = useId();
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const topics = (t.raw("topics") as string[]) || [];
  const topicTabs = (t.raw("topicTabs") as string[]) || topics;
  const defaultSubject = preset.subject || topics[0] || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [serverFallbackUrl, setServerFallbackUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Reset feedback and apply incoming preset subject whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    setSubject(preset.subject || topics[0] || "");
    setSubmitState("idle");
    setErrorMsg("");
    setServerFallbackUrl(null);
    setCopied(false);

    const timer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 40);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, preset.subject]);

  // Body scroll lock & Esc dismissal
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const liveGmailUrl =
    serverFallbackUrl ||
    buildGmailComposeUrl({
      subject: subject || defaultSubject,
      body: buildContactFallbackBody({
        name: name.trim(),
        company: company.trim(),
        replyEmail: email.trim(),
        message: message.trim(),
        locale,
      }),
    });

  const trackEvent = (eventName: string, extra?: Record<string, string>) => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("event", eventName, {
        source: preset.source || "modal",
        subject: subject.slice(0, 80),
        ...extra,
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Clipboard blocked in strict contexts; anchor fallback remains available */
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMsg("");
    setServerFallbackUrl(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          subject,
          message,
          website,
          locale,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
        fallbackGmailUrl?: string;
      };

      if (!response.ok || !payload.success) {
        setSubmitState("error");
        setErrorMsg(payload.error || t("errors.network"));
        if (payload.fallbackGmailUrl) {
          setServerFallbackUrl(payload.fallbackGmailUrl);
        }
        return;
      }

      trackEvent("cta_contact_submit");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMsg(t("errors.network"));
    }
  };

  const handleDone = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setSubmitState("idle");
    onClose();
  };

  const underlineFieldClass =
    "w-full bg-transparent border-0 border-b border-[#24242b] focus:border-purple-500 rounded-none px-0 pt-1.5 pb-2 text-[13.5px] font-sans text-white tracking-[-0.01em] placeholder:text-[#4b4b55] focus:outline-none transition-colors";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md font-sans antialiased animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="relative w-full max-w-[820px] max-h-[92dvh] overflow-y-auto scrollbar-hide rounded-2xl bg-[#060609] border border-[#24242b] shadow-[0_32px_96px_rgba(0,0,0,0.9)] text-[#f8f7fb]">
        {/* Top laser violet hairline matching PricingSection & Solutions */}
        <div
          aria-hidden="true"
          className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        />

        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("closeAria")}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-[#24242b] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Zero-Box Editorial Split Architecture (Propuesta 01) */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* LEFT COLUMN: Editorial Header (PricingSection DNA) + Hairline Direct Links */}
          <div
            className="md:col-span-5 p-6 sm:p-7 border-b md:border-b-0 md:border-r border-[#24242b] flex flex-col justify-between gap-7"
            style={{
              backgroundImage:
                "radial-gradient(circle at 0% 0%, rgba(168,85,247,0.06) 0%, transparent 65%)",
            }}
          >
            <div>
              {/* Number + Hairline Rule (Matches pricing-number-wrap) */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <strong className="text-[13px] font-semibold text-purple-500 tabular-nums tracking-[-0.02em]">
                  {t("number")}
                </strong>
                <span aria-hidden="true" className="w-11 h-px bg-[#3d3947]" />
                <span className="text-[11px] font-medium text-[#9998a2] tracking-[-0.01em]">
                  {t("eyebrow")}
                </span>
              </div>

              <h2
                id={titleId}
                className="text-[26px] sm:text-[28px] font-semibold tracking-[-0.038em] leading-[1.12] text-white"
              >
                <span>{t("titleLead")}</span>
                <span className="block text-[#a9a8b5] font-medium">{t("titleAccent")}</span>
              </h2>

              <p className="text-[13.5px] text-[#9998a2] mt-3 leading-[1.48] tracking-[-0.01em]">
                {t("subtitle")}
              </p>
            </div>

            {/* Direct Hairline Rows (Open Gmail + Copy Email) */}
            <div className="flex flex-col">
              <a
                href={liveGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("cta_contact_gmail_direct")}
                className="group flex items-center justify-between gap-3 py-3 border-t border-b border-[#24242b] text-[#f3f2f5] hover:text-purple-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-[15px] h-[15px] text-purple-500 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium tracking-[-0.015em]">
                      {t("openGmail")}
                    </div>
                    <div className="text-[11.5px] text-zinc-500 truncate">
                      {subject || t("gmailHint")}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-[15px] h-[15px] text-zinc-500 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="group w-full flex items-center justify-between gap-3 py-3 border-b border-[#24242b] text-[#f3f2f5] hover:text-purple-300 transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {copied ? (
                    <Check className="w-[15px] h-[15px] text-emerald-400 shrink-0" />
                  ) : (
                    <Copy className="w-[15px] h-[15px] text-[#8e8e9a] group-hover:text-purple-300 shrink-0 transition-colors" />
                  )}
                  <span className="text-[13px] font-medium tracking-[-0.015em] truncate">
                    {SUPPORT_EMAIL}
                  </span>
                </div>
                <span
                  className={`text-[11.5px] font-medium tracking-[-0.01em] shrink-0 ${
                    copied ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {copied ? t("copiedEmail") : t("copyEmail")}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Zero-Box Architectural Form */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-center">
            {submitState === "success" ? (
              <div className="py-8 text-center space-y-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-[-0.025em]">
                  {t("successTitle")}
                </h3>
                <p className="text-[13px] text-[#9998a2] max-w-xs mx-auto leading-relaxed">
                  {t("successBody", { email })}
                </p>
                <button
                  type="button"
                  onClick={handleDone}
                  className="mt-2 inline-flex items-center justify-center px-6 h-10 rounded-lg bg-white text-[#09090b] font-semibold text-[13px] tracking-[-0.015em] hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  {t("done")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Editorial Underline Topic Switcher (Zero-Box Typography) */}
                {topics.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-3 mb-5 border-b border-[#24242b] pr-7">
                    {topics.map((fullSubject, idx) => {
                      const shortLabel = topicTabs[idx] || fullSubject;
                      const active = subject === fullSubject;
                      return (
                        <button
                          key={fullSubject}
                          type="button"
                          onClick={() => setSubject(fullSubject)}
                          className={`relative py-0.5 text-[12.5px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                            active
                              ? "text-white font-semibold"
                              : "text-zinc-500 hover:text-zinc-200"
                          }`}
                        >
                          {shortLabel}
                          {active && (
                            <span
                              aria-hidden="true"
                              className="absolute left-0 right-0 -bottom-[13px] h-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.75)]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Honeypot field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[11.5px] font-medium text-[#8e8e9a] tracking-[-0.01em]"
                    >
                      {t("fields.nameLabel")}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("fields.namePlaceholder")}
                      className={underlineFieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[11.5px] font-medium text-[#8e8e9a] tracking-[-0.01em]"
                    >
                      {t("fields.emailLabel")}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("fields.emailPlaceholder")}
                      className={underlineFieldClass}
                    />
                  </div>
                </div>

                {/* Row 2: Company + Editable Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-[11.5px] font-medium text-[#8e8e9a] tracking-[-0.01em]"
                    >
                      {t("fields.companyLabel")}
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      maxLength={100}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t("fields.companyPlaceholder")}
                      className={underlineFieldClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-[11.5px] font-medium text-[#8e8e9a] tracking-[-0.01em]"
                    >
                      {t("fields.subjectLabel")}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      maxLength={150}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={t("fields.subjectPlaceholder")}
                      className={underlineFieldClass}
                    />
                  </div>
                </div>

                {/* Row 3: Message */}
                <div className="mb-5">
                  <label
                    htmlFor="contact-message"
                    className="block text-[11.5px] font-medium text-[#8e8e9a] tracking-[-0.01em]"
                  >
                    {t("fields.messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={5}
                    maxLength={3000}
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("fields.messagePlaceholder")}
                    className={`${underlineFieldClass} resize-none leading-[1.5]`}
                  />
                </div>

                {submitState === "error" && (
                  <div
                    role="alert"
                    className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-2.5"
                  >
                    <span>{errorMsg}</span>
                    <a
                      href={liveGmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("cta_contact_gmail_fallback")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#09090b] font-semibold text-xs hover:bg-zinc-200 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{t("fallbackCta")}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitState === "submitting"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[22px] h-10 rounded-lg bg-white text-[#09090b] font-semibold text-[13px] tracking-[-0.015em] hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t("submitting")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("submit")}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
