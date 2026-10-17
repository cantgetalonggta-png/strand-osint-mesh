import { useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useActiveMifie, useMifie } from "@/lib/mifie/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dossier")({ component: DossierPage });

function DossierPage() {
  const hydrate = useMifie((s) => s.hydrate);
  const runAll = useMifie((s) => s.runAll);
  const running = useMifie((s) => s.running);
  const active = useActiveMifie();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const md = useMemo(() => active?.dossierMarkdown ?? "", [active?.dossierMarkdown]);

  const download = () => {
    if (!md || !active) return;
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.code}-MIFIE-dossier.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    if (!md) return;
    await navigator.clipboard.writeText(md);
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            Phase 4 · Master Editor & Final Arbiter
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">
            Final dossier
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Structured research output with SOLID/MAYBE tags, contradiction tables, and Red Team
            notes. Traceable claims only.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/mifie">Console</Link>
          </Button>
          <Button disabled={!active || running} onClick={() => runAll()}>
            Generate via full run
          </Button>
          <Button variant="outline" disabled={!md} onClick={copy}>
            Copy MD
          </Button>
          <Button disabled={!md} onClick={download}>
            Download .md
          </Button>
        </div>
      </header>

      {!active ? (
        <div className="rounded-xl bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
          No active M-IFIE case.{" "}
          <Link to="/mifie" className="underline">
            Open one
          </Link>
          .
        </div>
      ) : (
        <>
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Code" value={active.code} />
            <Stat label="Findings" value={String(active.findings.length)} />
            <Stat
              label="SOLID"
              value={String(active.findings.filter((f) => f.solid === "SOLID").length)}
            />
            <Stat label="Status" value={active.status} />
          </section>

          {active.contradictionTable && active.contradictionTable.length > 0 && (
            <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                Contradiction map
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border font-mono text-[10px] uppercase text-ink">
                      <th className="py-2 pr-3">Claim</th>
                      <th className="py-2 pr-3">Evidence</th>
                      <th className="py-2">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.contradictionTable.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 align-top">
                        <td className="py-2 pr-3">{row.claim}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{row.evidence}</td>
                        <td className="py-2">
                          <Badge variant="outline">{row.verdict}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {active.redTeamNotes && (
            <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
                Red Team notes
              </p>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {active.redTeamNotes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
            <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
              Markdown dossier
            </p>
            {md ? (
              <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap rounded-lg bg-muted/50 p-4 font-mono text-[11px] leading-relaxed">
                {md}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                Run Phase 4 or full matrix to compile the Master Editor dossier.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{label}</p>
      <p className="font-display mt-2 text-2xl font-medium tracking-tight tabular-nums">{value}</p>
    </div>
  );
}
