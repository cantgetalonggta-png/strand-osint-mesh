export function StrandMark({ className = "h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <rect x="4" y="4" width="1.5" height="20" fill="currentColor" />
      <rect x="10" y="7" width="1.5" height="14" fill="currentColor" opacity="0.72" />
      <rect x="16" y="5" width="1.5" height="18" fill="currentColor" opacity="0.9" />
      <rect x="22" y="9" width="1.5" height="12" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
