import {
  Search,
  ChevronDown,
  LayoutGrid,
  FileSpreadsheet,
  Terminal,
  Network,
  Wrench,
  Code2,
  Zap,
  Download,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SheetsIcon, SlackIcon } from "./ecosystem-icons";

export function EcosystemWidget() {
  const t = useTranslations("platform.widgetEcosystem");

  const ASSET_ITEMS = [
    {
      title: t("cards.autoSync"),
      version: "v2.4.1",
      icon: (
        <div className="p-1 rounded bg-violet-500/20 text-violet-300">
          <Code2 className="w-3 h-3" />
        </div>
      ),
    },
    {
      title: t("cards.dataFetcher"),
      version: "v1.8.0",
      icon: (
        <div className="p-1 rounded bg-cyan-500/20 text-cyan-300">
          <Zap className="w-3 h-3" />
        </div>
      ),
    },
    {
      title: t("cards.sheetsBridge"),
      version: "v1.2.3",
      icon: <SheetsIcon className="w-5 h-5 rounded" />,
    },
    {
      title: t("cards.slackConnector"),
      version: "v3.1.0",
      icon: <SlackIcon className="w-5 h-5 rounded" />,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full gap-2 text-neutral-300 select-none justify-between">
      {/* Top Search Bar */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/[0.05]">
        <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] flex-1">
          <Search className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
          <span className="text-[9px] text-neutral-500 truncate">{t("search")}</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-[9px] text-neutral-400 shrink-0">
          <span>{t("allDropdown")}</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </div>
      </div>

      {/* Main Content: Categories Sidebar + 2x2 Grid */}
      <div className="flex gap-2 flex-1 min-h-0 items-stretch">
        {/* Categories Sidebar */}
        <div className="flex flex-col gap-0.5 w-[76px] sm:w-[84px] shrink-0 border-r border-white/[0.05] pr-1.5 text-[8.5px]">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#8b5cf6]/20 text-[#a78bfa] font-medium">
            <LayoutGrid className="w-2.5 h-2.5" />
            <span className="truncate">{t("categories.all")}</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-neutral-500 hover:text-neutral-300 transition-colors">
            <FileSpreadsheet className="w-2.5 h-2.5" />
            <span className="truncate">{t("categories.macros")}</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-neutral-500 hover:text-neutral-300 transition-colors">
            <Terminal className="w-2.5 h-2.5" />
            <span className="truncate">{t("categories.scripts")}</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-neutral-500 hover:text-neutral-300 transition-colors">
            <Network className="w-2.5 h-2.5" />
            <span className="truncate">{t("categories.integrations")}</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-neutral-500 hover:text-neutral-300 transition-colors">
            <Wrench className="w-2.5 h-2.5" />
            <span className="truncate">{t("categories.tools")}</span>
          </div>
        </div>

        {/* 2x2 Assets Grid */}
        <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
          {ASSET_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between p-1.5 rounded-lg bg-[#141522] border border-white/[0.06] hover:border-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between">
                {item.icon}
                <Download className="w-2.5 h-2.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
              </div>
              <div className="flex flex-col min-w-0 mt-1">
                <span className="text-[9.5px] font-medium text-white/90 truncate leading-tight">
                  {item.title}
                </span>
                <span className="text-[8px] text-neutral-500 font-mono leading-tight">
                  {item.version}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
