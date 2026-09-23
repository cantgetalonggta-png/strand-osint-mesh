/**
 * LIVE PUBLIC OSINT engine — real-time via xAI Responses API + web_search.
 * Ceiling: public web / open records only. No personal private targeting.
 * No unauthorized access guidance. Audit language only.
 */
import { createServerFn } from "@tanstack/react-start";
import type { AgentId, Finding, Message, SweepEvent } from "./types";
import { LANE_TO_FRAMEWORK } from "./framework";

const SAFETY = `Hard rules:
- Public / open-source information only.
- Prefer absolute source URLs.
- Audit language (publicly indexed, misconfiguration, open records) — never exploit/hack phrasing.
- No private individual targeting, stalking, doxxing, or unauthorized access instructions.
- If the query appears to target a private person harmfully, refuse and say so.
- Return factual search-backed findings only; cite URLs.`;

const AGENT_PROMPTS: Record<AgentId, string> = {
  dor: `You are HOOK (Agent A), surface hunter. Unique method: discover publicly indexed paths, documents, and open directories via semantic search. Do NOT analyze metadata clocks or engine diffs. ${SAFETY}`,
  meta: `You are STAMP (Agent B), provenance analyst. Unique method: discuss public document metadata patterns, producers, timestamps from publicly described files. Do NOT invent private EXIF. ${SAFETY}`,
  scan: `You are SPLIT (Agent C), coverage analyst. Unique method: multi-source public coverage — search engines, archives, certificate transparency (crt.sh), DNS public data. Do NOT reuse HOOK dorks as primary method. ${SAFETY}`,
  map: `You are WEFT (Agent D), logic cartographer. Unique method: synthesize other agents' public findings into entities, relations, contradictions. Do NOT collect new primary sources first. ${SAFETY}`,
};

export type LiveLaneResult = {
  agentId: AgentId;
  callsign: string;
  ok: boolean;
  text: string;
  error?: string;
  finding?: Omit<Finding, "id" | "caseId" | "timestamp" | "rating">;
};

export type LiveSweepResult = {
  ok: boolean;
  mode: "live-public";
  topic: string;
  lanes: LiveLaneResult[];
  events: SweepEvent[];
  error?: string;
};

function extractUrls(text: string): string[] {
  const m = text.match(/https?:\/\/[^\s\)\]\"\'<>]+/g) ?? [];
  return [...new Set(m)].slice(0, 8);
}

async function callLiveAgent(agentId: AgentId, topic: string, prior?: string): Promise<LiveLaneResult> {
  const apiKey = process.env.XAI_API_KEY?.trim();
  const callsign = LANE_TO_FRAMEWORK[agentId].callsign;
  if (!apiKey) {
    return {
      agentId,
      callsign,
      ok: false,
      text: "",
      error: "XAI_API_KEY missing on server. Add credits/key for live search.",
    };
  }

  const userQ =
    agentId === "map"
      ? `Topic: ${topic}\nPrior agent digests:\n${prior ?? "(none)"}\nProduce a logic-map style synthesis: joint hypothesis, contradictions, next independent public moves. Include absolute URLs if present in priors.`
      : `Open-source investigation topic: ${topic}\nPerform REAL-TIME public web research for your unique method only. Return:
1) 2-4 concrete findings with absolute URLs
2) Methods used (semantic public search; audit framing)
3) What you deliberately did NOT do (to avoid mirroring other agents)`;

  const body = {
    model: "grok-4-latest",
    input: [
      { role: "system", content: AGENT_PROMPTS[agentId] },
      { role: "user", content: userQ },
    ],
    tools: agentId === "map" ? [] : [{ type: "web_search" }],
  };

  try {
    const res = await fetch("https://api.x.ai/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const raw = await res.text();
    if (!res.ok) {
      let err = `API ${res.status}`;
      try {
        const j = JSON.parse(raw) as { error?: string; code?: string };
        err = j.error || j.code || err;
      } catch {
        /* ignore */
      }
      return { agentId, callsign, ok: false, text: "", error: err };
    }
    const data = JSON.parse(raw) as {
      output?: { type?: string; content?: { type?: string; text?: string }[] }[];
      output_text?: string;
    };
    // Responses API shapes vary — collect text
    let text = data.output_text ?? "";
    if (!text && Array.isArray(data.output)) {
      text = data.output
        .flatMap((o) => o.content ?? [])
        .map((c) => c.text ?? "")
        .filter(Boolean)
        .join("\n");
    }
    // fallback common field
    if (!text && (data as { choices?: { message?: { content?: string } }[] }).choices) {
      text = (data as { choices?: { message?: { content?: string } }[] }).choices?.[0]?.message?.content ?? "";
    }
    text = text.trim() || raw.slice(0, 2000);
    const urls = extractUrls(text);
    return {
      agentId,
      callsign,
      ok: true,
      text,
      finding: {
        agentId,
        title: `${callsign} live public strand · ${topic.slice(0, 48)}`,
        body: text.slice(0, 1800),
        method: `live-public · ${LANE_TO_FRAMEWORK[agentId].skills.join(",")}`,
        source: urls[0] ?? "public web (live)",
        confidence: urls.length ? 72 : 55,
        tags: ["live-public", callsign.toLowerCase(), ...urls.slice(0, 2).map(() => "url")],
      },
    };
  } catch (e) {
    return {
      agentId,
      callsign,
      ok: false,
      text: "",
      error: e instanceof Error ? e.message : "live lane failed",
    };
  }
}

function lanesToEvents(topic: string, lanes: LiveLaneResult[]): SweepEvent[] {
  const events: SweepEvent[] = [
    {
      id: `live-phase-${Date.now()}`,
      kind: "phase",
      phase: 4,
      detail: `LIVE PUBLIC sweep · ${topic} · real-time web_search where available`,
    },
  ];
  for (const lane of lanes) {
    events.push({
      id: `live-status-${lane.agentId}-${Date.now()}`,
      kind: "status",
      agentId: lane.agentId,
      status: lane.ok ? "sharing" : "idle",
      detail: lane.ok ? `${lane.callsign} live public pass complete` : `${lane.callsign} blocked: ${lane.error}`,
    });
    if (lane.ok && lane.finding) {
      events.push({
        id: `live-f-${lane.agentId}-${Date.now()}`,
        kind: "finding",
        agentId: lane.agentId,
        finding: lane.finding,
      });
      events.push({
        id: `live-m-${lane.agentId}-${Date.now()}`,
        kind: "message",
        agentId: lane.agentId,
        message: {
          from: lane.agentId,
          to: "all",
          kind: "share",
          body: `${lane.callsign} (live): ${lane.text.slice(0, 900)}`,
        },
      });
    } else if (lane.error) {
      events.push({
        id: `live-err-${lane.agentId}-${Date.now()}`,
        kind: "message",
        agentId: lane.agentId,
        message: {
          from: "system",
          to: lane.agentId,
          kind: "system",
          body: `${lane.callsign} live lane error: ${lane.error}`,
        },
      });
    }
  }
  events.push({
    id: `live-phase-end-${Date.now()}`,
    kind: "phase",
    phase: 5,
    detail: "Live public pass complete. Review findings; rate method fit.",
  });
  return events;
}

export const runLivePublicSweep = createServerFn({ method: "POST" })
  .validator((input: { topic: string }) => input)
  .handler(async ({ data }): Promise<LiveSweepResult> => {
    const topic = data.topic.trim().slice(0, 200);
    if (!topic) {
      return { ok: false, mode: "live-public", topic: "", lanes: [], events: [], error: "Empty topic" };
    }

    // Parallel independent lanes (no mirror) for collectors; WEFT after
    const collectors = await Promise.all([
      callLiveAgent("dor", topic),
      callLiveAgent("meta", topic),
      callLiveAgent("scan", topic),
    ]);
    const prior = collectors
      .filter((c) => c.ok)
      .map((c) => `### ${c.callsign}\n${c.text.slice(0, 1200)}`)
      .join("\n\n");
    const weft = await callLiveAgent("map", topic, prior);
    const lanes = [...collectors, weft];
    const anyOk = lanes.some((l) => l.ok);
    return {
      ok: anyOk,
      mode: "live-public",
      topic,
      lanes,
      events: lanesToEvents(topic, lanes),
      error: anyOk
        ? undefined
        : lanes.map((l) => l.error).filter(Boolean).join(" · ") || "All live lanes failed",
    };
  });
