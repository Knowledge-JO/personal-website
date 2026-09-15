export const projects = [
  {
    id: "amani",
    index: "01",
    name: "AMANI",
    subtitle: "WhatsApp-native AI commerce platform",
    kind: "Full product suite — 6 repositories",
    role: "Sole engineer",
    period: "Jan 2026 — Aug 2026",
    domain: "Agentic commerce · LLM tooling",
    accent: "cyan",
    featured: true,
    flagship: true,
    summary:
      "A commerce platform for merchants who already sell on WhatsApp. Sellers build a catalogue once; an AI assistant then handles customer conversations end to end — quoting live prices, assembling carts, taking bookings and issuing payment links, all inside the seller's own permissions.",
    problem:
      "Millions of merchants run their entire business in WhatsApp DMs — no catalogue, no order history, no payment trail. Existing storefront tools ask them to abandon the channel their customers already use.",
    approach:
      "Rather than replace WhatsApp, I instrumented it. A modular NestJS monolith spans three isolated PostgreSQL databases joined by logical UUID references, so no distributed transactions are needed and each domain stays extractable. An MCP tool layer sits between the language model and the commerce API, giving the agent a typed, permission-scoped surface instead of raw database access.",
    metrics: [
      { value: "92", label: "HTTP endpoints" },
      { value: "42", label: "NestJS modules" },
      { value: "20", label: "MCP tools" },
      { value: "3", label: "Databases" },
      { value: "2", label: "Auth boundaries" },
    ],
    highlights: [
      {
        title: "An agent that actually transacts",
        body: "Exposed the commerce API to the LLM through a Model Context Protocol server with two distinct trust boundaries — the seller's own RS256 JWT for merchant actions, a narrower service token for anonymous buyers. The agent's authority is exactly the caller's authority.",
      },
      {
        title: "Retrieval-augmented conversation memory",
        body: "Long-term memory on pgvector with HNSW cosine indexing, blending semantic recall with recency so the assistant remembers a returning customer's preferences without replaying an entire chat history into the context window.",
      },
      {
        title: "Prompt caching without cross-tenant leakage",
        body: "Anthropic prompt caching applied to shared instruction blocks only, with per-tenant data deliberately excluded from the cached prefix.",
      },
      {
        title: "Never talk over a human",
        body: "A vendor-response guard checks conversation state both before generation and again immediately before send, so the bot goes silent the moment the seller starts typing.",
      },
      {
        title: "Two-tier AI billing",
        body: "Per-feature token accounting alongside conversation credits metered against WhatsApp's own 24-hour session window, so cost is attributed to the unit the merchant actually understands.",
      },
      {
        title: "Production WhatsApp on the Web protocol",
        body: "Built on Baileys with QR and pairing-code flows, JSONB session persistence guarded by write-lock serialisation, exponential reconnect backoff, and message deduplication — the difference between a demo and a session that survives a week.",
      },
    ],
    stack: {
      Backend: [
        "NestJS 11",
        "TypeScript",
        "PostgreSQL ×3",
        "Drizzle ORM",
        "Redis",
        "BullMQ",
        "Socket.IO",
      ],
      AI: [
        "Anthropic Claude",
        "Google Gemini",
        "MCP client + server",
        "pgvector / HNSW",
        "Prompt caching",
      ],
      Clients: [
        "Next.js 16",
        "React 19",
        "Expo 54",
        "React Native",
        "NativeWind",
        "TanStack Query",
      ],
      Platform: ["Baileys (WhatsApp)", "Flutterwave", "Turborepo", "Jest"],
    },
    links: [],
  },

  {
    id: "amani-mcp",
    index: "02",
    name: "AMANI MCP Server",
    subtitle: "Agent tool layer with two auth boundaries",
    kind: "AI infrastructure",
    role: "Sole engineer",
    period: "2026",
    domain: "LLM tooling · Model Context Protocol",
    accent: "magenta",
    featured: true,
    summary:
      "A dual-endpoint Streamable HTTP MCP server that turns a REST commerce API into a tool surface a language model can safely operate — with authorisation, not trust, as the boundary.",
    problem:
      "Handing an LLM a service key gives it superuser reach over every tenant. Handing it nothing makes it useless. The interesting problem is giving an agent real write access that is provably scoped to one caller.",
    approach:
      "Two separate MCP endpoints instead of one role-switching endpoint. The merchant endpoint forwards the caller's own RS256 JWT downstream, so the agent inherits precisely the seller's permissions. The buyer endpoint uses a service token with a deliberately smaller toolset for customers who have no account. Every input is Zod-validated and every tool carries MCP behavioural annotations.",
    metrics: [
      { value: "20", label: "Tools" },
      { value: "14", label: "Merchant tools" },
      { value: "6", label: "Buyer tools" },
      { value: "7", label: "Resources" },
      { value: "2", label: "Auth boundaries" },
    ],
    highlights: [
      {
        title: "Name-based entity resolution",
        body: "Products resolve through a ranked exact → prefix → substring → tag cascade, so the model never has to ask a human for a UUID it cannot possibly know.",
      },
      {
        title: "Annotated tool safety",
        body: "readOnlyHint and destructiveHint annotations on every tool, so the client knows which calls mutate state before it invokes them.",
      },
      {
        title: "Schema-validated at the edge",
        body: "Zod 4 schemas on all tool inputs, rejecting malformed model output at the boundary rather than propagating it into the commerce API.",
      },
      {
        title: "DNS-rebinding protection",
        body: "Origin allow-listing on the Streamable HTTP transport, because an MCP server reachable from a browser tab is an attack surface.",
      },
    ],
    stack: {
      Runtime: ["Express 5", "TypeScript", "Node.js"],
      Protocol: ["MCP SDK", "Streamable HTTP", "Zod 4"],
      Security: ["jose / RS256", "Service tokens", "Origin allow-list"],
    },
    links: [],
  },

  {
    id: "ore",
    index: "03",
    name: "Oré",
    subtitle: "Voice-first AI creative companion",
    kind: "NestJS AI platform — team",
    role: "Backend engineer · Residence Spaces",
    period: "May 2026 — Jun 2026",
    domain: "Consumer AI · prompt systems",
    accent: "ice",
    featured: true,
    summary:
      "A NestJS companion for writers, filmmakers and designers: streamed conversations, a stage-aware XML prompt library, Whisper voice notes, and Paystack billing. I owned monetisation and media upload, and contributed the directive layer of the prompt compiler.",
    problem:
      "A creative companion that schedules work the moment a user mentions a deadline is not a companion — it is a calendar hijacker. The model has to stay inside the current conversation stage, and billing has to exist before the product can ship.",
    approach:
      "On a five-person backend team I took the payments surface end to end — Paystack one-time charges, subscriptions, card vaulting and invoice state — plus the Cloudinary upload module. I also contributed the TypeScript directive mechanism in the prompt compiler, so stage rules (for example: no ACTION_BLOCK while a plan is still being proposed) are injected at compile time rather than hoped for in the system prompt.",
    metrics: [
      { value: "22", label: "NestJS modules" },
      { value: "113", label: "HTTP routes" },
      { value: "4", label: "SSE endpoints" },
      { value: "34", label: "XML prompts" },
      { value: "56", label: "Spec files" },
    ],
    highlights: [
      {
        title: "Stage-aware prompt compilation",
        body: "XML prompt files assembled with TypeScript directives that change by conversation stage — so the model cannot create a reminder before the user has agreed to a plan.",
      },
      {
        title: "Paystack subscription lifecycle",
        body: "One-time checkout, recurring plans, webhook-driven activation, reusable charge authorisations, and invoice state — written so a repeated webhook updates to the same state rather than double-crediting.",
      },
      {
        title: "SSE as the product path",
        body: "Text and voice-note turns stream as server-sent events through OpenAI chat completions. Voice notes transcribe via Whisper, then join the same pipeline as typed messages.",
      },
      {
        title: "Honest scope",
        body: "Live WebSocket voice over the OpenAI Realtime API lives on an unmerged teammate branch and is not claimed here. On the default branch there are no WebSocket gateways.",
      },
    ],
    stack: {
      Runtime: ["NestJS 11", "TypeORM", "PostgreSQL", "SSE"],
      AI: ["OpenAI", "Gemini", "Whisper STT", "XML prompt library"],
      Billing: ["Paystack", "Subscriptions", "Webhooks"],
      Media: ["Cloudinary", "Cloudflare R2"],
    },
    links: [],
  },

  {
    id: "residence",
    index: "04",
    name: "Residence",
    subtitle: "Property management platform",
    kind: "Turborepo monorepo — team",
    role: "Backend engineer · Residence Spaces",
    period: "Mar 2026",
    domain: "Proptech · identity & tenancy",
    accent: "lime",
    featured: true,
    summary:
      "A landlord–tenant platform: property listing, identity and income verification, tenancy lifecycle, rent reminders and WhatsApp notifications. I was the primary author of the core domain services on a three-person team.",
    problem:
      "Onboarding a tenant is a multi-party workflow — identity check, income proof, landlord approval, unit occupancy, then months of reminders — and any step that silently fails leaves a unit in the wrong state.",
    approach:
      "I owned the application lifecycle, Dojah NIN/liveness verification with a circuit breaker and retries, Mono income webhooks with Redis-cached account IDs, the rent-reminder cron (deduplicated by a unique period key), and OTP-gated property mutations. A teammate owned subscription credits and the admin-dashboard shell.",
    metrics: [
      { value: "107", label: "Core API routes" },
      { value: "22", label: "Prisma models" },
      { value: "40", label: "Migrations" },
      { value: "3", label: "Apps" },
      { value: "8", label: "Admin API routes" },
    ],
    highlights: [
      {
        title: "Approval as a multi-entity transition",
        body: "Approving an application creates the tenancy, marks the unit occupied, and notifies the tenant. Partial completion is treated as worse than outright failure.",
      },
      {
        title: "Making a flaky identity API usable",
        body: "NIN and liveness wrapped in a circuit breaker, retried, forced onto IPv4 to sidestep a DNS failure, with images compressed via sharp so large phone photos stop timing out.",
      },
      {
        title: "Reminders that cannot double-send",
        body: "Correctness is a UNIQUE constraint on [tenancy, type, period], so two cron instances cannot send the same period's reminder twice.",
      },
      {
        title: "Applications review, API through UI",
        body: "On the Next.js admin dashboard I built the applications table, hooks and API client — the review feature end to end, not only the backend.",
      },
    ],
    stack: {
      Backend: ["Express 5", "Prisma 6", "PostgreSQL", "Redis", "Zod"],
      Frontend: ["Next.js 16", "React 19", "TanStack Query", "Tailwind CSS v4"],
      Identity: ["Dojah (NIN)", "Mono (income)", "Twilio WhatsApp"],
      Platform: ["Turborepo", "Cloudflare R2", "Paystack"],
    },
    links: [],
  },

  {
    id: "chainpaye",
    index: "05",
    name: "ChainPaye",
    subtitle: "WhatsApp-native payments bot",
    kind: "Express backend — 3-engineer team",
    role: "Backend engineer · CapitaDApps",
    period: "Nov 2025 — Jan 2026",
    domain: "Messaging · money movement",
    accent: "violet",
    featured: false,
    summary:
      "A WhatsApp Business bot for wallets, P2P transfers, deposits, withdrawals and currency conversion. I built the platform foundation: Meta Flow encryption, the fiat stablecoin integration, and the transfer / deposit / withdrawal / conversion flows.",
    problem:
      "A Flow request from Meta does not carry an authenticated user, and a missed deposit on an async rail looks identical to a successful one if you only watch HTTP status codes.",
    approach:
      "I implemented Meta's RSA+AES Flow encryption spec — every Flow endpoint still runs through that middleware, including crypto flows teammates built later. Flow tokens map to phone numbers in Redis so identity is resolved server-side. Toronet deposits are reconciled by an Agenda job polling every 30 seconds for 15 minutes, with a receipt sent either way.",
    metrics: [
      { value: "21", label: "Flow endpoints" },
      { value: "44", label: "HTTP routes" },
      { value: "8", label: "Collections" },
      { value: "14", label: "Flow services" },
      { value: "3", label: "Core engineers" },
    ],
    highlights: [
      {
        title: "WhatsApp Flow encryption pipeline",
        body: "Decrypt the RSA-wrapped AES key, decrypt the body, handle the screen, re-encrypt the response. Getting this wrong fails closed — the user sees a blank screen with no error.",
      },
      {
        title: "Stateless Flows bound to a verified identity",
        body: "Opaque Flow tokens map to phone numbers in Redis at launch, so a screen handler never trusts a client-supplied identity.",
      },
      {
        title: "Deposit reconciliation against a slow rail",
        body: "Agenda polls the processor every 30 seconds with a 15-minute ceiling. Terminal state is written either way, and the user gets a receipt or a failure message — a deposit never silently disappears.",
      },
      {
        title: "PIN as a structural gate",
        body: "Every money-moving Flow verifies an argon2-hashed PIN before calling a service, so a new screen cannot accidentally omit it.",
      },
    ],
    stack: {
      Runtime: ["Express 5", "TypeScript", "MongoDB", "Redis", "Agenda"],
      Messaging: ["WhatsApp Cloud API", "Meta Flows", "HMAC-SHA256"],
      Fiat: ["Toronet", "Puppeteer receipts"],
      Auth: ["argon2 PIN", "Flow token sessions"],
    },
    links: [],
  },

  {
    id: "optimus-gate",
    index: "06",
    name: "Optimus Gate",
    subtitle: "Merchant subscription billing & checkout",
    kind: "Full-stack platform — Turborepo monorepo",
    role: "Sole engineer",
    period: "Jun 2026 — Jul 2026",
    domain: "Billing · recurring charges",
    accent: "amber",
    featured: true,
    summary:
      "A subscription billing platform that lets merchants sell recurring plans through a hosted checkout. One platform-level processor account, an internal double-entry ledger for per-merchant attribution, and reconciliation that assumes webhooks will fail.",
    problem:
      "Recurring billing on a shared processor account means the processor has no idea which merchant owns which unit of currency. Get the attribution wrong and you either lose money or pay someone twice.",
    approach:
      "An internal double-entry ledger became the source of truth for merchant balances, with every payment, renewal, refund and payout written as balanced entries. Idempotency was layered three times over — unique webhook event references, ledger idempotency keys, and per-resource keys — and a nightly timezone-pinned reconciliation job re-queries the processor to repair any state a webhook never delivered.",
    metrics: [
      { value: "38", label: "Endpoints" },
      { value: "21", label: "Tables" },
      { value: "11", label: "Modules" },
      { value: "9", label: "Migrations" },
    ],
    highlights: [
      {
        title: "Double-entry internal ledger",
        body: "Balanced entries for every money event, so a merchant's available balance is derived rather than stored — and any discrepancy is a provable inconsistency rather than a guess.",
      },
      {
        title: "Idempotency at three layers",
        body: "Unique event references on webhook ingest, idempotency keys on ledger writes, and deterministic BullMQ job IDs on renewals. A duplicate delivery is structurally incapable of double-charging.",
      },
      {
        title: "The full recurring lifecycle",
        body: "Checkout → signed webhook → processor verification → subscription activation → hourly cron sweep → BullMQ renewal job → tokenised charge → ledger credit, with exponential backoff and a dead-letter path at every hop.",
      },
      {
        title: "Reconciliation as a first-class job",
        body: "A nightly job pulls the processor's own record of the day and repairs anything local state missed.",
      },
      {
        title: "Server-first dashboard",
        body: "Next.js 16 App Router with React Server Components and Server Actions — access tokens live in HTTP-only cookies and never enter client JavaScript.",
      },
    ],
    stack: {
      Backend: [
        "NestJS 11",
        "PostgreSQL",
        "Drizzle ORM",
        "Redis",
        "BullMQ",
        "@nestjs/schedule",
      ],
      Frontend: [
        "Next.js 16",
        "React 19",
        "Server Actions",
        "Tailwind CSS v4",
        "TanStack Query",
      ],
      Payments: ["Nomba", "Tokenised cards", "HMAC-SHA256 webhooks"],
      Platform: ["Turborepo", "pnpm", "GitHub Actions"],
    },
    links: [],
  },

  {
    id: "century",
    index: "07",
    name: "Century",
    subtitle: "Crypto P2P trading & escrow API",
    kind: "GraphQL backend",
    role: "Sole engineer",
    period: "Oct 2025",
    domain: "Cryptocurrency exchange",
    accent: "rose",
    featured: true,
    summary:
      "A GraphQL API for a cryptocurrency trading platform: multi-currency wallets, a peer-to-peer escrow state machine, fiat rails, and real on-chain Bitcoin settlement built from primitives.",
    problem:
      "Peer-to-peer crypto trading is an adversarial setting — either party can walk away mid-trade. The system has to guarantee that funds are locked, and that every terminal outcome provably releases or refunds them.",
    approach:
      "Modelled the trade as an explicit state machine with escrow locked at offer creation and a defined transition for every path to resolution, including dispute and timeout. Bitcoin withdrawals were built directly on bitcore-lib — UTXO selection, byte-level fee sizing, signing and broadcast — rather than delegating custody to a third-party API.",
    metrics: [
      { value: "40", label: "GraphQL operations" },
      { value: "14", label: "Prisma models" },
      { value: "14", label: "Scheduled job types" },
      { value: "17", label: "Email templates" },
    ],
    highlights: [
      {
        title: "Escrow state machine",
        body: "Funds lock the moment an offer is accepted and every terminal path — completion, cancellation, dispute, expiry — has an explicit transition that either releases to the buyer or refunds the seller. No path leaves value stranded.",
      },
      {
        title: "On-chain Bitcoin from primitives",
        body: "UTXO selection, byte-accurate fee estimation, transaction construction, signing and broadcast via Blockstream using bitcore-lib — no custodial wallet abstraction in between.",
      },
      {
        title: "Validation as a GraphQL plugin",
        body: "A custom Nexus plugin that attaches Yup schemas directly to field definitions, so validation lives with the schema rather than scattered through resolvers.",
      },
      {
        title: "One typed resolver wrapper",
        body: "A generic higher-order resolver centralises authentication, authorisation and error normalisation across all operations — auth cannot be forgotten because it is structural.",
      },
    ],
    stack: {
      API: ["Apollo Server 5", "Nexus (code-first)", "GraphQL", "TypeScript"],
      Data: ["PostgreSQL", "Prisma", "Redis"],
      Jobs: ["Agenda", "Nodemailer"],
      Settlement: ["bitcore-lib", "Blockstream API", "Flutterwave"],
    },
    links: [],
  },

  {
    id: "rebirth-odyssey",
    index: "08",
    name: "Rebirth Odyssey",
    subtitle: "Education platform & conversion funnel",
    kind: "Frontend SPA in a 12-app monorepo",
    role: "Frontend engineer",
    period: "2025 — 2026",
    domain: "Edtech · conversion engineering",
    accent: "amber",
    featured: false,
    summary:
      "The public marketing site and conversion surface for a Web3 education company. Beyond marketing pages it contains two complete config-driven flows — a paid enrolment funnel with crypto, bank transfer and scholarship paths, and a careers portal with shareable per-role URLs.",
    problem:
      "Cohort details change constantly — price, payment wallet, deadline, open roles. A funnel where those values are scattered through JSX becomes a liability the moment marketing needs a change on a Friday night.",
    approach:
      "Both funnels are driven entirely by configuration objects, so changing a price, a wallet address or an open role is a one-file edit with no component changes. A shared flow-primitive library gives enrolment and careers identical validation, focus management and error semantics.",
    metrics: [
      { value: "12", label: "Apps in monorepo" },
      { value: "2", label: "Config-driven funnels" },
      { value: "38", label: "Components" },
      { value: "8", label: "Hiring roles" },
    ],
    highlights: [
      {
        title: "Config as the single source of truth",
        body: "Price, wallet, cohort dates and open roles all live in typed config. The wallet QR code is generated at runtime from the same value that renders on screen, which structurally prevents the QR from drifting out of sync with the address.",
      },
      {
        title: "Validation that respects its users",
        body: "A custom validation engine with Unicode-aware name rules, and Solana transaction-hash validation that explicitly rejects Ethereum hashes rather than accepting anything hex-shaped.",
      },
      {
        title: "Accessibility through the conversion path",
        body: "Full ARIA wiring, managed focus on step transitions, and prefers-reduced-motion honoured — the payment path is where accessibility matters most and usually gets it least.",
      },
      {
        title: "One-flag maintenance mode",
        body: "A single config flag swaps the entire application for a branded countdown page, no deploy gymnastics required.",
      },
    ],
    stack: {
      Core: ["React 19", "TypeScript 5.8", "Vite 7", "React Router 7"],
      UI: ["Tailwind CSS v4", "DaisyUI", "Motion 12", "Swiper", "lucide-react"],
      Platform: ["Turborepo 2.5", "pnpm 10", "Vercel"],
      Analytics: ["Vercel Analytics", "PostHog", "GA4"],
    },
    links: [],
  },

  {
    id: "sentinel-finance",
    index: "09",
    name: "Sentinel Finance",
    subtitle: "Decentralised commerce & NFT-backed lending",
    kind: "Web3 dApp",
    role: "Developer",
    period: "Earlier work",
    domain: "DeFi · smart contracts",
    accent: "rose",
    featured: false,
    summary:
      "A decentralised world of commerce where you can buy, sell, take loans against assets, insure your NFTs, earn and source anything safely — removing counterparty scam risk from the transaction entirely.",
    problem:
      "Peer-to-peer digital commerce depends on trusting a stranger. Settlement guarantees enforced by a contract remove the need for that trust.",
    approach:
      "Solidity contracts handle lending, insurance and settlement on-chain, with a React front end wrapping the contract interactions in a flow non-crypto-native users can follow.",
    metrics: [
      { value: "On-chain", label: "Settlement" },
      { value: "EVM", label: "Target chain" },
    ],
    highlights: [
      {
        title: "Contract-enforced settlement",
        body: "Trade, loan and insurance outcomes are settled by contract logic rather than counterparty goodwill.",
      },
      {
        title: "NFT-collateralised lending",
        body: "Borrowers draw liquidity against NFT holdings, with insurance available against the collateral position.",
      },
    ],
    stack: {
      Contracts: ["Solidity", "EVM"],
      Frontend: ["JavaScript", "HTML", "CSS"],
    },
    imageSrc: "/sentfi.jpg",
    links: [
      { label: "Live", href: "https://senti-fi-loan.vercel.app/", type: "live" },
      {
        label: "Source",
        href: "https://github.com/Knowledge-JO/sentiFiLoan",
        type: "github",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const accentMap = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan/40",
    bg: "bg-neon-cyan",
    glow: "shadow-[0_0_40px_-10px_rgba(0,229,255,0.65)]",
    from: "from-neon-cyan/25",
    rgb: "0,229,255",
  },
  magenta: {
    text: "text-neon-magenta",
    border: "border-neon-magenta/40",
    bg: "bg-neon-magenta",
    glow: "shadow-[0_0_40px_-10px_rgba(255,43,214,0.65)]",
    from: "from-neon-magenta/25",
    rgb: "255,43,214",
  },
  ice: {
    text: "text-neon-ice",
    border: "border-neon-ice/40",
    bg: "bg-neon-ice",
    glow: "shadow-[0_0_40px_-10px_rgba(125,249,255,0.55)]",
    from: "from-neon-ice/25",
    rgb: "125,249,255",
  },
  violet: {
    text: "text-neon-violet",
    border: "border-neon-violet/40",
    bg: "bg-neon-violet",
    glow: "shadow-[0_0_40px_-10px_rgba(157,92,255,0.65)]",
    from: "from-neon-violet/25",
    rgb: "157,92,255",
  },
  lime: {
    text: "text-neon-lime",
    border: "border-neon-lime/40",
    bg: "bg-neon-lime",
    glow: "shadow-[0_0_40px_-10px_rgba(198,255,61,0.6)]",
    from: "from-neon-lime/25",
    rgb: "198,255,61",
  },
  amber: {
    text: "text-neon-amber",
    border: "border-neon-amber/40",
    bg: "bg-neon-amber",
    glow: "shadow-[0_0_40px_-10px_rgba(255,181,46,0.6)]",
    from: "from-neon-amber/25",
    rgb: "255,181,46",
  },
  rose: {
    text: "text-neon-rose",
    border: "border-neon-rose/40",
    bg: "bg-neon-rose",
    glow: "shadow-[0_0_40px_-10px_rgba(255,92,138,0.6)]",
    from: "from-neon-rose/25",
    rgb: "255,92,138",
  },
};
