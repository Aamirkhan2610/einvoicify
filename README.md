# Einvoicify — Malaysia LHDN e-Invoice Platform (Website + CRM)

Modern marketing site and basic CRM for **[Einvoicify](https://einvoicify.my)** — LHDN MyInvois e-invoicing for Malaysian businesses.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · Prisma · SQLite (default) · Zod

**Live product:** [https://app.einvoicify.my](https://app.einvoicify.my)

---

## Features

### Public website
- Professional multi-page site: Home, Product, Features, How It Works, Case Studies, Integrations, Compliance, Contact
- Brand logo and red / blue / navy design system
- **Product showcase** on homepage with demo link to `app.einvoicify.my`
- **Case studies** for manufacturing, retail, professional services, and healthcare
- Floating **chat widget** for product, pricing, and support inquiries
- Contact / demo forms with validation and CRM persistence
- SEO metadata, responsive layout, accessible navigation

### CRM (`/crm`)
- Admin login (cookie session)
- Dashboard: lead counts, open chats, recent activity
- Leads: enquiries (incl. price/product) + demo requests with status updates
- Chats: reply to website conversations in real time

---

## Quick start

```bash
cd einvoicify
npm install
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### CRM login (local default)

| Field    | Value                 |
|----------|-----------------------|
| URL      | `/crm/login`          |
| Email    | `admin@einvoicify.my` |
| Password | `einvoicify2026`      |

Change credentials in `.env` for any shared or production environment.

---

## Environment

Copy `.env.example` → `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_PRODUCT_URL="https://app.einvoicify.my"
CRM_ADMIN_EMAIL="admin@einvoicify.my"
CRM_ADMIN_PASSWORD="einvoicify2026"
CRM_ADMIN_NAME="Einvoicify Admin"
CRM_AUTH_SECRET="generate-a-long-random-secret"
```

SQLite is the default (no Docker). For PostgreSQL, set `provider = "postgresql"` in `prisma/schema.prisma` and use a Postgres `DATABASE_URL` (see `docker-compose.yml`).

---

## Project structure

```
einvoicify/
├── prisma/schema.prisma
├── public/logo.png
├── src/
│   ├── app/
│   │   ├── api/chat|contact|demo|subscribe|crm/
│   │   ├── product|case-studies|features|…
│   │   ├── crm/           # Dashboard, leads, chats, login
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── chat/          # Chat widget
│   │   ├── crm/
│   │   ├── forms/
│   │   ├── home/          # Hero, product showcase, case studies…
│   │   └── layout/
│   └── lib/               # site config, auth, prisma, validations
└── package.json
```

---

## Scripts

| Command            | Description                |
|--------------------|----------------------------|
| `npm run dev`      | Development server         |
| `npm run build`    | Production build           |
| `npm run start`    | Start production server    |
| `npm run db:push`  | Sync Prisma schema to DB   |
| `npm run db:studio`| Prisma Studio              |

---

## Company content (from einvoicify.my)

- **Tagline:** Complete e-invoice effortlessly with Einvoicify
- **Focus:** Simplifying e-invoicing for Malaysian businesses · LHDN compliance
- **Integrations:** 16+ ERP/accounting systems (SAP, Dynamics, NetSuite, Sage, SQL, Tally, Medic, …)
- **Contact:** E3A05 Capital 5, Oasis Square, Oasis Damansara · +6016-338-1871 · info@einvoicify.my
