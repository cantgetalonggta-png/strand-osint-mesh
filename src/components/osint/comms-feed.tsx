import { AGENT_BY_ID } from "@/lib/osint/roster";
import type { Message } from "@/lib/osint/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function CommsFeed({ messages }: { messages: Message[] }) {
  const ordered = messages.slice().reverse();

  if (ordered.length === 0) {
    return (
      <p className="px-1 py-8 text-center text-sm text-muted-foreground">
        Mesh is quiet. Agents speak only after a move of their own.
      </p>
    );
  }

  return (
    <ScrollArea className="h-full min-h-0">
      <ul className="flex flex-col gap-2 pr-3">
        {ordered.map((m) => {
          const from =
            m.from === "system" ? "MESH" : AGENT_BY_ID[m.from]?.callsign ?? m.from.toUpperCase();
          return (
            <li
              key={m.id}
              className={cn(
                "rounded-lg px-3 py-2.5",
                m.kind === "debate" ? "bg-muted" : "bg-transparent shadow-[var(--shadow-border)]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
                  {from}
                  {m.to !== "all" ? ` → ${m.to}` : ""} · {m.kind}
                </p>
                <span className="font-mono text-[10px] text-ink tabular-nums">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{m.body}</p>
            </li>
          );
        })}
      </ul>
    </ScrollArea>
  );
}
