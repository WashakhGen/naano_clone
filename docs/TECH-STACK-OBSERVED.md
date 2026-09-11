# Naano — Observed Tech Stack

Everything below is inferred from public, unauthenticated signals: response
headers, CSP header (lists every third-party origin the app is allowed to
call), page source, robots.txt, sitemap.xml. Nothing here required
inspecting private/authenticated traffic.

## Frontend

- **Next.js** (App Router) — `x-powered-by: Next.js`, RSC-specific `vary`
  header (`rsc, next-router-state-tree, next-router-prefetch,
  next-router-segment-prefetch`), streamed React Server Component payloads
  (`self.__next_f.push(...)`) in the HTML, route-grouped structure visible
  in the payload (`(marketing)` group).
- Bundled with **Turbopack** (chunk named `turbopack-*.js`).
- Hosted on **Vercel** (`x-vercel-cache`, `x-vercel-id` headers).
- **Cloudflare** in front as CDN/WAF (`server: cloudflare`, `cf-ray`,
  bot-management rules in robots.txt, NEL/report-to beacons).
- Self-hosted fonts via `next/font` (preloaded `.woff2`, hashed filenames).
- **Google Analytics / Google Tag Manager** (`GoogleAnalyticsClient`
  component in the RSC payload; `*.googletagmanager.com`,
  `*.google-analytics.com` allowed in CSP).

## Backend / API

- Separate API host: **api.naano.xyz** (own Cloudflare zone, JSON error
  responses, `__cf_bm` bot-management cookie) — i.e. **not** Next.js API
  routes for the core app; a standalone backend service. Framework not
  fingerprintable from headers alone (no `x-powered-by`); worth assuming a
  Node service (Nest/Express/Fastify) or similar until proven otherwise.
- **Supabase** is the primary data layer: CSP allows
  `https://*.supabase.co` and `wss://*.supabase.co` — Postgres + Auth +
  Realtime (likely used for live dashboard updates on campaign/post status).
- WebSocket to `wss://api.naano.xyz` too — the custom backend also pushes
  realtime events directly (in addition to/instead of Supabase Realtime).

## Payments

- **Stripe** — `js.stripe.com`, `checkout.stripe.com`, `api.stripe.com`,
  `r.stripe.com` all allowlisted. Used for plan billing (Self-Serve/Managed)
  and very likely **Stripe Connect** for creator payouts (matches the
  "automatic payouts" / "Naano handles invoicing, contracts, and payouts"
  copy).

## Scheduling

- **Cal.com** (`cal.com`, `app.cal.com`, `cal.eu`, `app.cal.eu` allowlisted)
  — powers the "Book a campaign call" CTA (`/book`).

## Maps

- **Google Maps JavaScript API** (`maps.googleapis.com`) — likely for a
  location/timezone field on brand or creator signup, or agency location
  data. Minor.

## Third-party embedded product

- **Barkan** (`trybarkan.com`) — "AI Customer Success Manager" widget
  embedded in-app: guides users with a live cursor, drives activation.
  Explains `wss://api.elevenlabs.io` in CSP (Barkan's voice feature) and the
  `'unsafe-inline'` script CSP relaxation. This is a **bought/embedded SaaS
  widget**, not something to clone — skip it or substitute a lightweight
  onboarding tour (e.g. driver.js/Shepherd) if the assignment wants parity.

## CDN / media

- `ddwl4m2hdecbv.cloudfront.net` (AWS CloudFront) — likely serves large
  media assets (creator videos/screenshots) outside the Vercel edge.

## Security posture (worth matching, not just decorative)

- Strict CSP with an explicit allowlist per directive (script/style/img/
  font/connect/media/frame/worker), `object-src 'none'`, `frame-ancestors
  'self'`, CSP violation reporting endpoint (`/api/security/csp-report`)
  plus a `Content-Security-Policy-Report-Only` header for staging new rules
  before enforcing them.
- `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` locking down
  camera/mic/geolocation by default.
- robots.txt uses the new **Content-Signal** directive
  (`ai-train=no, use=reference`) plus explicit per-bot rules blocking
  GPTBot/ClaudeBot/etc. from `/dashboard/`, `/login/`, `/register/`, `/api/`
  while allowing marketing/creator pages — SEO-friendly, app-private.

## Summary table

| Layer | Technology |
|---|---|
| Frontend framework | Next.js (App Router, RSC, Turbopack) |
| Frontend hosting | Vercel |
| Edge/CDN/WAF | Cloudflare |
| API backend | Custom service at api.naano.xyz (Node-family, unconfirmed framework) |
| Database / Auth / Realtime | Supabase (Postgres, Auth, Realtime) |
| Payments & payouts | Stripe (+ likely Stripe Connect) |
| Scheduling | Cal.com |
| Maps | Google Maps API |
| Analytics | Google Analytics / GTM |
| In-app AI guide (bought, not built) | Barkan (uses ElevenLabs voice under the hood) |
| Media CDN | AWS CloudFront |
