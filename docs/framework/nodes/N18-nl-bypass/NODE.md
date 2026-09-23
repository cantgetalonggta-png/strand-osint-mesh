# N18-nl-bypass: Natural Language Prompt Bypass (Audit Templates)

## Identity
- **Node ID:** `N18-nl-bypass`
- **Skill:** `nl-prompt-bypass`
- **Sources (Drive):** Composite Doc NL templates + tips · context link 'why won't grok allow dorks search'
- **Layer:** L1 capability — filter-safe NL replacements for operator syntax
- **Distilled:** 2026-09-23T05:35Z · skill-creator + Skill_Seekers · 5 passes

## Five-pass distillation

### Pass 1 — Inventory
Role=three NL templates replacing dork operators + 3 tips.

### Pass 2 — Structure
Option1 Deep Research (broad targeting). Option2 File Type Hunter (replaces filetype:). Option3 Exposed Data/URL Auditor (replaces inurl/intitle). Tips: DeepSearch ON; Be Specific Not Malicious (audit terms); Force Link Output.

### Pass 3 — Directives (must-rules)
Use when operators filtered. Avoid hack/exploit/vulnerability wording; use audit/publicly indexed/public facing/misconfigured.

### Pass 4 — Methods
Select option → fill placeholders → require absolute URLs → optional DeepSearch/Think toggle.

### Pass 5 — Integration
Companion to N04; context link recorded as non-content source.

## Operating directives
- Audit framing only.
- Always demand absolute URLs.
- Educational/defensive use.

## Methods / workflow
1. Map operator intent → option
2. Fill domain/target/extension
3. Add URL demand
4. Run with DeepSearch if available

## Inputs / outputs
**In:** blocked operator intent
**Out:** NL audit prompt + URL list

## Coupling
← N04; ↔ N15, N16

## Eval cases
- Three options available
- Tips applied
- No exploit phrasing

## Safety envelope
- Educational / defensive OSINT only.
- Prefer authorized or synthetic targets.
- Prefer natural-language audit phrasing over exploit phrasing.
- No personal targeting, stalking, or unauthorized access guidance.
- Deep-web indexes (if listed) are **catalog-only**.
- Always breadcrumb events; never drop vault files.

## Template sources (verbatim intent)
- Deep Research: thorough web search targeting domain, locate files/text matching target, summarize + source URLs.
- File Type Hunter: OSINT researcher search for publicly indexed files with extension belonging to topic.
- Exposed Data/URL Auditor: search sites with keyword in URL path or title associated with industry/app; natural semantic search, no syntax.
