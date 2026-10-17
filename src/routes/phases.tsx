import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MIFIE_PHASES } from "@/lib/mifie/phases";
import { MIFIE_BY_ID } from "@/lib/mifie/agents";
import { useActiveMifie, useMifie } from "@/lib/mifie/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/phases")({ component: PhasesPage });

function PhasesPage() {
  const hydrate = useMifie((s) => s.hydrate);
  const runPhase = useMifie((s) => s.runPhase);
  const runAll = useMifie((s) => s.runAll);
  const running = useMifie((s) => s.running);
  const active = useActiveMifie();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const doneCount = active?.phases.filter((p) => p.status === "done").length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            Section 4 · Sequentially chained 4-phase deployment matrix
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">
            Phase pipeline
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Recon → Harvest → Pattern → Dossier. Sequential. Each phase activates specialized agents.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/mifie">M-IFIE console</Link>
          </Button>
          <Button disabled={!active || running} onClick={() => runAll()}>
            Execute full matrix
          </Button>
        </div>
      </header>

      {active ? (
        <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
                Active case · {active.code}
              </p>
              <p className="text-sm font-medium">{active.target}</p>
            </div>
            <Badge>{doneCount}/4 phases done</Badge>
          </div>
          <Progress className="mt-3" value={(doneCount / 4) * 100} />
        </section>
      ) : (
        <div className="rounded-xl bg-card p-4 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
          Open a case on the{" "}
          <Link to="/mifie" className="underline">
            M-IFIE console
          </Link>{" "}
          first.
        </div>
      )}

      <section className="grid gap-4">
        {MIFIE_PHASES.map((p) => {
          const run = active?.phases.find((x) => x.phase === p.id);
          return (
            <article
              key={p.id}
              className="rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                    Phase {String(p.id).padStart(2, "0")} · {p.shortName}
                  </p>
                  <h2 className="font-display mt-1 text-xl font-medium tracking-tight">
                    {p.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={run?.status === "done" ? "default" : "outline"}>
                    {run?.status ?? "pending"}
                  </Badge>
                  <Button
                    size="sm"
                    disabled={!active || running}
                    onClick={() => runPhase(p.id)}
                  >
                    Run phase
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.action}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
                    Agents
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {p.agents.map((id) => (
                      <Badge key={id} variant="outline" className="font-mono text-[9px]">
                        {MIFIE_BY_ID[id].callsign}
                      </Badge>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
                    Outputs
                  </p>
                  <ul className="mt-2 list-inside list-disc text-xs text-muted-foreground">
                    {p.outputs.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {run?.summary && (
                <p className="mt-3 rounded-md bg-muted px-3 py-2 font-mono text-[11px]">
                  {run.summary}
                </p>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
