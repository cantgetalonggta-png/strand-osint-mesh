import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DIRECTIVES,
  FRAMEWORK_META,
  LANE_TO_FRAMEWORK,
  PERMANENT_THINKING_GATE,
  SKILLS_CATALOG,
} from "@/lib/osint/framework";
import { AGENTS } from "@/lib/osint/roster";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/framework")({ component: FrameworkPage });

function FrameworkPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            Framework · {FRAMEWORK_META.name}
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">
            Distilled system law
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            16 directives · 19 skills · 18 nodes · permanent thinking gate. Built with skill-creator +
            Skill_Seekers from every file in the vault folder.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/dashboard">Dashboard modules</Link>
        </Button>
      </header>

      <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)] md:p-6">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Permanent thinking gate
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PERMANENT_THINKING_GATE.map((g) => (
            <span
              key={g}
              className="rounded-md bg-muted px-3 py-1.5 font-mono text-[12px] tracking-wide uppercase"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Every agent move must answer these six before deployment. No empty gates.
        </p>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Directives registry
        </p>
        <div className="grid gap-2 md:grid-cols-2">
          {DIRECTIVES.map((d) => (
            <article key={d.id} className="rounded-lg bg-card px-4 py-3 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
                {d.id} · {d.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Skills catalog
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS_CATALOG.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-2 rounded-lg bg-card px-3 py-2.5 shadow-[var(--shadow-border)]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{s.title}</p>
                <p className="font-mono text-[10px] text-ink uppercase">
                  {s.node} · {s.id}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                {s.layer}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Lane → skill binding
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {AGENTS.map((a) => {
            const bind = LANE_TO_FRAMEWORK[a.id];
            return (
              <article key={a.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
                <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
                  {bind.callsign} · {a.role}
                </p>
                <ul className="mt-2 space-y-1">
                  {bind.skills.map((sk) => (
                    <li key={sk} className="font-mono text-[11px] text-muted-foreground">
                      {sk}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <p className="font-mono text-[10px] text-ink">
        v{FRAMEWORK_META.version} · {FRAMEWORK_META.envelope}
      </p>
    </div>
  );
}
