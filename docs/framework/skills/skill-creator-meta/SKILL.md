---
name: skill-creator-meta
description: "Create, improve, and measure skills with the skill-creator lifecycle. Use when authoring SKILL.md, evals, triggers, CHANGELOG, or optimizing skill descriptions."
type: workflow
lifecycle: active
---

# Skill Creator (Meta)

Build skills that improve with every postmortem cycle.

## Core principles
1. **Concise is key** — only add what the agent does not already know.
2. **Match freedom to fragility** — fragile ops need scripts; open tasks need guidelines.
3. **Every skill gets evals** — no stubs.

## Anatomy
```
skill-name/
├── SKILL.md              (required)
├── CHANGELOG.md          (required)
├── evals/
│   ├── evals.json        (required — 3+)
│   └── triggers.json     (required — 3+ positive, 1+ negative)
├── scripts/              (optional)
├── references/           (optional)
├── examples/             (optional)
└── assets/               (optional)
```

## Progressive disclosure
1. Metadata (name + description) — always in context
2. SKILL.md body — after trigger (<500 lines)
3. Bundled resources — on demand

## Frontmatter schema
```yaml
---
name: skill-name
description: "What it does. Use when X, Y, Z."
type: workflow  # knowledge | workflow | orchestrator | tool
lifecycle: active
---
```
