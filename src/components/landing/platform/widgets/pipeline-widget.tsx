import { Play, MousePointer2, Box, Link2, SlidersHorizontal, Zap, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function PipelineWidget() {
  const t = useTranslations("platform.widgetPipeline");

  return (
    <div className="flex h-full w-full gap-3 text-neutral-300 select-none items-center">
      {/* Mini Tool Strip */}
      <div className="flex flex-col items-center py-1 gap-2.5 border-r border-white/[0.06] pr-2.5 shrink-0 self-stretch justify-center">
        <button className="w-5 h-5 rounded bg-[#7c3aed] flex items-center justify-center text-white shadow-sm shadow-purple-900/50">
          <Play className="w-2.5 h-2.5 fill-current" />
        </button>
        <MousePointer2 className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Box className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <Link2 className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
        <SlidersHorizontal className="w-3 h-3 text-neutral-500 hover:text-neutral-300 transition-colors" />
      </div>

      {/* Workflow Diagram Canvas */}
      <div className="flex flex-col flex-1 items-center justify-center min-w-0 py-1">
        {/* Trigger Node */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141522] border border-white/[0.08] shadow-md shadow-black/40 min-w-[150px]">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Play className="w-2 h-2 fill-current" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold text-white leading-tight">
              {t("trigger")}
            </span>
            <span className="text-[8.5px] text-neutral-400 leading-tight truncate">
              {t("newUser")}
            </span>
          </div>
        </div>

        {/* Vertical Wire 1 */}
        <div className="w-[1.5px] h-3.5 bg-gradient-to-b from-[#8b5cf6] to-[#a855f7] relative">
          <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-300" />
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-300" />
        </div>

        {/* Action Node */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141522] border border-[#8b5cf6]/40 shadow-lg shadow-purple-950/30 min-w-[160px]">
          <div className="w-4 h-4 rounded-md bg-[#7c3aed]/25 text-[#a78bfa] flex items-center justify-center shrink-0">
            <Zap className="w-2.5 h-2.5 fill-current" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold text-white leading-tight">
              {t("action")}
            </span>
            <span className="text-[8.5px] text-neutral-400 leading-tight truncate">
              {t("sendNotification")}
            </span>
          </div>
        </div>

        {/* Branching SVG Wire */}
        <svg className="w-44 h-4 text-[#8b5cf6]" viewBox="0 0 176 16" fill="none">
          <path
            d="M88 0v4M88 4H36v12M88 4h52v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="36" cy="15" r="1.5" fill="#8b5cf6" />
          <circle cx="140" cy="15" r="1.5" fill="#8b5cf6" />
        </svg>

        {/* Status Nodes (Branch) */}
        <div className="flex items-center gap-2 justify-center w-full">
          {/* Completed */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141522] border border-emerald-500/30 shadow-sm">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-2 h-2 stroke-[3]" />
            </div>
            <span className="text-[9px] font-medium text-emerald-300 whitespace-nowrap">
              {t("completed")}
            </span>
          </div>

          {/* Error / Retry */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141522] border border-rose-500/30 shadow-sm">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <X className="w-2 h-2 stroke-[3]" />
            </div>
            <span className="text-[9px] font-medium text-rose-300 whitespace-nowrap">
              {t("errorRetry")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
