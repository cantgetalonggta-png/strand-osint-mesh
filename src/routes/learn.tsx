import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DIRECTIVES, WORKFLOW_SPINE } from "@/lib/osint/framework";
import { AGENTS, PHASES } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";

export const Route = createFileRoute("/learn")({ component: LearnPage });

function LearnPage() {
  const cases = useOsint((s) => s.cases);
  const activeId = useOsint((s) => s.activeId);
  const active = cases.find((c) => c.id === activeId) ?? cases[0];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const data = AGENTS.map((a) => ({
    name: a.callsign,
    fit: active?.runtime[a.id].success ?? 0,
    findings: cases.reduce((n, c) => n + c.runtime[a.id].findings, 0),
    debates: cases.reduce((n, c) => n + c.runtime[a.id].debates, 0),
  }));

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">Evaluation</p>
        <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">Learning loop</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Method fit moves when WEFT issues feedback and when you mark a finding useful or weak.
          Agents adapt their next move — they do not copy a neighbour.
        </p>
      </header>

      <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] md:p-6">
        <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Method fit on the active case
        </p>
        <div className="h-64">
          {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap={28}>
              <CartesianGrid stroke="rgba(232,230,225,0.08)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#9a9b96", fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#9a9b96", fontSize: 11, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(232,230,225,0.04)" }}
                contentStyle={{
                  background: "#15171b",
                  border: "1px solid rgba(232,230,225,0.1)",
                  borderRadius: 10,
                  color: "#e8e6e1",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="fit" fill="#b8c0c8" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
          ) : null}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {AGENTS.map((a) => {
          const rt = active?.runtime[a.id];
          return (
            <article key={a.id} className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{a.callsign}</p>
              <h2 className="font-display mt-1 text-2xl font-medium">{a.role}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{rt?.methodShift}</p>
              <p className="mt-3 font-mono text-[11px] text-ink">
                {rt?.findings ?? 0} findings · {rt?.debates ?? 0} disputes · {rt?.success ?? 0}% fit
              </p>
            </article>
          );
        })}
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Operating phases</p>
        <ol className="grid gap-2 md:grid-cols-5">
          {PHASES.map((p, i) => (
            <li key={p} className="rounded-lg bg-card px-3 py-3 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] text-ink tabular-nums">0{i + 1}</p>
              <p className="mt-1 text-sm">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Active laws</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTIVES.slice(0, 8).map((d) => (
            <article key={d.id} className="rounded-lg bg-card px-3 py-3 shadow-[var(--shadow-border)]">
              <p className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">{d.id}</p>
              <p className="mt-1 text-sm font-medium">{d.title}</p>
              <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Workflow spine</p>
        <ol className="flex flex-wrap gap-2">
          {WORKFLOW_SPINE.map((s, i) => (
            <li key={s} className="rounded-md bg-card px-3 py-2 font-mono text-[11px] shadow-[var(--shadow-border)]">
              {String(i + 1).padStart(2, "0")} {s}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}