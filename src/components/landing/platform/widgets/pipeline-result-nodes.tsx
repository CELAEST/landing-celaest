import React from "react";

export function PipelineResultNodes() {
  return (
    <>
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
    </>
  );
}
