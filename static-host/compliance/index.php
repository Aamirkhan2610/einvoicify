<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'LHDN compliance | ' . SITE_NAME;
$pageDescription = 'Malaysia LHDN MyInvois e-invoice phases, UBL 2.1, and how Einvoicify helps you stay compliant.';
$activeNav = '';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Compliance</p>
        <h1>LHDN MyInvois e-Invoice</h1>
        <p>Malaysia’s continuous transaction control model — structured e-invoices validated by IRBM. Always confirm rules on hasil.gov.my.</p>
      </div>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="container">
    <div class="section-heading center"><h2>Mandate phases</h2></div>
    <div class="table-wrap">
      <div class="table-scroll">
        <table class="phase-table">
          <thead><tr><th>Phase</th><th>Turnover</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Phase 1</td><td>Above RM100 million</td><td>1 August 2024</td><td>Live</td></tr>
            <tr><td>Phase 2</td><td>RM25m – RM100m</td><td>1 January 2025</td><td>Live</td></tr>
            <tr><td>Phase 3</td><td>RM5m – RM25m</td><td>1 July 2025</td><td>Live</td></tr>
            <tr><td>Phase 4</td><td>RM1m – RM5m</td><td>1 January 2026</td><td>Live (relaxation period applies)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/widgets/lhdn-syntax.php'; ?>

<section class="section section-muted">
  <div class="container">
    <div class="soft-panel">
      <h3>Need help mapping your systems?</h3>
      <p>IOS implements portal, SFTP, and API paths so your team stays aligned with MyInvois rules.</p>
      <div class="actions"><a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Talk to us</a></div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
