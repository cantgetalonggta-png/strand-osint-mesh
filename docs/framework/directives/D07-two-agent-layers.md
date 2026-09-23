# D07 — Two Agent Layers

## Rule
Keep build agents and investigation agents as **separate labeled layers**.

### Build layer
coder · reviewer · test_runner · orchestrator

### Investigation layer
HOOK (A) · STAMP (B) · SPLIT (C) · WEFT (D)

Never conflate roles in prompts, dashboards, or logs.
