# OSINT Encyclopedia (Full Vault)

## 1. Search Engines (Surface Web)
- Google — strongest indexing, best operators.
- Bing — exclusive operators (ip:, linkfromdomain:).
- Yandex — unmatched reverse image search.
- DuckDuckGo — privacy-focused meta index.
- Brave Search — independent crawler.
- Yahoo — Bing-backed.
- Baidu — Chinese web.
- Naver — Korean web.
- Seznam — Czech web.

## 2. OSINT Engines & Infrastructure Indexes
- Shodan — exposed devices, ports, banners.
- Censys — certificates, hosts, infrastructure.
- FOFA — global device index.
- ZoomEye — Chinese infrastructure.
- LeakIX — misconfigurations.

## 3. DNS / Certificates / Subdomains
- crt.sh — certificate transparency.
- SecurityTrails — DNS history.
- DNSDumpster — subdomain enumeration.
- ViewDNS — multi-tool DNS lookup.
- BuiltWith — tech stack fingerprinting.

## 4. Code Search
- GitHub Search
- GitLab Search
- Sourcegraph
- grep.app
- PublicWWW
- NerdyData

## 5. Deep Web / Invisible Web
- Ahmia
- Torch
- Haystak
- OnionLand
- Intelligence X

> Framework note: Catalog-only. No operational deep-web guidance.

## 6. Archives & Ghost Indexes
- Wayback Machine
- Archive.org
- National Archives
- Library of Congress
- DOAJ

Ghost indexes:
- orphaned directories
- forgotten subdomains
- unlinked pages
- cached versions
- removed content still indexed

## 7. Dorking Dictionary
Universal:
- site:
- filetype:
- intitle:
- inurl:
- intext:

Examples:
- site:example.com filetype:pdf
- intitle:"index of" /admin
- inurl:login

Bing-exclusive:
- ip:
- linkfromdomain:
- near:

Yandex strengths:
- image search
- cached images

> Framework note: Educational dictionary. Prefer NL audit templates under filter constraints.

## 8. Metadata Extraction
Tools:
- exiftool
- pdfinfo
- strings
- hashdeep

Metadata types:
- EXIF
- IPTC
- XMP
- PDF metadata
- Office metadata
- Hashes
- Timestamps

## 9. Alteration Detection
Signals:
- removed pages
- altered metadata
- mismatched timestamps
- cloaking
- certificate changes

Tools:
- snapshot diff
- header analysis
- certificate transparency logs

## 10. Domain Investigation Playbook
1. Initial recon
2. Subdomain enumeration
3. Infrastructure mapping
4. Content discovery
5. Metadata extraction
6. Alteration detection
7. Narrative analysis
8. Timeline building
9. Reporting

## 11. OSINT Workflow
Start → recon → enumeration → extraction → analysis → reporting.

## 12. Multi-Agent Architecture
- coder
- reviewer
- test runner
- orchestrator

## 13. Dashboard Architecture
- search engine aggregator
- metadata extractor
- alteration detector
- domain recon engine
- agent orchestrator
