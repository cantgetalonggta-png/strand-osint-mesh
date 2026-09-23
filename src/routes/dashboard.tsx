import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DASHBOARD_MODULES,
  DOMAIN_PLAYBOOK_STEPS,
  FRAMEWORK_META,
  NL_DEEPSEARCH_TEMPLATES,
  WORKFLOW_SPINE,
} from "@/lib/osint/framework";
import { AGENTS } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const cases = useOsint((s) => s.cases);
  const activeId = useOsint((s) => s.activeId);
  const active = cases.find((c) => c.id === activeId) ?? cases[0];
  const findings = cases.reduce((n, c) => n + c.findings.length, 0);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            Dashboard · framework v{FRAMEWORK_META.version}
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">Module surface</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Five product modules wired to the distilled vault. Synthetic collection · educational methods ·
            Live public mode uses xAI web_search (open sources only).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/framework">Open framework</Link>
          </Button>
          <Button asChild>
            <Link to="/">Operations floor</Link>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Modules" value="5" />
        <Stat label="Cases" value={String(cases.length)} />
        <Stat label="Findings" value={String(findings)} />
        <Stat label="Envelope" value="Synthetic" />
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Product modules
        </p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {DASHBOARD_MODULES.map((m) => {
            const agent = AGENTS.find((a) => a.id === m.agentLane);
            const rt = active?.runtime[m.agentLane];
            return (
              <article
                key={m.id}
                className="flex flex-col gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-display text-xl font-medium tracking-tight">{m.name}</h2>
                  <Badge variant="default" className="font-mono text-[10px] uppercase">
                    {agent?.callsign ?? m.agentLane}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{m.description}</p>
                <p className="font-mono text-[10px] tracking-[0.1em] text-ink uppercase">
                  skill · {m.skill}
                  {rt ? ` · ${rt.status} · ${rt.success}% fit` : ""}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Workflow spine</p>
          <ol className="mt-3 flex flex-wrap gap-2">
            {WORKFLOW_SPINE.map((s, i) => (
              <li
                key={s}
                className="rounded-md bg-muted px-2.5 py-1.5 font-mono text-[11px] tracking-wide"
              >
                {String(i + 1).padStart(2, "0")} {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
            Domain playbook · 9 steps
          </p>
          <ol className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {DOMAIN_PLAYBOOK_STEPS.map((s, i) => (
              <li key={s} className="font-mono text-[11px] text-muted-foreground">
                <span className="text-ink tabular-nums">{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          NL DeepSearch templates (educational)
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {NL_DEEPSEARCH_TEMPLATES.map((t) => (
            <article key={t.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <h3 className="text-sm font-medium">{t.name}</h3>
              <p className="mt-2 line-clamp-5 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {t.template}
              </p>
            </article>
          ))}
        </div>
      </section>

      <p className="font-mono text-[10px] leading-relaxed tracking-[0.04em] text-ink">
        {FRAMEWORK_META.envelope} · source folder {FRAMEWORK_META.sourceFolder}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{label}</p>
      <p className="font-display mt-2 text-3xl font-medium tracking-tight tabular-nums">{value}</p>
    </div>
  );
}
