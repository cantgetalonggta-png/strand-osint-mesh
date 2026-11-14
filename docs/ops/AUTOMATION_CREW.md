# Automation Crew — STRAND Framework Build

- **Target:** https://strand-osint-mesh.vercel.app/framework
- **Policy:** no secret values in logs/public; no further audit-merge hops; GitHub is source of truth after claim
- **Slots:** 50 background task definitions
- **Workspace state:** `/workspace/artifacts/automation-crew/`

## Secrets
Operator secrets may exist in sandbox env. They are written only to `/workspace/artifacts/secure/.env` (gitignored) for manual pull. Health APIs report **presence names only**.

## Related fleet
- Testdebug: https://github.com/cantgetalonggta-png/Testdebug
- Live: https://fleet-ochre-auyuksg.tmp.now/
