<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'About IOS Malaysia | ' . SITE_NAME;
$pageDescription = 'Integrated Operation Solutions Sdn. Bhd. (947729-A) — QAD partner and LHDN e-invoice specialist. Einvoicify product. Oasis Damansara, Selangor.';
$activeNav = 'about';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">About us</p>
        <h1><?= h(LEGAL_NAME) ?></h1>
        <p><?= h(REGISTRATION_NO) ?> · Trading as <?= h(COMPANY_BRAND) ?> · Product: Einvoicify</p>
      </div>
      <p class="prose text-center mt-6" style="max-width:48rem;margin-left:auto;margin-right:auto">
        Integrated Operation Solutions Sdn. Bhd. (IOS) is a QAD Services Partner in Malaysia. Our focus is successful QAD ERP implementation and LHDN e-invoice — including our Einvoicify product and ePINTAR middleware approach.
      </p>
      <div class="actions">
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Contact our team</a>
        <a href="<?= h(LEGACY_SITE) ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Original site: iosmalaysia.com</a>
      </div>
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container prose space-y-6">
    <div>
      <h2>Company introduction</h2>
      <p>IOS provides full project implementation, training, customisation, integration, migration, upgrade, and maintenance for QAD ERP. We serve customers in medical, electronics, consumer products, food &amp; beverage, rubber, and automotive industries.</p>
      <p>Our consultants bring over 16 years of QAD experience. One of IOS’s founders was a pioneer QAD MFG/PRO consultant — implementing QAD for a rubber glove manufacturer in the early 1990s, then an UPS manufacturer — with more than 30 customers successfully implemented since.</p>
      <p>We also offer disaster recovery (DR), web application development complementary to QAD, and extensions that meet local industry needs.</p>
    </div>
    <div class="vision-grid">
      <div class="vision-card"><h3>Vision</h3><p>Our passion is providing innovative software solutions and services to all our customers.</p></div>
      <div class="vision-card"><h3>Mission</h3><p>To deliver professional services and ensuring quality within the range of services we provide — with local flavour and global standards that work for each client’s audience.</p></div>
    </div>
    <div>
      <h2>Industries we serve</h2>
      <div class="tag-cloud" style="justify-content:flex-start">
        <span class="chip-lg">Medical</span><span class="chip-lg">Electronics</span><span class="chip-lg">Consumer products</span>
        <span class="chip-lg">Food &amp; beverage</span><span class="chip-lg">Rubber</span><span class="chip-lg">Automotive</span>
      </div>
    </div>
  </div>
</section>

<section class="section section-white">
  <div class="container">
    <div class="navy-panel">
      <h2>LHDN e-Invoice implementation achievement</h2>
      <p>23 ERP customers across 4 different ERP systems successfully adopted the IOS LHDN e-Invoice solution since 1 August — with over 10 more set to launch by leveraging our ePINTAR API middleware.</p>
      <div class="stat-grid">
        <div><p class="value" style="font-size:1.5rem;font-weight:700;margin:0">23+</p><p class="label" style="font-size:.75rem;color:#cbd5e1;margin:.25rem 0 0">ERP customers live</p></div>
        <div><p class="value" style="font-size:1.5rem;font-weight:700;margin:0">4</p><p class="label" style="font-size:.75rem;color:#cbd5e1;margin:.25rem 0 0">ERP platforms</p></div>
        <div><p class="value" style="font-size:1.5rem;font-weight:700;margin:0">10+</p><p class="label" style="font-size:.75rem;color:#cbd5e1;margin:.25rem 0 0">Preparing to go live</p></div>
        <div><p class="value" style="font-size:1.5rem;font-weight:700;margin:0">30+</p><p class="label" style="font-size:.75rem;color:#cbd5e1;margin:.25rem 0 0">QAD implementations</p></div>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
