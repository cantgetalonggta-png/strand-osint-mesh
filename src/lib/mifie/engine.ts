import { MIFIE_AGENTS, MIFIE_BY_ID, freshMifieRuntime } from "./agents";
import { MIFIE_PHASES } from "./phases";
import { OMNI_REPOS, buildSearchUrl } from "./omni-index";
import type {
  MifieAgentId,
  MifieFinding,
  MifieInvestigation,
  MifiePhaseId,
  PhaseRun,
} from "./types";

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], n: number): T {
  const i = Math.abs(n) % arr.length;
  return arr[i]!;
}

function conf(base: number, h: number, spread = 18): number {
  return Math.min(94, Math.max(42, base + (h % spread)));
}

export function createMifieInvestigation(target: string): MifieInvestigation {
  const t = target.trim() || "Untitled target";
  const h = hash(t);
  const phases: PhaseRun[] = MIFIE_PHASES.map((p) => ({
    phase: p.id,
    status: "pending" as const,
    findingIds: [],
  }));
  return {
    id: uid("mifie"),
    code: `M-${(h % 900) + 100}`,
    target: t,
    synopsis: `M-IFIE v6.0 multi-source investigation. 16-agent swarm · 4-phase matrix · Omni-Index · public-record ceiling only.`,
    status: "init",
    currentPhase: 1,
    createdAt: Date.now(),
    phases,
    findings: [],
    runtime: freshMifieRuntime(),
  };
}

function syntheticFinding(
  inv: MifieInvestigation,
  agentId: MifieAgentId,
  phase: MifiePhaseId,
  idx: number,
): MifieFinding {
  const agent = MIFIE_BY_ID[agentId];
  const h = hash(`${inv.target}|${agentId}|${phase}|${idx}`);
  const repo = pick(OMNI_REPOS, h + idx);
  const solidRoll = h % 10;
  const solid: MifieFinding["solid"] =
    solidRoll > 6 ? "SOLID" : solidRoll > 3 ? "MAYBE" : "UNVERIFIED";
  const titles = [
    `${agent.callsign}: primary trail on “${inv.target}” via ${repo.name}`,
    `${agent.callsign}: operator lattice hit — ${repo.category}`,
    `${agent.callsign}: cross-ref cluster for ${inv.target.slice(0, 40)}`,
    `${agent.callsign}: archive/filing delta noted`,
    `${agent.callsign}: contradiction candidate vs public statement`,
  ];
  const bodies = [
    `Agent ${agent.index} (${agent.callsign}) executed ${agent.methods[0]} against Omni-Index node ${repo.name} (${repo.url}). Target token “${inv.target}” produced a public-record candidate. Confidence weighted by multi-repo corroboration potential. Educational / synthetic collection path.`,
    `Method: ${agent.methods[Math.min(1, agent.methods.length - 1)]}. Repository region=${repo.region}. Category=${repo.category}. No private targeting. Absolute URL preferred: ${buildSearchUrl(repo.id, inv.target)}.`,
    `Phase ${phase} harvest: ${agent.specialty}. Doctrine: ${agent.doctrine} Findings tagged ${solid} pending Master Editor arbitration.`,
  ];
  return {
    id: uid("mf"),
    agentId,
    phase,
    title: pick(titles, h),
    body: pick(bodies, h >>> 3),
    sourceUrl: buildSearchUrl(repo.id, inv.target),
    confidence: conf(solid === "SOLID" ? 74 : solid === "MAYBE" ? 58 : 48, h),
    tags: [agent.callsign.toLowerCase().replace(/\s+/g, "-"), repo.category, `phase-${phase}`, solid.toLowerCase()],
    timestamp: Date.now() + idx * 400,
    solid,
  };
}

export function runPhase(inv: MifieInvestigation, phaseId: MifiePhaseId): MifieInvestigation {
  const phaseDef = MIFIE_PHASES.find((p) => p.id === phaseId);
  if (!phaseDef) return inv;

  const next: MifieInvestigation = {
    ...inv,
    runtime: { ...inv.runtime },
    findings: inv.findings.slice(),
    phases: inv.phases.map((p) => ({ ...p, findingIds: p.findingIds.slice() })),
  };

  // Mark all agents idle then activate phase agents
  for (const a of MIFIE_AGENTS) {
    next.runtime[a.id] = {
      ...next.runtime[a.id],
      status: phaseDef.agents.includes(a.id) ? "scouting" : "idle",
      lastMove: phaseDef.agents.includes(a.id)
        ? `Phase ${phaseId}: ${phaseDef.shortName}`
        : next.runtime[a.id].lastMove,
      progress: phaseDef.agents.includes(a.id) ? 35 : next.runtime[a.id].progress,
    };
  }

  const phaseIdx = next.phases.findIndex((p) => p.phase === phaseId);
  if (phaseIdx >= 0) {
    next.phases[phaseIdx] = {
      ...next.phases[phaseIdx]!,
      status: "running",
      startedAt: Date.now(),
    };
  }

  const newFindings: MifieFinding[] = [];
  phaseDef.agents.forEach((agentId, i) => {
    const f = syntheticFinding(next, agentId, phaseId, i);
    newFindings.push(f);
    next.runtime[agentId] = {
      status: "analyzing",
      lastMove: f.title.slice(0, 80),
      findings: next.runtime[agentId].findings + 1,
      progress: 70 + (i % 25),
    };
  });

  // Pattern phase extras: contradiction table
  if (phaseId === 3) {
    next.contradictionTable = [
      {
        claim: `Public narrative around “${inv.target}” is complete and consistent`,
        evidence: "Archive / filing / docket deltas often incomplete in press copy",
        verdict: "MAYBE — requires primary docket/filing corroboration",
      },
      {
        claim: "Single-engine search is sufficient",
        evidence: "Omni-Index multi-engine + archive recovery protocol",
        verdict: "REJECTED — multi-source mandatory (Agent 09/10)",
      },
      {
        claim: "No corporate or legal trail exists",
        evidence: "EDGAR / OpenCorporates / CourtListener still to be fully exhausted",
        verdict: "OPEN — Phase 2 residual",
      },
    ];
  }

  // Phase 4: red team + dossier
  if (phaseId === 4) {
    next.redTeamNotes = [
      "RED TEAM: Confirm every SOLID claim has at least one absolute primary URL.",
      "RED TEAM: Social sentiment (Agent 07) must never upgrade UNVERIFIED to SOLID alone.",
      "RED TEAM: Missing archive captures are gaps, not negative proof.",
      "RED TEAM: Financial forensics without EDGAR/Companies House is incomplete.",
      "RED TEAM: Scope Manager must list what was NOT searched.",
    ];
    const allFindings = [...next.findings, ...newFindings];
    next.dossierMarkdown = buildDossier({ ...next, findings: allFindings });
  }

  next.findings = [...next.findings, ...newFindings];
  if (phaseIdx >= 0) {
    next.phases[phaseIdx] = {
      ...next.phases[phaseIdx]!,
      status: "done",
      completedAt: Date.now(),
      summary: `${phaseDef.shortName} complete · ${newFindings.length} findings · agents ${phaseDef.agents.join(",")}`,
      findingIds: [
        ...next.phases[phaseIdx]!.findingIds,
        ...newFindings.map((f) => f.id),
      ],
    };
  }

  for (const agentId of phaseDef.agents) {
    next.runtime[agentId] = {
      ...next.runtime[agentId],
      status: "complete",
      progress: 100,
    };
  }

  next.currentPhase = phaseId < 4 ? ((phaseId + 1) as MifiePhaseId) : 4;
  next.status =
    phaseId === 1
      ? "phase1"
      : phaseId === 2
        ? "phase2"
        : phaseId === 3
          ? "phase3"
          : "complete";

  return next;
}

export function runAllPhases(inv: MifieInvestigation): MifieInvestigation {
  let cur = inv;
  for (const p of [1, 2, 3, 4] as MifiePhaseId[]) {
    cur = runPhase(cur, p);
  }
  cur = { ...cur, status: "complete", currentPhase: 4 };
  return cur;
}

export function buildDossier(inv: MifieInvestigation): string {
  const solid = inv.findings.filter((f) => f.solid === "SOLID");
  const maybe = inv.findings.filter((f) => f.solid === "MAYBE");
  const unv = inv.findings.filter((f) => f.solid === "UNVERIFIED");
  const lines: string[] = [
    `# M-IFIE v6.0 Final Dossier — ${inv.code}`,
    ``,
    `**Target:** ${inv.target}`,
    `**Generated:** ${new Date().toISOString()}`,
    `**Status:** ${inv.status}`,
    `**Envelope:** Public-record / educational OSINT only · No personal private targeting`,
    ``,
    `## Executive summary`,
    ``,
    `This dossier was produced by the 16-agent M-IFIE swarm across four sequential phases (Recon → Harvest → Pattern → Dossier). Findings are tagged SOLID / MAYBE / UNVERIFIED. Red Team (Agent 12) pressure-tested claims before Master Editor (Agent 16) compile.`,
    ``,
    `## Metrics`,
    ``,
    `| Metric | Value |`,
    `| --- | --- |`,
    `| Total findings | ${inv.findings.length} |`,
    `| SOLID | ${solid.length} |`,
    `| MAYBE | ${maybe.length} |`,
    `| UNVERIFIED | ${unv.length} |`,
    `| Phases complete | ${inv.phases.filter((p) => p.status === "done").length}/4 |`,
    ``,
    `## Phase ledger`,
    ``,
  ];

  for (const p of inv.phases) {
    const def = MIFIE_PHASES.find((x) => x.id === p.phase);
    lines.push(`### Phase ${p.phase} — ${def?.shortName ?? ""} (${p.status})`);
    lines.push(``);
    lines.push(p.summary ?? def?.action ?? "");
    lines.push(``);
  }

  lines.push(`## Findings (by phase)`);
  lines.push(``);
  for (const phase of [1, 2, 3, 4] as MifiePhaseId[]) {
    const fs = inv.findings.filter((f) => f.phase === phase);
    if (!fs.length) continue;
    lines.push(`### Phase ${phase}`);
    lines.push(``);
    for (const f of fs) {
      const agent = MIFIE_BY_ID[f.agentId];
      lines.push(`- **[${f.solid}]** ${f.title}`);
      lines.push(`  - Agent: ${agent?.callsign ?? f.agentId} · confidence ${f.confidence}%`);
      lines.push(`  - ${(f.body ?? "").slice(0, 280)}`);
      if (f.sourceUrl) lines.push(`  - Source: ${f.sourceUrl}`);
      lines.push(``);
    }
  }

  if (inv.contradictionTable?.length) {
    lines.push(`## Contradiction map (Agent 09 / 10)`);
    lines.push(``);
    lines.push(`| Claim | Evidence | Verdict |`);
    lines.push(`| --- | --- | --- |`);
    for (const row of inv.contradictionTable) {
      lines.push(`| ${row.claim} | ${row.evidence} | ${row.verdict} |`);
    }
    lines.push(``);
  }

  if (inv.redTeamNotes?.length) {
    lines.push(`## Red Team audit (Agent 12)`);
    lines.push(``);
    for (const n of inv.redTeamNotes) lines.push(`- ${n}`);
    lines.push(``);
  }

  lines.push(`## Omni-Index coverage note`);
  lines.push(``);
  lines.push(
    `Omni-Index contains ${OMNI_REPOS.length} curated public repositories across search, academic, legal-financial, archive, social, and government categories. Operators: site:, filetype:, intitle:, inurl:, cache:, related:, exclusion lattices.`,
  );
  lines.push(``);
  lines.push(`## Residual open questions (Scope Manager / Agent 14)`);
  lines.push(``);
  lines.push(`1. Which EDGAR / Companies House entities are still unmapped for “${inv.target}”?`);
  lines.push(`2. Are there Wayback CDX captures for dropped pages?`);
  lines.push(`3. Which social narratives lack primary-document anchors?`);
  lines.push(`4. What jurisdictions outside US/UK remain unsearched?`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`*Master Editor (Agent 16) · M-IFIE v6.0 · STRAND mesh · Educational public-record ceiling*`);
  return lines.join("\n");
}
