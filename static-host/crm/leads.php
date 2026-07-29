<?php
$crmActive = 'leads';
$pageTitle = 'Leads | Einvoicify CRM';
require __DIR__ . '/includes/shell-start.php';
?>
<div id="crm-leads">
  <h1>Leads</h1>
  <p class="subtitle">Contact forms, price inquiries, chat-originated leads, and demo requests.</p>

  <div class="crm-tabs">
    <button type="button" class="is-active" data-leads-tab="enquiries">Enquiries (<span id="tab-enquiries-count">0</span>)</button>
    <button type="button" data-leads-tab="demos">Demos (<span id="tab-demos-count">0</span>)</button>
  </div>

  <div id="leads-loading" class="loading"><div class="spinner"></div></div>

  <div id="enquiries-table" class="table-wrap">
    <div class="table-scroll">
      <table class="crm-table">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Type</th>
            <th>Message</th>
            <th>Status</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody id="enquiries-body"></tbody>
      </table>
    </div>
  </div>

  <div id="demos-table" class="table-wrap hidden">
    <div class="table-scroll">
      <table class="crm-table" style="min-width:640px">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Company / ERP</th>
            <th>Status</th>
            <th>When</th>
          </tr>
        </thead>
        <tbody id="demos-body"></tbody>
      </table>
    </div>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-end.php'; ?>
