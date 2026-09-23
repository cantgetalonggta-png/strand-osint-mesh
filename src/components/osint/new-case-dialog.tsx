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
import { useOsint } from "@/lib/osint/store";

export function NewCaseDialog({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const openCase = useOsint((s) => s.openCase);
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = topic.trim();
    if (!t) return;
    const id = openCase(t);
    setTopic("");
    setOpen(false);
    void navigate({ to: "/case/$caseId", params: { caseId: id } });
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
            Four agents take independent briefs. Collection is synthetic and educational — no live
            scraping, no personal targeting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">Target or topic</span>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Amberfield Holdings"
              autoFocus
              maxLength={80}
            />
          </label>
          <Button type="submit" disabled={topic.trim().length < 3}>
            Dispatch agents
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
