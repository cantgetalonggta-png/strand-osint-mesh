import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MIFIE_AGENTS } from "@/lib/mifie/agents";
import { MIFIE_PHASES } from "@/lib/mifie/phases";
import { useActiveMifie, useMifie } from "@/lib/mifie/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mifie")({ component: MifieConsole });

function MifieConsole() {
  const hydrate = useMifie((s) => s.hydrate);
  const open = useMifie((s) => s.open);
  const runAll = useMifie((s) => s.runAll);
  const runPhase = useMifie((s) => s.runPhase);
  const cases = useMifie((s) => s.cases);
  const running = useMifie((s) => s.running);
  const setActive = useMifie((s) => s.setActive);
  const active = useActiveMifie();
  const [target, setTarget] = useState("SEC EDGAR public company disclosures 2024-2026");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            M-IFIE v6.0 · Investigative & Forensic Research Engine
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight md:text-5xl">
            16-agent swarm console
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Omni-Index · 4-phase deployment matrix · Red Team · Master Editor dossier. Public-record
            ceiling only. Educational / defensive OSINT.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/omni-index">Omni-Index</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/phases">Phases</Link>
          </Button>
          <Button asChild>
            <Link to="/dossier">Dossier</Link>
          </Button>
        </div>
      </header>

      <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Initialize investigation
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Investigation target (public entities, policies, filings…)"
            className="flex-1"
          />
          <Button
            onClick={() => {
              open(target);
            }}
          >
            Open case
          </Button>
          <Button
            variant="outline"
            disabled={!active || running}
            onClick={() => runAll()}
          >
            Run all 4 phases
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {([1, 2, 3, 4] as const).map((p) => (
            <Button
              key={p}
              size="sm"
              variant="outline"
              disabled={!active || running}
              onClick={() => runPhase(p)}
            >
              Phase {p}: {MIFIE_PHASES[p - 1]?.shortName}
            </Button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Cases</p>
          {cases.length === 0 ? (
            <div className="rounded-xl bg-card p-4 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
              No M-IFIE cases yet. Open a target above.
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {cases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-left transition-colors",
                    c.id === active?.id ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  <span className="block text-sm font-medium">{c.target}</span>
                  <span className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
                    {c.code} · {c.status} · {c.findings.length} findings
                  </span>
                </button>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {active ? (
            <>
              <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                  Active · {active.code}
                </p>
                <h2 className="font-display mt-1 text-2xl font-medium tracking-tight">
                  {active.target}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{active.synopsis}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.phases.map((p) => (
                    <Badge key={p.phase} variant={p.status === "done" ? "default" : "outline"}>
                      P{p.phase} {p.status}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                  Latest findings
                </p>
                <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto">
                  {active.findings
                    .slice()
                    .reverse()
                    .slice(0, 12)
                    .map((f) => (
                      <li key={f.id} className="border-b border-border/60 pb-2 last:border-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-[9px]">
                            {f.solid}
                          </Badge>
                          <span className="text-sm font-medium">{f.title}</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{f.body}</p>
                      </li>
                    ))}
                  {active.findings.length === 0 && (
                    <li className="text-sm text-muted-foreground">
                      Run a phase to generate findings.
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <div className="rounded-xl bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
              Select or open a case to see runtime status.
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          16-agent roster
        </p>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {MIFIE_AGENTS.map((a) => {
            const rt = active?.runtime[a.id];
            return (
              <article
                key={a.id}
                className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.14em] text-ink uppercase">
                      Agent {String(a.index).padStart(2, "0")}
                    </p>
                    <h3 className="text-sm font-medium">{a.callsign}</h3>
                  </div>
                  <Badge variant="outline" className="font-mono text-[9px]">
                    {rt?.status ?? "idle"}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.role}</p>
                <p className="mt-2 font-mono text-[10px] text-ink">
                  {rt ? `${rt.findings} findings · ${rt.progress}%` : "—"}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
