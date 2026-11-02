import Image from "next/image";
import {
  Hexagon,
  LayoutDashboard,
  Users,
  KeyRound,
  Layers,
  Settings,
  Search,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { useTranslations } from "next-intl";

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
    <div className="flex h-full w-full gap-3 text-neutral-300 select-none items-stretch">
      <div className="flex flex-col gap-1 w-[112px] shrink-0 border-r border-white/[0.06] pr-2">
        <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-1">
          <Hexagon className="w-3.5 h-3.5 text-white/90" />
        </div>
        {NAV.map(({ key, icon: Icon, active }) => (
          <div
            key={key}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] whitespace-nowrap transition-colors ${active ? "bg-[#7c3aed]/20 text-[#c4b5fd] border border-[#7c3aed]/30 font-medium" : "text-neutral-400 hover:text-white"}`}
          >
            <Icon className="w-3 h-3 shrink-0" />
            <span>{t(key)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-bold text-white tracking-tight">{t("title")}</span>
            <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#7c3aed] text-white text-[10px] font-medium shadow-sm shadow-purple-900/40">
              <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
              <span>{t("invite")}</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] w-full max-w-[170px] mb-2 text-[10px] text-neutral-500">
            <Search className="w-3 h-3 shrink-0" />
            <span>{t("search")}</span>
          </div>
          <div className="flex flex-col divide-y divide-white/[0.03]">
            {MEMBERS.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between py-1.5 text-[10.5px] px-0.5"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Image
                    src={m.avatar}
                    alt={m.name}
                    width={22}
                    height={22}
                    className="w-5 h-5 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <span className="text-white/95 font-medium whitespace-nowrap">{m.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-neutral-400 capitalize text-[10px] w-12 text-left">
                    {t(m.role)}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                    <span>{t("active")}</span>
                  </div>
                  <MoreHorizontal className="w-3 h-3 text-neutral-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.05] text-[10px] text-neutral-500 font-mono">
          <span>{t("membersCount")}</span>
          <span className="tracking-widest">&lt; {t("pagination")} &gt;</span>
        </div>
      </div>
    </div>
  );
}
