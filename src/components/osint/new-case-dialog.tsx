import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useOsint, type CollectionMode } from "@/lib/osint/store";

export function NewCaseDialog({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const collectionMode = useOsint((s) => s.collectionMode);
  const setCollectionMode = useOsint((s) => s.setCollectionMode);
  const openCase = useOsint((s) => s.openCase);
  const runLiveSweep = useOsint((s) => s.runLiveSweep);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = topic.trim();
    if (!t || busy) return;
    setBusy(true);
    try {
      const id = openCase(t, collectionMode);
      setTopic("");
      setOpen(false);
      void navigate({ to: "/case/$caseId", params: { caseId: id } });
      if (collectionMode === "live-public") {
        await runLiveSweep(id);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>New investigation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open a sweep</DialogTitle>
          <DialogDescription>
            Four agents · independent methods · no mirrors.{" "}
            {collectionMode === "live-public"
              ? "LIVE PUBLIC: real-time open-web research via xAI web_search (public sources only)."
              : "TRAINING: synthetic educational script (no live network)."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="flex gap-2">
            {(
              [
                ["live-public", "Live public"],
                ["synthetic", "Training"],
              ] as [CollectionMode, string][]
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setCollectionMode(m)}
                className={
                  collectionMode === m
                    ? "rounded-md bg-muted px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide"
                    : "rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:bg-muted/60"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
              Target or topic (org / domain / public issue)
            </span>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. example.com certificate transparency"
              autoFocus
              maxLength={120}
            />
          </label>
          <p className="font-mono text-[10px] leading-relaxed text-ink">
            Ceiling: public/open records only · audit language · no personal private targeting
          </p>
          <Button type="submit" disabled={topic.trim().length < 3 || busy}>
            {busy
              ? "Running live lanes…"
              : collectionMode === "live-public"
                ? "Dispatch LIVE agents"
                : "Dispatch training agents"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
