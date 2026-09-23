import type { AgentId, AgentProfile, AgentRuntime } from "./types";

export const AGENTS: AgentProfile[] = [
  {
    id: "dor",
    index: 1,
    callsign: "HOOK",
    designation: "Agent A · Surface hunter",
    role: "Dorking & hidden resource discovery",
    doctrine:
      "If it was indexed once, it still exists in some cache, operator, or forgotten path. I never ask an engine for 'the answer' — I ask it for the door it forgot to close.",
    methods: [
      "Operator chaining (intitle, inurl, filetype, site, cache)",
      "Exact-phrase + exclusion lattices",
      "Open-directory and leftover staging hunts",
      "Paste and document-index dorks",
    ],
    refuses:
      "I do not read metadata, compare engines, or draw ontology. Collection only.",
    voice: "terse operators, paths, and query strings",
    subAgents: [
      { id: "ghost", name: "GHOST", specialty: "Cached and stripped pages" },
      { id: "filehook", name: "FILEHOOK", specialty: "Document extension hunts" },
      { id: "pathfinder", name: "PATHFINDER", specialty: "URL pattern expansion" },
    ],
  },
  {
    id: "meta",
    index: 2,
    callsign: "STAMP",
    designation: "Agent B · Provenance analyst",
    role: "Document metadata & temporal fingerprinting",
    doctrine:
      "Files lie in their filenames and tell the truth in their stamps. Authors, producers, timezones, and software versions are a second map underneath the first.",
    methods: [
      "PDF producer / creator / author extraction",
      "EXIF and timezone clustering",
      "Software-stack fingerprinting",
      "Revision and clock-skew patterns",
    ],
    refuses:
      "I do not dork, scrape engines, or own the logic map. I only read what artifacts confess.",
    voice: "forensic, clocks, producer strings, mismatches",
    subAgents: [
      { id: "clock", name: "CLOCK", specialty: "Temporal clustering" },
      { id: "author", name: "AUTHOR", specialty: "Identity leakage in stamps" },
      { id: "stack", name: "STACK", specialty: "Tooling fingerprints" },
    ],
  },
  {
    id: "scan",
    index: 3,
    callsign: "SPLIT",
    designation: "Agent C · Coverage analyst",
    role: "Multi-engine differential & archive coverage",
    doctrine:
      "No engine sees the same web. The finding is often the delta — a URL Bing kept, a cert Google never indexed, a capture only Wayback holds.",
    methods: [
      "Engine-by-engine result diffs",
      "Certificate transparency lattices",
      "WHOIS / RDAP historical names",
      "Archive coverage scoring",
    ],
    refuses:
      "I do not author dorks as a hunter or parse file metadata. I measure what each lens uniquely returns.",
    voice: "coverage gaps, engine quirks, archive hits",
    subAgents: [
      { id: "wayback", name: "WAYBACK", specialty: "Temporal web captures" },
      { id: "cert", name: "CERT", specialty: "CT log expansion" },
      { id: "rdap", name: "RDAP", specialty: "Registration history" },
    ],
  },
  {
    id: "map",
    index: 4,
    callsign: "WEFT",
    designation: "Agent D · Logic cartographer",
    role: "Critical logic maps, ontology, synthesis",
    doctrine:
      "A fact is not a finding until it sits in relation. I weave the others' strands, name contradictions, and refuse a story that only one method can tell.",
    methods: [
      "Entity–relation ontology",
      "Contradiction watch",
      "Confidence weighting across methods",
      "Hypothesis revision loops",
    ],
    refuses:
      "I do not collect. I only map, weigh, and send the others back out with a better question.",
    voice: "claims, relations, and revised hypotheses",
    subAgents: [
      { id: "onto", name: "ONTOLOGY", specialty: "Named-entity lattice" },
      { id: "contradict", name: "CONTRADICT", specialty: "Cross-agent disputes" },
      { id: "weight", name: "WEIGHT", specialty: "Confidence revision" },
    ],
  },
];

export const AGENT_BY_ID: Record<AgentId, AgentProfile> = {
  dor: AGENTS[0],
  meta: AGENTS[1],
  scan: AGENTS[2],
  map: AGENTS[3],
};

export function freshRuntime(): Record<AgentId, AgentRuntime> {
  return {
    dor: {
      status: "idle",
      lastMove: "Waiting for a target.",
      findings: 0,
      shares: 0,
      debates: 0,
      success: 62,
      methodShift: "Operator lattices over broad keywords",
    },
    meta: {
      status: "idle",
      lastMove: "Waiting for artifacts.",
      findings: 0,
      shares: 0,
      debates: 0,
      success: 58,
      methodShift: "Timezone clusters over filename claims",
    },
    scan: {
      status: "idle",
      lastMove: "Waiting for a coverage pass.",
      findings: 0,
      shares: 0,
      debates: 0,
      success: 71,
      methodShift: "CT + archive before live index",
    },
    map: {
      status: "idle",
      lastMove: "Waiting for strands to weave.",
      findings: 0,
      shares: 0,
      debates: 0,
      success: 66,
      methodShift: "Contradiction-first mapping",
    },
  };
}

export const PHASES = [
  "System setup",
  "Protocol open",
  "Onboarding sweep",
  "Active collection",
  "Evaluation",
] as const;
