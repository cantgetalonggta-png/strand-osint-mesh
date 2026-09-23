import { createFileRoute } from "@tanstack/react-router";
import { StatusDot } from "@/components/osint/status-dot";
import { AGENTS } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";

export const Route = createFileRoute("/agents")({ component: AgentsPage });

function AgentsPage() {
  const active = useOsint((s) => s.cases.find((c) => c.id === s.activeId));

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">Roster</p>
        <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">Four minds, no mirrors</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each agent owns a method the others are forbidden to copy. Sub-agents stay inside that
          doctrine. The mesh learns from disputes, not consensus.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {AGENTS.map((agent) => {
          const rt = active?.runtime[agent.id];
          return (
            <article
              key={agent.id}
              className="grid gap-6 rounded-2xl bg-card p-5 shadow-[var(--shadow-border)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-7"
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                  {agent.designation}
                </p>
                <h2 className="font-display mt-2 text-3xl font-medium tracking-tight">{agent.callsign}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{agent.role}</p>
                {rt ? (
                  <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                    <StatusDot status={rt.status} />
                    {rt.status} · {rt.findings} findings · {rt.success}% fit
                  </p>
                ) : null}
                <blockquote className="mt-5 border-l border-border pl-4 text-sm leading-relaxed text-foreground/90">
                  {agent.doctrine}
                </blockquote>
                <p className="mt-4 text-xs text-ink">Refuses: {agent.refuses}</p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">Methods</p>
                  <ul className="mt-2 space-y-1.5">
                    {agent.methods.map((m) => (
                      <li key={m} className="font-mono text-[12px] leading-relaxed text-muted-foreground">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">Sub-agents</p>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                    {agent.subAgents.map((s) => (
                      <li key={s.id} className="rounded-lg bg-muted px-3 py-2">
                        <p className="font-mono text-[11px] tracking-[0.1em] uppercase">{s.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{s.specialty}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {rt ? (
                  <p className="text-xs text-muted-foreground">
                    Last move: {rt.lastMove}
                    <br />
                    Adaptation: {rt.methodShift}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
