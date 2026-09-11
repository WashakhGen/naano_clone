export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="14" width="14" height="14" rx="5" fill="currentColor" />
      <rect
        x="16"
        y="4"
        width="14"
        height="14"
        rx="5"
        fill="currentColor"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-primary ${className ?? ""}`}>
      <LogoMark className="h-6 w-6" />
      <span className="text-lg font-semibold tracking-tight text-foreground">
        naano
      </span>
    </span>
  );
}
