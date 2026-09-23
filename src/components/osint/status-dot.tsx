import { cn } from "@/lib/utils";
import type { AgentStatus, CaseStatus } from "@/lib/osint/types";

export function StatusDot({
  status,
  className,
}: {
  status: AgentStatus | CaseStatus | "running" | "idle";
  className?: string;
}) {
  const live =
    status === "hunting" ||
    status === "analyzing" ||
    status === "debating" ||
    status === "sharing" ||
    status === "mapping" ||
    status === "active" ||
    status === "running";
  const warn = status === "paused" || status === "briefing";
  return (
    <span
      className={cn(
        "inline-block size-1.5 rounded-full",
        live ? "bg-live strand-pulse" : warn ? "bg-warn" : "bg-ink",
        className,
      )}
      aria-hidden
    />
  );
}
