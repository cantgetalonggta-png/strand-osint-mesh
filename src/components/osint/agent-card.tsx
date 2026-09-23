import { Link } from "@tanstack/react-router";
import { AGENT_BY_ID } from "@/lib/osint/roster";
import type { AgentId, AgentRuntime } from "@/lib/osint/types";
import { cn } from "@/lib/utils";
import { StatusDot } from "./status-dot";

export function AgentCard({
  id,
  runtime,
  compact = false,
}: {
  id: AgentId;
  runtime: AgentRuntime;
  compact?: boolean;
}) {
  const agent = AGENT_BY_ID[id];
  return (
    <Link
      to="/agents"
      className={cn(
        "group flex flex-col rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[var(--shadow-border-hover)]",
        compact ? "gap-2" : "gap-3",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
            {agent.designation}
          </p>
          <h3 className="font-display mt-1 text-xl font-medium tracking-tight">{agent.callsign}</h3>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          <StatusDot status={runtime.status} />
          {runtime.status}
        </span>
      </div>
      {!compact ? (
        <p className="text-sm text-muted-foreground">{agent.role}</p>
      ) : null}
      <p className="line-clamp-2 font-mono text-[11px] leading-relaxed text-ink">{runtime.lastMove}</p>
      <div className="mt-auto flex items-center justify-between pt-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
        <span className="tabular-nums">{runtime.findings} findings</span>
        <span className="tabular-nums">{runtime.success}% method fit</span>
      </div>
    </Link>
  );
}
