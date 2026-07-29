<?php
require_once __DIR__ . '/includes/config.php';
$pageTitle = SITE_NAME . ' — LHDN MyInvois e-Invoicing Malaysia';
$pageDescription = 'Einvoicify by Integrated Operation Solutions (IOS) — LHDN e-invoice and QAD ERP partner in Malaysia. Portal, SFTP upload, or API. Oasis Damansara, Selangor.';
$activeNav = 'solutions';
require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>

<section class="hero">
  <div class="hero-bg bg-hero-glow"></div>
  <div class="hero-bg bg-grid" style="opacity:.5"></div>
  <div class="container hero-inner">
    <div>
      <div class="badge-row">
        <span class="badge"><span class="dot-live"></span> Malaysia LHDN e-invoice</span>
        <span class="badge badge-blue"><?= h(COMPANY_BRAND) ?> · Oasis Damansara</span>
      </div>
      <h1>Send e-invoices the <span class="text-gradient">easy way</span></h1>
      <p class="hero-lead">
        <strong>Einvoicify</strong> is the e-invoice product from
        <strong><?= h(LEGAL_NAME) ?></strong> (<?= h(REGISTRATION_NO) ?>) — the same local team behind
        <a href="<?= h(LEGACY_SITE) ?>" target="_blank" rel="noopener noreferrer">iosmalaysia.com</a>.
        We help Malaysian businesses stay compliant without complicated steps.
      </p>
      <ul class="check-list">
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          By Integrated Operation Solutions (IOS) — QAD partner &amp; e-invoice specialist
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Three simple ways — portal, secure file upload, or API
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Trusted by ERP customers already live on LHDN e-invoice
        </li>
      </ul>
      <div class="hero-cta">
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Open free demo <?= icon_external() ?></a>
        <a href="#solutions" class="btn btn-outline btn-lg">See our 3 solutions <?= icon_arrow() ?></a>
      </div>
      <p class="hero-meta">
        Call <a href="<?= h(CONTACT_PHONE_HREF) ?>"><?= h(CONTACT_PHONE) ?></a> · <?= h(ADDRESS_LINE1) ?>, Oasis Damansara
      </p>
    </div>
    <div class="hero-card-wrap">
      <div class="hero-card-glow"></div>
      <div class="hero-card">
        <div class="hero-card-head"><p>A normal day with Einvoicify</p></div>
        <div class="hero-card-body">
          <div class="day-row">
            <div><p class="who">Finance · portal</p><p class="what">Creates and tracks invoices online before lunch</p></div>
            <span class="pill pill-green">Done</span>
          </div>
          <div class="day-row">
            <div><p class="who">Ops · SFTP upload</p><p class="what">Drops last night’s ERP export for bulk processing</p></div>
            <span class="pill pill-blue">Processing</span>
          </div>
          <div class="day-row">
            <div><p class="who">IT · API / ePINTAR</p><p class="what">Wholesale orders become e-invoices automatically</p></div>
            <span class="pill pill-violet">Auto</span>
          </div>
          <p class="hero-card-note">Same goal: compliant invoices, less manual work — from the IOS team you already know.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="achievement">
  <div class="container achievement-inner">
    <p class="eyebrow">LHDN e-Invoice implementation achievement</p>
    <blockquote>“23 ERP customers across 4 different ERP systems successfully adopted the IOS LHDN e-Invoice solution since 1 August — with over 10 more set to launch by leveraging our ePINTAR API middleware.”</blockquote>
    <div class="stat-grid">
      <div class="stat-card"><p class="value">23+</p><p class="label">ERP customers live on e-invoice</p></div>
      <div class="stat-card"><p class="value">4</p><p class="label">Different ERP platforms</p></div>
      <div class="stat-card"><p class="value">10+</p><p class="label">More customers preparing to go live</p></div>
      <div class="stat-card"><p class="value">30+</p><p class="label">QAD implementations delivered</p></div>
    </div>
  </div>
</section>

<section class="trust-bar">
  <div class="container">
    <p>Systems we work with · industries IOS serves</p>
    <div class="trust-systems">
      <span>QAD</span><span>SAP</span><span>Epicor</span><span>Sage</span><span>Syteline</span><span>Dynamics</span><span>SQL Accounting</span><span>Custom / SFTP</span>
    </div>
    <div class="trust-industries">
      <span class="chip">Medical</span><span class="chip">Electronics</span><span class="chip">Consumer products</span>
      <span class="chip">Food &amp; beverage</span><span class="chip">Rubber</span><span class="chip">Automotive</span>
    </div>
  </div>
</section>

<section class="section section-white" id="solutions">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">Three ways to work with us</p>
      <h2>Pick the solution that fits your team</h2>
      <p>You do not need to understand technical jargon. Start where you are today — many customers begin with the portal and add upload or API later.</p>
    </div>
    <div class="cards-3">
      <article class="card">
        <div class="card-head">
          <span class="card-num">Solution 01</span>
          <div class="card-icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
        </div>
        <h3>Portal access</h3>
        <p class="headline">Log in and manage invoices online</p>
        <p class="desc">Use our easy web portal to create, send, and track e-invoices. Ideal for finance teams who want a clear screen and simple steps — no big IT project required to get started.</p>
        <p class="best-for"><span>Best for:</span> SMEs, finance teams, first-time e-invoice users</p>
        <ul class="point-list">
          <li>Create and send invoices from a simple dashboard</li>
          <li>See which invoices are accepted or need attention</li>
          <li>Email invoices to customers automatically</li>
          <li>Works on desktop — no special software to install</li>
        </ul>
        <div class="card-cta"><a href="<?= h(PRODUCT_URL) ?>" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Try the portal <?= icon_external() ?></a></div>
      </article>
      <article class="card">
        <div class="card-head">
          <span class="card-num">Solution 02</span>
          <div class="card-icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div>
        </div>
        <h3>Upload documents via SFTP</h3>
        <p class="headline">Drop files — we handle the rest</p>
        <p class="desc">Already export invoices from your accounting or ERP as files? Securely upload them (SFTP) in bulk. We process the batch and submit e-invoices for you — ideal for high volume without changing day-to-day work.</p>
        <p class="best-for"><span>Best for:</span> Busy teams with regular invoice file exports</p>
        <ul class="point-list">
          <li>Upload invoice files securely in bulk</li>
          <li>Scheduled or on-demand batches</li>
          <li>Fewer manual portal clicks for large volumes</li>
          <li>Works alongside your existing export process</li>
        </ul>
        <div class="card-cta"><a href="<?= h(base_url('contact/')) ?>" class="btn btn-outline">Ask about SFTP setup <?= icon_arrow() ?></a></div>
      </article>
      <article class="card">
        <div class="card-head">
          <span class="card-num">Solution 03</span>
          <div class="card-icon"><svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
        </div>
        <h3>API as a service</h3>
        <p class="headline">Connect your systems automatically</p>
        <p class="desc">Link your ERP, POS, or custom software so e-invoices are created and submitted in the background — including through our ePINTAR middleware approach used with IOS customers.</p>
        <p class="best-for"><span>Best for:</span> Larger businesses and companies with IT support</p>
        <ul class="point-list">
          <li>Connect ERP, POS, or custom systems</li>
          <li>Invoices flow automatically after sales</li>
          <li>Real-time status back to your team</li>
          <li>Scales as your invoice volume grows</li>
        </ul>
        <div class="card-cta"><a href="<?= h(base_url('contact/')) ?>" class="btn btn-outline">Talk to our team <?= icon_arrow() ?></a></div>
      </article>
    </div>
    <div class="soft-panel">
      <h3>Not sure which option is right?</h3>
      <p>Tell us roughly how many invoices you send and what software you use today. We will recommend the simplest path — free consultation.</p>
      <div class="actions">
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Get a recommendation <?= icon_arrow() ?></a>
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Browse the product demo <?= icon_external() ?></a>
      </div>
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">Why IOS</p>
      <h2>Built for Malaysian businesses</h2>
      <p>From Integrated Operation Solutions (iosmalaysia.com): compliance, updates, system fit, and uninterrupted operations — explained in plain language.</p>
    </div>
    <div class="benefit-list">
      <div class="benefit-item"><span class="dot"></span><div><h3>Compliance you can trust</h3><p>Our solutions are built for LHDN e-invoice requirements, with alignment to MDEC and PEPPOL-related connectivity where needed.</p></div></div>
      <div class="benefit-item"><span class="dot"></span><div><h3>Automatic updates</h3><p>When LHDN rules change, we update the platform so you stay current without a scramble every time guidelines shift.</p></div></div>
      <div class="benefit-item"><span class="dot"></span><div><h3>Works with your existing systems</h3><p>Designed to cater for QAD, SAP, Epicor, Sage, Syteline and other systems — so you are not forced into heavy customisation just to start e-invoicing.</p></div></div>
      <div class="benefit-item"><span class="dot"></span><div><h3>Operations continue as normal</h3><p>Your teams keep working the way they know. We fit e-invoice into the process instead of stopping the business for a long IT project.</p></div></div>
      <div class="benefit-item"><span class="dot"></span><div><h3>Ready for wider digital trade</h3><p>Through PEPPOL-accredited middleware (ePINTAR / PINTAR API), you can prepare for digital document exchange with enabled partners beyond local filing alone.</p></div></div>
      <div class="benefit-item"><span class="dot"></span><div><h3>Local partner you can call</h3><p>IOS team at Oasis Damansara — QAD and e-invoice experience, with named contacts for support.</p></div></div>
    </div>
  </div>
</section>

<section class="section section-white">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">Who we help</p>
      <h2>Use cases from the field</h2>
    </div>
    <div class="cards-2">
      <article class="card card-white">
        <h3>Manufacturing &amp; QAD users</h3>
        <p class="desc">You already run QAD (or another ERP). Re-typing invoices into a government portal every week is slow and risky.</p>
        <p class="desc"><strong>Outcome:</strong> IOS connects e-invoice to your ERP path — file, API, or hybrid — so production and finance keep moving.</p>
      </article>
      <article class="card card-white">
        <h3>Retail &amp; multi-outlet</h3>
        <p class="desc">Head office needs one view of e-invoice status across stores without changing every outlet’s POS overnight.</p>
        <p class="desc"><strong>Outcome:</strong> Bulk upload or system link; less weekend catch-up for finance.</p>
      </article>
      <article class="card card-white">
        <h3>Professional services &amp; SMEs</h3>
        <p class="desc">Partners raise invoices occasionally and need something simple that still meets LHDN rules.</p>
        <p class="desc"><strong>Outcome:</strong> Portal access — create, send, and track without a large IT project.</p>
      </article>
      <article class="card card-white">
        <h3>Healthcare, electronics &amp; automotive</h3>
        <p class="desc">Industries IOS has long served with QAD need e-invoice that fits regulated and high-volume operations.</p>
        <p class="desc"><strong>Outcome:</strong> Proven project approach: implement, train, integrate, and support after go-live.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">How it works</p>
      <h2>Three simple steps</h2>
    </div>
    <div class="steps">
      <div class="step-card"><span class="step-num">1</span><h3>Tell us how you invoice today</h3><p>Spreadsheet, accounting software, QAD/SAP/Sage, or mixed process — we map a simple path for your size.</p></div>
      <div class="step-card"><span class="step-num">2</span><h3>Choose portal, upload, or API</h3><p>We set you up on the option that fits: easy web portal, secure file upload, or system connection (ePINTAR).</p></div>
      <div class="step-card"><span class="step-num">3</span><h3>Go live with training &amp; support</h3><p>IOS provides implementation, training, and ongoing support so your team is confident after launch.</p></div>
    </div>
  </div>
</section>

<section class="section section-white" id="product">
  <div class="container">
    <div class="two-col">
      <div>
        <div class="section-heading">
          <p class="eyebrow">See it live</p>
          <h2>Try the Einvoicify product</h2>
          <p>Explore the live app used for day-to-day e-invoicing. When you are ready, we help you choose portal, file upload, or API for your business.</p>
        </div>
        <ul class="highlight-list">
          <li><span class="dot"></span><div><p class="t">Simple dashboard</p><p class="d">See invoice status clearly — accepted, pending, or needs a fix.</p></div></li>
          <li><span class="dot"></span><div><p class="t">Works with your tools</p><p class="d">Portal alone, file upload, or connect QAD, SAP, Sage, Epicor, Syteline and more.</p></div></li>
          <li><span class="dot"></span><div><p class="t">Customer delivery</p><p class="d">Send invoices to customers by email after they are ready.</p></div></li>
          <li><span class="dot"></span><div><p class="t">Backed by IOS</p><p class="d">Implementation, training, and support from Integrated Operation Solutions in Selangor.</p></div></li>
        </ul>
        <div class="hero-cta">
          <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">Open product demo <?= icon_external() ?></a>
          <a href="<?= h(base_url('product/')) ?>" class="btn btn-outline btn-lg">Product overview <?= icon_arrow() ?></a>
        </div>
      </div>
      <div class="product-frame shine-border product-panel">
        <p class="label">Live demo</p>
        <p class="title">app.einvoicify.my</p>
        <p class="copy">Click through the product as a visitor. For pricing, SFTP setup, or API connection for your company, use the chat on this site or request a call — our team will guide you in plain language.</p>
        <div class="tag-row">
          <span class="tag">Portal</span><span class="tag">SFTP upload</span><span class="tag">API</span>
        </div>
      </div>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/widgets/lhdn-syntax.php'; ?>
<?php require __DIR__ . '/includes/widgets/case-impact.php'; ?>

<section class="cta-band">
  <div class="container">
    <div class="cta-box gradient-brand">
      <h2>Ready for easier e-invoicing?</h2>
      <p>Book a short call. We will recommend portal, SFTP upload, or API based on how your team works today — no jargon required.</p>
      <div class="cta-actions">
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-white btn-lg">Talk to us <?= icon_arrow() ?></a>
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">Try the demo <?= icon_external() ?></a>
      </div>
      <p class="cta-note">Prefer chat? Ask about pricing or which solution fits you.</p>
      <p class="cta-contact">
        <a href="mailto:<?= h(CONTACT_EMAIL) ?>"><?= h(CONTACT_EMAIL) ?></a> ·
        <a href="<?= h(CONTACT_PHONE_HREF) ?>"><?= h(CONTACT_PHONE) ?></a>
      </p>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>
