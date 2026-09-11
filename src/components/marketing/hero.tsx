import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pt-28">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-medium text-primary">
          <Sparkle className="h-3.5 w-3.5" strokeWidth={2.5} />
          Where B2B brands work with creators
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
          The B2B LinkedIn Creator Marketplace.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-copy text-pretty">
          Find LinkedIn creators your buyers already trust, launch fixed-price
          sponsored campaigns in minutes, and trace every click, lead, and
          pipeline dollar back to the post that earned it.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/marketplace"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-foreground/20 transition-all hover:bg-foreground/90 hover:shadow-md hover:shadow-foreground/25"
          >
            Launch a campaign
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
