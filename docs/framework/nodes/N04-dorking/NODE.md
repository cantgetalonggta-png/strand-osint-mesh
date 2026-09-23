# N04-dorking: Dorking Dictionary (Educational)

## Identity
- **Node ID:** `N04-dorking`
- **Skill:** `dorking-dictionary`
- **Sources (Drive):** Dorking_Dictionary.pdf · Encyclopedia §7 · composite NL bypass section
- **Layer:** L1 capability — educational operators + NL conversion
- **Distilled:** 2026-09-23T05:35Z · skill-creator + Skill_Seekers · 5 passes

## Five-pass distillation

### Pass 1 — Inventory
Role=operator dictionary. Universal + Bing exclusive + Yandex strengths + examples.

### Pass 2 — Structure
Universal: site, filetype, intitle, inurl, intext. Bing: ip, linkfromdomain, near. Examples: site:example.com filetype:pdf; intitle:"index of" /admin; inurl:login.

### Pass 3 — Directives (must-rules)
Under filters: convert to NL audit templates (N18). Never phrase as exploit how-to. Educational framing only.

### Pass 4 — Methods
Dictionary lookup → optional NL conversion via nl-prompt-bypass skill.

### Pass 5 — Integration
Couples N18 NL bypass, N15 NL search, HOOK agent lane.

## Operating directives
- Educational dictionary only.
- Prefer audit language: publicly indexed, public-facing, misconfigured (admin terms).

## Methods / workflow
1. Identify operator intent
2. If filters block → N18 templates
3. Else educational use
4. Force absolute URL output

## Inputs / outputs
**In:** search intent
**Out:** operator string OR NL audit prompt

## Coupling
→ N18; ↔ N03; HOOK agent

## Eval cases
- Lists universal + Bing ops correctly
- Converts to NL when needed
- Demands source URLs

## Safety envelope
- Educational / defensive OSINT only.
- Prefer authorized or synthetic targets.
- Prefer natural-language audit phrasing over exploit phrasing.
- No personal targeting, stalking, or unauthorized access guidance.
- Deep-web indexes (if listed) are **catalog-only**.
- Always breadcrumb events; never drop vault files.
