---
name: permanent-thinking
description: "Pre-move thinking gate: decide domain, PERSON, breadcrumb, pattern, topic, and file type before each agent action. Use before every investigation move."
type: workflow
lifecycle: active
---

# Permanent Thinking

## Gate questions (mandatory before each move)
1. **Domain** — which vault domain/node?
2. **PERSON** — is a person involved? (if yes: public-figure/org context only; no private targeting)
3. **BREADCRUMB** — what event id will log this?
4. **PATTERN** — what pattern are we following or detecting?
5. **TOPIC** — exact topic token?
6. **FILE TYPE / DATA** — what artifact class are we seeking?

## Output
Write a one-line move card:
`[agent] domain=… topic=… artifact=… method=… breadcrumb=…`

## Block if
- Method mirrors another live agent
- Target is private individual harassment
- No breadcrumb plan
- Incomplete gate answers
