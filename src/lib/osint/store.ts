import { create } from "zustand";
import { applyMany, step } from "./engine";
import { uid } from "./id";
import { createCase } from "./procedural";
import { PRELOAD, seedCases } from "./seed";
import { thinkingGatePrompt } from "./framework";
import type { AgentId, Investigation } from "./types";

const STORAGE_KEY = "strand-osint-v1";

function hydrateSeed(): Investigation[] {
  const [nw, hc, at] = seedCases();
  const now = Date.UTC(2026, 8, 22, 16, 40, 0);
  return [
    applyMany(nw, PRELOAD.northwind, now - 36 * 60_000),
    applyMany(hc, PRELOAD.helios, now - 48 * 60_000),
    applyMany(at, PRELOAD.atlas, now - 10 * 60_000),
  ].map((c, i) => {
    if (i === 0) return { ...c, status: "active" as const };
    if (i === 1) return { ...c, status: "paused" as const };
    return { ...c, status: "debrief" as const, phase: 5 };
  });
}

function seedState(): { cases: Investigation[]; activeId: string } {
  const seeded = hydrateSeed();
  return { cases: seeded, activeId: seeded[0]!.id };
}

function readPersist(): { cases: Investigation[]; activeId: string } {
  if (typeof window === "undefined") return seedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as { cases?: Investigation[]; activeId?: string };
    if (!parsed.cases?.length) return seedState();
    return {
      cases: parsed.cases,
      activeId: parsed.activeId ?? parsed.cases[0]!.id,
    };
  } catch {
    return seedState();
  }
}

interface Store {
  cases: Investigation[];
  activeId: string;
  running: boolean;
  ready: boolean;
  hydrate: () => void;
  persist: () => void;
  setActive: (id: string) => void;
  start: (id?: string) => void;
  pause: () => void;
  tickOnce: () => void;
  openCase: (topic: string) => string;
  rateFinding: (caseId: string, findingId: string, rating: -1 | 0 | 1) => void;
  reset: () => void;
}

function write(cases: Investigation[], activeId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cases, activeId }));
}

const initial = seedState();

export const useOsint = create<Store>((set, get) => ({
  cases: initial.cases,
  activeId: initial.activeId,
  running: false,
  ready: true,
  hydrate: () => {
    const data = readPersist();
    set({ ...data, ready: true });
  },
  persist: () => {
    const { cases, activeId } = get();
    write(cases, activeId);
  },
  setActive: (id) => {
    set({ activeId: id, running: false });
    get().persist();
  },
  start: (id) => {
    const activeId = id ?? get().activeId;
    set({ activeId, running: true });
    set((s) => ({
      cases: s.cases.map((c) =>
        c.id === activeId && c.status !== "debrief" ? { ...c, status: "active" } : c,
      ),
    }));
    get().persist();
  },
  pause: () => {
    const { activeId } = get();
    set({ running: false });
    set((s) => ({
      cases: s.cases.map((c) => (c.id === activeId && c.status === "active" ? { ...c, status: "paused" } : c)),
    }));
    get().persist();
  },
  tickOnce: () => {
    const { activeId, cases } = get();
    const cur = cases.find((c) => c.id === activeId);
    if (!cur) return;
    if (cur.cursor >= cur.script.length) {
      set({ running: false });
      set((s) => ({
        cases: s.cases.map((c) => (c.id === activeId ? { ...c, status: "debrief" } : c)),
      }));
      get().persist();
      return;
    }
    const next = step(cur, Date.now());
    set({
      cases: cases.map((c) => (c.id === activeId ? next : c)),
      running: next.cursor < next.script.length && next.status !== "debrief",
    });
    get().persist();
  },
  openCase: (topic) => {
    const created = createCase(topic);
    created.messages = [
      {
        id: uid("msg"),
        caseId: created.id,
        from: "system",
        to: "all",
        kind: "system",
        body: `New investigation ${created.code}. Synthetic collection. Four agents will not mirror one another. ${thinkingGatePrompt({ topic: topic.trim() || "target", domain: "synthetic", breadcrumb: created.code, pattern: "independent-lanes", fileType: "mixed" })}`,
        timestamp: Date.now(),
      },
    ];
    set((s) => ({
      cases: [created, ...s.cases],
      activeId: created.id,
      running: true,
    }));
    get().persist();
    return created.id;
  },
  rateFinding: (caseId, findingId, rating) => {
    set((s) => ({
      cases: s.cases.map((c) => {
        if (c.id !== caseId) return c;
        const findings = c.findings.map((f) => (f.id === findingId ? { ...f, rating } : f));
        const hit = findings.find((f) => f.id === findingId);
        if (!hit) return { ...c, findings };
        const agent: AgentId = hit.agentId;
        const delta = rating === 1 ? 2 : rating === -1 ? -2 : 0;
        const runtime = {
          ...c.runtime,
          [agent]: {
            ...c.runtime[agent],
            success: Math.max(8, Math.min(97, c.runtime[agent].success + delta)),
          },
        };
        return { ...c, findings, runtime };
      }),
    }));
    get().persist();
  },
  reset: () => {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
    const seeded = hydrateSeed();
    set({ cases: seeded, activeId: seeded[0]!.id, running: false, ready: true });
  },
}));

export function useActiveCase(): Investigation | undefined {
  return useOsint((s) => s.cases.find((c) => c.id === s.activeId));
}
