export type AgentId = "dor" | "meta" | "scan" | "map";

export type AgentStatus =
  | "idle"
  | "hunting"
  | "analyzing"
  | "debating"
  | "sharing"
  | "mapping"
  | "debrief";

export type CaseStatus = "briefing" | "active" | "paused" | "debrief" | "archived";

export type MessageKind = "share" | "debate" | "query" | "feedback" | "map" | "system";

export type NodeKind = "entity" | "asset" | "claim" | "source" | "hypothesis" | "person";

export type EventKind =
  | "status"
  | "finding"
  | "message"
  | "node"
  | "edge"
  | "debate"
  | "feedback"
  | "phase"
  | "debrief";

export interface SubAgent {
  id: string;
  name: string;
  specialty: string;
}

export interface AgentProfile {
  id: AgentId
  index: number;
  callsign: string;
  designation: string;
  role: string;
  doctrine: string;
  methods: string[];
  refuses: string;
  subAgents: SubAgent[];
  voice: string;
}

export interface Finding {
  id: string;
  caseId: string;
  agentId: AgentId;
  subAgent?: string;
  title: string;
  body: string;
  method: string;
  source: string;
  confidence: number;
  tags: string[];
  timestamp: number;
  rating: -1 | 0 | 1;
}

export interface Message {
  id: string;
  caseId: string;
  from: AgentId | "system";
  to: AgentId | "all";
  kind: MessageKind;
  body: string;
  timestamp: number;
}

export interface LogicNode {
  id: string;
  caseId: string;
  label: string;
  kind: NodeKind;
  agentId?: AgentId;
  note?: string;
  x: number;
  y: number;
}

export interface LogicEdge {
  id: string;
  caseId: string;
  from: string;
  to: string;
  rel: string;
}

export interface AgentRuntime {
  status: AgentStatus;
  lastMove: string;
  findings: number;
  shares: number;
  debates: number;
  success: number;
  methodShift: string;
}

export interface SweepEvent {
  id: string;
  kind: EventKind;
  agentId?: AgentId;
  status?: AgentStatus;
  detail?: string;
  finding?: Omit<Finding, "id" | "caseId" | "timestamp" | "rating">;
  message?: Omit<Message, "id" | "caseId" | "timestamp">;
  node?: Omit<LogicNode, "caseId">;
  edge?: Omit<LogicEdge, "id" | "caseId">;
  debate?: { a: AgentId; b: AgentId; topic: string; aPos: string; bPos: string };
  feedback?: { agentId: AgentId; delta: number; reason: string };
  phase?: number;
  debrief?: { agentId: AgentId; summary: string; next: string };
}

export interface Investigation {
  id: string;
  code: string;
  title: string;
  target: string;
  synopsis: string;
  status: CaseStatus;
  phase: number;
  startedAt: number;
  cursor: number;
  script: SweepEvent[];
  findings: Finding[];
  messages: Message[];
  nodes: LogicNode[];
  edges: LogicEdge[];
  runtime: Record<AgentId, AgentRuntime>;
  synthetic: boolean;
}

export interface OsintState {
  cases: Investigation[];
  activeId: string | null;
  running: boolean;
  tick: number;
}
