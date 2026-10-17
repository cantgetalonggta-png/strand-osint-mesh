# Deploy Status — 2026-10-17 · C600 M-IFIE v6.0

## LIVE
- Primary: https://strand-osint-mesh.vercel.app/mifie
- Mirror: https://strand-mifie-v6.vercel.app/mifie
- Commit: ad5c306
- All M-IFIE routes HTTP 200

## Fixed
- Root cause of failed deploys: Vercel `BLOCKED_PACKAGE` on `@tanstack/react-start@1.168.50` (CVE-2026-102989)
- Resolution: bump to `1.169.3` + related router packages
