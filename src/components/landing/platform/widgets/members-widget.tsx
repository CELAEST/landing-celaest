"use client";

import React from "react";
import Image from "next/image";
import { LayoutDashboard, Users, KeyRound, Layers, Settings, Search, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import "../platform-previews.css";

const MEMBERS = [
  { name: "Esteban Rojas", role: "owner", avatar: "/images/platform/avatars/esteban.webp" },
  { name: "María González", role: "admin", avatar: "/images/platform/avatars/maria.webp" },
  { name: "Carlos Méndez", role: "member", avatar: "/images/platform/avatars/carlos.webp" },
  { name: "Lucía Torres", role: "member", avatar: "/images/platform/avatars/lucia.webp" },
] as const;

const NAV = [
  { key: "dashboard", icon: LayoutDashboard, active: true },
  { key: "members", icon: Users, active: false },
  { key: "licenses", icon: KeyRound, active: false },
  { key: "integrations", icon: Layers, active: false },
  { key: "settings", icon: Settings, active: false },
] as const;

export function MembersWidget() {
  const t = useTranslations("platform.widgetMembers");

  return (
    <div className="preview members-preview">
      {/* Mini Sidebar */}
      <div className="mini-sidebar">
        <div className="brand-header">
          <span className="brand-logo-wrap">
            <Logo color="#f8f7fb" />
          </span>
          <span className="brand-name">CELAEST</span>
        </div>
        {NAV.map(({ key, icon: Icon, active }) => (
          <div key={key} className={`side-item ${active ? "active" : ""}`}>
            <Icon size={12} className="shrink-0" />
            <span>{t(key)}</span>
          </div>
        ))}
      </div>

      {/* Main Table Content */}
      <div className="preview-main">
        <div>
          <div className="preview-head">
            <strong>{t("title")}</strong>
            <button type="button" className="invite">
              <Plus size={10} strokeWidth={2.5} />
              <span>{t("invite")}</span>
            </button>
          </div>

          <div className="search-line">
            <Search size={12} className="text-[#6f6e79] shrink-0" />
            <span>{t("search")}</span>
          </div>

          <div className="member-list">
            {MEMBERS.map((m) => (
              <div key={m.name} className="member-row">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={22}
                  height={22}
                  className="member-avatar-img"
                />
                <b>{m.name}</b>
                <small className="capitalize">{t(m.role)}</small>
                <div className="active-badge">
                  <span className="active-glow-dot" />
                  <span className="active-text">{t("active")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="preview-foot">
          <span>{t("membersCount")}</span>
          <span className="pagination-arrows">&lt; {t("pagination")} &gt;</span>
        </div>
      </div>
    </div>
  );
}
