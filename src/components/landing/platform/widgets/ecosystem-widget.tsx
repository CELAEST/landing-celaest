import React from "react";
import {
  Search,
  ChevronDown,
  Grid2X2,
  FileCode2,
  Terminal,
  Link2,
  Settings,
  Download,
} from "lucide-react";
import { AutoSyncIcon, DataFetcherIcon, SheetsIcon, SlackIcon } from "./ecosystem-icons";
import "../platform-previews.css";

const CATEGORIES = [
  { key: "todos", label: "Todos", icon: Grid2X2, active: true },
  { key: "macros", label: "Macros", icon: FileCode2, active: false },
  { key: "scripts", label: "Scripts", icon: Terminal, active: false },
  { key: "integrations", label: "Integraciones", icon: Link2, active: false },
  { key: "tools", label: "Herramientas", icon: Settings, active: false },
];

export function EcosystemWidget() {
  return (
    <div className="preview assets-preview">
      {/* Top Header: Search bar + Filter Dropdown */}
      <div className="library-top">
        <div className="library-search">
          <Search size={13} className="text-[#6f6e79] shrink-0" />
          <span>Buscar en la librería...</span>
        </div>
        <button type="button">
          <span>Todas</span>
          <ChevronDown size={13} />
        </button>
      </div>

      {/* Main Body: Categories Sidebar + 2x2 Assets Grid */}
      <div className="library-body">
        {/* Left Categories Nav */}
        <div className="asset-nav">
          {CATEGORIES.map(({ key, label, icon: Icon, active }) => (
            <div key={key} className={`asset-nav-item ${active ? "selected" : ""}`}>
              <Icon size={13} className="shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* 2x2 Assets Grid */}
        <div className="asset-grid">
          {/* Card 1: Auto Sync */}
          <div className="asset-card">
            <div className="asset-icon-row">
              <AutoSyncIcon className="w-[22px] h-[17px]" />
            </div>
            <div className="asset-title">Auto Sync</div>
            <div className="asset-bottom">
              <span className="asset-version">v2.4.1</span>
              <Download size={12} className="asset-download cursor-pointer" />
            </div>
          </div>

          {/* Card 2: Data Fetcher */}
          <div className="asset-card">
            <div className="asset-icon-row">
              <DataFetcherIcon className="w-[15px] h-[22px]" />
            </div>
            <div className="asset-title">Data Fetcher</div>
            <div className="asset-bottom">
              <span className="asset-version">v1.8.0</span>
              <Download size={12} className="asset-download cursor-pointer" />
            </div>
          </div>

          {/* Card 3: Sheets Bridge */}
          <div className="asset-card">
            <div className="asset-icon-row">
              <SheetsIcon className="w-[18px] h-[22px]" />
            </div>
            <div className="asset-title">Sheets Bridge</div>
            <div className="asset-bottom">
              <span className="asset-version">v1.2.3</span>
              <Download size={12} className="asset-download cursor-pointer" />
            </div>
          </div>

          {/* Card 4: Slack Connector */}
          <div className="asset-card">
            <div className="asset-icon-row">
              <SlackIcon className="w-[22px] h-[22px]" />
            </div>
            <div className="asset-title">Slack Connector</div>
            <div className="asset-bottom">
              <span className="asset-version">v3.1.0</span>
              <Download size={12} className="asset-download cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
