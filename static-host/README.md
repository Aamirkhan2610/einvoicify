# Einvoicify — Windows / IIS static host package

Deploy this **entire `static-host/` folder** to Hanventure (or any Windows IIS host with **PHP 8+** and **SQLite / PDO_SQLITE**).

**Domain & hosting stay with Hanventure.** You only replace website files.

---

## What you get

| Area | Implementation |
|------|----------------|
| Marketing site | PHP + HTML/CSS/JS (same look: red/blue/navy, logo, layout) |
| Contact + demo forms | `api/contact.php`, `api/demo.php` → SQLite |
| Chat widget | Bottom-right widget → `api/chat.php` |
| CRM | `/crm/` dashboard, leads, live chat reply |
| Database | SQLite file at `data/einvoicify.sqlite` (auto-created) |

**No Node.js required on the server.**

---

## Requirements on hosting

1. **PHP 8.0+** (8.1/8.2 preferred)
2. Extensions: **pdo_sqlite**, **json**, **mbstring** (usually default)
3. **Write permission** on the `data/` folder (so SQLite can be created)
4. Default document: `index.php` (included in `web.config`)

Ask Hanventure support if unsure: *“Is PHP with PDO SQLite enabled, and can the site write to a data folder?”*

---

## Deploy steps (FTP / Plesk / File Manager)

1. Back up the current `www.iosmalaysia.com` files.
2. Upload **all contents** of `static-host/` to the site root (or a staging folder first).
3. Ensure `data/` is **writable** by the app pool / PHP user (e.g. Modify permission on IIS).
4. Edit credentials in `includes/config.php`:

```php
define('CRM_ADMIN_EMAIL', 'admin@einvoicify.my');
define('CRM_ADMIN_PASSWORD', 'change-this-password');
define('CRM_AUTH_SECRET', 'long-random-secret-string-here');
define('CRM_ADMIN_NAME', 'Einvoicify Admin');
```

5. If the site is **not** at domain root, set:

```php
define('BASE_PATH', '/your-subfolder');
```

6. Open:

- Website: `https://www.iosmalaysia.com/`
- CRM: `https://www.iosmalaysia.com/crm/login.php`

### Default CRM login (change immediately)

| Field | Value |
|-------|--------|
| Email | `admin@einvoicify.my` |
| Password | `einvoicify2026` |

---

## Local test (Mac/Linux)

```bash
cd static-host
php -S localhost:8080
```

Open http://localhost:8080 and http://localhost:8080/crm/login.php

---

## File map

```
static-host/
├── index.php                 # Home
├── about/ services/ product/ case-studies/ contact/ …
├── assets/css/site.css
├── assets/js/{site,chat,contact-form,crm}.js
├── assets/img/               # logo, favicons
├── api/contact.php demo.php chat.php
├── api/crm/                  # login, leads, chats, stats
├── crm/                      # CRM UI
├── data/                     # SQLite (writable)
├── includes/                 # config, db, header, footer
├── web.config                # IIS defaults
└── README.md
```

---

## Notes for client / Cds

- **Hosting provider does not change** (Hanventure).
- **Domain does not change**.
- This is an **HTML/PHP website** suitable for Windows shared hosting — not the Node/Next.js stack.
- Product app remains at **https://app.einvoicify.my** (separate system).
- CRM stores leads and chats **on this host** in SQLite under `data/`.

---

## Security checklist before go-live

- [ ] Change `CRM_ADMIN_PASSWORD` and `CRM_AUTH_SECRET`
- [ ] Confirm `data/` is not publicly downloadable (web.config / .htaccess included)
- [ ] Prefer HTTPS if the host provides a certificate
- [ ] Remove any old ASP.NET pages that conflict with the new structure
