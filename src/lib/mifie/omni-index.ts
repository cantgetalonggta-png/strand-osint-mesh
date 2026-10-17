import type { OmniRepo, RepoCategory, SearchOperatorPack } from "./types";

export const OMNI_REPOS: OmniRepo[] = [
  // Primary Search
  { id: "google", name: "Google", url: "https://www.google.com", category: "search", region: "Global", description: "Global search indexing", operators: ["site:", "filetype:", "intitle:", "inurl:", "cache:"], dorkExamples: ['intitle:"index of" filetype:pdf', 'site:gov filetype:pdf "budget"'] },
  { id: "yandex", name: "Yandex", url: "https://yandex.com", category: "search", region: "EE/CIS", description: "Eastern European and regional indexes", operators: ["site:", "mime:"], dorkExamples: ['site:ru filetype:pdf'] },
  { id: "ddg", name: "DuckDuckGo", url: "https://duckduckgo.com", category: "search", region: "Global", description: "Privacy-focused search aggregation", operators: ["site:", "filetype:"], dorkExamples: ['!wayback example.com'] },
  { id: "bing", name: "Bing", url: "https://www.bing.com", category: "search", region: "Global", description: "Microsoft search network", operators: ["site:", "filetype:", "intitle:"], dorkExamples: ['site:edu filetype:docx'] },
  { id: "baidu", name: "Baidu", url: "https://www.baidu.com", category: "search", region: "APAC", description: "Asia-Pacific regional indexes" },
  { id: "naver", name: "Naver", url: "https://www.naver.com", category: "search", region: "Korea", description: "Korean regional repository" },
  { id: "qwant", name: "Qwant", url: "https://www.qwant.com", category: "search", region: "EU", description: "European privacy index" },
  { id: "mojeek", name: "Mojeek", url: "https://www.mojeek.com", category: "search", region: "Independent", description: "Independent crawler index" },
  // Academic
  { id: "scholar", name: "Google Scholar", url: "https://scholar.google.com", category: "academic", region: "Global", description: "Academic literature" },
  { id: "pubmed", name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov", category: "academic", region: "Global", description: "Biomedical and life sciences" },
  { id: "jstor", name: "JSTOR", url: "https://www.jstor.org", category: "academic", region: "Global", description: "Academic journals and primary sources" },
  { id: "arxiv", name: "arXiv", url: "https://arxiv.org", category: "academic", region: "Global", description: "Open-access papers in physics, math, CS" },
  { id: "core", name: "CORE", url: "https://www.core.ac.uk", category: "academic", region: "Global", description: "Aggregator of open-access research papers" },
  { id: "base", name: "BASE", url: "https://base-search.net", category: "academic", region: "EU", description: "Bielefeld Academic Search Engine" },
  { id: "rg", name: "ResearchGate", url: "https://www.researchgate.net", category: "academic", region: "Global", description: "Scientific research network" },
  { id: "ssrn", name: "SSRN", url: "https://papers.ssrn.com", category: "academic", region: "Global", description: "Social Science Research Network" },
  { id: "ieee", name: "IEEE Xplore", url: "https://ieeexplore.ieee.org", category: "academic", region: "Global", description: "Engineering and technology literature" },
  // Legal / Financial
  { id: "pacer", name: "PACER", url: "https://pacer.uscourts.gov", category: "legal-financial", region: "US", description: "US court records (fee-based)" },
  { id: "courtlistener", name: "CourtListener", url: "https://www.courtlistener.com", category: "legal-financial", region: "US", description: "Open legal opinions and oral arguments" },
  { id: "opencorporates", name: "OpenCorporates", url: "https://opencorporates.com", category: "legal-financial", region: "Global", description: "Open database of corporate entities" },
  { id: "edgar", name: "SEC EDGAR", url: "https://www.sec.gov/edgar/searchedgar/companysearch", category: "legal-financial", region: "US", description: "SEC disclosures and filings" },
  { id: "fec", name: "FEC", url: "https://www.fec.gov", category: "legal-financial", region: "US", description: "Federal Election Commission campaign finance" },
  { id: "dnb", name: "Dun & Bradstreet", url: "https://www.dnb.com", category: "legal-financial", region: "Global", description: "Business directory" },
  { id: "companies-house", name: "UK Companies House", url: "https://find-and-update.company-information.service.gov.uk", category: "legal-financial", region: "UK", description: "UK corporate registry" },
  { id: "opensanctions", name: "OpenSanctions", url: "https://www.opensanctions.org", category: "legal-financial", region: "Global", description: "Sanctioned entities and public figures" },
  { id: "govinfo", name: "GovInfo", url: "https://www.govinfo.gov", category: "government", region: "US", description: "US Government Publishing Office repository" },
  { id: "archives", name: "US National Archives", url: "https://www.archives.gov", category: "government", region: "US", description: "US National Archives" },
  // Archives
  { id: "wayback", name: "Wayback Machine", url: "https://web.archive.org", category: "archive", region: "Global", description: "Historical web snapshots", dorkExamples: ["https://web.archive.org/web/*/example.com"] },
  { id: "archive-today", name: "archive.today", url: "https://archive.today", category: "archive", region: "Global", description: "Web page time capsule and cache" },
  { id: "ghostarchive", name: "Ghost Archive", url: "https://ghostarchive.org", category: "archive", region: "Global", description: "Permanent web archiving service" },
  // Social
  { id: "x", name: "X (Twitter)", url: "https://x.com", category: "social", region: "Global", description: "Public discussions and microblogging logs" },
  { id: "reddit", name: "Reddit", url: "https://www.reddit.com", category: "social", region: "Global", description: "Community discussion archives" },
  { id: "4chan", name: "4chan Boards", url: "https://boards.4chan.org", category: "social", region: "Global", description: "Public message board archives" },
  { id: "substack", name: "Substack", url: "https://substack.com", category: "social", region: "Global", description: "Independent newsletters and analysis" },
  { id: "medium", name: "Medium", url: "https://medium.com", category: "social", region: "Global", description: "Long-form publishing repository" },
];

export const SEARCH_OPERATORS: SearchOperatorPack[] = [
  { id: "site", name: "Site restrict", operator: "site:", example: 'site:sec.gov "10-K"', useCase: "Limit to a domain" },
  { id: "filetype", name: "File type", operator: "filetype:", example: "filetype:pdf budget 2024", useCase: "Find documents by extension" },
  { id: "intitle", name: "Title contains", operator: "intitle:", example: 'intitle:"index of" backup', useCase: "Pages with words in title" },
  { id: "inurl", name: "URL contains", operator: "inurl:", example: "inurl:/wp-content/uploads/", useCase: "Path-pattern discovery" },
  { id: "intext", name: "Body text", operator: "intext:", example: 'intext:"confidential" filetype:xlsx', useCase: "Body keyword match" },
  { id: "ext", name: "Extension alias", operator: "ext:", example: "ext:sql dump", useCase: "Alternate filetype syntax" },
  { id: "cache", name: "Cached page", operator: "cache:", example: "cache:example.com", useCase: "Google cache snapshot" },
  { id: "related", name: "Related sites", operator: "related:", example: "related:sec.gov", useCase: "Discover related domains" },
  { id: "exclude", name: "Exclusion", operator: "-site:", example: 'budget -site:linkedin.com -site:pinterest.com', useCase: "Remove noise domains" },
  { id: "indexof", name: "Open directory", operator: 'intitle:"index of"', example: 'intitle:"index of" "parent directory" pdf', useCase: "Exposed directory listings" },
];

export const CATEGORY_LABELS: Record<RepoCategory, string> = {
  search: "Primary Search & Regional Indexes",
  academic: "Academic & Scholarly",
  "legal-financial": "Legal, Financial & Public Records",
  archive: "Deep Web & Archived Repositories",
  social: "Social, Forum & Unstructured",
  government: "Government Repositories",
};

export function reposByCategory(cat: RepoCategory): OmniRepo[] {
  return OMNI_REPOS.filter((r) => r.category === cat);
}

export function buildSearchUrl(repoId: string, query: string): string {
  const q = encodeURIComponent(query);
  switch (repoId) {
    case "google":
      return `https://www.google.com/search?q=${q}`;
    case "yandex":
      return `https://yandex.com/search/?text=${q}`;
    case "ddg":
      return `https://duckduckgo.com/?q=${q}`;
    case "bing":
      return `https://www.bing.com/search?q=${q}`;
    case "scholar":
      return `https://scholar.google.com/scholar?q=${q}`;
    case "pubmed":
      return `https://pubmed.ncbi.nlm.nih.gov/?term=${q}`;
    case "arxiv":
      return `https://arxiv.org/search/?query=${q}&searchtype=all`;
    case "courtlistener":
      return `https://www.courtlistener.com/?q=${q}`;
    case "opencorporates":
      return `https://opencorporates.com/companies?q=${q}`;
    case "edgar":
      return `https://www.sec.gov/edgar/search/#/q=${q}`;
    case "opensanctions":
      return `https://www.opensanctions.org/search/?q=${q}`;
    case "wayback":
      return `https://web.archive.org/web/*/${query}`;
    case "govinfo":
      return `https://www.govinfo.gov/app/search/${q}`;
    case "reddit":
      return `https://www.reddit.com/search/?q=${q}`;
    case "x":
      return `https://x.com/search?q=${q}`;
    default: {
      const repo = OMNI_REPOS.find((r) => r.id === repoId);
      return repo ? repo.url : `https://www.google.com/search?q=${q}`;
    }
  }
}
