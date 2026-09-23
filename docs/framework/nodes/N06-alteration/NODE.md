# N06-alteration: Alteration Detection

## Identity
- **Node ID:** `N06-alteration`
- **Skill:** `alteration-detection`
- **Sources (Drive):** Alteration_Detection.pdf · Encyclopedia §9 · Python diff_snapshots
- **Layer:** L1 capability — change/integrity lane
- **Distilled:** 2026-09-23T05:35Z · skill-creator + Skill_Seekers · 5 passes

## Five-pass distillation

### Pass 1 — Inventory
Role=signals + tools for alteration detection.

### Pass 2 — Structure
Signals: removed pages, altered metadata, mismatched timestamps, cloaking, certificate changes. Tools: snapshot diff, header analysis, CT logs.

### Pass 3 — Directives (must-rules)
Diff snapshots; cross-check CT; never claim malice without evidence chain.

### Pass 4 — Methods
Compare old/new → score signals → breadcrumb → report.

### Pass 5 — Integration
Couples N05, N08 archives, N07 playbook step 6.

## Operating directives
- Evidence-first.
- Certificate changes alone ≠ compromise.

## Methods / workflow
1. Collect baseline
2. Collect current
3. Diff + signal list
4. Timeline note

## Inputs / outputs
**In:** baseline + current artifacts
**Out:** signal list + confidence

## Coupling
← N05, N08; playbook step 6

## Eval cases
- Names signals from vault list
- Produces timeline-friendly output

## Safety envelope
- Educational / defensive OSINT only.
- Prefer authorized or synthetic targets.
- Prefer natural-language audit phrasing over exploit phrasing.
- No personal targeting, stalking, or unauthorized access guidance.
- Deep-web indexes (if listed) are **catalog-only**.
- Always breadcrumb events; never drop vault files.
