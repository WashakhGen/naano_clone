# Naano — Product Breakdown

Source: public recon of https://naano.com (HTTP headers, robots.txt, sitemap.xml,
rendered page content) on 2026-09-11. No authenticated areas were accessed.

## 1. What it is

Naano is a **B2B LinkedIn Creator Marketplace**. It connects B2B SaaS/tech brands
with vetted LinkedIn micro-creators (industry professionals with engaged
audiences) for **fixed-price sponsored LinkedIn posts**, and gives the brand
click/lead/pipeline attribution back to each post.

Tagline: *"Naano helps B2B SaaS brands run fixed-price LinkedIn creator
campaigns and trace attributed clicks and leads back to each post."*

Founded 2025, Paris. Founders: Thomas Marcelle (CEO), Alexis Jarre (CMO),
Justine Namour (CTO).

Stats claimed: 2,000–3,000+ vetted creators, 100 countries, 5M+ impressions,
30K+ leads, 5K+ posts, 12% avg CTR vs 0.8% LinkedIn Ads benchmark.

## 2. Two-sided marketplace

### Brand side (demand)
- Signs up as "Brand", builds a campaign brief (AI-assisted), browses the
  creator marketplace, books creators at their fixed per-post price, tracks
  attributed clicks/leads/pipeline per post, pays via the platform.
- Segments: self-serve B2B teams, and agencies managing budgets across clients.

### Creator side (supply)
- Signs up as "Creator", sets own fixed price per sponsored post, browses
  open briefs, applies/gets matched, publishes on their own LinkedIn, gets
  paid out through the platform.
- Pitch to creators: "Get paid to create LinkedIn content for B2B brands you
  actually use" / centralized deal discovery, built-in payments, performance
  tracking, delivery workflow.

## 3. Core workflow (brand-facing, 5 steps)

1. **Find creators** — browse marketplace, compare "audience fit" scores.
2. **Build brief** — AI-generated campaign brief: brand context, tone,
   content angles, targeting, objectives, tracking links.
3. **Manage collaborations** — per-creator status: draft → scheduled → live.
4. **Track results** — impressions, clicks, leads, attributed pipeline,
   in a real-time dashboard.
5. **Pay creators** — Naano handles invoicing, contracts, payouts.

There is also a **"free-match" concierge flow** (`/selection`): a brand
describes its campaign (goals, budget, target audience) and Naano manually
curates a creator shortlist within 48 hours at no cost — a human-in-the-loop
lead-gen funnel that upsells into Managed Campaigns.

## 4. A "brief" (object model hint)

A brief = the campaign spec creators evaluate against: brand background,
tone/voice, suggested content angles, audience targeting. Creators browse
open briefs and apply; this is the matching mechanism (`/briefs`).

## 5. Pricing

| Plan | Price | Includes |
|---|---|---|
| Self-Serve | €0/mo | Marketplace access, AI brief creation, click/lead/pipeline tracking, automatic creator payouts |
| Managed Campaigns | €700/mo (custom quote language also used) | Campaign strategy & positioning, creator sourcing & coordination, brief creation & launch, reporting & optimisation, dedicated team + bookable calls |

Campaign/creator spend is always separate from the plan fee, shown before
booking. No per-click/per-impression billing — creators set flat per-post
prices starting ~€20. No lock-in, cancel anytime, month-to-month.

## 6. Site map (from sitemap.xml)

- `/` marketing home
- `/about`
- `/creators` and `/creators/<slug>` (individual creator profile pages —
  many indexed, e.g. `/creators/meghana-atluri`)
- `/blog`
- `/briefs` (open campaign briefs)
- `/selection` (free concierge matching funnel)
- `/free-tools` + calculators:
  - `/free-tools/linkedin-creator-worth-calculator`
  - `/free-tools/linkedin-engagement-rate-calculator`
  - `/free-tools/sponsored-post-delivery-odds-estimator`
  - `/free-tools/creator-campaign-budget-planner`
- `/pricing`
- `/register` (role choice: Creator vs Brand, then short setup)
- `/login`
- `/dashboard/*` — gated (307 redirect when logged out), the real app
- `/book` — book a campaign call (Cal.com embed, see tech stack)

These free calculators are SEO/lead-gen tools, not core product — cheap to
clone as static client-side forms.

### Example: LinkedIn Creator Worth Calculator (`/free-tools/...`)

Inputs: follower count, avg reactions/post, avg comments/post (weighted 2x),
posting frequency (1–7/wk), niche (B2B SaaS/Tech, Finance, Sales/Marketing,
HR/Future of work, Other).

Formula:
1. engagement rate = (avg reactions + 2×avg comments) / followers
2. base value = €12 / 1,000 followers, €100 minimum
3. engagement multiplier: 0.6×–2× scaled by engagement quality
4. niche multiplier: 0.9× (Other) – 1.2× (B2B SaaS/Tech)
5. output: ±20% range, rounded to nearest €10, €100 minimum

Output: engagement rate + benchmark, per-post rate range, monthly
sponsorship potential (assumes 2–4 posts/mo).

## 7. Trust / growth mechanics worth cloning

- Social proof bar (lemlist, Folk, Leadbay, Ringover, Attio, +30 logos).
- Public creator profile pages (indexed, SEO-compounding, one per creator).
- Free calculators as top-of-funnel SEO content.
- Blog for SEO.
- "Book a campaign call" (Cal.com) as a secondary, lower-friction CTA next to
  self-serve signup.
