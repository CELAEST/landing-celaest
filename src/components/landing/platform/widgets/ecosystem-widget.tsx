import {
  Search,
  ChevronDown,
  LayoutGrid,
  FileSpreadsheet,
  Terminal,
  Network,
  Wrench,
  Download,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { SheetsIcon, SlackIcon } from "./ecosystem-icons";

const CATEGORIES = [
  { key: "all", icon: LayoutGrid, active: true },
  { key: "macros", icon: FileSpreadsheet, active: false },
  { key: "scripts", icon: Terminal, active: false },
  { key: "integrations", icon: Network, active: false },
  { key: "tools", icon: Wrench, active: false },
] as const;

export function EcosystemWidget() {
  const t = useTranslations("platform.widgetEcosystem");

  const ITEMS = [
    {
      title: t("cards.autoSync"),
      v: "v2.4.1",
      icon: <span className="text-sm font-bold text-violet-400">&lt;/&gt;</span>,
    },
    {
      title: t("cards.dataFetcher"),
      v: "v1.8.0",
      icon: <Zap className="w-4 h-4 text-cyan-400 fill-current" />,
    },
    {
      title: t("cards.sheetsBridge"),
      v: "v1.2.3",
      icon: <SheetsIcon className="w-5 h-5 rounded" />,
    },
    {
      title: t("cards.slackConnector"),
      v: "v3.1.0",
      icon: <SlackIcon className="w-5 h-5 rounded" />,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full gap-2 text-neutral-300 select-none justify-between">
      {/* Top Search Bar with Dropdown Filter */}
      <div className="flex items-center gap-2 pb-1.5 border-b border-white/[0.05]">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141522] border border-white/[0.06] flex-1">
          <Search className="w-3 h-3 text-neutral-500 shrink-0" />
          <span className="text-[10.5px] text-neutral-500 truncate">{t("search")}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#141522] border border-white/[0.06] text-[10.5px] text-neutral-300 shrink-0">
          <span>{t("allDropdown")}</span>
          <ChevronDown className="w-3 h-3 text-neutral-400" />
        </div>
      </div>

      {/* Main Categories Sidebar + 2x2 Assets Grid */}
      <div className="flex gap-2.5 flex-1 min-h-0 items-stretch">
        <div className="flex flex-col gap-0.5 w-[105px] shrink-0 border-r border-white/[0.05] pr-1.5 text-[10px]">
          {CATEGORIES.map(({ key, icon: Icon, active }) => (
            <div
              key={key}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-md whitespace-nowrap transition-colors ${
                active
                  ? "bg-[#7c3aed]/20 text-[#c4b5fd] border border-[#7c3aed]/30 font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Icon className="w-3 h-3 shrink-0" />
              <span>{t(`categories.${key}`)}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between p-2 rounded-xl bg-[#141522] border border-white/[0.06] hover:border-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between">
                {item.icon}
                <Download className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col min-w-0 mt-1">
                <span className="text-[10.5px] font-medium text-white/95 truncate leading-tight">
                  {item.title}
                </span>
                <span className="text-[9px] text-neutral-500 font-mono leading-tight">
                  {item.v}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
