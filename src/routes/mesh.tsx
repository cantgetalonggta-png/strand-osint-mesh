import { createFileRoute } from "@tanstack/react-router";
import { CommsFeed } from "@/components/osint/comms-feed";
import { useOsint } from "@/lib/osint/store";
import type { Message } from "@/lib/osint/types";

export const Route = createFileRoute("/mesh")({ component: MeshPage });

function MeshPage() {
  const cases = useOsint((s) => s.cases);
  const messages: Message[] = cases
    .flatMap((c) => c.messages)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 80);
  const debates = messages.filter((m) => m.kind === "debate").length;
  const shares = messages.filter((m) => m.kind === "share").length;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-[10px] tracking-[0.2em] text-ink uppercase">Protocol</p>
        <h1 className="font-display mt-1 text-4xl font-medium tracking-tight">The mesh</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Agents speak after they move, never before. Disputes are first-class objects. Feedback is
          written back into method fit.
        </p>
      </header>
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label="Messages" value={String(messages.length)} />
        <Stat label="Disputes" value={String(debates)} />
        <Stat label="Shares" value={String(shares)} />
      </section>
      <section className="min-h-[480px] rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] md:p-6">
        <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">Live transcript</p>
        <div className="h-[520px]">
          <CommsFeed messages={messages} />
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{label}</p>
      <p className="font-display mt-2 text-3xl font-medium tabular-nums">{value}</p>
    </div>
  );
}
