<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Privacy | ' . SITE_NAME;
$pageDescription = 'Privacy policy for Einvoicify and Integrated Operation Solutions Sdn. Bhd.';
$activeNav = '';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';
?>
<section class="section section-white">
  <div class="container prose">
    <div class="section-heading"><h1>Privacy</h1></div>
    <p class="mt-6">Integrated Operation Solutions Sdn. Bhd. (“IOS”, “we”) respects your privacy. This page summarises how we handle information submitted through the Einvoicify marketing website and CRM.</p>
    <h2 class="mt-8">Information we collect</h2>
    <p>Contact forms, demo requests, and chat may collect your name, email, phone, company, and message content. Technical data such as IP address and browser user agent may be stored for security and support.</p>
    <h2 class="mt-8">How we use it</h2>
    <p>We use this information to respond to enquiries, provide demos, operate the CRM for our sales and support team, and improve our services. We do not sell your personal data.</p>
    <h2 class="mt-8">Contact</h2>
    <p>Questions: <a href="mailto:<?= h(CONTACT_EMAIL) ?>" class="text-brand-blue"><?= h(CONTACT_EMAIL) ?></a> or call <?= h(CONTACT_PHONE) ?>.</p>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
