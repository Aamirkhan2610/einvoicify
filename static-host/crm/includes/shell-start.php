<?php
require_once dirname(__DIR__, 2) . '/includes/config.php';
$crmActive = $crmActive ?? 'dashboard';
$pageTitle = $pageTitle ?? 'CRM | Einvoicify';
?>
<!DOCTYPE html>
<html lang="en-MY">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= h($pageTitle) ?></title>
  <meta name="robots" content="noindex, nofollow" />
  <link rel="icon" href="<?= h(asset_url('img/favicon.ico')) ?>" />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= h(asset_url('css/site.css')) ?>" />
  <script>
    window.EINVOICIFY = {
      basePath: <?= json_encode(BASE_PATH) ?>,
      apiBase: <?= json_encode(base_url('api')) ?>,
      productUrl: <?= json_encode(PRODUCT_URL) ?>
    };
  </script>
</head>
<body class="crm-body" data-crm-auth="1">
<div class="crm-shell">
  <aside class="crm-aside">
    <div class="crm-aside-head">
      <img src="<?= h(asset_url('img/logo.png')) ?>" alt="Einvoicify" />
      <div>
        <p class="title">Einvoicify CRM</p>
        <p class="sub">Sales &amp; support</p>
      </div>
    </div>
    <nav class="crm-nav">
      <a href="<?= h(base_url('crm/')) ?>" class="<?= $crmActive === 'dashboard' ? 'is-active' : '' ?>">Dashboard</a>
      <a href="<?= h(base_url('crm/leads.php')) ?>" class="<?= $crmActive === 'leads' ? 'is-active' : '' ?>">Leads</a>
      <a href="<?= h(base_url('crm/chats.php')) ?>" class="<?= $crmActive === 'chats' ? 'is-active' : '' ?>">Chats</a>
    </nav>
    <div class="crm-aside-foot">
      <p data-admin-name>Admin</p>
      <a href="<?= h(PRODUCT_URL) ?>" target="_blank" rel="noopener noreferrer">Product app ↗</a>
      <button type="button" data-crm-logout>Sign out</button>
    </div>
  </aside>
  <div class="crm-main">
    <header class="crm-top">
      <div class="crm-top-mobile">
        <img src="<?= h(asset_url('img/logo.png')) ?>" alt="" width="28" height="28" style="width:1.75rem;height:1.75rem" />
        <span style="font-size:.875rem;font-weight:700;color:var(--brand-navy)">CRM</span>
      </div>
      <nav class="crm-top-nav">
        <a href="<?= h(base_url('crm/')) ?>" class="<?= $crmActive === 'dashboard' ? 'is-active' : '' ?>">Dashboard</a>
        <a href="<?= h(base_url('crm/leads.php')) ?>" class="<?= $crmActive === 'leads' ? 'is-active' : '' ?>">Leads</a>
        <a href="<?= h(base_url('crm/chats.php')) ?>" class="<?= $crmActive === 'chats' ? 'is-active' : '' ?>">Chats</a>
      </nav>
      <div class="crm-top-hint">Website leads, price inquiries &amp; live chat</div>
      <button type="button" data-crm-logout class="btn btn-ghost btn-sm" style="font-size:.75rem">Sign out</button>
    </header>
    <main class="crm-content">
