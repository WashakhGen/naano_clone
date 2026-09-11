const placeholderCompanies = [
  "Lumen",
  "Fylo",
  "Northbeam",
  "Cursive",
  "Anchorpoint",
  "Vantage",
  "Driftwood",
  "Marlin",
];

export function LogoCloud() {
  return (
    <section className="border-y border-border/60 bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by modern B2B teams
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {placeholderCompanies.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
