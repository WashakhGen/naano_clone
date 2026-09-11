import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Self-Serve",
    price: "€0",
    period: "/month",
    description: "Run creator campaigns yourself, at your own pace.",
    features: [
      "Full creator marketplace access",
      "AI-powered brief creation",
      "Click, lead & pipeline tracking",
      "Automatic creator payouts",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Managed",
    price: "€700",
    period: "/month",
    description: "Naano's team runs the whole campaign for you.",
    features: [
      "Campaign strategy & positioning",
      "Creator sourcing & coordination",
      "Brief creation & launch",
      "Reporting & optimisation",
    ],
    cta: "Talk to the team",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Pricing.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Start free. Upgrade when you want your time back. Campaign spend
            is always separate — no lock-in, cancel anytime.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border-border bg-card text-foreground"
              }`}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide opacity-80">
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm opacity-70">{tier.period}</span>
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  tier.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {tier.description}
              </p>

              <ul className="mt-7 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlighted ? "text-primary-foreground" : "text-primary"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span
                      className={tier.highlighted ? "text-primary-foreground/90" : "text-foreground/80"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/marketplace"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
