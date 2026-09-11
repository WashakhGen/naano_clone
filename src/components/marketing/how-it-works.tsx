import { CreditCard, FileText, KanbanSquare, LineChart, Search } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find creators",
    description: "Browse the marketplace and compare audience fit scores.",
  },
  {
    icon: FileText,
    title: "Build brief",
    description:
      "Generate an AI-powered brief with your objectives, tone, and tracking links.",
  },
  {
    icon: KanbanSquare,
    title: "Manage collaborations",
    description: "Track every creator from draft, to scheduled, to live.",
  },
  {
    icon: LineChart,
    title: "Track results",
    description:
      "Monitor impressions, clicks, leads, and attributed pipeline in real time.",
  },
  {
    icon: CreditCard,
    title: "Pay creators",
    description: "Naano handles invoicing, contracts, and payouts for you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Run creator campaigns from one place.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Five steps take you from an empty brief to attributed pipeline —
            no spreadsheets, no chasing invoices.
          </p>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
          {/* Connecting line, desktop only, sits behind the numbered circles */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-6 hidden h-px bg-border lg:block"
          />

          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-start">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-primary">
                {String(index + 1).padStart(2, "0")}
              </div>
              <step.icon
                className="mt-5 h-5 w-5 text-primary"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
