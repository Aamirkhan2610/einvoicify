<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Services | ' . SITE_NAME;
$pageDescription = 'IOS Malaysia services: QAD ERP implementation, training, upgrades, customisation, disaster recovery, and LHDN e-invoice (Einvoicify).';
$activeNav = 'services';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';

$services = [
  'Project management & ERP consulting', 'QAD business process design', 'QAD implementation',
  'QAD assessments', 'QAD upgrades', 'QAD training', 'QAD business intelligence',
  'QAD customisation', 'QAD reporting', 'QAD database tuning', 'QAD workshops',
  'Disaster recovery (DR) services', 'Add-on web applications', 'LHDN e-invoice (Einvoicify / ePINTAR)',
];
$qad = [
  ['QAD Financials', 'Increase fiscal control and compliance with government mandates for regional and multi-national corporations.'],
  ['QAD Customer Management', 'Improve responsiveness through better collaboration and management of customers and demand from pre- to post-sale.'],
  ['QAD Service & Support', 'Manage installation, ongoing support, maintenance and repair — including warranty or service contracts.'],
  ['QAD Manufacturing', 'Reduce cost and increase throughput with modern manufacturing scheduling and shop-floor tools.'],
  ['QAD Supply Chain', 'Improve management of supply and suppliers through real-time collaboration.'],
  ['QAD Analytics', 'Measure business performance in key areas for better decisions.'],
];
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Services</p>
        <h1>What IOS delivers</h1>
        <p>From the same service catalogue on iosmalaysia.com — ERP consulting and QAD delivery, plus LHDN e-invoice with Einvoicify.</p>
      </div>
    </div>
  </div>
</section>
<section class="section section-muted">
  <div class="container">
    <div class="section-heading center"><h2>Service catalogue</h2></div>
    <div class="service-list">
      <?php foreach ($services as $s): ?>
        <div class="service-item"><?= h($s) ?></div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">QAD product areas</p>
      <h2>ERP depth that supports e-invoice projects</h2>
    </div>
    <div class="cards-3">
      <?php foreach ($qad as $q): ?>
        <article class="card card-white">
          <h3><?= h($q[0]) ?></h3>
          <p class="desc"><?= h($q[1]) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
    <div class="soft-panel">
      <h3>Need QAD + e-invoice together?</h3>
      <p>Talk to the same IOS team that implements QAD and runs LHDN e-invoice projects for Malaysian manufacturers.</p>
      <div class="actions">
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Contact us</a>
        <a href="<?= h(LEGACY_SITE) ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">iosmalaysia.com</a>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
