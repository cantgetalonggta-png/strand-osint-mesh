---
name: api-payload-controls
description: "Construct xAI/Grok API payloads to toggle web_search tools, DeepSearch-style reasoning_effort, or no-search (omit tools). OpenAI-SDK compatible. Use when integrating search modes programmatically."
type: tool
lifecycle: active
---

# API Payload Controls

## Important
Developers do **not** use slash commands like /deep-research in API. Toggle via JSON keys / model variants.

## 1. Web search tool (standard)
```json
{
  "model": "grok-2",
  "messages": [{"role":"user","content":"Search the web for …"}],
  "tools": [{"type": "web_search"}]
}
```

## 2. DeepSearch / deep research modes
- Model-based routing to reasoning/research variants
- `"reasoning_effort": "high"` for recursive multi-step search/CoT

## 3. Regular chat (no search)
Omit `tools` entirely — uses pre-trained knowledge only (lower cost/latency).

## Procedure
1. Choose mode: search / deep / none
2. Build payload
3. Execute
4. Breadcrumb mode used
