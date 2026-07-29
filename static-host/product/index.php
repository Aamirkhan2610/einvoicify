<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Product | ' . SITE_NAME;
$pageDescription = 'Einvoicify product overview — portal, SFTP upload, and API for LHDN MyInvois e-invoicing in Malaysia.';
$activeNav = 'product';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Product</p>
        <h1>Einvoicify for LHDN MyInvois</h1>
        <p>One product, three ways to work: portal, secure file upload, or API — backed by Integrated Operation Solutions.</p>
      </div>
      <div class="actions">
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Open live demo <?= icon_external() ?></a>
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-outline">Request a walkthrough</a>
      </div>
    </div>
  </div>
</section>
<section class="section section-white">
  <div class="container">
    <div class="cards-3">
      <article class="card card-white"><h3>Simple dashboard</h3><p class="desc">See invoice status clearly — accepted, pending, or needs a fix.</p></article>
      <article class="card card-white"><h3>Works with your tools</h3><p class="desc">Portal alone, file upload, or connect QAD, SAP, Sage, Epicor, Syteline and more.</p></article>
      <article class="card card-white"><h3>Customer delivery</h3><p class="desc">Send invoices to customers by email after they are ready.</p></article>
    </div>
    <div class="soft-panel mt-8">
      <h3>Try app.einvoicify.my</h3>
      <p>Click through the product as a visitor. For pricing, SFTP, or API for your company, chat with us or book a call.</p>
      <div class="actions">
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Launch demo</a>
        <a href="<?= h(base_url()) ?>#solutions" class="btn btn-outline">Compare 3 solutions</a>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
