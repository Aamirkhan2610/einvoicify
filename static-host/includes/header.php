<?php
require_once __DIR__ . '/config.php';
$activeNav = $activeNav ?? '';
$nav = [
    ['label' => 'Solutions', 'href' => base_url('#solutions'), 'key' => 'solutions'],
    ['label' => 'LHDN', 'href' => base_url('#lhdn-syntax'), 'key' => 'lhdn'],
    ['label' => 'About', 'href' => base_url('about/'), 'key' => 'about'],
    ['label' => 'Services', 'href' => base_url('services/'), 'key' => 'services'],
    ['label' => 'Product', 'href' => base_url('product/'), 'key' => 'product'],
    ['label' => 'Cases', 'href' => base_url('case-studies/'), 'key' => 'cases'],
    ['label' => 'Contact', 'href' => base_url('contact/'), 'key' => 'contact'],
];
?>
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a href="<?= h(base_url()) ?>" class="brand" aria-label="Einvoicify home">
      <img src="<?= h(asset_url('img/logo.png')) ?>" alt="" width="36" height="36" class="brand-logo" />
      <span class="brand-text"><span class="text-brand-red">E</span>INVOICIFY</span>
    </a>

    <nav class="nav-desktop" aria-label="Main">
      <?php foreach ($nav as $item): ?>
        <a
          href="<?= h($item['href']) ?>"
          class="nav-link<?= $activeNav === $item['key'] ? ' is-active' : '' ?>"
        ><?= h($item['label']) ?></a>
      <?php endforeach; ?>
    </nav>

    <div class="header-actions">
      <a href="<?= h(CONTACT_PHONE_HREF) ?>" class="header-phone" title="<?= h(CONTACT_PHONE) ?>">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.35a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0 1 22 16.92z"/></svg>
        <span class="header-phone-text"><?= h(CONTACT_PHONE) ?></span>
      </a>
      <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
        Demo <?= icon_external('icon-sm') ?>
      </a>
      <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary btn-sm">Request demo</a>
    </div>

    <button type="button" class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
      <svg class="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      <svg class="icon-close hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>

  <div class="nav-mobile hidden" id="nav-mobile">
    <div class="container nav-mobile-inner">
      <?php foreach ($nav as $item): ?>
        <a href="<?= h($item['href']) ?>" class="nav-mobile-link<?= $activeNav === $item['key'] ? ' is-active' : '' ?>"><?= h($item['label']) ?></a>
      <?php endforeach; ?>
      <div class="nav-mobile-actions">
        <a href="<?= h(CONTACT_PHONE_HREF) ?>" class="nav-mobile-link"><?= h(CONTACT_PHONE) ?></a>
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-outline" target="_blank" rel="noopener noreferrer">Live product demo</a>
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Request a demo</a>
      </div>
    </div>
  </div>
</header>
<main class="site-main">
