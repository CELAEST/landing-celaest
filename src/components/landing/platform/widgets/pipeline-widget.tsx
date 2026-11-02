import { Play, Move, Box, Link2, BarChart3, Zap, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function PipelineWidget() {
  const t = useTranslations("platform.widgetPipeline");

  return (
    <div className="flex h-full w-full gap-4 text-neutral-300 select-none items-center">
      {/* Left Tool Strip */}
      <div className="flex flex-col items-center py-1 gap-3.5 border-r border-white/[0.06] pr-3 shrink-0 self-stretch justify-center">
        <button className="w-8 h-8 rounded-lg bg-[#7c3aed] flex items-center justify-center text-white shadow-md shadow-purple-900/40 hover:bg-[#6d28d9] transition-colors">
          <Play className="w-3.5 h-3.5 fill-current" />
        </button>
        <Move className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Box className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Link2 className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <BarChart3 className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
      </div>

      {/* Workflow Diagram Canvas */}
      <div className="flex flex-col flex-1 items-center justify-center min-w-0 py-1">
        {/* Node 1: Trigger */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#141522] border border-white/[0.08] shadow-lg shadow-black/40 w-[205px]">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.4)]">
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white leading-tight">{t("trigger")}</span>
            <span className="text-[10px] text-neutral-400 leading-tight truncate">
              {t("newUser")}
            </span>
          </div>
        </div>

        {/* Vertical Wire 1 with Anchor Pins */}
        <div className="w-[1.5px] h-3.5 bg-[#8b5cf6] relative">
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
        </div>

        {/* Node 2: Action */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#141522] border border-white/[0.08] shadow-lg shadow-black/40 w-[225px]">
          <div className="w-6 h-6 rounded-lg bg-[#7c3aed]/20 text-[#a78bfa] flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white leading-tight">{t("action")}</span>
            <span className="text-[10px] text-neutral-400 leading-tight truncate">
              {t("sendNotification")}
            </span>
          </div>
        </div>

        {/* Branching Wire SVG with Curved Elbows */}
        <svg className="w-60 h-4 text-[#8b5cf6]" viewBox="0 0 240 16" fill="none">
          <path
            d="M120 0v2C120 5 118 6 113 6H55C50 6 48 8 48 12v4M120 2C120 5 122 6 127 6h58c5 0 7 2 7 6v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="120" cy="1" r="1.5" fill="#8b5cf6" />
          <circle cx="48" cy="15" r="1.5" fill="#8b5cf6" />
          <circle cx="192" cy="15" r="1.5" fill="#8b5cf6" />
        </svg>

        {/* Bottom Branch Status Nodes */}
        <div className="flex items-center gap-3 justify-center w-full">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141522] border border-white/[0.08] shadow-md">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[10.5px] font-medium text-white whitespace-nowrap">
              {t("completed")}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141522] border border-white/[0.08] shadow-md">
            <div className="w-5 h-5 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.5)]">
              <X className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[10.5px] font-medium text-white whitespace-nowrap">
              {t("errorRetry")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
