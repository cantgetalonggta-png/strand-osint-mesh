---
name: vault-encyclopedia
description: "Canonical OSINT knowledge base covering engines, infrastructure indexes, DNS/CT, code search, archives, metadata, alteration, playbook, workflow, agents, and dashboard. Use when orienting an investigation or looking up vault domains."
type: knowledge
lifecycle: active
---

# Vault Encyclopedia

Canonical knowledge base for the OSINT vault. Read this before inventing new tool lists.

## When to use
- Orienting a new investigation
- Choosing which capability node to activate
- Checking whether a domain is already cataloged
- Regenerating vault content (must not omit sections)

## Domain map (13 sections — never omit)
1. Surface search engines — Google, Bing, Yandex, DuckDuckGo, Brave, Yahoo, Baidu, Naver, Seznam
2. OSINT / infrastructure indexes — Shodan, Censys, FOFA, ZoomEye, LeakIX
3. DNS / certificates / subdomains — crt.sh, SecurityTrails, DNSDumpster, ViewDNS, BuiltWith
4. Code search — GitHub, GitLab, Sourcegraph, grep.app, PublicWWW, NerdyData
5. Deep web / invisible web — Ahmia, Torch, Haystak, OnionLand, Intelligence X (**catalog only**)
6. Archives & ghost indexes — Wayback, Archive.org, National Archives, LOC, DOAJ + ghost classes
7. Dorking dictionary (educational) — universal + Bing exclusive + Yandex strengths
8. Metadata extraction — exiftool, pdfinfo, strings, hashdeep + EXIF/IPTC/XMP/PDF/Office/Hashes/Timestamps
9. Alteration detection — signals + snapshot diff / headers / CT
10. Domain investigation playbook — 9 steps
11. OSINT workflow spine — Start→recon→enumeration→extraction→analysis→reporting
12. Multi-agent architecture (build layer) — coder, reviewer, test runner, orchestrator
13. Dashboard architecture — aggregator, metadata, alteration, recon, agent orchestrator

## Load next
- Full lists → `references/domains.md` and `../../references/clean-vault/encyclopedia.md`
- Coupling → `[[skill:osint-workflow]]`, `[[skill:domain-playbook]]`
