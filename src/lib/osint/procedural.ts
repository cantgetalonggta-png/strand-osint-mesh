import { fnv, pick, slug, uid } from "./id";
import { freshRuntime } from "./roster";
import type { AgentId, Investigation, SweepEvent } from "./types";

const TLDS = ["example", "invalid", "test"] as const;
const PATHS = ["files", "backup", "docs", "static", "cdn", "media", "export"] as const;
const EXTS = ["pdf", "xlsx", "csv", "zip", "docx"] as const;
const ENGINES = ["Bing leftover", "Yandex morphology", "DuckDuckGo !bang", "Wayback unique"] as const;
const PRODUCERS = [
  "Acrobat Distiller 9.0",
  "Microsoft Word 15.0",
  "LibreOffice 7.4",
  "Nitro Pro 13",
  "Quartz PDFContext",
] as const;
const AUTHORS = ["ops.admin", "j.lee", "billing.bot", "m.okonkwo", "desk.night"] as const;

function host(topic: string, salt: string) {
  const s = slug(topic);
  const n = fnv(topic + salt) % 90;
  const tld = pick([...TLDS], fnv(salt));
  return `${s}-${n}.${tld}`;
}

export function buildScript(topic: string): SweepEvent[] {
  const h = fnv(topic);
  const h1 = host(topic, "dor");
  const h2 = host(topic, "scan");
  const path = pick([...PATHS], h);
  const ext = pick([...EXTS], h >> 3);
  const engine = pick([...ENGINES], h >> 5);
  const producer = pick([...PRODUCERS], h >> 7);
  const author = pick([...AUTHORS], h >> 9);
  const hour = 18 + (h % 7);
  const token = topic.trim().slice(0, 48) || "target";
  const q = token.replace(/"/g, "");

  const nodes = {
    org: `n-${uid("org")}`,
    asset: `n-${uid("asset")}`,
    person: `n-${uid("p")}`,
    src: `n-${uid("src")}`,
    hyp: `n-${uid("h")}`,
  };

  const events: SweepEvent[] = [
    {
      id: uid("ev"),
      kind: "phase",
      phase: 1,
      detail: `Independent briefs on “${q}”. No shared plan.`,
    },
    {
      id: uid("ev"),
      kind: "status",
      agentId: "dor",
      status: "hunting",
      detail: "HOOK writes operators from the token, never a generic crawl.",
    },
    {
      id: uid("ev"),
      kind: "finding",
      agentId: "dor",
      finding: {
        agentId: "dor",
        subAgent: "FILEHOOK",
        title: `Open ${ext} tree on ${h1}`,
        body: `Directory listing at ${h1}/${path}/ with ${3 + (h % 12)} ${ext} objects. Naming pattern ${slug(q).slice(0, 6).toUpperCase()}-####.`,
        method: `intitle:"index of" "${q}" (${ext} | ${path}) -job -linkedin`,
        source: `web index · ${h1}/${path}/`,
        confidence: 70 + (h % 18),
        tags: ["open-directory", ext, "dork"],
      },
    },
    {
      id: uid("ev"),
      kind: "message",
      agentId: "dor",
      message: {
        from: "dor",
        to: "all",
        kind: "share",
        body: `HOOK: I will not read the ${ext} set. STAMP, provenance is yours. SPLIT, I stayed on one index.`,
      },
    },
    {
      id: uid("ev"),
      kind: "status",
      agentId: "meta",
      status: "analyzing",
      detail: "STAMP opens producer strings, ignores the dork.",
    },
    {
      id: uid("ev"),
      kind: "finding",
      agentId: "meta",
      finding: {
        agentId: "meta",
        subAgent: "STACK",
        title: `${producer} · author ${author}`,
        body: `Producer is ${producer}. Author field repeats “${author}”. Clocks sit near ${hour}:00, which does not match the public locale copy on the apex site.`,
        method: "Producer/author/ModDate batch, filename-blind",
        source: `document forensics · ${h1}/${path}/`,
        confidence: 64 + (h % 20),
        tags: ["metadata", "author", "clock"],
      },
    },
    {
      id: uid("ev"),
      kind: "status",
      agentId: "scan",
      status: "hunting",
      detail: "SPLIT starts on CT and engine delta, skips the directory.",
    },
    {
      id: uid("ev"),
      kind: "finding",
      agentId: "scan",
      finding: {
        agentId: "scan",
        subAgent: "CERT",
        title: `SAN drift on ${h2}`,
        body: `CT lattice for the token shows a leftover SAN vpn-${slug(q).slice(0, 8)}.${pick([...TLDS], h >> 2)} plus a host only ${engine} still ranks.`,
        method: `CT expansion + ${engine} differential, no dork reuse`,
        source: `coverage · ${h2}`,
        confidence: 66 + (h % 16),
        tags: ["ct-logs", "engine-diff"],
      },
    },
    {
      id: uid("ev"),
      kind: "node",
      agentId: "map",
      node: { id: nodes.org, label: q, kind: "entity", x: 22, y: 48 },
    },
    {
      id: uid("ev"),
      kind: "node",
      agentId: "map",
      node: {
        id: nodes.asset,
        label: `${path}/${ext}`,
        kind: "asset",
        agentId: "dor",
        x: 52,
        y: 22,
      },
    },
    {
      id: uid("ev"),
      kind: "node",
      agentId: "map",
      node: {
        id: nodes.person,
        label: author,
        kind: "person",
        agentId: "meta",
        x: 78,
        y: 40,
      },
    },
    {
      id: uid("ev"),
      kind: "node",
      agentId: "map",
      node: {
        id: nodes.src,
        label: engine,
        kind: "source",
        agentId: "scan",
        x: 54,
        y: 76,
      },
    },
    {
      id: uid("ev"),
      kind: "edge",
      agentId: "map",
      edge: { from: nodes.org, to: nodes.asset, rel: "exposes" },
    },
    {
      id: uid("ev"),
      kind: "edge",
      agentId: "map",
      edge: { from: nodes.asset, to: nodes.person, rel: "stamped by" },
    },
    {
      id: uid("ev"),
      kind: "edge",
      agentId: "map",
      edge: { from: nodes.src, to: nodes.org, rel: "uniquely names" },
    },
    {
      id: uid("ev"),
      kind: "debate",
      agentId: "map",
      debate: {
        a: "dor" as AgentId,
        b: "meta" as AgentId,
        topic: `Is “${q}” the operating name, or a plate?`,
        aPos: `HOOK: the live ${ext} tree is branded ${q}. That is the working surface.`,
        bPos: `STAMP: ${author} and a ${hour}:00 clock argue a different desk than the public copy.`,
      },
    },
    {
      id: uid("ev"),
      kind: "finding",
      agentId: "scan",
      finding: {
        agentId: "scan",
        subAgent: "WAYBACK",
        title: "Dropped page only in archive",
        body: `A capture from ${(2018 + (h % 6)).toString()} of /about names a second legal entity the live index no longer serves. ${engine} still holds a fragment.`,
        method: "Archive-first coverage of dropped legal copy",
        source: `web archive · ${h2}/about`,
        confidence: 61 + (h % 15),
        tags: ["archive", "dropped-page"],
      },
    },
    {
      id: uid("ev"),
      kind: "node",
      agentId: "map",
      node: {
        id: nodes.hyp,
        label: "Plate vs desk",
        kind: "hypothesis",
        agentId: "map",
        x: 34,
        y: 78,
      },
    },
    {
      id: uid("ev"),
      kind: "edge",
      agentId: "map",
      edge: { from: nodes.org, to: nodes.hyp, rel: "split by" },
    },
    {
      id: uid("ev"),
      kind: "finding",
      agentId: "map",
      finding: {
        agentId: "map",
        subAgent: "ONTOLOGY",
        title: "Joint hypothesis, three methods",
        body: `HOOK collected, STAMP dated, SPLIT covered. The object is the gap between the branded ${ext} tree and the clock/SAN story — not a single source.`,
        method: "Contradiction-first join; no method reused",
        source: `logic map · ${q}`,
        confidence: 68,
        tags: ["hypothesis", "join"],
      },
    },
    {
      id: uid("ev"),
      kind: "feedback",
      agentId: "map",
      feedback: {
        agentId: "dor",
        delta: 3 + (h % 4),
        reason: "Operator lattice produced an artifact another agent could actually read.",
      },
    },
    {
      id: uid("ev"),
      kind: "feedback",
      agentId: "map",
      feedback: {
        agentId: "meta",
        delta: 2 + (h % 5),
        reason: "Clock/author mismatch became the debate the map needed.",
      },
    },
    {
      id: uid("ev"),
      kind: "phase",
      phase: 5,
      detail: "Debrief. Methods remain unshared.",
    },
    {
      id: uid("ev"),
      kind: "debrief",
      agentId: "dor",
      debrief: {
        agentId: "dor",
        summary: `Index-of plus ${ext} beat a branded keyword search on “${q}”.`,
        next: "PATHFINDER will walk sibling directories, not STAMP's files.",
      },
    },
    {
      id: uid("ev"),
      kind: "debrief",
      agentId: "meta",
      debrief: {
        agentId: "meta",
        summary: `${producer} and ${author} outran the public locale claim.`,
        next: "CLOCK will keep filename-blind histograms.",
      },
    },
    {
      id: uid("ev"),
      kind: "debrief",
      agentId: "scan",
      debrief: {
        agentId: "scan",
        summary: `${engine} held a host the live index dropped. Coverage stays a method.`,
        next: "RDAP on the leftover SAN, no dork reuse.",
      },
    },
    {
      id: uid("ev"),
      kind: "debrief",
      agentId: "map",
      debrief: {
        agentId: "map",
        summary: "The contradiction was the finding. Consensus would have been a weaker map.",
        next: "WEIGHT will require two methods before a claim hardens.",
      },
    },
  ];

  return events;
}

export function createCase(topic: string): Investigation {
  const title = topic.trim() || "Untitled target";
  return {
    id: uid("case"),
    code: `S-${(fnv(title) % 90) + 10}`,
    title,
    target: title,
    synopsis: `Autonomous sweep. Four agents, four methods, no mirrored moves. Synthetic collection on “${title}”.`,
    status: "briefing",
    phase: 1,
    startedAt: Date.now(),
    cursor: 0,
    script: buildScript(title),
    findings: [],
    messages: [],
    nodes: [],
    edges: [],
    runtime: freshRuntime(),
    synthetic: true,
  };
}
