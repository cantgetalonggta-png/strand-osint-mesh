import type { MifieAgentId, PhaseDef } from "./types";

export const MIFIE_PHASES: PhaseDef[] = [
  {
    id: 1,
    name: "RECONNAISSANCE & SCOPE INITIALIZATION",
    shortName: "Recon",
    action:
      "Execute initial search queries across primary, academic, and official government repositories. Map domain history, key entities, and documentation trails.",
    agents: ["a01", "a02", "a03", "a04", "a05", "a14"] as MifieAgentId[],
    outputs: ["Entity map", "Primary URL directory", "Scope charter", "Open questions log"],
  },
  {
    id: 2,
    name: "ADVANCED SEARCH, ARCHIVAL RECOVERY & PRIMARY SOURCE HARVESTING",
    shortName: "Harvest",
    action:
      "Deploy advanced search strings (intitle:\"index of\", ext:pdf, site:archive.org) and historical snapshot recovery. Extract primary documents, public financial records, and legal filings.",
    agents: ["a01", "a02", "a06", "a08", "a15", "a04", "a05"] as MifieAgentId[],
    outputs: ["Primary document set", "Archive captures", "Filing excerpts", "Metadata notes"],
  },
  {
    id: 3,
    name: "PATTERN ANALYSIS, ANOMALY DETECTION & CONTRADICTION MAPPING",
    shortName: "Pattern",
    action:
      "Activate Pattern Engine and Bias Checker to cross-reference primary findings. Construct comparative data tables contrasting public statements against verifiable archival records.",
    agents: ["a09", "a10", "a07", "a12", "a14"] as MifieAgentId[],
    outputs: ["Contradiction table", "Anomaly list", "SOLID/MAYBE tags", "Red-team seeds"],
  },
  {
    id: 4,
    name: "SYNTHESIS, RED-TEAM AUDIT & FINAL DOSSIER GENERATION",
    shortName: "Dossier",
    action:
      "Run Red Team audit to address confirmation bias, synthesize key insights, and deliver an exhaustive, well-structured research dossier.",
    agents: ["a11", "a12", "a13", "a14", "a16"] as MifieAgentId[],
    outputs: ["Final dossier (MD)", "Red-team notes", "Citation block", "Open questions residual"],
  },
];

export const PHASE_BY_ID = Object.fromEntries(MIFIE_PHASES.map((p) => [p.id, p])) as Record<
  1 | 2 | 3 | 4,
  PhaseDef
>;
