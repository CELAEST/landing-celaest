import React from "react";

interface SolutionComparisonTableProps {
  title1: string;
  title2: string;
  columns: string[];
  rows: string[][];
}

/**
 * Laser-hairline comparison table matching CELAEST's zero-box editorial aesthetic.
 */
export function SolutionComparisonTable({
  title1,
  title2,
  columns,
  rows,
}: SolutionComparisonTableProps) {
  return (
    <section className="mb-16">
      <h2 className="sol-section-heading">
        <span>{title1} </span>
        <em>{title2}</em>
      </h2>

      <div className="sol-table-wrap">
        <table className="sol-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={col} scope="col" className={idx === 1 ? "highlight" : ""}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, idx) => (
                  <td
                    key={`${row[0]}-${idx}`}
                    data-label={columns[idx] || ""}
                    className={idx === 0 ? "feature-col" : idx === 1 ? "highlight" : ""}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
