import { create } from "zustand";
import { createMifieInvestigation, runAllPhases, runPhase } from "./engine";
import type { MifieInvestigation, MifiePhaseId } from "./types";

const KEY = "mifie-v6-store";

function load(): { cases: MifieInvestigation[]; activeId: string | null } {
  if (typeof window === "undefined") return { cases: [], activeId: null };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { cases: [], activeId: null };
    const p = JSON.parse(raw) as { cases?: MifieInvestigation[]; activeId?: string | null };
    return { cases: p.cases ?? [], activeId: p.activeId ?? null };
  } catch {
    return { cases: [], activeId: null };
  }
}

function save(cases: MifieInvestigation[], activeId: string | null) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ cases, activeId }));
}

interface MifieStore {
  cases: MifieInvestigation[];
  activeId: string | null;
  running: boolean;
  hydrate: () => void;
  open: (target: string) => string;
  setActive: (id: string) => void;
  runPhase: (phase: MifiePhaseId) => void;
  runAll: () => void;
  reset: () => void;
}

export const useMifie = create<MifieStore>((set, get) => ({
  cases: [],
  activeId: null,
  running: false,
  hydrate: () => {
    const data = load();
    set(data);
  },
  open: (target) => {
    const inv = createMifieInvestigation(target);
    set((s) => {
      const cases = [inv, ...s.cases];
      save(cases, inv.id);
      return { cases, activeId: inv.id };
    });
    return inv.id;
  },
  setActive: (id) => {
    set({ activeId: id });
    const { cases } = get();
    save(cases, id);
  },
  runPhase: (phase) => {
    const { activeId, cases } = get();
    const cur = cases.find((c) => c.id === activeId);
    if (!cur) return;
    set({ running: true });
    const next = runPhase(cur, phase);
    const updated = cases.map((c) => (c.id === activeId ? next : c));
    set({ cases: updated, running: false });
    save(updated, activeId);
  },
  runAll: () => {
    const { activeId, cases } = get();
    const cur = cases.find((c) => c.id === activeId);
    if (!cur) return;
    set({ running: true });
    const next = runAllPhases(cur);
    const updated = cases.map((c) => (c.id === activeId ? next : c));
    set({ cases: updated, running: false });
    save(updated, activeId);
  },
  reset: () => {
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
    set({ cases: [], activeId: null, running: false });
  },
}));

export function useActiveMifie(): MifieInvestigation | undefined {
  return useMifie((s) => s.cases.find((c) => c.id === s.activeId));
}
