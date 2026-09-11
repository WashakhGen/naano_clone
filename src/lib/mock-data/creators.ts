export type Category =
  | "B2B SaaS/Tech"
  | "Sales/Marketing"
  | "Finance"
  | "HR"
  | "GTM"
  | "Founder";

export interface SamplePost {
  title: string;
  impressions: number;
  clicks: number;
  leads: number;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  category: Category;
  country: string;
  followers: number;
  fit: number;
  pricePerPost: number;
  bio: string;
  samplePosts: SamplePost[];
}

function avatarFor(name: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

/**
 * Builds a sample post with a believable CTR (clicks / impressions) and
 * lead rate (leads / clicks), rather than hand-typing every metric.
 * ctr: 0.05–0.15 to match Naano's claimed ~12% avg CTR.
 * leadRate: share of clicks that convert to a captured lead.
 */
function post(
  title: string,
  impressions: number,
  ctr: number,
  leadRate: number
): SamplePost {
  const clicks = Math.round(impressions * ctr);
  const leads = Math.max(1, Math.round(clicks * leadRate));
  return { title, impressions, clicks, leads };
}

interface Seed {
  name: string;
  headline: string;
  category: Category;
  country: string;
  followers: number;
  fit: number;
  pricePerPost: number;
  bio: string;
  posts: SamplePost[];
}

const seeds: Seed[] = [
  {
    name: "Sofia Marin",
    headline: "Product-led growth",
    category: "B2B SaaS/Tech",
    country: "France",
    followers: 245_000,
    fit: 92,
    pricePerPost: 1800,
    bio: "Ex-growth lead at two YC-backed SaaS startups, now writing daily about product-led growth for a 245k-strong B2B audience.",
    posts: [
      post("Why your onboarding flow is losing 40% of signups", 210_000, 0.13, 0.18),
      post("The pricing page mistake every SaaS makes", 180_000, 0.11, 0.15),
      post("How we 3x'd trial-to-paid in one quarter", 260_000, 0.14, 0.2),
    ],
  },
  {
    name: "Marcus Chen",
    headline: "Sales & Revenue",
    category: "Sales/Marketing",
    country: "United States",
    followers: 180_000,
    fit: 88,
    pricePerPost: 1400,
    bio: "20 years in enterprise sales, now breaking down outbound playbooks for revenue teams scaling past $10M ARR.",
    posts: [
      post("The cold email that booked 40 meetings", 150_000, 0.12, 0.16),
      post("Why your SDRs are burning out (and it's not quota)", 165_000, 0.09, 0.12),
    ],
  },
  {
    name: "Priya Nair",
    headline: "Capital-efficient GTM",
    category: "GTM",
    country: "India",
    followers: 95_000,
    fit: 85,
    pricePerPost: 700,
    bio: "Helps B2B startups build go-to-market motions that don't rely on a big ad budget.",
    posts: [
      post("The GTM framework we used pre-Series A", 82_000, 0.1, 0.14),
      post("Product-led vs sales-led: pick one, not both", 71_000, 0.08, 0.1),
      post("Our first 100 customers, channel by channel", 96_000, 0.12, 0.17),
    ],
  },
  {
    name: "Liam O'Connor",
    headline: "Founder & Builder",
    category: "Founder",
    country: "Ireland",
    followers: 62_000,
    fit: 90,
    pricePerPost: 550,
    bio: "Second-time founder, building in public. Writes about the unglamorous parts of running a startup.",
    posts: [
      post("What I got wrong at my first startup", 55_000, 0.13, 0.19),
      post("Raising a seed round in 6 weeks: the full breakdown", 60_000, 0.15, 0.22),
    ],
  },
  {
    name: "Elena Petrova",
    headline: "Fintech operator",
    category: "Finance",
    country: "Germany",
    followers: 300_000,
    fit: 97,
    pricePerPost: 2000,
    bio: "Former investment banker turned fintech operator, translating finance for a mass B2B audience.",
    posts: [
      post("Why most CFOs still use spreadsheets in 2026", 270_000, 0.12, 0.15),
      post("The unit economics VCs actually care about", 310_000, 0.14, 0.19),
      post("How we cut close time from 12 days to 3", 240_000, 0.1, 0.13),
    ],
  },
  {
    name: "Tomás Ribeiro",
    headline: "SaaS Product",
    category: "B2B SaaS/Tech",
    country: "Portugal",
    followers: 40_000,
    fit: 82,
    pricePerPost: 320,
    bio: "Product manager writing bite-sized lessons on building B2B SaaS features users actually want.",
    posts: [
      post("The feature we killed that doubled retention", 34_000, 0.09, 0.12),
      post("A 3-question framework for saying no to feature requests", 37_000, 0.11, 0.14),
    ],
  },
  {
    name: "Aisha Khan",
    headline: "People & Culture",
    category: "HR",
    country: "United Arab Emirates",
    followers: 28_000,
    fit: 78,
    pricePerPost: 220,
    bio: "HR leader for fast-growing tech companies, sharing what actually works in hiring and retention.",
    posts: [
      post("The interview question that predicts performance", 24_000, 0.08, 0.11),
      post("Why we stopped doing exit interviews", 26_000, 0.07, 0.09),
    ],
  },
  {
    name: "Noah Fischer",
    headline: "Marketing Ops",
    category: "Sales/Marketing",
    country: "Netherlands",
    followers: 15_000,
    fit: 74,
    pricePerPost: 140,
    bio: "Marketing ops specialist demystifying attribution and pipeline reporting for B2B teams.",
    posts: [
      post("Your attribution model is lying to you", 12_500, 0.09, 0.13),
      post("The 5-field lead form that converts better", 13_800, 0.1, 0.15),
    ],
  },
  {
    name: "Camille Dubois",
    headline: "Founder & Bootstrapper",
    category: "Founder",
    country: "France",
    followers: 120_000,
    fit: 91,
    pricePerPost: 900,
    bio: "Bootstrapped a SaaS to €2M ARR with no outside funding, writing about the tradeoffs nobody talks about.",
    posts: [
      post("Why I turned down a $5M term sheet", 105_000, 0.14, 0.2),
      post("Bootstrapping vs VC: the real math", 118_000, 0.12, 0.16),
      post("The hire that changed everything at €1M ARR", 98_000, 0.11, 0.15),
    ],
  },
  {
    name: "Ravi Iyer",
    headline: "Scrappy pre-PMF growth",
    category: "GTM",
    country: "India",
    followers: 8_000,
    fit: 71,
    pricePerPost: 70,
    bio: "Early-stage GTM consultant sharing scrappy tactics for startups pre-product-market-fit.",
    posts: [
      post("How we got our first 10 customers with no budget", 6_500, 0.09, 0.12),
      post("The cold DM template that actually works", 7_200, 0.11, 0.14),
    ],
  },
  {
    name: "Hannah Schmidt",
    headline: "Fractional CFO",
    category: "Finance",
    country: "Germany",
    followers: 52_000,
    fit: 84,
    pricePerPost: 420,
    bio: "CFO-as-a-service for B2B SaaS, writing about fundraising, runway, and financial discipline.",
    posts: [
      post("The runway calculation most founders get wrong", 45_000, 0.1, 0.14),
      post("How to read a term sheet in 10 minutes", 48_000, 0.12, 0.17),
    ],
  },
  {
    name: "Jack Sullivan",
    headline: "Dev Tools",
    category: "B2B SaaS/Tech",
    country: "United States",
    followers: 3_200,
    fit: 73,
    pricePerPost: 40,
    bio: "Backend engineer building in public, writing about developer tools and infra for small teams.",
    posts: [
      post("Why we moved off Kubernetes", 2_800, 0.13, 0.18),
      post("The logging setup that saved us at 3am", 3_000, 0.1, 0.15),
    ],
  },
  {
    name: "Inés Alonso",
    headline: "People Ops",
    category: "HR",
    country: "Spain",
    followers: 21_000,
    fit: 77,
    pricePerPost: 180,
    bio: "People ops lead writing practical, no-fluff advice for scaling teams from 20 to 200.",
    posts: [
      post("The onboarding doc every new hire actually reads", 18_000, 0.08, 0.1),
      post("Why we stopped doing annual reviews", 19_500, 0.09, 0.12),
    ],
  },
  {
    name: "Oliver Bennett",
    headline: "Enterprise Sales",
    category: "Sales/Marketing",
    country: "United Kingdom",
    followers: 87_000,
    fit: 89,
    pricePerPost: 680,
    bio: "Enterprise AE turned sales coach, breaking down how six- and seven-figure deals actually close.",
    posts: [
      post("The discovery call framework that closes bigger deals", 75_000, 0.13, 0.18),
      post("Why your champion isn't enough to win the deal", 80_000, 0.11, 0.15),
      post("Negotiating with procurement: a field guide", 92_000, 0.12, 0.16),
    ],
  },
  {
    name: "Freja Larsen",
    headline: "Zero-to-one builder",
    category: "Founder",
    country: "Sweden",
    followers: 1_000,
    fit: 70,
    pricePerPost: 20,
    bio: "Solo founder building a niche SaaS tool, sharing the journey from zero to first paying customer.",
    posts: [
      post("My first paying customer, start to finish", 850, 0.14, 0.2),
      post("Why I chose to stay solo instead of hiring", 900, 0.1, 0.15),
    ],
  },
  {
    name: "Diego Fernández",
    headline: "GTM & Partnerships",
    category: "GTM",
    country: "Spain",
    followers: 165_000,
    fit: 93,
    pricePerPost: 1250,
    bio: "Runs partnerships for a Series B SaaS company, writing about channel strategy and co-selling.",
    posts: [
      post("The partnership that brought in 30% of our pipeline", 140_000, 0.13, 0.18),
      post("Why most partner programs fail in year one", 155_000, 0.11, 0.15),
    ],
  },
  {
    name: "Zofia Kowalski",
    headline: "Finance & Ops",
    category: "Finance",
    country: "Poland",
    followers: 34_000,
    fit: 80,
    pricePerPost: 260,
    bio: "Finance ops lead for a scale-up, writing about budgeting, forecasting, and financial hygiene.",
    posts: [
      post("The forecast template we use every quarter", 29_000, 0.09, 0.12),
      post("Three financial metrics your board actually reads", 31_500, 0.1, 0.13),
    ],
  },
  {
    name: "Ben Carter",
    headline: "Platform Engineering",
    category: "B2B SaaS/Tech",
    country: "Canada",
    followers: 210_000,
    fit: 96,
    pricePerPost: 1600,
    bio: "VP Engineering at a public SaaS company, writing about platform reliability and scaling engineering teams.",
    posts: [
      post("The incident that changed how we ship code", 185_000, 0.12, 0.16),
      post("Why we built an internal developer platform", 200_000, 0.13, 0.18),
      post("Scaling from 10 to 100 engineers without losing velocity", 220_000, 0.14, 0.2),
    ],
  },
];

export const creators: Creator[] = seeds.map((seed, index) => ({
  id: `creator-${index + 1}`,
  name: seed.name,
  avatar: avatarFor(seed.name),
  headline: seed.headline,
  category: seed.category,
  country: seed.country,
  followers: seed.followers,
  fit: seed.fit,
  pricePerPost: seed.pricePerPost,
  bio: seed.bio,
  samplePosts: seed.posts,
}));

export const CATEGORIES: Category[] = [
  "B2B SaaS/Tech",
  "Sales/Marketing",
  "Finance",
  "HR",
  "GTM",
  "Founder",
];

export const COUNTRIES: string[] = Array.from(
  new Set(creators.map((creator) => creator.country))
);
