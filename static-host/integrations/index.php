<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Integrations | ' . SITE_NAME;
$pageDescription = 'Einvoicify integrations — QAD, SAP, Epicor, Sage, Syteline, Dynamics, accounting systems, and custom API / SFTP.';
$activeNav = '';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
$items = [
  ['QAD', 'Manufacturing ERP'], ['SAP', 'Enterprise ERP'], ['Epicor', 'Enterprise ERP'],
  ['Sage', 'Accounting'], ['Syteline', 'Manufacturing ERP'], ['Microsoft Dynamics', 'Enterprise ERP'],
  ['Oracle NetSuite', 'Cloud ERP'], ['SQL Accounting', 'Accounting'], ['Tally', 'Accounting'],
  ['AutoCount', 'Accounting'], ['Medic', 'Healthcare'], ['Custom API / CSV / SFTP', 'Integration'],
];
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Integrations</p>
        <h1>Works with systems you already use</h1>
        <p>Portal for simple start, SFTP for file exports, or API / ePINTAR for automated flows.</p>
      </div>
    </div>
  </div>
</section>
<section class="section section-muted">
  <div class="container">
    <div class="cards-3">
      <?php foreach ($items as $i): ?>
        <article class="card card-white">
          <h3><?= h($i[0]) ?></h3>
          <p class="desc"><?= h($i[1]) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
