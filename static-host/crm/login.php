<?php
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/auth.php';
$session = get_crm_session();
if ($session) {
    header('Location: ' . base_url('crm/'));
    exit;
}
?>
<!DOCTYPE html>
<html lang="en-MY">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CRM Login | Einvoicify</title>
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
<body class="crm-body">
  <div class="login-page">
    <div class="login-card">
      <a href="<?= h(base_url()) ?>" class="brand">
        <img src="<?= h(asset_url('img/logo.png')) ?>" alt="" width="36" height="36" class="brand-logo" />
        <span class="brand-text"><span class="text-brand-red">E</span>INVOICIFY</span>
      </a>
      <h1>CRM sign in</h1>
      <p class="sub">Sales leads, demos &amp; website chat</p>
      <form id="crm-login-form">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required autocomplete="username" value="admin@einvoicify.my" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required autocomplete="current-password" />
        </div>
        <div id="login-error" class="form-msg error hidden"></div>
        <button type="submit" class="btn btn-primary w-full">Sign in</button>
      </form>
      <p class="sub mt-4"><a href="<?= h(base_url()) ?>" class="text-brand-blue">← Back to website</a></p>
    </div>
  </div>
  <script src="<?= h(asset_url('js/crm.js')) ?>"></script>
</body>
</html>
