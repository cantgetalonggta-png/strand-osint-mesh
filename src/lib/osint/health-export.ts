/**
 * Presence-only health export for STRAND operators.
 * Never include secret values.
 */
export function getStrandHealthSnapshot() {
  const names = [
    "XAI_API_KEY",
    "DATABASE_URL",
    "BETTER_AUTH_SECRET",
    "POLYGON_API_KEY",
    "COINGECKO_PRO_API_KEY",
  ] as const;
  const present = names.filter((k) => Boolean(process.env[k]?.length));
  const missing = names.filter((k) => !process.env[k]?.length);
  return {
    service: "strand-osint-mesh",
    ok: true,
    framework: "https://strand-osint-mesh.vercel.app/framework",
    secrets_presence: {
      policy: "presence-only",
      present_names: present,
      missing_names: missing,
      values_exported: false,
    },
    routes: [
      "/",
      "/framework",
      "/mifie",
      "/omni-index",
      "/phases",
      "/dossier",
      "/dashboard",
      "/agents",
      "/mesh",
      "/learn",
    ],
  };
}
