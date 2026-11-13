"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getConnections, type Note } from "./model";
import { usePreferences } from "@/components/preferences";
export function KnowledgeGraph({
  notes,
  compact = false,
}: {
  notes: Note[];
  compact?: boolean;
}) {
  const router = useRouter();
  const { t } = usePreferences();
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState("");
  const edges = getConnections(notes);
  const visible = notes.slice(0, 80);
  const positions = new Map(
    visible.map((n, i) => {
      const angle = i * 2.399963;
      const radius =
        i === 0
          ? 0
          : visible.length <= 12
            ? 130 + Math.sqrt(i) * 38
            : 70 + Math.sqrt(i) * 25;
      return [
        n.id,
        {
          x: 400 + Math.cos(angle) * radius,
          y: 260 + Math.sin(angle) * radius * 0.72,
        },
      ];
    }),
  );
  return (
    <div className="graph-canvas" style={{ height: compact ? 310 : 530 }}>
      <svg
        viewBox="0 0 800 520"
        role="img"
        aria-label={t(
          "Interactive knowledge graph. Select a node to open its note.",
          "گراف تعاملی دانش؛ برای باز کردن یادداشت، گره را انتخاب کن.",
        )}
      >
        <g transform={`translate(400 260) scale(${zoom}) translate(-400 -260)`}>
          {edges.map((e, i) => {
            const a = positions.get(e.source);
            const b = positions.get(e.target);
            if (!a || !b) return null;
            const active =
              !selected || e.source === selected || e.target === selected;
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--accent)"
                strokeOpacity={active ? 0.3 : 0.05}
                strokeWidth={active ? 1.5 : 1}
              />
            );
          })}
          {visible.map((n) => {
            const p = positions.get(n.id)!;
            const count = edges.filter(
              (e) => e.source === n.id || e.target === n.id,
            ).length;
            const r = 9 + Math.min(count * 1.5, 14);
            return (
              <g
                key={n.id}
                className="graph-node"
                role="link"
                tabIndex={0}
                aria-label={n.title}
                onMouseEnter={() => setSelected(n.id)}
                onMouseLeave={() => setSelected("")}
                onFocus={() => setSelected(n.id)}
                onBlur={() => setSelected("")}
                onClick={() => router.push("/dashboard/notes?id=" + n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    router.push("/dashboard/notes?id=" + n.id);
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r + 9}
                  fill="var(--accent)"
                  opacity=".04"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={n.favorite ? "var(--accent)" : "var(--surface-3)"}
                  stroke="var(--accent)"
                  strokeWidth={1.5}
                  strokeOpacity=".65"
                />
                <text
                  x={p.x}
                  y={p.y + r + 18}
                  fill="var(--muted)"
                  textAnchor="middle"
                  fontSize={compact ? 13 : 11}
                >
                  {n.title.length > 25 ? n.title.slice(0, 24) + "…" : n.title}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {!compact && (
        <>
          <div className="absolute top-4 start-4 badge">
            {visible.length} {t("notes", "یادداشت")} · {edges.length}{" "}
            {t("connections", "ارتباط")}
          </div>
          <div className="absolute bottom-4 end-4 flex gap-2">
            <button
              className="button small"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
              aria-label={t("Zoom out", "کوچک‌نمایی")}
            >
              −
            </button>
            <button className="button small" onClick={() => setZoom(1)}>
              {Math.round(zoom * 100)}%
            </button>
            <button
              className="button small"
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
              aria-label={t("Zoom in", "بزرگ‌نمایی")}
            >
              +
            </button>
          </div>
        </>
      )}
    </div>
  );
}
