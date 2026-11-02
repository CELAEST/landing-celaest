import React from "react";
import { Play, Move, Boxes, Link2, BarChart3 } from "lucide-react";

export function PipelineToolbar() {
  return (
    <div className="flow-toolbar">
      <div className="flow-tool-active">
        <Play size={12} fill="currentColor" />
      </div>
      <Move size={14} className="hover:text-white transition-colors cursor-pointer" />
      <Boxes size={14} className="hover:text-white transition-colors cursor-pointer" />
      <Link2 size={14} className="hover:text-white transition-colors cursor-pointer" />
      <BarChart3 size={14} className="hover:text-white transition-colors cursor-pointer" />
    </div>
  );
}
