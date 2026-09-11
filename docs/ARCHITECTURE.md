# Nanno Clone — Architecture

Scope (agreed 2026-09-11, revised): a **frontend-only clone**, no real
backend. Next.js + TypeScript, Tailwind, shadcn/ui, lucide-react, all data
mocked/seeded in-repo. Deployed to Vercel, versioned in a public GitHub repo.

Product scope stays what was agreed before minus anything a backend would
be required for: brand + creator marketplace UI, brief creation & matching,
collaboration lifecycle, click/lead attribution **as a simulated dashboard**,
no Stripe payouts, no Cal.com booking, no Barkan-style AI widget.

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Icons | lucide-react |
| Data | static/seeded mock data (TS modules or JSON), no database, no API |
| Auth | mocked — a role-switcher, not real auth |
| Deployment | Vercel |
| VCS | Git, public GitHub repo |

No Supabase, no FastAPI, no Postgres. Everything that would be a network
call becomes a local function reading from an in-memory/mock data module.
This trades "actually works end to end" for "fast to build, easy to demo,
zero infra" — right tradeoff for a portfolio/assignment clone.

## 2. What "mock/seeded, no backend" means concretely

- All entities (creators, brands, briefs, collaborations, click/lead stats)
  live as typed fixtures in `lib/mock-data/`, generated once and committed —
  not randomly regenerated per load, so the demo is stable and linkable.
- Reads: plain TS functions (`getCreators()`, `getBriefById(id)`) imported
  directly into Server Components — no fetch, no loading spinners needed for
  data that's already in the bundle at build/render time.
- Writes (submitting a brief, "applying" to one, "booking" a collaboration):
  update local React state / a client-side store for the session only.
  Nothing persists across a refresh unless explicitly backed by
  `localStorage` — worth doing for the couple of flows where persistence
  sells the demo (e.g. "my applications", role selection), skip it
  elsewhere.
- "Login": a role switcher (Brand / Creator / logged-out) stored in
  `localStorage` or a cookie, gating which dashboard renders — not real
  auth, no passwords, and the UI should not pretend otherwise (e.g. don't
  build a password field that goes nowhere).

## 3. Route map

```
app/
  (marketing)/
    page.tsx                        # /  — landing page
    about/page.tsx
    creators/page.tsx               # marketplace grid, filter by niche/followers/price
    creators/[slug]/page.tsx        # public creator profile
    briefs/page.tsx                 # open briefs list (public-ish, matches naano.com/briefs)
    free-tools/page.tsx
    free-tools/linkedin-creator-worth-calculator/page.tsx
    free-tools/linkedin-engagement-rate-calculator/page.tsx
    pricing/page.tsx
  (auth)/
    login/page.tsx                  # role switcher, not real auth
    register/page.tsx               # role picker -> creates a mock profile in local state
  dashboard/
    layout.tsx                      # gated by mock session; redirects to /login if none
    brand/
      page.tsx                      # brand dashboard home: active collaborations, stats
      briefs/page.tsx               # brand's own briefs, create/edit
      briefs/new/page.tsx
      collaborations/[id]/page.tsx  # click/lead attribution view (mocked numbers)
    creator/
      page.tsx                      # creator dashboard home
      briefs/page.tsx               # open briefs to apply to
      collaborations/[id]/page.tsx
```

## 4. Mock data model

Same shape as the real product would need, just typed TS instead of DB
tables — keeps the door open to swapping in a real backend later without a
UI rewrite.

```ts
// lib/mock-data/types.ts
type Role = "brand" | "creator";

interface CreatorProfile {
  id: string;
  slug: string;
  displayName: string;
  avatarUrl: string;
  linkedinUrl: string;
  followerCount: number;
  niche: "b2b-saas" | "finance" | "sales-marketing" | "hr" | "other";
  pricePerPost: number;
  bio: string;
  verified: boolean;
}

interface BrandProfile {
  id: string;
  companyName: string;
  website: string;
  logoUrl: string;
  industry: string;
}

interface Brief {
  id: string;
  brandId: string;
  title: string;
  context: string;
  tone: string;
  contentAngles: string[];
  targetAudience: string;
  objective: "leads" | "awareness" | "launch";
  budget: number;
  status: "draft" | "open" | "closed";
  createdAt: string;
}

interface BriefApplication {
  id: string;
  briefId: string;
  creatorId: string;
  status: "applied" | "shortlisted" | "rejected" | "accepted";
  appliedAt: string;
}

interface Collaboration {
  id: string;
  briefId: string;
  creatorId: string;
  brandId: string;
  agreedPrice: number;
  status: "draft" | "scheduled" | "live" | "completed" | "cancelled";
  scheduledDate: string | null;
  publishedAt: string | null;
  linkedinPostUrl: string | null;
  stats: {
    impressions: number;
    clicks: number;
    leads: number;
    pipelineValue: number;
  };
}
```

`Collaboration.stats` replaces the real click/lead-tracking pipeline
(tracking links, click events, redirect service) with a fixed seeded number
per collaboration — the dashboard renders the same charts a real attribution
system would produce, just fed from a static fixture instead of live events.

## 5. Repo layout

```
nanno_clone/
  app/                       # Next.js App Router routes (see section 3)
  components/
    ui/                      # shadcn/ui generated components
    marketplace/             # CreatorCard, CreatorFilterBar, ...
    briefs/                  # BriefForm, BriefCard, ApplicationList
    dashboard/                # StatCard, CollaborationTimeline, PipelineChart
  lib/
    mock-data/
      creators.ts
      brands.ts
      briefs.ts
      collaborations.ts
      index.ts               # typed accessors: getCreators(), getBriefById(), ...
    session.ts                # mock role/session helpers (localStorage-backed)
    utils.ts                  # cn(), formatters
  docs/
    PRODUCT-BREAKDOWN.md
    TECH-STACK-OBSERVED.md
    ARCHITECTURE.md           # this file
  .agent-logs/
```

## 6. Build order (suggested)

1. Scaffold: `create-next-app` (App Router, TS, Tailwind) + `shadcn` init +
   `lucide-react`.
2. Mock data layer (`lib/mock-data/`) — write this before any UI, since
   every page consumes it.
3. Marketing shell: landing page, nav, footer, `/about`, `/pricing`.
4. Creator marketplace: `/creators` grid + filters, `/creators/[slug]`.
5. Briefs: public `/briefs` list, brand-side create/edit form.
6. Mock auth/session: role switcher + `/login`, `/register`, dashboard
   gating.
7. Dashboards: brand and creator home, collaboration detail with mocked
   attribution stats/charts.
8. Free-tool calculators (pure client-side, no data dependency — good
   candidates to build early/in parallel, low risk).
9. Polish pass: empty states, responsive check, deploy to Vercel.

## 7. Explicitly out of scope

- Any real database, API server, or auth provider.
- Stripe billing/payouts, Cal.com booking, LinkedIn OAuth/posting, real
  click-tracking redirects — all replaced by static seeded numbers or
  omitted entirely.
- Persistence beyond a single browser session (`localStorage` only where it
  meaningfully improves the demo).
