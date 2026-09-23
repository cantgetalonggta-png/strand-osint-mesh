import { useState } from "react";
import { Pause, Play, Radio, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PHASES } from "@/lib/osint/roster";
import { useOsint } from "@/lib/osint/store";
import type { Investigation } from "@/lib/osint/types";

export function SweepControls({ inv }: { inv: Investigation }) {
  const running = useOsint((s) => s.running);
  const start = useOsint((s) => s.start);
  const pause = useOsint((s) => s.pause);
  const tickOnce = useOsint((s) => s.tickOnce);
  const reset = useOsint((s) => s.reset);
  const runLiveSweep = useOsint((s) => s.runLiveSweep);
  const [liveErr, setLiveErr] = useState<string | null>(null);
  const [liveBusy, setLiveBusy] = useState(false);
  const pct = inv.script.length ? Math.round((inv.cursor / inv.script.length) * 100) : 0;
  const done = inv.script.length > 0 && inv.cursor >= inv.script.length;
  const isLive = !inv.synthetic;

  async function onLive() {
    setLiveBusy(true);
    setLiveErr(null);
    const res = await runLiveSweep(inv.id);
    if (!res.ok) setLiveErr(res.error ?? "Live sweep failed");
    setLiveBusy(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={
            isLive
              ? "rounded-md bg-live/15 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-live uppercase"
              : "rounded-md bg-muted px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-ink uppercase"
          }
        >
          {isLive ? "Live public" : "Training"}
        </span>
        {running ? (
          <Button type="button" variant="secondary" onClick={pause}>
            <Pause /> Pause
          </Button>
        ) : (
          <Button type="button" onClick={() => start(inv.id)} disabled={done && inv.synthetic}>
            <Play /> {inv.cursor === 0 ? "Begin training" : done ? "Complete" : "Resume"}
          </Button>
        )}
        <Button type="button" variant="outline" onClick={tickOnce} disabled={done || !inv.synthetic}>
          <SkipForward /> One move
        </Button>
        <Button type="button" variant="default" onClick={onLive} disabled={liveBusy || running}>
          <Radio /> {liveBusy ? "Live lanes…" : "Run LIVE public sweep"}
        </Button>
        <Button type="button" variant="ghost" onClick={reset} className="ml-auto">
          <RotateCcw /> Reset floor
        </Button>
      </div>
      {liveErr ? (
        <p className="font-mono text-[11px] text-warn">
          Live: {liveErr} · Add xAI credits or set XAI_API_KEY on Vercel if blocked.
        </p>
      ) : null}
      <div>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
          <span>
            Phase {inv.phase} · {PHASES[inv.phase - 1] ?? "Sweep"}
          </span>
          <span className="tabular-nums">
            {inv.cursor}/{Math.max(inv.script.length, inv.findings.length)} · {pct}%
          </span>
        </div>
        <Progress value={pct} />
      </div>
    </div>
  );
}
