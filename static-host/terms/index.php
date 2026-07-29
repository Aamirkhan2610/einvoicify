<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Terms | ' . SITE_NAME;
$pageDescription = 'Website terms for Einvoicify by Integrated Operation Solutions Sdn. Bhd.';
$activeNav = '';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
?>
<section class="section section-white">
  <div class="container prose">
    <div class="section-heading"><h1>Terms of use</h1></div>
    <p class="mt-6">This website is operated by Integrated Operation Solutions Sdn. Bhd. (<?= h(REGISTRATION_NO) ?>). Content is provided for general information about Einvoicify and IOS services.</p>
    <h2 class="mt-8">Product &amp; compliance</h2>
    <p>E-invoice rules are set by Malaysian authorities. Confirm current requirements on <a href="https://www.hasil.gov.my" target="_blank" rel="noopener noreferrer" class="text-brand-blue">hasil.gov.my</a>. Product demos at app.einvoicify.my may have separate terms.</p>
    <h2 class="mt-8">Contact</h2>
    <p><?= h(CONTACT_EMAIL) ?> · <?= h(CONTACT_PHONE) ?></p>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
