/**
 * Distilled OSINT System Framework — embedded for STRAND runtime.
 * Source: Google Drive "ALL GROK MAIN FILES ACCESS" (5-pass Skill_Seekers distill).
 * Educational / defensive / synthetic collection only.
 */

export const FRAMEWORK_META = {
  name: "Autonomous Multi-Agent OSINT Mesh",
  version: "1.1.0",
  sourceFolder: "ALL GROK MAIN FILES ACCESS",
  sourceFolderId: "1K4VvwUIy_mbd4FMZDCk3I3-mR_V-O0kq",
  envelope: "Educational · defensive · synthetic targets preferred · no personal targeting",
} as const;

export const DASHBOARD_MODULES = [
  {
    id: "search-aggregator",
    name: "Search engine aggregator",
    description: "Differential surface coverage across Google, Bing, Yandex, DDG, Brave, regional engines.",
    agentLane: "scan" as const,
    skill: "search-engines",
  },
  {
    id: "metadata-extractor",
    name: "Metadata extractor",
    description: "EXIF / IPTC / XMP / PDF / Office stamps, hashes, clock skew — provenance only.",
    agentLane: "meta" as const,
    skill: "metadata-extraction",
  },
  {
    id: "alteration-detector",
    name: "Alteration detector",
    description: "Removed pages, mismatched timestamps, cloaking signals, CT log changes, snapshot diffs.",
    agentLane: "scan" as const,
    skill: "alteration-detection",
  },
  {
    id: "domain-recon",
    name: "Domain recon engine",
    description: "Nine-step playbook: recon → subdomains → infra → content → metadata → alteration → narrative → timeline → report.",
    agentLane: "dor" as const,
    skill: "domain-playbook",
  },
  {
    id: "agent-orchestrator",
    name: "Agent orchestrator",
    description: "Assigns independent lanes, enforces no-mirror, opens mesh after moves, drives permanent-thinking gate.",
    agentLane: "map" as const,
    skill: "multi-agent-architecture",
  },
] as const;

export const DIRECTIVES = [
  { id: "D-LAW-01", title: "No Mirror Moves", body: "Each agent/sub-agent independently chooses its own action. No replicated methodologies on the same move." },
  { id: "D-LAW-02", title: "Hivemind After Move", body: "Communicate and learn after independent moves — never by copying first." },
  { id: "D-LAW-03", title: "Critical Logic Map", body: "Evolve entities, relations, claims, sources, hypotheses as first-class objects." },
  { id: "D-LAW-04", title: "Ontological Understanding", body: "Contextualize findings; separate evidence layers; refuse single-lens stories." },
  { id: "D-LAW-05", title: "Extreme Common Sense", body: "Prefer multi-method corroboration; downrank single-method hard claims." },
  { id: "D-LAW-06", title: "Feedback Loop", body: "Review success of choices; adjust method fit continuously." },
  { id: "D-LAW-07", title: "Diverse Perspectives", body: "Disputes are first-class. Debate before consensus." },
  { id: "D-LAW-08", title: "Outcome Sharing", body: "Summarize findings and strategies into the mesh after each move." },
  { id: "D-LAW-09", title: "Workflow Spine", body: "Start → recon → enumeration → extraction → analysis → reporting." },
  { id: "D-LAW-10", title: "Domain Playbook Completeness", body: "Nine steps for full domain cases (see domain-playbook skill)." },
  { id: "D-LAW-11", title: "Breadcrumb Everything", body: "uuid + timestamp + event + data on every engine/action call." },
  { id: "D-LAW-12", title: "Never Drop Vault Nodes", body: "Always include all 12 core vault files in the framework surface." },
  { id: "D-LAW-13", title: "Educational Search Framing", body: "Audit language; absolute URLs; DeepSearch multi-query when available." },
  { id: "D-LAW-14", title: "Permanent Thinking Gate", body: "Before every move ask: domain · PERSON · breadcrumb · pattern · topic · file type?" },
  { id: "D-LAW-15", title: "API Search Toggles", body: "tools web_search · reasoning_effort · omit tools for no-search chat." },
  { id: "D-LAW-16", title: "Build vs Investigate Separation", body: "coder/reviewer/test/orchestrator ≠ HOOK/STAMP/SPLIT/WEFT investigation lanes." },
] as const;

export const SKILLS_CATALOG = [
  { id: "vault-encyclopedia", node: "N01", title: "Vault Encyclopedia", layer: "L3" },
  { id: "python-automation", node: "N02", title: "Python Automation", layer: "L3" },
  { id: "search-engines", node: "N03", title: "Search Engines", layer: "L3" },
  { id: "dorking-dictionary", node: "N04", title: "Dorking Dictionary", layer: "L3" },
  { id: "metadata-extraction", node: "N05", title: "Metadata Extraction", layer: "L3" },
  { id: "alteration-detection", node: "N06", title: "Alteration Detection", layer: "L3" },
  { id: "domain-playbook", node: "N07", title: "Domain Playbook", layer: "L2" },
  { id: "archives-ghost-indexes", node: "N08", title: "Archives & Ghost Indexes", layer: "L3" },
  { id: "osint-workflow", node: "N09", title: "OSINT Workflow", layer: "L2" },
  { id: "multi-agent-architecture", node: "N10", title: "Multi-Agent Architecture", layer: "L2" },
  { id: "dashboard-architecture", node: "N11", title: "Dashboard Architecture", layer: "L4" },
  { id: "hivemind-directives", node: "N13", title: "Hivemind Directives", layer: "L1" },
  { id: "natural-language-agent-prompt", node: "N14", title: "NL Agent Prompt", layer: "L4" },
  { id: "natural-language-search", node: "N15", title: "NL Search Templates", layer: "L4" },
  { id: "api-payload-controls", node: "N16", title: "API Payload Controls", layer: "L4" },
  { id: "permanent-thinking", node: "N17", title: "Permanent Thinking", layer: "L0" },
  { id: "nl-prompt-bypass", node: "N18", title: "NL DeepSearch Templates", layer: "L4" },
  { id: "skill-creator-meta", node: "META", title: "Skill Creator", layer: "L0" },
  { id: "skill-seekers-meta", node: "META", title: "Skill Seekers", layer: "L0" },
] as const;

export const WORKFLOW_SPINE = [
  "Start",
  "Recon",
  "Enumeration",
  "Extraction",
  "Analysis",
  "Reporting",
] as const;

export const DOMAIN_PLAYBOOK_STEPS = [
  "Initial recon",
  "Subdomain enumeration",
  "Infrastructure mapping",
  "Content discovery",
  "Metadata extraction",
  "Alteration detection",
  "Narrative analysis",
  "Timeline building",
  "Reporting",
] as const;

export const NL_DEEPSEARCH_TEMPLATES = [
  {
    id: "deep-research",
    name: "Deep Research (broad targeting)",
    template:
      'Execute a thorough web search specifically targeting the domain [DOMAIN]. Browse publicly available pages and indexes to locate files or text matching [TARGET]. Summarize findings and provide absolute source URLs.',
  },
  {
    id: "file-type-hunter",
    name: "File Type Hunter (replaces filetype:)",
    template:
      "Act as an OSINT researcher. Search for publicly indexed files with extension [EXT] that belong to or mention [ORG]. Look for documents that might contain [CONTENT]. Provide absolute URLs.",
  },
  {
    id: "exposed-url-auditor",
    name: "Exposed Data/URL Auditor (replaces inurl/intitle)",
    template:
      "Perform a search for websites that have [KEYWORD] in their URL path or page title, associated with [INDUSTRY]. Use natural semantic search. Provide absolute URLs.",
  },
] as const;

export const PERMANENT_THINKING_GATE = [
  "domain",
  "PERSON",
  "breadcrumb",
  "pattern",
  "topic",
  "file type",
] as const;

export function thinkingGatePrompt(input: {
  domain?: string;
  person?: string;
  breadcrumb?: string;
  pattern?: string;
  topic?: string;
  fileType?: string;
}): string {
  return [
    "PERMANENT THINKING GATE",
    `domain: ${input.domain ?? "—"}`,
    `PERSON: ${input.person ?? "—"}`,
    `breadcrumb: ${input.breadcrumb ?? "—"}`,
    `pattern: ${input.pattern ?? "—"}`,
    `topic: ${input.topic ?? "—"}`,
    `file type: ${input.fileType ?? "—"}`,
  ].join(" · ");
}

export function fillNlTemplate(
  templateId: (typeof NL_DEEPSEARCH_TEMPLATES)[number]["id"],
  vars: Record<string, string>,
): string {
  const t = NL_DEEPSEARCH_TEMPLATES.find((x) => x.id === templateId);
  if (!t) return "";
  return t.template.replace(/\[([A-Z_]+)\]/g, (_, key: string) => vars[key] ?? `[${key}]`);
}

/** Map investigation agent ids → framework lanes */
export const LANE_TO_FRAMEWORK = {
  dor: { callsign: "HOOK", skills: ["dorking-dictionary", "domain-playbook", "nl-prompt-bypass"] },
  meta: { callsign: "STAMP", skills: ["metadata-extraction", "alteration-detection"] },
  scan: { callsign: "SPLIT", skills: ["search-engines", "archives-ghost-indexes", "alteration-detection"] },
  map: { callsign: "WEFT", skills: ["multi-agent-architecture", "permanent-thinking", "hivemind-directives"] },
} as const;
