import Link from "next/link";
import { Logo } from "./logo-mark";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.5 8.25h4.31v2.02h.06c.6-1.13 2.06-2.33 4.24-2.33 4.53 0 5.37 2.98 5.37 6.86V23h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.66 1.8-2.66 3.65V23H8.5V8.25z" />
    </svg>
  );
}

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Creator worth calculator", href: "/free-tools/linkedin-creator-worth-calculator" },
      { label: "Engagement rate calculator", href: "/free-tools/linkedin-engagement-rate-calculator" },
      { label: "Campaign budget planner", href: "/free-tools/creator-campaign-budget-planner" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turn LinkedIn creators into your best B2B acquisition channel.
            </p>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Naano on LinkedIn"
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} naano. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
