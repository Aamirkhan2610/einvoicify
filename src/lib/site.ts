/**
 * Site content — Einvoicify product + company details from
 * Integrated Operation Solutions Sdn. Bhd. (iosmalaysia.com)
 */

export const siteConfig = {
  name: "Einvoicify",
  legalName: "Integrated Operation Solutions Sdn. Bhd.",
  registrationNo: "947729-A",
  shortCompany: "IOS",
  companyBrand: "IOS Malaysia",
  legacySite: "http://iosmalaysia.com",
  tagline: "E-Invoicing Made Simple | Malaysia",
  description:
    "Einvoicify by Integrated Operation Solutions (IOS) — LHDN e-invoice and QAD ERP partner in Malaysia. Portal, SFTP upload, or API. Oasis Damansara, Selangor.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://einvoicify.my",
  productUrl: process.env.NEXT_PUBLIC_PRODUCT_URL ?? "https://app.einvoicify.my",
  contact: {
    email: "info@einvoicify.my",
    generalEmail: "admin@iosmalaysia.com",
    phone: "+6016-338-1871",
    phoneHref: "tel:+60163381871",
    address: {
      line1: "Capital 5, Oasis Square",
      line2: "No. 2, Jalan PJU 1A/7A, Oasis Damansara",
      city: "47301 Petaling Jaya, Selangor D.E.",
      country: "Malaysia",
      full: "Capital 5, Oasis Square, No. 2, Jalan PJU 1A/7A, Oasis Damansara, 47301 Petaling Jaya, Selangor D.E., Malaysia",
    },
  },
  people: [
    {
      name: "Christopher De Souza",
      email: "cds@iosmalaysia.com",
      phone: "+6016-338-1871",
      phoneHref: "tel:+60163381871",
      role: "Contact",
    },
    {
      name: "Johnny Lim",
      email: "johnnylim@iosmalaysia.com",
      phone: "+6016-332-8049",
      phoneHref: "tel:+60163328049",
      role: "Contact",
    },
  ],
  social: {},
  nav: [
    { label: "Solutions", href: "/#solutions" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Product", href: "/product" },
    { label: "Cases", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

/** Headline achievement from iosmalaysia.com home */
export const achievement = {
  title: "LHDN e-Invoice implementation achievement",
  quote:
    "23 ERP customers across 4 different ERP systems successfully adopted the IOS LHDN e-Invoice solution since 1 August — with over 10 more set to launch by leveraging our ePINTAR API middleware.",
  stats: [
    { value: "23+", label: "ERP customers live on e-invoice" },
    { value: "4", label: "Different ERP platforms" },
    { value: "10+", label: "More customers preparing to go live" },
    { value: "30+", label: "QAD implementations delivered" },
  ],
} as const;

/** WHY IOS and ePINTAR — from iosmalaysia.com (plain language) */
export const whyIos = [
  {
    title: "Compliance you can trust",
    description:
      "Our solutions are built for LHDN e-invoice requirements, with alignment to MDEC and PEPPOL-related connectivity where needed.",
  },
  {
    title: "Automatic updates",
    description:
      "When LHDN rules change, we update the platform so you stay current without a scramble every time guidelines shift.",
  },
  {
    title: "Works with your existing systems",
    description:
      "Designed to cater for QAD, SAP, Epicor, Sage, Syteline and other systems — so you are not forced into heavy customisation just to start e-invoicing.",
  },
  {
    title: "Operations continue as normal",
    description:
      "Your teams keep working the way they know. We fit e-invoice into the process instead of stopping the business for a long IT project.",
  },
  {
    title: "Ready for wider digital trade",
    description:
      "Through PEPPOL-accredited middleware (ePINTAR / PINTAR API), you can prepare for digital document exchange with enabled partners beyond local filing alone.",
  },
] as const;

/** Three ways customers use Einvoicify */
export const solutions = [
  {
    id: "portal",
    number: "01",
    title: "Portal access",
    shortTitle: "Portal",
    headline: "Log in and manage invoices online",
    description:
      "Use our easy web portal to create, send, and track e-invoices. Ideal for finance teams who want a clear screen and simple steps — no big IT project required to get started.",
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
      "Already export invoices from your accounting or ERP as files? Securely upload them (SFTP) in bulk. We process the batch and submit e-invoices for you — ideal for high volume without changing day-to-day work.",
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
      "Link your ERP, POS, or custom software so e-invoices are created and submitted in the background — including through our ePINTAR middleware approach used with IOS customers.",
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
    title: "Manufacturing & QAD users",
    story:
      "You already run QAD (or another ERP). Re-typing invoices into a government portal every week is slow and risky.",
    outcome:
      "IOS connects e-invoice to your ERP path — file, API, or hybrid — so production and finance keep moving.",
  },
  {
    title: "Retail & multi-outlet",
    story:
      "Head office needs one view of e-invoice status across stores without changing every outlet’s POS overnight.",
    outcome:
      "Bulk upload or system link; less weekend catch-up for finance.",
  },
  {
    title: "Professional services & SMEs",
    story:
      "Partners raise invoices occasionally and need something simple that still meets LHDN rules.",
    outcome:
      "Portal access — create, send, and track without a large IT project.",
  },
  {
    title: "Healthcare, electronics & automotive",
    story:
      "Industries IOS has long served with QAD need e-invoice that fits regulated and high-volume operations.",
    outcome:
      "Proven project approach: implement, train, integrate, and support after go-live.",
  },
] as const;

export const plainBenefits = [
  {
    title: "Stay on the right side of LHDN",
    description:
      "Built for Malaysia’s e-invoice mandate so your team spends less time worrying about rule changes.",
  },
  {
    title: "Save hours every week",
    description:
      "Less re-typing, less chasing status, fewer rejected invoices — finance focuses on the business.",
  },
  {
    title: "Pick what fits your team",
    description:
      "Start with the portal, move to file upload, or go fully automated with API when you are ready.",
  },
  {
    title: "Local partner you can call",
    description:
      "IOS team at Oasis Damansara — QAD and e-invoice experience, with named contacts for support.",
  },
] as const;

export const simpleSteps = [
  {
    step: "1",
    title: "Tell us how you invoice today",
    description:
      "Spreadsheet, accounting software, QAD/SAP/Sage, or mixed process — we map a simple path for your size.",
  },
  {
    step: "2",
    title: "Choose portal, upload, or API",
    description:
      "We set you up on the option that fits: easy web portal, secure file upload, or system connection (ePINTAR).",
  },
  {
    step: "3",
    title: "Go live with training & support",
    description:
      "IOS provides implementation, training, and ongoing support so your team is confident after launch.",
  },
] as const;

/** Company story — from About Us on iosmalaysia.com */
export const companyAbout = {
  intro:
    "Integrated Operation Solutions Sdn. Bhd. (IOS) is a QAD Services Partner in Malaysia. Our focus is successful QAD ERP implementation and LHDN e-invoice — including our Einvoicify product and ePINTAR middleware approach.",
  detail:
    "IOS provides full project implementation, training, customisation, integration, migration, upgrade, and maintenance for QAD ERP. We serve customers in medical, electronics, consumer products, food & beverage, rubber, and automotive industries.",
  experience:
    "Our consultants bring over 16 years of QAD experience. One of IOS’s founders was a pioneer QAD MFG/PRO consultant — implementing QAD for a rubber glove manufacturer in the early 1990s, then an UPS manufacturer — with more than 30 customers successfully implemented since.",
  extra:
    "We also offer disaster recovery (DR), web application development complementary to QAD, and extensions that meet local industry needs.",
  vision:
    "Our passion is providing innovative software solutions and services to all our customers.",
  mission:
    "To deliver professional services and ensuring quality within the range of services we provide — with local flavour and global standards that work for each client’s audience.",
} as const;

export const industriesServed = [
  "Medical",
  "Electronics",
  "Consumer products",
  "Food & beverage",
  "Rubber",
  "Automotive",
] as const;

/** Services from iosmalaysia.com/our-services.aspx */
export const iosServices = [
  "Project management & ERP consulting",
  "QAD business process design",
  "QAD implementation",
  "QAD assessments",
  "QAD upgrades",
  "QAD training",
  "QAD business intelligence",
  "QAD customisation",
  "QAD reporting",
  "QAD database tuning",
  "QAD workshops",
  "Disaster recovery (DR) services",
  "Add-on web applications",
  "LHDN e-invoice (Einvoicify / ePINTAR)",
] as const;

/** QAD product areas from iosmalaysia.com */
export const qadProducts = [
  {
    name: "QAD Financials",
    description:
      "Increase fiscal control and compliance with government mandates for regional and multi-national corporations.",
  },
  {
    name: "QAD Customer Management",
    description:
      "Improve responsiveness through better collaboration and management of customers and demand from pre- to post-sale.",
  },
  {
    name: "QAD Service & Support",
    description:
      "Manage installation, ongoing support, maintenance and repair — including warranty or service contracts — and track engineering resources.",
  },
  {
    name: "QAD Manufacturing",
    description:
      "Reduce cost and increase throughput with modern manufacturing scheduling and shop-floor tools.",
  },
  {
    name: "QAD Supply Chain",
    description:
      "Improve management of supply and suppliers through real-time collaboration.",
  },
  {
    name: "QAD Analytics",
    description:
      "Measure business performance in key areas for better decisions.",
  },
] as const;

export const integrations = [
  { name: "QAD", category: "Manufacturing ERP" },
  { name: "SAP", category: "Enterprise ERP" },
  { name: "Epicor", category: "Enterprise ERP" },
  { name: "Sage", category: "Accounting" },
  { name: "Syteline", category: "Manufacturing ERP" },
  { name: "Microsoft Dynamics", category: "Enterprise ERP" },
  { name: "Oracle NetSuite", category: "Cloud ERP" },
  { name: "SQL Accounting", category: "Accounting" },
  { name: "Tally", category: "Accounting" },
  { name: "AutoCount", category: "Accounting" },
  { name: "Medic", category: "Healthcare" },
  { name: "Custom API / CSV / SFTP", category: "Integration" },
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
  "API / ePINTAR",
  "QAD integration",
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
      "A manufacturing team processing thousands of invoices monthly stopped re-typing into the government portal by connecting their ERP through IOS e-invoice solutions.",
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
      "Portal alone, file upload, or connect QAD, SAP, Sage, Epicor, Syteline and more.",
  },
  {
    title: "Customer delivery",
    description:
      "Send invoices to customers by email after they are ready.",
  },
  {
    title: "Backed by IOS",
    description:
      "Implementation, training, and support from Integrated Operation Solutions in Selangor.",
  },
] as const;

/** Technical — used on /compliance */
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
    value: "23+",
    label: "customers live",
    detail: "ERP customers live on IOS LHDN e-invoice solutions.",
  },
  {
    value: "3 ways",
    label: "to get started",
    detail: "Portal, SFTP upload, or API — pick what fits your team.",
  },
  {
    value: "16+",
    label: "years QAD depth",
    detail: "Deep ERP experience across manufacturing industries.",
  },
  {
    value: "Local",
    label: "Malaysia support",
    detail: "Team based at Oasis Damansara, Selangor.",
  },
] as const;

export const enterprisePillars = whyIos;
