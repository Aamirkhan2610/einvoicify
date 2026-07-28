# Deploy Einvoicify for client demo (free)

## GitHub

**Repo:** https://github.com/Aamirkhan2610/einvoicify

---

## Recommended free host: Vercel (Next.js)

### 1. Import the repo

1. Open [https://vercel.com/new](https://vercel.com/new)
2. Sign in with **GitHub**
3. Import **Aamirkhan2610/einvoicify**
4. Framework: **Next.js** (auto-detected)

### 2. Environment variables (Project → Settings → Environment Variables)

| Name | Value | Notes |
|------|--------|--------|
| `DATABASE_URL` | See below | Required for CRM/chat |
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` | Set after first deploy |
| `NEXT_PUBLIC_PRODUCT_URL` | `https://app.einvoicify.my` | Product demo link |
| `CRM_ADMIN_EMAIL` | `admin@einvoicify.my` | CRM login |
| `CRM_ADMIN_PASSWORD` | *strong password* | Change for client demo |
| `CRM_ADMIN_NAME` | `Einvoicify Admin` | Display name |
| `CRM_AUTH_SECRET` | *long random string* | Session signing |

### 3. Free database (required for CRM)

SQLite does **not** persist on Vercel serverless. Use a free Postgres:

#### Option A — Neon (recommended, free)

1. [https://console.neon.tech](https://console.neon.tech) → create project
2. Copy the connection string
3. In this repo, temporarily switch Prisma to Postgres:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Set `DATABASE_URL` in Vercel to the Neon string  
5. Redeploy (Vercel runs `prisma generate` via `postinstall` / build)

> **Tip:** Keep a `schema.sqlite.prisma` backup for local SQLite, or use one Neon DB for both local and production.

#### Option B — Turso / other free SQL

Same idea: set `DATABASE_URL` to a remote database and match Prisma `provider`.

### 4. Deploy

Click **Deploy**. After success, open the `*.vercel.app` URL and share with your client.

**CRM:** `https://your-app.vercel.app/crm/login`

---

## One-click alternative: Render

1. [https://render.com](https://render.com) → New → Web Service  
2. Connect GitHub repo `einvoicify`  
3. Build: `npm install && npx prisma generate && npx prisma db push && npm run build`  
4. Start: `npm start`  
5. Add the same env vars as above  

Render free tier spins down after idle; first load may be slow.

---

## Local CRM credentials (development)

| Field | Value |
|-------|--------|
| URL | http://localhost:3000/crm/login |
| Email | `admin@einvoicify.my` |
| Password | `einvoicify2026` |

Change these before sharing a production demo URL.
