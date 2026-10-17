import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CATEGORY_LABELS,
  OMNI_REPOS,
  SEARCH_OPERATORS,
  buildSearchUrl,
} from "@/lib/mifie/omni-index";
import type { RepoCategory } from "@/lib/mifie/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/omni-index")({ component: OmniIndexPage });

const CATS = Object.keys(CATEGORY_LABELS) as RepoCategory[];

function OmniIndexPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<RepoCategory | "all">("all");
  const [query, setQuery] = useState('site:sec.gov filetype:pdf "annual report"');

  const filtered = useMemo(() => {
    return OMNI_REPOS.filter((r) => {
      if (cat !== "all" && r.category !== cat) return false;
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        r.name.toLowerCase().includes(s) ||
        r.description.toLowerCase().includes(s) ||
        r.region.toLowerCase().includes(s)
      );
    });
  }, [q, cat]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">
            Section 1 · Omni-Index Architecture
          </p>
          <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">
            Global multi-engine directory
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {OMNI_REPOS.length} curated public repositories · search operators · deep-link builders.
            Public pages and official sources only.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/mifie">Back to M-IFIE</Link>
        </Button>
      </header>

      <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
        <p className="font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Multi-engine query builder
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 font-mono text-xs" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["google", "bing", "ddg", "yandex", "scholar", "courtlistener", "edgar", "wayback"].map(
            (id) => (
              <Button key={id} size="sm" variant="outline" asChild>
                <a href={buildSearchUrl(id, query)} target="_blank" rel="noreferrer">
                  Open in {id}
                </a>
              </Button>
            ),
          )}
        </div>
      </section>

      <section>
        <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          Search operators
        </p>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {SEARCH_OPERATORS.map((op) => (
            <article key={op.id} className="rounded-xl bg-card p-3 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium">{op.name}</h3>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {op.operator}
                </Badge>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">{op.example}</p>
              <p className="mt-1 text-xs text-muted-foreground">{op.useCase}</p>
              <Button
                size="sm"
                variant="ghost"
                className="mt-2 h-8 px-2 text-xs"
                onClick={() => setQuery(op.example)}
              >
                Load example
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter repositories…"
            className="max-w-sm"
          />
          <div className="flex flex-wrap gap-1">
            <Button
              size="sm"
              variant={cat === "all" ? "default" : "outline"}
              onClick={() => setCat("all")}
            >
              All
            </Button>
            {CATS.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={cat === c ? "default" : "outline"}
                onClick={() => setCat(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="flex flex-col gap-2 rounded-xl bg-card p-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium">{r.name}</h3>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
                <Badge variant="outline" className="shrink-0 font-mono text-[9px] uppercase">
                  {r.region}
                </Badge>
              </div>
              <p className="font-mono text-[10px] tracking-[0.08em] text-ink uppercase">
                {CATEGORY_LABELS[r.category]}
              </p>
              {r.operators && (
                <p className="font-mono text-[10px] text-muted-foreground">
                  ops: {r.operators.join(" · ")}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    Open source
                  </a>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <a href={buildSearchUrl(r.id, query || r.name)} target="_blank" rel="noreferrer">
                    Search target
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
