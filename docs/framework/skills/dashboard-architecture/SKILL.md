---
name: dashboard-architecture
description: "Dashboard modules: search engine aggregator, metadata extractor, alteration detector, domain recon engine, agent orchestrator. Use when designing or wiring the ops UI (STRAND)."
type: workflow
lifecycle: active
---

# Dashboard Architecture

## Modules (vault)
1. search engine aggregator
2. metadata extractor
3. alteration detector
4. domain recon engine
5. agent orchestrator

## Mapping to skills
| Module | Skill |
|---|---|
| aggregator | search-engines + natural-language-search |
| metadata | metadata-extraction |
| alteration | alteration-detection |
| recon | domain-playbook + archives-ghost-indexes |
| agent orchestrator | multi-agent-architecture + hivemind-directives + permanent-thinking |

## UI surface (STRAND)
Agent cards · sweep controls · logic map · findings feed · comms transcript · case drawer
