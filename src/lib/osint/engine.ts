import type {
  AgentId,
  AgentRuntime,
  Finding,
  Investigation,
  LogicEdge,
  LogicNode,
  Message,
  SweepEvent,
} from "./types";

export function applyEvent(inv: Investigation, event: SweepEvent, at: number): Investigation {
  const next: Investigation = {
    ...inv,
    runtime: { ...inv.runtime },
    findings: inv.findings.slice(),
    messages: inv.messages.slice(),
    nodes: inv.nodes.slice(),
    edges: inv.edges.slice(),
  };

  const touch = (id: AgentId, patch: Partial<AgentRuntime>) => {
    next.runtime[id] = { ...next.runtime[id], ...patch };
  };

  switch (event.kind) {
    case "phase":
      if (event.phase) next.phase = event.phase;
      next.messages.push({
        id: `${event.id}-msg`,
        caseId: inv.id,
        from: "system",
        to: "all",
        kind: "system",
        body: event.detail ?? `Phase ${event.phase}`,
        timestamp: at,
      });
      break;
    case "status":
      if (event.agentId && event.status) {
        touch(event.agentId, { status: event.status, lastMove: event.detail ?? next.runtime[event.agentId].lastMove });
      }
      break;
    case "finding":
      if (event.finding) {
        const finding: Finding = {
          ...event.finding,
          id: `${event.id}-f`,
          caseId: inv.id,
          timestamp: at,
          rating: 0,
        };
        next.findings.push(finding);
        touch(finding.agentId, {
          status: "sharing",
          findings: next.runtime[finding.agentId].findings + 1,
          lastMove: finding.title,
        });
      }
      break;
    case "message":
      if (event.message) {
        const msg: Message = {
          ...event.message,
          id: `${event.id}-msg`,
          caseId: inv.id,
          timestamp: at,
        };
        next.messages.push(msg);
        if (msg.from !== "system") {
          touch(msg.from, {
            shares: next.runtime[msg.from].shares + 1,
            status: msg.kind === "debate" ? "debating" : "sharing",
          });
        }
      }
      break;
    case "node":
      if (event.node && !next.nodes.some((n) => n.id === event.node!.id)) {
        const node: LogicNode = { ...event.node, caseId: inv.id };
        next.nodes.push(node);
        touch("map", { status: "mapping", lastMove: `Node · ${node.label}` });
      }
      break;
    case "edge":
      if (event.edge) {
        const edge: LogicEdge = { ...event.edge, id: `${event.id}-e`, caseId: inv.id };
        next.edges.push(edge);
        touch("map", { status: "mapping", lastMove: `Edge · ${edge.rel}` });
      }
      break;
    case "debate":
      if (event.debate) {
        const d = event.debate;
        next.messages.push({
          id: `${event.id}-msg`,
          caseId: inv.id,
          from: "map",
          to: "all",
          kind: "debate",
          body: `WEFT opens a dispute — ${d.topic}\n${d.aPos}\n${d.bPos}`,
          timestamp: at,
        });
        touch(d.a, { status: "debating", debates: next.runtime[d.a].debates + 1 });
        touch(d.b, { status: "debating", debates: next.runtime[d.b].debates + 1 });
        touch("map", { status: "debating", lastMove: d.topic, debates: next.runtime.map.debates + 1 });
      }
      break;
    case "feedback":
      if (event.feedback) {
        const { agentId, delta, reason } = event.feedback;
        const success = Math.max(8, Math.min(97, next.runtime[agentId].success + delta));
        touch(agentId, { success, methodShift: reason });
        next.messages.push({
          id: `${event.id}-msg`,
          caseId: inv.id,
          from: "system",
          to: agentId,
          kind: "feedback",
          body: `Feedback to ${agentId.toUpperCase()}: ${delta > 0 ? "+" : ""}${delta} · ${reason}`,
          timestamp: at,
        });
      }
      break;
    case "debrief":
      if (event.debrief) {
        const { agentId, summary, next: nxt } = event.debrief;
        touch(agentId, { status: "debrief", lastMove: summary, methodShift: nxt });
        next.messages.push({
          id: `${event.id}-msg`,
          caseId: inv.id,
          from: agentId,
          to: "all",
          kind: "share",
          body: `${agentId.toUpperCase()} debrief: ${summary} Next: ${nxt}`,
          timestamp: at,
        });
        next.status = "debrief";
      }
      break;
    default:
      break;
  }

  return next;
}

export function applyMany(inv: Investigation, count: number, startAt: number): Investigation {
  let cur = inv;
  const end = Math.min(inv.script.length, count);
  for (let i = 0; i < end; i++) {
    const event = inv.script[i];
    if (!event) continue;
    cur = applyEvent(cur, event, startAt + i * 42000);
    cur = { ...cur, cursor: i + 1 };
  }
  return cur;
}

export function step(inv: Investigation, at: number): Investigation {
  if (inv.cursor >= inv.script.length) {
    return {
      ...inv,
      status: "debrief",
      runtime: Object.fromEntries(
        (Object.keys(inv.runtime) as AgentId[]).map((id) => [
          id,
          { ...inv.runtime[id], status: "debrief" as const },
        ]),
      ) as Investigation["runtime"],
    };
  }
  const event = inv.script[inv.cursor];
  if (!event) return inv;
  const next = applyEvent(inv, event, at);
  return { ...next, cursor: inv.cursor + 1, status: "active" };
}
