import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentCard } from "@/components/osint/agent-card";
import { LogicMap } from "@/components/osint/logic-map";
import { StatusDot } from "@/components/osint/status-dot";
import { SweepControls } from "@/components/osint/sweep-controls";
import { Button } from "@/components/ui/button";
import { AGENTS } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";
import type { AgentId, Investigation } from "@/lib/osint/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Operations });

function Operations() {
  const cases = useOsint((s) => s.cases);
  const activeId = useOsint((s) => s.activeId);
  const setActive = useOsint((s) => s.setActive);
  const active = cases.find((c) => c.id === activeId) ?? cases[0];
  const findings = cases.reduce((n, c) => n + c.findings.length, 0);
  const debates = cases.reduce(
    (n, c) => n + Object.values(c.runtime).reduce((a, r) => a + r.debates, 0),
    0,
  );
  const fit = active
    ? Math.round(
        AGENTS.reduce((n, a) => n + active.runtime[a.id].success, 0) / AGENTS.length,
      )
    : 0;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">Operations floor</p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight md:text-5xl">The mesh is live</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Four autonomous agents. Independent methods. Shared lattice. Nothing is mirrored on
            purpose.
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
          Synthetic collection · educational OSINT
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Investigations" value={String(cases.length)} />
        <Kpi label="Findings filed" value={String(findings)} />
        <Kpi label="Open disputes" value={String(debates)} />
        <Kpi label="Method fit" value={`${fit}%`} />
      </section>

      {active ? (
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                  Active case · {active.code}
                </p>
                <h2 className="font-display mt-1 text-3xl font-medium tracking-tight">{active.title}</h2>
                <p className="mt-1 max-w-prose text-sm text-muted-foreground">{active.synopsis}</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/case/$caseId" params={{ caseId: active.id }}>
                  Open workspace
                </Link>
              </Button>
            </div>
            <SweepControls inv={active} />
            <LogicMap inv={active} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Case drawer</p>
            <ul className="flex flex-col gap-2">
              {cases.map((c) => (
                <CaseRow key={c.id} inv={c} active={c.id === active.id} onSelect={() => setActive(c.id)} />
              ))}
            </ul>
            <LatestFinding inv={active} />
          </div>
        </section>
      ) : null}

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Agent floor</p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {AGENTS.map((a) => (
            <AgentCard
              key={a.id}
              id={a.id}
              runtime={active?.runtime[a.id] ?? {
                status: "idle",
                lastMove: "—",
                findings: 0,
                shares: 0,
                debates: 0,
                success: 0,
                methodShift: "",
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{label}</p>
      <p className="font-display mt-2 text-3xl font-medium tracking-tight tabular-nums">{value}</p>
    </div>
  );
}

function CaseRow({
  inv,
  active,
  onSelect,
}: {
  inv: Investigation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150",
        active ? "bg-muted" : "hover:bg-muted/60",
      )}
    >
      <StatusDot status={inv.status} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{inv.title}</span>
        <span className="block font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
          {inv.code} · {inv.status}
        </span>
      </span>
      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
        {inv.findings.length}
      </span>
    </button>
  );
}

function LatestFinding({ inv }: { inv: Investigation }) {
  const f = inv.findings[inv.findings.length - 1];
  if (!f) {
    return (
      <div className="rounded-xl bg-card p-4 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
        No finding filed on this case yet.
      </div>
    );
  }
  const id = f.agentId as AgentId;
  return (
    <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">Latest strand · {id}</p>
      <p className="mt-2 text-sm font-medium">{f.title}</p>
      <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{f.body}</p>
    </div>
  );
}
