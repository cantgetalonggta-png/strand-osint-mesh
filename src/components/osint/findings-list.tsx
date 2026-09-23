import { ThumbsDown, ThumbsUp } from "lucide-react";
import { AGENT_BY_ID } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";
import type { Finding } from "@/lib/osint/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

function timeLabel(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function FindingsList({
  caseId,
  findings,
}: {
  caseId: string;
  findings: Finding[];
}) {
  const rate = useOsint((s) => s.rateFinding);
  const ordered = findings.slice().reverse();

  if (ordered.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        No findings yet. Start a sweep and each agent will file under its own method.
      </p>
    );
  }

  return (
    <ScrollArea className="h-full">
      <ul className="flex flex-col gap-3 pr-3">
        {ordered.map((f, i) => {
          const agent = AGENT_BY_ID[f.agentId];
          return (
            <li
              key={f.id}
              className="strand-rise rounded-lg bg-card p-4 shadow-[var(--shadow-border)]"
              style={{ animationDelay: `${Math.min(i, 6) * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
                    {agent.callsign}
                    {f.subAgent ? ` · ${f.subAgent}` : ""} · {timeLabel(f.timestamp)}
                  </p>
                  <h4 className="mt-1 text-sm font-medium leading-snug">{f.title}</h4>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                  {f.confidence}%
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-live/90">{f.method}</p>
              <p className="mt-1 text-[11px] text-ink">{f.source}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase shadow-[var(--shadow-border)]"
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto flex gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("size-9", f.rating === 1 && "text-live")}
                    aria-label="Mark useful"
                    onClick={() => rate(caseId, f.id, f.rating === 1 ? 0 : 1)}
                  >
                    <ThumbsUp />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("size-9", f.rating === -1 && "text-destructive")}
                    aria-label="Mark weak"
                    onClick={() => rate(caseId, f.id, f.rating === -1 ? 0 : -1)}
                  >
                    <ThumbsDown />
                  </Button>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
