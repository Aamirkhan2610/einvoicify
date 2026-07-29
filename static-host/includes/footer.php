<?php require_once __DIR__ . '/config.php'; $year = (int) date('Y'); ?>
</main>
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <a href="<?= h(base_url()) ?>" class="brand brand-footer">
        <img src="<?= h(asset_url('img/logo.png')) ?>" alt="Einvoicify" width="40" height="40" class="brand-logo brand-logo-footer" />
        <span class="brand-text text-white"><span class="text-brand-red">E</span>INVOICIFY</span>
      </a>
      <p class="footer-legal">A product of <?= h(LEGAL_NAME) ?> (<?= h(REGISTRATION_NO) ?>)</p>
      <p class="footer-blurb">QAD ERP partner and LHDN e-invoice specialist in Malaysia. Portal, secure file upload, or API — backed by the IOS team at Oasis Damansara.</p>
      <a href="<?= h(PRODUCT_URL) ?>" target="_blank" rel="noopener noreferrer" class="footer-app-link">app.einvoicify.my ↗</a>
      <ul class="footer-contact">
        <li>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span><?= h(ADDRESS_FULL) ?></span>
        </li>
        <li>
          <a href="tel:+60163381871">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0 1 22 16.92z"/></svg>
            Christopher De Souza: +6016-338-1871
          </a>
        </li>
        <li>
          <a href="tel:+60163328049">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0 1 22 16.92z"/></svg>
            Johnny Lim: +6016-332-8049
          </a>
        </li>
        <li>
          <a href="mailto:cds@iosmalaysia.com">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            cds@iosmalaysia.com
          </a>
        </li>
      </ul>
    </div>

    <div class="footer-links">
      <div>
        <h3>Solutions</h3>
        <ul>
          <li><a href="<?= h(base_url('#solutions')) ?>">Portal access</a></li>
          <li><a href="<?= h(base_url('#solutions')) ?>">SFTP upload</a></li>
          <li><a href="<?= h(base_url('#solutions')) ?>">API as a service</a></li>
          <li><a href="<?= h(PRODUCT_URL) ?>" target="_blank" rel="noopener noreferrer">Live demo</a></li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li><a href="<?= h(base_url('about/')) ?>">About IOS</a></li>
          <li><a href="<?= h(base_url('services/')) ?>">Services</a></li>
          <li><a href="<?= h(base_url('case-studies/')) ?>">Case studies</a></li>
          <li><a href="<?= h(base_url('contact/')) ?>">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Resources</h3>
        <ul>
          <li><a href="<?= h(base_url('product/')) ?>">Product</a></li>
          <li><a href="<?= h(base_url('compliance/')) ?>">LHDN compliance</a></li>
          <li><a href="<?= h(base_url('integrations/')) ?>">Integrations</a></li>
          <li><a href="<?= h(LEGACY_SITE) ?>" target="_blank" rel="noopener noreferrer">iosmalaysia.com</a></li>
          <li><a href="<?= h(base_url('privacy/')) ?>">Privacy</a></li>
          <li><a href="<?= h(base_url('terms/')) ?>">Terms</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <?= $year ?> <?= h(LEGAL_NAME) ?>. All rights reserved. Einvoicify is a product of IOS Malaysia.</p>
    <p>Confirm e-invoice rules on <a href="https://www.hasil.gov.my" target="_blank" rel="noopener noreferrer">hasil.gov.my</a>.</p>
  </div>
</footer>

<div id="chat-root"></div>
<script src="<?= h(asset_url('js/site.js')) ?>" defer></script>
<script src="<?= h(asset_url('js/widgets.js')) ?>" defer></script>
<script src="<?= h(asset_url('js/chat.js')) ?>" defer></script>
</body>
</html>
