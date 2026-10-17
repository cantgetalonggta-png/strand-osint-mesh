/** M-IFIE v6.0 — Comprehensive Investigative & Forensic Research Engine types */

export type MifieAgentId =
  | "a01" | "a02" | "a03" | "a04" | "a05" | "a06" | "a07" | "a08"
  | "a09" | "a10" | "a11" | "a12" | "a13" | "a14" | "a15" | "a16";

export type MifiePhaseId = 1 | 2 | 3 | 4;

export type MifieAgentStatus =
  | "idle"
  | "scouting"
  | "harvesting"
  | "analyzing"
  | "auditing"
  | "synthesizing"
  | "complete"
  | "blocked";

export type RepoCategory =
  | "search"
  | "academic"
  | "legal-financial"
  | "archive"
  | "social"
  | "government";

export interface OmniRepo {
  id: string;
  name: string;
  url: string;
  category: RepoCategory;
  region: string;
  description: string;
  operators?: string[];
  dorkExamples?: string[];
}

export interface MifieAgentProfile {
  id: MifieAgentId;
  index: number;
  callsign: string;
  role: string;
  specialty: string;
  doctrine: string;
  methods: string[];
  phaseAffinity: MifiePhaseId[];
  mapsToCore?: "dor" | "meta" | "scan" | "map";
}

export interface PhaseDef {
  id: MifiePhaseId;
  name: string;
  shortName: string;
  action: string;
  agents: MifieAgentId[];
  outputs: string[];
}

export interface MifieFinding {
  id: string;
  agentId: MifieAgentId;
  phase: MifiePhaseId;
  title: string;
  body: string;
  sourceUrl?: string;
  confidence: number;
  tags: string[];
  timestamp: number;
  solid: "SOLID" | "MAYBE" | "UNVERIFIED";
}

export interface MifieAgentRuntime {
  status: MifieAgentStatus;
  lastMove: string;
  findings: number;
  progress: number;
}

export interface PhaseRun {
  phase: MifiePhaseId;
  status: "pending" | "running" | "done" | "skipped";
  startedAt?: number;
  completedAt?: number;
  summary?: string;
  findingIds: string[];
}

export interface MifieInvestigation {
  id: string;
  code: string;
  target: string;
  synopsis: string;
  status: "init" | "phase1" | "phase2" | "phase3" | "phase4" | "complete" | "paused";
  currentPhase: MifiePhaseId;
  createdAt: number;
  phases: PhaseRun[];
  findings: MifieFinding[];
  runtime: Record<MifieAgentId, MifieAgentRuntime>;
  dossierMarkdown?: string;
  redTeamNotes?: string[];
  contradictionTable?: { claim: string; evidence: string; verdict: string }[];
}

export interface SearchOperatorPack {
  id: string;
  name: string;
  operator: string;
  example: string;
  useCase: string;
}
