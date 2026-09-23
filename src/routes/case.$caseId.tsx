import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentCard } from "@/components/osint/agent-card";
import { CommsFeed } from "@/components/osint/comms-feed";
import { FindingsList } from "@/components/osint/findings-list";
import { LogicMap } from "@/components/osint/logic-map";
import { StatusDot } from "@/components/osint/status-dot";
import { SweepControls } from "@/components/osint/sweep-controls";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AGENTS } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";
import { synthesizeCase } from "@/lib/osint/synthesize";

export const Route = createFileRoute("/case/$caseId")({ component: CasePage });

function CasePage() {
  const { caseId } = Route.useParams();
  const inv = useOsint((s) => s.cases.find((c) => c.id === caseId));
  const [syn, setSyn] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!inv) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-3xl">Case not on the floor</h1>
        <Link to="/" className="mt-4 inline-flex h-11 items-center text-sm text-muted-foreground">
          Return to operations
        </Link>
      </div>
    );
  }

  async function requestSynthesis() {
    if (!inv) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await synthesizeCase({
        data: {
          title: inv.title,
          findings: inv.findings.map((f) => ({
            agent: f.agentId,
            title: f.title,
            method: f.method,
          })),
        },
      });
      if (res.ok) setSyn(res.text);
      else setErr(res.error);
    } catch {
      setErr("Synthesis could not run.");
    } finally {
      setBusy(false);
    }
  }

  const debriefs = inv.messages.filter((m) => m.body.includes("debrief:"));

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
            <StatusDot status={inv.status} />
            {inv.code} · {inv.status} · {inv.synthetic ? "synthetic" : "live"}
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">{inv.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{inv.synopsis}</p>
        </div>
      </header>

      <SweepControls inv={inv} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {AGENTS.map((a) => (
          <AgentCard key={a.id} id={a.id} runtime={inv.runtime[a.id]} compact />
        ))}
      </div>

      <Tabs defaultValue="map">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="map">Logic map</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="mesh">Mesh</TabsTrigger>
          <TabsTrigger value="debrief">Debrief</TabsTrigger>
        </TabsList>
        <TabsContent value="map">
          <LogicMap inv={inv} />
        </TabsContent>
        <TabsContent value="findings">
          <div className="h-[28rem]">
            <FindingsList caseId={inv.id} findings={inv.findings} />
          </div>
        </TabsContent>
        <TabsContent value="mesh">
          <div className="h-[28rem] rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
            <CommsFeed messages={inv.messages} />
          </div>
        </TabsContent>
        <TabsContent value="debrief">
          <div className="flex flex-col gap-4">
            {debriefs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Debrief unlocks after the sweep reaches evaluation. Each agent will present a method
                the others did not use.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {debriefs.map((m) => (
                  <li key={m.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.body}</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">WEFT synthesis</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Optional live join of the current strands. User-initiated. Caps output.
              </p>
              <Button
                type="button"
                className="mt-3"
                variant="secondary"
                disabled={busy || inv.findings.length === 0}
                onClick={() => void requestSynthesis()}
              >
                {busy ? "Weaving…" : "Request synthesis"}
              </Button>
              {err ? <p className="mt-3 text-sm text-destructive">{err}</p> : null}
              {syn ? <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{syn}</p> : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
