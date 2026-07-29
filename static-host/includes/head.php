<?php
/** @var string $pageTitle */
/** @var string $pageDescription */
/** @var string $activeNav */
$pageTitle = $pageTitle ?? SITE_NAME . ' — LHDN MyInvois e-Invoicing Malaysia';
$pageDescription = $pageDescription ?? 'Einvoicify by Integrated Operation Solutions (IOS) — LHDN e-invoice and QAD ERP partner in Malaysia. Portal, SFTP upload, or API. Oasis Damansara, Selangor.';
$activeNav = $activeNav ?? '';
$noIndex = $noIndex ?? false;
?>
<!DOCTYPE html>
<html lang="en-MY">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?= h($pageTitle) ?></title>
  <meta name="description" content="<?= h($pageDescription) ?>" />
  <meta name="keywords" content="e-invoice Malaysia, LHDN MyInvois, Einvoicify, IOS Malaysia, Integrated Operation Solutions, QAD ERP Malaysia, ePINTAR" />
  <meta name="author" content="<?= h(LEGAL_NAME) ?>" />
  <?php if ($noIndex): ?>
  <meta name="robots" content="noindex, nofollow" />
  <?php else: ?>
  <meta name="robots" content="index, follow" />
  <?php endif; ?>
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_MY" />
  <meta property="og:site_name" content="<?= h(SITE_NAME) ?>" />
  <meta property="og:title" content="<?= h($pageTitle) ?>" />
  <meta property="og:description" content="<?= h($pageDescription) ?>" />
  <meta property="og:image" content="<?= h(asset_url('img/logo.png')) ?>" />
  <link rel="icon" href="<?= h(asset_url('img/favicon.ico')) ?>" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="<?= h(asset_url('img/favicon-32.png')) ?>" />
  <link rel="icon" type="image/png" sizes="16x16" href="<?= h(asset_url('img/favicon-16.png')) ?>" />
  <link rel="apple-touch-icon" href="<?= h(asset_url('img/apple-touch-icon.png')) ?>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="<?= h(asset_url('css/site.css')) ?>?v=4" />
  <script>
    window.EINVOICIFY = {
      basePath: <?= json_encode(BASE_PATH) ?>,
      productUrl: <?= json_encode(PRODUCT_URL) ?>,
      apiBase: <?= json_encode(base_url('api')) ?>,
      contactEmail: <?= json_encode(CONTACT_EMAIL) ?>,
      contactPhone: <?= json_encode(CONTACT_PHONE) ?>
    };
  </script>
</head>
<body class="site-body">
