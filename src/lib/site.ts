export const siteConfig = {
  name: "Einvoicify",
  legalName: "Einvoicify",
  tagline: "E-Invoicing Made Simple | Malaysia",
  description:
    "LHDN MyInvois-compliant e-invoicing for Malaysian businesses. Automate invoice creation, IRBM validation, and customer delivery — integrated with 16+ ERP and accounting systems.",
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
  /** Primary header nav — keep short so the bar stays one line */
  nav: [
    { label: "Product", href: "/product" },
    { label: "Features", href: "/features" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Cases", href: "/case-studies" },
    { label: "Integrations", href: "/integrations" },
    { label: "Compliance", href: "/compliance" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** ERP / accounting systems supported for integration */
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

/** LHDN MyInvois implementation phases (indicative) */
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
  "Product demo",
  "Pricing inquiry",
  "ERP integration",
  "LHDN compliance",
  "Technical support",
  "Partnership",
  "Other",
] as const;

/** Professional case studies for Malaysian e-invoicing */
export const caseStudies = [
  {
    slug: "manufacturing-erp-automation",
    industry: "Manufacturing",
    company: "Mid-sized manufacturer · Selangor",
    title: "From manual IRBM portal uploads to fully automated MyInvois",
    summary:
      "A manufacturing group processing 4,000+ invoices monthly eliminated weekend portal catch-up by connecting SAP to Einvoicify and automating validation, submission, and customer email.",
    challenge:
      "Finance staff spent 15–20 hours per week re-keying invoices into the MyInvois portal. Rejection rates climbed when tax codes or buyer TINs were incomplete, and customer delivery lagged validation by days.",
    solution:
      "Einvoicify mapped SAP billing output to LHDN schema, enforced pre-submission validation, auto-retried transient failures, and emailed validated e-invoices with UUID/QR references to buyers.",
    results: [
      { label: "Manual portal time", value: "−92%" },
      { label: "First-pass validation", value: "99.4%" },
      { label: "Time to customer delivery", value: "< 2 min" },
      { label: "Monthly invoices automated", value: "4,200+" },
    ],
    quote:
      "We stopped treating e-invoice as a separate project. It became part of month-end close — quiet, reliable, and auditable.",
    quoteRole: "Finance Controller",
    tags: ["SAP", "Automation", "Phase 2"],
  },
  {
    slug: "retail-multi-outlet-consolidated",
    industry: "Retail",
    company: "Multi-outlet retail chain · Klang Valley",
    title: "Consolidated e-invoicing across 28 outlets without disrupting POS",
    summary:
      "A retail operator needed LHDN compliance for B2B wholesale and selected B2C scenarios without replacing their POS or central accounting stack.",
    challenge:
      "Outlet systems generated fragmented invoice data. Head office struggled to produce compliant consolidated documents and track which transactions required individual vs consolidated e-invoices.",
    solution:
      "Einvoicify ingested nightly sales extracts, applied classification rules, generated consolidated e-invoices where allowed, and submitted individual documents for wholesale customers via API.",
    results: [
      { label: "Outlets covered", value: "28" },
      { label: "Rejection queue depth", value: "Near zero" },
      { label: "Finance FTE freed", value: "1.5" },
      { label: "Compliance readiness", value: "Phase 3–4" },
    ],
    quote:
      "Our stores kept selling. Head office got one dashboard for every e-invoice status across the chain.",
    quoteRole: "Head of Finance",
    tags: ["Retail", "Consolidated e-Invoice", "SQL Accounting"],
  },
  {
    slug: "professional-services-built-in-module",
    industry: "Professional services",
    company: "Advisory & consulting firm · KL",
    title: "No ERP? Live on MyInvois in under two weeks with the invoicing module",
    summary:
      "A growing professional services firm without enterprise ERP used Einvoicify’s practical invoicing module to issue LHDN-compliant invoices from day one.",
    challenge:
      "Spreadsheets and Word templates could not produce valid e-invoices. The firm needed something simple for partners to raise invoices while remaining IRBM-ready.",
    solution:
      "Deployed Einvoicify’s built-in invoicing module with client master data, service classifications, and automated MyInvois submission plus branded email delivery.",
    results: [
      { label: "Go-live", value: "11 days" },
      { label: "Partner training", value: "1 session" },
      { label: "Validated invoices (Q1)", value: "100%" },
      { label: "Client email delivery", value: "Automated" },
    ],
    quote:
      "We did not need a six-month ERP programme. We needed compliant invoices that our clients receive the same day.",
    quoteRole: "Managing Partner",
    tags: ["SME", "Invoicing module", "Fast go-live"],
  },
  {
    slug: "healthcare-multi-system-integration",
    industry: "Healthcare",
    company: "Private healthcare group · Malaysia",
    title: "Unifying Medic and accounting for hospital e-invoice compliance",
    summary:
      "A private healthcare operator integrated clinical billing (Medic) with finance systems so patient and corporate invoices met MyInvois rules without double entry.",
    challenge:
      "Clinical and finance systems held partial buyer data. TIN validation failures and mismatched amounts created audit risk and delayed corporate billing cycles.",
    solution:
      "Einvoicify became the integration layer: enrich buyer TIN/BRN, map service codes, submit documents, and sync UUIDs back for audit and AR matching.",
    results: [
      { label: "Systems connected", value: "Medic + finance" },
      { label: "TIN validation errors", value: "−87%" },
      { label: "Corporate billing cycle", value: "3 days faster" },
      { label: "Audit trail", value: "End-to-end" },
    ],
    quote:
      "Compliance stopped being a fire drill between clinical ops and finance. One pipeline, one source of truth.",
    quoteRole: "Group CFO",
    tags: ["Healthcare", "Medic", "Integration"],
  },
] as const;

export const productHighlights = [
  {
    title: "Live MyInvois operations",
    description:
      "Submit, track, and resolve e-invoices with real-time IRBM status — from draft to validated UUID.",
  },
  {
    title: "ERP-ready connectors",
    description:
      "16+ ERP and accounting platforms already automated, plus API and file-based options for custom stacks.",
  },
  {
    title: "Built-in invoicing",
    description:
      "Raise compliant invoices in-product when you do not yet have an ERP, or for edge document types.",
  },
  {
    title: "Customer delivery",
    description:
      "Automatically email validated e-invoices with the references buyers and auditors expect.",
  },
] as const;

/**
 * LHDN / IRBM MyInvois technical facts (indicative for marketing UI).
 * Source references: IRBM e-Invoice Guideline, MyInvois SDK (sdk.myinvois.hasil.gov.my).
 * Always verify latest rules on official LHDN channels.
 */
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

/** MyInvois document type codes (common set) */
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
    description: "Buyer-issued e-invoices where self-billing rules apply (e.g. certain purchases).",
  },
] as const;

/** Key UBL / MyInvois payload concepts for enterprise buyers */
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

/** Efficiency outcomes to emphasise on the homepage (illustrative enterprise KPIs) */
export const efficiencyStats = [
  {
    value: "Seconds",
    label: "Submit → IRBM response",
    detail: "Near real-time MyInvois validation instead of end-of-month portal catch-up.",
  },
  {
    value: "16+",
    label: "ERP / accounting systems",
    detail: "Connect SAP, Dynamics, NetSuite, Sage, SQL Accounting, Tally, Medic & more.",
  },
  {
    value: "UBL 2.1",
    label: "XML & JSON native",
    detail: "Payloads aligned to OASIS UBL 2.1 as required by MyInvois SDK guidance.",
  },
  {
    value: "−90%+",
    label: "Manual effort reduction",
    detail: "Automate mapping, validation retries, UUID capture, and customer email delivery.",
  },
] as const;

/** Enterprise-style capability pillars (inspired by market leaders, Einvoicify-specific) */
export const enterprisePillars = [
  {
    title: "100% LHDN MyInvois alignment",
    description:
      "Document models, validation workflows, and status handling designed around IRBM e-Invoice rules — reduce rejection risk and stay audit-ready.",
  },
  {
    title: "High-volume batch efficiency",
    description:
      "Process large invoice batches from ERP or file feeds without re-keying into the portal. Scale from hundreds to thousands of documents.",
  },
  {
    title: "API · SFTP · Excel/CSV integration",
    description:
      "Flexible connection paths: real-time API, secure file transfer, or standardised spreadsheets — match your IT maturity and volume.",
  },
  {
    title: "Real-time status tracking",
    description:
      "See submitted, valid, invalid, and cancelled states with IRBM UUID references in one operations console.",
  },
  {
    title: "Pre-submission validation",
    description:
      "Catch missing TIN, tax codes, and structural UBL issues before they become MyInvois rejections.",
  },
  {
    title: "Automated customer delivery",
    description:
      "Email validated e-invoices with the references buyers need — cut dispatch labour and follow-up delays.",
  },
] as const;
