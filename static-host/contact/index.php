<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Contact | ' . SITE_NAME;
$pageDescription = 'Contact ' . LEGAL_NAME . ' for Einvoicify e-invoice, QAD ERP, and demos. Oasis Damansara · ' . CONTACT_PHONE;
$activeNav = 'contact';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';

$turnover = ['Above RM100 million', 'RM25m – RM100m', 'RM5m – RM25m', 'RM1m – RM5m', 'Below RM1 million', 'Not sure'];
$monthly = ['Under 100', '100 – 500', '500 – 2,000', '2,000 – 10,000', 'Over 10,000'];
?>
<section class="page-hero section-border">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Contact</p>
        <h1>Talk to the IOS team</h1>
        <p><?= h(LEGAL_NAME) ?> (<?= h(REGISTRATION_NO) ?>). Same office and contacts as iosmalaysia.com — ready to help with e-invoice and ERP.</p>
      </div>

      <div class="contact-grid">
        <div>
          <div class="info-card">
            <h2>Office</h2>
            <ul class="info-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>
                  <strong class="text-brand-navy"><?= h(LEGAL_NAME) ?></strong><br />
                  (<?= h(REGISTRATION_NO) ?>)<br />
                  <?= h(ADDRESS_FULL) ?>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Business hours: Mon–Fri, 9:00–18:00 (Malaysia)</span>
              </li>
            </ul>
          </div>
          <div class="info-card">
            <h2>Your contacts</h2>
            <ul class="info-list">
              <li style="flex-direction:column;gap:.25rem">
                <div class="person-name">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Christopher De Souza
                </div>
                <a class="person-link" href="mailto:cds@iosmalaysia.com">cds@iosmalaysia.com</a>
                <a class="person-link" href="tel:+60163381871">+6016-338-1871</a>
              </li>
              <li style="flex-direction:column;gap:.25rem">
                <div class="person-name">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Johnny Lim
                </div>
                <a class="person-link" href="mailto:johnnylim@iosmalaysia.com">johnnylim@iosmalaysia.com</a>
                <a class="person-link" href="tel:+60163328049">+6016-332-8049</a>
              </li>
            </ul>
            <p style="margin:1rem 0 0;padding-top:1rem;border-top:1px solid var(--slate-100);font-size:.75rem;color:var(--slate-500)">
              General: <a href="mailto:<?= h(CONTACT_EMAIL) ?>"><?= h(CONTACT_EMAIL) ?></a>
              · <a href="mailto:<?= h(GENERAL_EMAIL) ?>"><?= h(GENERAL_EMAIL) ?></a>
            </p>
          </div>
        </div>

        <div class="form-card">
          <div class="form-tabs">
            <button type="button" class="form-tab is-active" data-form-tab="contact">Enquiry</button>
            <button type="button" class="form-tab" data-form-tab="demo">Demo request</button>
          </div>
          <form id="contact-form" novalidate>
            <input type="hidden" name="formType" value="contact" />
            <div class="form-grid two">
              <div class="field">
                <label for="name">Full name *</label>
                <input id="name" name="name" required autocomplete="name" />
              </div>
              <div class="field">
                <label for="email">Work email *</label>
                <input id="email" name="email" type="email" required autocomplete="email" />
              </div>
              <div class="field">
                <label for="phone">Phone</label>
                <input id="phone" name="phone" autocomplete="tel" />
              </div>
              <div class="field">
                <label for="company">Company</label>
                <input id="company" name="company" autocomplete="organization" data-required />
              </div>
            </div>
            <div class="form-grid two mt-4" data-demo-only style="display:none">
              <div class="field">
                <label for="jobTitle">Job title</label>
                <input id="jobTitle" name="jobTitle" />
              </div>
              <div class="field">
                <label for="monthlyInvoices">Monthly invoices</label>
                <select id="monthlyInvoices" name="monthlyInvoices">
                  <option value="">Select…</option>
                  <?php foreach ($monthly as $m): ?><option value="<?= h($m) ?>"><?= h($m) ?></option><?php endforeach; ?>
                </select>
              </div>
            </div>
            <div class="form-grid two mt-4">
              <div class="field">
                <label for="erpSystem">ERP / accounting system</label>
                <input id="erpSystem" name="erpSystem" placeholder="e.g. QAD, SAP, Sage" />
              </div>
              <div class="field">
                <label for="turnoverBand">Annual turnover band</label>
                <select id="turnoverBand" name="turnoverBand">
                  <option value="">Select…</option>
                  <?php foreach ($turnover as $t): ?><option value="<?= h($t) ?>"><?= h($t) ?></option><?php endforeach; ?>
                </select>
              </div>
            </div>
            <div class="field mt-4" data-contact-only>
              <label for="enquiryType">Enquiry type</label>
              <select id="enquiryType" name="enquiryType">
                <option value="GENERAL">General</option>
                <option value="PRICE">Pricing</option>
                <option value="PRODUCT">Product</option>
                <option value="INTEGRATION">Integration</option>
                <option value="SUPPORT">Support</option>
              </select>
            </div>
            <div class="field mt-4">
              <label for="message">Message *</label>
              <textarea id="message" name="message" required rows="5"></textarea>
            </div>
            <div id="form-status" class="form-msg hidden"></div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Send message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
<script src="<?= h(asset_url('js/contact-form.js')) ?>" defer></script>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
