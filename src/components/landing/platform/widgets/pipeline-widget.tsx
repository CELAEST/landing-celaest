import React from "react";
import { Play, Move, Boxes, Link2, BarChart3 } from "lucide-react";
import "../platform-previews.css";

export function PipelineWidget() {
  return (
    <div className="preview automation-preview">
      {/* Left Toolbar */}
      <div className="flow-toolbar">
        <div className="flow-tool-active">
          <Play size={12} fill="currentColor" />
        </div>
        <Move size={14} className="hover:text-white transition-colors cursor-pointer" />
        <Boxes size={14} className="hover:text-white transition-colors cursor-pointer" />
        <Link2 size={14} className="hover:text-white transition-colors cursor-pointer" />
        <BarChart3 size={14} className="hover:text-white transition-colors cursor-pointer" />
      </div>

      {/* Node Canvas with Subtle Dot Grid */}
      <div className="flow-canvas">
        {/* Node 1: Trigger */}
        <div className="flow-node trigger">
          <div className="trigger-icon">
            <svg width="9" height="9" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div className="node-texts">
            <b>Trigger</b>
            <small>Nuevo usuario</small>
          </div>
        </div>

        {/* Vertical Wire 1 with Terminal Sockets (Top & Bottom only) */}
        <div className="wire-v1-wrap">
          <div className="wire-v1-pill" />
          <div className="wire-v1-line" />
          <div className="wire-v1-pill" />
        </div>

        {/* Node 2: Action - Pure Unboxed Lightning Icon */}
        <div className="flow-node action">
          <div className="action-icon">
            <svg width="15" height="21" viewBox="0 0 15 22">
              <path
                d="M9 0.5L1 12H7.5L5.5 21.5L14 9.5H7.5L9 0.5Z"
                stroke="#9d55ff"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="node-texts">
            <b>Ejecutar acción</b>
            <small>Enviar notificación</small>
          </div>
        </div>

        {/* Branching Wishbone Wire SVG with Rounded Terminal Pills */}
        <svg className="wire-branch-svg" viewBox="0 0 250 36" fill="none">
          {/* Top socket pill */}
          <rect x="123" y="0" width="4" height="6" rx="2" fill="#8b5cf6" />
          {/* Wishbone fork left to Node 3 center (x=52) */}
          <path
            d="M125 5C125 10 120 14 114 14H62C56 14 52 18 52 24V36"
            stroke="#8b5cf6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Wishbone fork right to Node 4 center (x=198) */}
          <path
            d="M125 5C125 10 130 14 136 14H188C194 14 198 18 198 24V36"
            stroke="#8b5cf6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Bottom left socket pill */}
          <rect x="50" y="30" width="4" height="6" rx="2" fill="#8b5cf6" />
          {/* Bottom right socket pill */}
          <rect x="196" y="30" width="4" height="6" rx="2" fill="#8b5cf6" />
        </svg>

        {/* Node 3: Result Success */}
        <div className="flow-node result success">
          <div className="success-icon">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <b>Completado</b>
        </div>

        {/* Node 4: Result Error */}
        <div className="flow-node result error">
          <div className="error-icon">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <b>Error / Reintentar</b>
        </div>
      </div>
    </div>
  );
}
