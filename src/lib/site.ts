export const siteConfig = {
  name: "Einvoicify",
  legalName: "Einvoicify",
  tagline: "E-Invoicing Made Simple | Malaysia",
  description:
    "Simple e-invoicing for Malaysian businesses. Stay compliant with LHDN, send invoices faster, and choose the way of working that fits your team — portal, file upload, or API.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://einvoicify.my",
  productUrl: process.env.NEXT_PUBLIC_PRODUCT_URL ?? "https://app.einvoicify.my",
  contact: {
    email: "info@einvoicify.my",
    phone: "+6016-338-1871",
    phoneHref: "tel:+60163381871",
    address: {
      line1: "E3A05 Capital 5, Oasis Square",
      line2: "No. 2, Jalan PJU 1A/7A, Oasis Damansara",
      city: "47301 Petaling Jaya, Selangor D.E.",
      country: "Malaysia",
      full: "E3A05 Capital 5, Oasis Square, No. 2, Jalan PJU 1A/7A, Oasis Damansara, 47301 Petaling Jaya, Selangor D.E., Malaysia",
    },
  },
  social: {},
  nav: [
    { label: "Solutions", href: "/#solutions" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Cases", href: "/case-studies" },
    { label: "Product", href: "/product" },
    { label: "Compliance", href: "/compliance" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** Three ways customers use Einvoicify — plain language */
export const solutions = [
  {
    id: "portal",
    number: "01",
    title: "Portal access",
    shortTitle: "Portal",
    headline: "Log in and manage invoices online",
    description:
      "Use our easy web portal to create, send, and track e-invoices. Ideal for finance teams who want a clear screen and simple steps — no IT project required to get started.",
    bestFor: "SMEs, finance teams, first-time e-invoice users",
    points: [
      "Create and send invoices from a simple dashboard",
      "See which invoices are accepted or need attention",
      "Email invoices to customers automatically",
      "Works on desktop — no special software to install",
    ],
    cta: { label: "Try the portal", href: "https://app.einvoicify.my" },
    icon: "monitor" as const,
  },
  {
    id: "sftp",
    number: "02",
    title: "Upload documents via SFTP",
    shortTitle: "SFTP upload",
    headline: "Drop files — we handle the rest",
    description:
      "Already export invoices from your accounting system as files? Securely upload them (SFTP) in bulk. We process the batch and submit e-invoices for you — perfect for high volume without changing how staff work day to day.",
    bestFor: "Busy teams with regular invoice file exports",
    points: [
      "Upload invoice files securely in bulk",
      "Scheduled or on-demand batches",
      "Fewer manual portal clicks for large volumes",
      "Works alongside your existing export process",
    ],
    cta: { label: "Ask about SFTP setup", href: "/contact" },
    icon: "upload" as const,
  },
  {
    id: "api",
    number: "03",
    title: "API as a service",
    shortTitle: "API",
    headline: "Connect your systems automatically",
    description:
      "Link your ERP, POS, or custom software so e-invoices are created and submitted in the background. Best when you want full automation and minimal manual work as your business grows.",
    bestFor: "Larger businesses and companies with IT support",
    points: [
      "Connect ERP, POS, or custom systems",
      "Invoices flow automatically after sales",
      "Real-time status back to your team",
      "Scales as your invoice volume grows",
    ],
    cta: { label: "Talk to our team", href: "/contact" },
    icon: "link" as const,
  },
] as const;

export const useCases = [
  {
    title: "Retail & multi-outlet",
    story:
      "Head office needs one place to see e-invoice status across all stores — without asking every outlet to type into a government portal.",
    outcome: "Bulk upload or system link; less weekend catch-up for finance.",
  },
  {
    title: "Manufacturing & wholesale",
    story:
      "Hundreds of invoices leave the ERP every week. Re-typing them is slow and error-prone.",
    outcome: "API or file feed turns ERP invoices into compliant e-invoices.",
  },
  {
    title: "Professional services & SMEs",
    story:
      "Partners raise invoices occasionally and need something simple that still meets LHDN rules.",
    outcome: "Portal access — create, send, and track without a big IT project.",
  },
  {
    title: "Healthcare & clinics",
    story:
      "Billing lives in clinical software; finance still needs LHDN-ready documents for corporate clients.",
    outcome: "Connect systems or upload exports so teams stay in their tools.",
  },
] as const;

export const plainBenefits = [
  {
    title: "Stay on the right side of LHDN",
    description:
      "Built for Malaysia’s e-invoice requirements so your team spends less time worrying about compliance rules.",
  },
  {
    title: "Save hours every week",
    description:
      "Less re-typing, less chasing status, fewer rejected invoices — finance can focus on the business.",
  },
  {
    title: "Pick what fits your team",
    description:
      "Start with the portal, move to file upload, or go fully automated with API when you are ready.",
  },
  {
    title: "Local support you can call",
    description:
      "Malaysia-based team at Oasis Damansara — we help with onboarding, questions, and rollout planning.",
  },
] as const;

export const simpleSteps = [
  {
    step: "1",
    title: "Tell us how you invoice today",
    description:
      "Spreadsheet, accounting software, ERP, or paper-heavy process — we match a simple path for your size.",
  },
  {
    step: "2",
    title: "Choose portal, upload, or API",
    description:
      "We set you up on the option that fits: easy web portal, secure file upload, or system connection.",
  },
  {
    step: "3",
    title: "Send e-invoices with confidence",
    description:
      "Track status, email customers, and keep records tidy — with far less manual work.",
  },
] as const;

export const integrations = [
  { name: "SAP", category: "Enterprise ERP" },
  { name: "Microsoft Dynamics", category: "Enterprise ERP" },
  { name: "Oracle NetSuite", category: "Cloud ERP" },
  { name: "QAD", category: "Manufacturing ERP" },
  { name: "Navision", category: "Enterprise ERP" },
  { name: "Syspro", category: "Manufacturing ERP" },
  { name: "Sage", category: "Accounting" },
  { name: "SQL Accounting", category: "Accounting" },
  { name: "Tally", category: "Accounting" },
  { name: "Medic", category: "Healthcare" },
  { name: "Wallet", category: "Retail / POS" },
  { name: "Kingdee", category: "Enterprise ERP" },
  { name: "Plato", category: "Accounting" },
  { name: "Epicor", category: "Enterprise ERP" },
  { name: "AutoCount", category: "Accounting" },
  { name: "Custom API / CSV", category: "Integration" },
] as const;

export const lhdnPhases = [
  {
    phase: "Phase 1",
    turnover: "Above RM100 million",
    date: "1 August 2024",
    status: "Live",
  },
  {
    phase: "Phase 2",
    turnover: "RM25m – RM100m",
    date: "1 January 2025",
    status: "Live",
  },
  {
    phase: "Phase 3",
    turnover: "RM5m – RM25m",
    date: "1 July 2025",
    status: "Live",
  },
  {
    phase: "Phase 4",
    turnover: "RM1m – RM5m",
    date: "1 January 2026",
    status: "Live (relaxation period applies)",
  },
] as const;

export const turnoverBands = [
  "Above RM100 million",
  "RM25m – RM100m",
  "RM5m – RM25m",
  "RM1m – RM5m",
  "Below RM1 million",
  "Not sure",
] as const;

export const monthlyInvoiceBands = [
  "Under 100",
  "100 – 500",
  "500 – 2,000",
  "2,000 – 10,000",
  "Over 10,000",
] as const;

export const chatTopics = [
  "Pricing inquiry",
  "Portal access",
  "SFTP upload",
  "API connection",
  "LHDN compliance",
  "Product demo",
  "Other",
] as const;

export const caseStudies = [
  {
    slug: "manufacturing-erp-automation",
    industry: "Manufacturing",
    company: "Mid-sized manufacturer · Selangor",
    title: "From weekend portal work to automatic e-invoices",
    summary:
      "A manufacturing team processing thousands of invoices monthly stopped re-typing into the government portal by connecting their ERP to Einvoicify.",
    challenge:
      "Finance staff spent many hours each week re-keying invoices. Errors caused delays and customer delivery lagged.",
    solution:
      "We linked their ERP so invoices flow automatically, get checked, submitted, and emailed to customers.",
    results: [
      { label: "Manual portal time", value: "Much less" },
      { label: "Accepted first time", value: "Very high" },
      { label: "Customer receives invoice", value: "Minutes" },
      { label: "Monthly invoices", value: "4,000+" },
    ],
    quote:
      "We stopped treating e-invoice as a separate project. It became part of normal month-end — quiet and reliable.",
    quoteRole: "Finance Controller",
    tags: ["ERP link", "High volume", "Manufacturing"],
  },
  {
    slug: "retail-multi-outlet-consolidated",
    industry: "Retail",
    company: "Multi-outlet retail chain · Klang Valley",
    title: "One process for 28 outlets — stores kept selling",
    summary:
      "A retail group needed e-invoice compliance without changing every store’s day-to-day sales system.",
    challenge:
      "Invoice data was scattered. Head office struggled to know what was submitted and what still needed attention.",
    solution:
      "Nightly file uploads and clear rules for when to use individual vs consolidated e-invoices — managed from one place.",
    results: [
      { label: "Outlets covered", value: "28" },
      { label: "Finance time freed", value: "Meaningful" },
      { label: "Store disruption", value: "None" },
      { label: "Visibility", value: "One dashboard" },
    ],
    quote:
      "Our stores kept selling. Head office finally had one view of every e-invoice status.",
    quoteRole: "Head of Finance",
    tags: ["Retail", "File upload", "Multi-outlet"],
  },
  {
    slug: "professional-services-built-in-module",
    industry: "Professional services",
    company: "Advisory & consulting firm · KL",
    title: "Live on e-invoice in days with the portal",
    summary:
      "A growing firm without a big ERP used Einvoicify’s portal to issue compliant invoices quickly.",
    challenge:
      "Word and spreadsheet invoices could not meet LHDN requirements. Partners needed something simple.",
    solution:
      "Portal access with simple invoice entry, automatic submission, and branded email to clients.",
    results: [
      { label: "Go-live", value: "~2 weeks" },
      { label: "Partner training", value: "1 session" },
      { label: "Client delivery", value: "Automatic" },
      { label: "IT project size", value: "Small" },
    ],
    quote:
      "We did not need a six-month software programme. We needed invoices our clients receive the same day.",
    quoteRole: "Managing Partner",
    tags: ["SME", "Portal", "Fast start"],
  },
  {
    slug: "healthcare-multi-system-integration",
    industry: "Healthcare",
    company: "Private healthcare group · Malaysia",
    title: "Clinical billing and finance finally aligned",
    summary:
      "A healthcare operator connected clinical billing with finance so corporate invoices met e-invoice rules without double entry.",
    challenge:
      "Incomplete buyer details caused rejections and slowed corporate billing cycles.",
    solution:
      "System connection to enrich data, submit e-invoices, and keep a clear trail for audit and collections.",
    results: [
      { label: "Double entry", value: "Reduced" },
      { label: "Rejection issues", value: "Down sharply" },
      { label: "Billing cycle", value: "Faster" },
      { label: "Audit trail", value: "Clearer" },
    ],
    quote:
      "Compliance stopped being a fire drill between operations and finance.",
    quoteRole: "Group CFO",
    tags: ["Healthcare", "System link", "API"],
  },
] as const;

export const productHighlights = [
  {
    title: "Simple dashboard",
    description:
      "See invoice status clearly — accepted, pending, or needs a fix.",
  },
  {
    title: "Works with your tools",
    description:
      "Portal alone, file upload, or connect ERP and accounting systems.",
  },
  {
    title: "Customer delivery",
    description:
      "Send invoices to customers by email after they are ready.",
  },
  {
    title: "Malaysia-ready",
    description:
      "Designed around LHDN e-invoice requirements for local businesses.",
  },
] as const;

/** Technical — used on /compliance, not homepage */
export const ublTechSpecs = {
  standard: "UBL 2.1",
  standardFull: "Universal Business Language (UBL) 2.1 — OASIS",
  formats: ["XML", "JSON"],
  model: "Continuous Transaction Control (CTC)",
  platform: "MyInvois (IRBM / LHDN)",
  channels: ["MyInvois API", "MyInvois Portal"],
  mandatoryFieldsNote: "Structured mandatory & optional fields per IRBM annexures",
  validation: "IRBM validation · UUID · digitally signed response",
  qr: "QR code for authenticity verification",
  retention: "Long-term e-Invoice retention for audit readiness",
} as const;

export const myInvoisDocTypes = [
  {
    code: "01",
    name: "Invoice",
    description: "Standard supplier-issued commercial invoice submitted to MyInvois.",
  },
  {
    code: "02",
    name: "Credit Note",
    description: "Adjusts a previously validated invoice (returns, discounts, corrections).",
  },
  {
    code: "03",
    name: "Debit Note",
    description: "Increases amounts linked to a prior invoice when additional charges apply.",
  },
  {
    code: "04",
    name: "Refund Note",
    description: "Documents refunds in scenarios defined by IRBM guidelines.",
  },
  {
    code: "11+",
    name: "Self-billed",
    description: "Buyer-issued e-invoices where self-billing rules apply.",
  },
] as const;

export const ublCoreElements = [
  {
    path: "cbc:ID",
    label: "e-Invoice code / number",
    note: "Your unique document number within the supplier system.",
  },
  {
    path: "cbc:InvoiceTypeCode",
    label: "Document type code",
    note: "e.g. 01 Invoice, 02 Credit Note — with listVersionID for e-Invoice version.",
  },
  {
    path: "cac:AccountingSupplierParty",
    label: "Supplier party",
    note: "TIN, registration identifiers, and address structured for IRBM validation.",
  },
  {
    path: "cac:AccountingCustomerParty",
    label: "Buyer party",
    note: "Buyer TIN / BRN and contact data required for valid submissions.",
  },
  {
    path: "cac:TaxTotal / cac:LegalMonetaryTotal",
    label: "Tax & monetary totals",
    note: "SST classifications, tax amounts, and payable totals must reconcile.",
  },
  {
    path: "cac:InvoiceLine",
    label: "Line items",
    note: "Classification codes, quantities, unit prices, and line tax detail.",
  },
] as const;

export const efficiencyStats = [
  {
    value: "3 ways",
    label: "to get started",
    detail: "Portal, SFTP upload, or API — pick what fits your team today.",
  },
  {
    value: "16+",
    label: "systems we connect",
    detail: "Popular ERP and accounting software used across Malaysia.",
  },
  {
    value: "Faster",
    label: "invoice cycle",
    detail: "Less re-typing and chasing — more time for real work.",
  },
  {
    value: "Local",
    label: "Malaysia support",
    detail: "Team based in Selangor — call or email when you need help.",
  },
] as const;

export const enterprisePillars = [
  {
    title: "LHDN-ready process",
    description:
      "Stay aligned with Malaysia e-invoice requirements without turning finance into an IT project.",
  },
  {
    title: "Handles busy months",
    description:
      "Whether you send dozens or thousands of invoices, choose the path that keeps pace.",
  },
  {
    title: "Portal · SFTP · API",
    description:
      "Three clear options — start simple and grow into automation when you need it.",
  },
  {
    title: "Clear status tracking",
    description:
      "Know what was sent, what was accepted, and what needs a quick fix.",
  },
  {
    title: "Fewer avoidable errors",
    description:
      "Checks before submission help reduce rejected invoices and rework.",
  },
  {
    title: "Customers get invoices on time",
    description:
      "Optional automatic email delivery after invoices are ready.",
  },
] as const;
