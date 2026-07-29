<?php
$crmActive = 'dashboard';
$pageTitle = 'Dashboard | Einvoicify CRM';
require __DIR__ . '/includes/shell-start.php';
?>
<div id="crm-dashboard">
  <h1>Dashboard</h1>
  <p class="subtitle">Welcome back, <span data-admin-name>Admin</span>. Website leads and chats.</p>

  <div class="crm-stats">
    <div class="crm-stat">
      <p class="label">New enquiries</p>
      <p class="value" id="stat-enquiries-new">—</p>
      <p class="sub" id="stat-enquiries-total">—</p>
    </div>
    <div class="crm-stat">
      <p class="label">Demo requests</p>
      <p class="value" id="stat-demos-new">—</p>
      <p class="sub" id="stat-demos-total">—</p>
    </div>
    <div class="crm-stat">
      <p class="label">Open chats</p>
      <p class="value" id="stat-chats-open">—</p>
      <p class="sub" id="stat-chats-total">—</p>
    </div>
    <div class="crm-stat">
      <p class="label">Messages today</p>
      <p class="value" id="stat-messages-today">—</p>
      <p class="sub">Customer + agent</p>
    </div>
  </div>

  <div class="crm-panels">
    <section class="crm-panel">
      <div class="crm-panel-head">
        <h2>Recent leads</h2>
        <a href="<?= h(base_url('crm/leads.php')) ?>">View all</a>
      </div>
      <ul class="crm-list" id="recent-leads">
        <li class="empty">Loading…</li>
      </ul>
    </section>
    <section class="crm-panel">
      <div class="crm-panel-head">
        <h2>Recent chats</h2>
        <a href="<?= h(base_url('crm/chats.php')) ?>">View all</a>
      </div>
      <ul class="crm-list" id="recent-chats">
        <li class="empty">Loading…</li>
      </ul>
    </section>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-end.php'; ?>
