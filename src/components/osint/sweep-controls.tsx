import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
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
  const pct = inv.script.length ? Math.round((inv.cursor / inv.script.length) * 100) : 0;
  const done = inv.cursor >= inv.script.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {running ? (
          <Button type="button" variant="secondary" onClick={pause}>
            <Pause /> Pause sweep
          </Button>
        ) : (
          <Button type="button" onClick={() => start(inv.id)} disabled={done}>
            <Play /> {inv.cursor === 0 ? "Begin sweep" : done ? "Sweep complete" : "Resume"}
          </Button>
        )}
        <Button type="button" variant="outline" onClick={tickOnce} disabled={done}>
          <SkipForward /> One move
        </Button>
        <Button type="button" variant="ghost" onClick={reset} className="ml-auto">
          <RotateCcw /> Reset floor
        </Button>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] text-ink uppercase">
          <span>
            Phase {inv.phase} · {PHASES[inv.phase - 1] ?? "Sweep"}
          </span>
          <span className="tabular-nums">
            {inv.cursor}/{inv.script.length} · {pct}%
          </span>
        </div>
        <Progress value={pct} />
      </div>
    </div>
  );
}
