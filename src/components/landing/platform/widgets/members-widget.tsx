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
  { name: "Esteban Rojas", roleKey: "owner", avatar: "/images/platform/avatars/esteban.webp" },
  { name: "María González", roleKey: "admin", avatar: "/images/platform/avatars/maria.webp" },
  { name: "Carlos Méndez", roleKey: "member", avatar: "/images/platform/avatars/carlos.webp" },
  { name: "Lucía Torres", roleKey: "member", avatar: "/images/platform/avatars/lucia.webp" },
] as const;

export function MembersWidget() {
  const t = useTranslations("platform.widgetMembers");

  return (
    <div className="flex h-full w-full gap-2.5 sm:gap-3 text-neutral-300 select-none">
      {/* Mini Sidebar */}
      <div className="flex flex-col items-center py-1 gap-2.5 border-r border-white/[0.06] pr-2 sm:pr-2.5 shrink-0">
        <Hexagon className="w-3.5 h-3.5 text-white/80" />
        <div className="p-1 rounded bg-[#8b5cf6]/25 text-[#a78bfa] border border-[#8b5cf6]/30">
          <LayoutDashboard className="w-3 h-3" />
        </div>
        <Users className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <KeyRound className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Layers className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Settings className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors mt-auto" />
      </div>

      {/* Main Table Content */}
      <div className="flex flex-col flex-1 justify-between min-w-0 overflow-hidden">
        {/* Top Header Action */}
        <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-white/[0.05]">
          <span className="text-[11px] font-semibold text-white tracking-wide shrink-0">
            {t("title")}
          </span>
          <div className="flex items-center gap-1.5 flex-1 justify-end max-w-[210px]">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] w-full max-w-[125px]">
              <Search className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
              <span className="text-[9px] text-neutral-500 truncate">{t("search")}</span>
            </div>
            <button className="flex items-center gap-0.5 px-2 py-0.5 rounded bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[9.5px] font-medium transition-colors shrink-0 shadow-sm shadow-purple-950/40">
              <Plus className="w-2.5 h-2.5" />
              <span>{t("invite")}</span>
            </button>
          </div>
        </div>

        {/* Member Rows */}
        <div className="flex flex-col divide-y divide-white/[0.03] py-0.5">
          {MEMBERS.map((m) => (
            <div
              key={m.name}
              className="flex items-center justify-between py-1.5 text-[10px] group hover:bg-white/[0.02] px-1 rounded transition-colors"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full object-cover border border-white/10 shrink-0"
                />
                <span className="text-white/90 font-medium truncate text-[10.5px]">{m.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-neutral-400 text-[9.5px] capitalize">{t(m.roleKey)}</span>
                <div className="flex items-center gap-1 text-[9.5px] text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <span>{t("active")}</span>
                </div>
                <MoreHorizontal className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.05] text-[9px] text-neutral-500 font-mono">
          <span>{t("membersCount")}</span>
          <span className="tracking-widest">&lt; {t("pagination")} &gt;</span>
        </div>
      </div>
    </div>
  );
}
