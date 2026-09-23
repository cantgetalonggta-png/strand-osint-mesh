import { useMemo, useState } from "react";
import type { Investigation, LogicNode } from "@/lib/osint/types";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<LogicNode["kind"], string> = {
  entity: "ENT",
  asset: "AST",
  claim: "CLM",
  source: "SRC",
  hypothesis: "HYP",
  person: "PER",
};

export function LogicMap({ inv, className }: { inv: Investigation; className?: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedNode = inv.nodes.find((n) => n.id === selected);

  const lines = useMemo(() => {
    return inv.edges
      .map((e) => {
        const a = inv.nodes.find((n) => n.id === e.from);
        const b = inv.nodes.find((n) => n.id === e.to);
        if (!a || !b) return null;
        return { e, a, b };
      })
      .filter(Boolean) as { e: (typeof inv.edges)[number]; a: LogicNode; b: LogicNode }[];
  }, [inv.edges, inv.nodes]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]", className)}>
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Critical logic map</p>
        <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase tabular-nums">
          {inv.nodes.length} nodes · {inv.edges.length} relations
        </p>
      </div>
      <div className="relative aspect-[16/10] min-h-[220px] w-full">
        {inv.nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <p className="max-w-sm text-sm text-muted-foreground">
              WEFT has not placed a node yet. Run a sweep and the lattice will grow from independent strands.
            </p>
          </div>
        ) : (
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" role="img" aria-label="Logic map">
            {lines.map(({ e, a, b }) => (
              <g key={e.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="currentColor"
                  className="text-foreground/20"
                  strokeWidth="0.35"
                />
                <text
                  x={(a.x + b.x) / 2}
                  y={(a.y + b.y) / 2 - 1.6}
                  textAnchor="middle"
                  className="fill-ink"
                  fontSize="2.4"
                  fontFamily="IBM Plex Mono, ui-monospace, monospace"
                >
                  {e.rel}
                </text>
              </g>
            ))}
            {inv.nodes.map((n) => {
              const on = selected === n.id;
              return (
                <g
                  key={n.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(on ? null : n.id)}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={on ? 2.6 : 2.1}
                    className={on ? "fill-paper" : "fill-card stroke-foreground/40"}
                    strokeWidth="0.4"
                    stroke="currentColor"
                  />
                  <text
                    x={n.x}
                    y={n.y + 6.2}
                    textAnchor="middle"
                    className="fill-foreground"
                    fontSize="3.1"
                    fontFamily="Newsreader, Palatino Linotype, serif"
                  >
                    {n.label.length > 22 ? `${n.label.slice(0, 20)}…` : n.label}
                  </text>
                  <text
                    x={n.x}
                    y={n.y - 3.6}
                    textAnchor="middle"
                    className="fill-ink"
                    fontSize="2.2"
                    fontFamily="IBM Plex Mono, ui-monospace, monospace"
                  >
                    {KIND_LABEL[n.kind]}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
      {selectedNode ? (
        <div className="border-t border-border px-4 py-3">
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
            {KIND_LABEL[selectedNode.kind]} · {selectedNode.agentId ?? "weft"}
          </p>
          <p className="mt-1 text-sm">{selectedNode.label}</p>
          {selectedNode.note ? (
            <p className="mt-1 text-xs text-muted-foreground">{selectedNode.note}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
