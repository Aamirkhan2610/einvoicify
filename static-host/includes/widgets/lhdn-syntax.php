<?php
/**
 * Interactive LHDN / MyInvois syntax widget (CoAxn-style “code” panel, e-invoice focused)
 */
?>
<section class="section section-white widget-lhdn" id="lhdn-syntax">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">LHDN · MyInvois syntax</p>
      <h2>See how a compliant e-invoice is structured</h2>
      <p>
        Malaysia’s e-invoice uses <strong>UBL 2.1</strong> (XML or JSON) under IRBM MyInvois continuous transaction control.
        Einvoicify builds, validates, and submits this payload — you stay focused on your business.
      </p>
    </div>

    <!-- Pipeline strip -->
    <div class="lhdn-pipeline" aria-label="e-Invoice submission flow">
      <div class="pipe-step is-active" data-pipe="0">
        <span class="pipe-dot"></span>
        <span class="pipe-label">Draft</span>
      </div>
      <div class="pipe-line"></div>
      <div class="pipe-step" data-pipe="1">
        <span class="pipe-dot"></span>
        <span class="pipe-label">Validate</span>
      </div>
      <div class="pipe-line"></div>
      <div class="pipe-step" data-pipe="2">
        <span class="pipe-dot"></span>
        <span class="pipe-label">Submit</span>
      </div>
      <div class="pipe-line"></div>
      <div class="pipe-step" data-pipe="3">
        <span class="pipe-dot"></span>
        <span class="pipe-label">UUID + QR</span>
      </div>
    </div>

    <div class="lhdn-widget-grid">
      <!-- Left: interactive editor -->
      <div class="syntax-panel">
        <div class="syntax-toolbar">
          <div class="syntax-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div class="syntax-tabs" role="tablist">
            <button type="button" class="syntax-tab is-active" data-syntax-tab="json" role="tab" aria-selected="true">JSON</button>
            <button type="button" class="syntax-tab" data-syntax-tab="xml" role="tab" aria-selected="false">XML (UBL)</button>
            <button type="button" class="syntax-tab" data-syntax-tab="flow" role="tab" aria-selected="false">MyInvois flow</button>
          </div>
          <div class="syntax-badge">
            <span class="live-pulse"></span> LHDN ready
          </div>
        </div>

        <div class="syntax-body">
          <pre class="syntax-code is-active" data-syntax-pane="json" tabindex="0"><code><span class="tok-cmt">// MyInvois e-Invoice · InvoiceTypeCode 01</span>
{
  <span class="tok-key">"InvoiceTypeCode"</span>: <span class="tok-str">"01"</span>,
  <span class="tok-key">"ID"</span>: <span class="tok-str">"INV-2026-00482"</span>,
  <span class="tok-key">"IssueDate"</span>: <span class="tok-str">"2026-07-29"</span>,
  <span class="tok-key">"DocumentCurrencyCode"</span>: <span class="tok-str">"MYR"</span>,
  <span class="tok-key">"AccountingSupplierParty"</span>: {
    <span class="tok-key">"TIN"</span>: <span class="tok-str">"C12345678901"</span>,
    <span class="tok-key">"RegistrationName"</span>: <span class="tok-str">"IOS Sdn. Bhd."</span>
  },
  <span class="tok-key">"AccountingCustomerParty"</span>: {
    <span class="tok-key">"TIN"</span>: <span class="tok-str">"C98765432109"</span>,
    <span class="tok-key">"RegistrationName"</span>: <span class="tok-str">"Buyer Sdn. Bhd."</span>
  },
  <span class="tok-key">"LegalMonetaryTotal"</span>: {
    <span class="tok-key">"PayableAmount"</span>: <span class="tok-num">10800.00</span>
  },
  <span class="tok-key">"TaxTotal"</span>: {
    <span class="tok-key">"TaxAmount"</span>: <span class="tok-num">800.00</span>
  }
}</code></pre>

          <pre class="syntax-code" data-syntax-pane="xml" tabindex="0"><code><span class="tok-cmt">&lt;!-- UBL 2.1 Invoice · IRBM MyInvois --&gt;</span>
<span class="tok-tag">&lt;Invoice</span> <span class="tok-attr">xmlns</span>=<span class="tok-str">"urn:oasis:names:..."</span><span class="tok-tag">&gt;</span>
  <span class="tok-tag">&lt;cbc:ID&gt;</span>INV-2026-00482<span class="tok-tag">&lt;/cbc:ID&gt;</span>
  <span class="tok-tag">&lt;cbc:IssueDate&gt;</span>2026-07-29<span class="tok-tag">&lt;/cbc:IssueDate&gt;</span>
  <span class="tok-tag">&lt;cbc:InvoiceTypeCode</span>
    <span class="tok-attr">listVersionID</span>=<span class="tok-str">"1.0"</span><span class="tok-tag">&gt;</span>01<span class="tok-tag">&lt;/cbc:InvoiceTypeCode&gt;</span>
  <span class="tok-tag">&lt;cbc:DocumentCurrencyCode&gt;</span>MYR<span class="tok-tag">&lt;/cbc:DocumentCurrencyCode&gt;</span>
  <span class="tok-tag">&lt;cac:AccountingSupplierParty&gt;</span>…TIN…<span class="tok-tag">&lt;/cac:AccountingSupplierParty&gt;</span>
  <span class="tok-tag">&lt;cac:AccountingCustomerParty&gt;</span>…Buyer…<span class="tok-tag">&lt;/cac:AccountingCustomerParty&gt;</span>
  <span class="tok-tag">&lt;cac:TaxTotal&gt;</span>…SST…<span class="tok-tag">&lt;/cac:TaxTotal&gt;</span>
  <span class="tok-tag">&lt;cac:LegalMonetaryTotal&gt;</span>…totals…<span class="tok-tag">&lt;/cac:LegalMonetaryTotal&gt;</span>
  <span class="tok-tag">&lt;cac:InvoiceLine&gt;</span>…lines…<span class="tok-tag">&lt;/cac:InvoiceLine&gt;</span>
<span class="tok-tag">&lt;/Invoice&gt;</span></code></pre>

          <pre class="syntax-code" data-syntax-pane="flow" tabindex="0"><code><span class="tok-cmt">// Continuous Transaction Control · MyInvois</span>
<span class="tok-fn">einvoicify</span>.submit({
  <span class="tok-key">channel</span>: <span class="tok-str">"API | Portal | SFTP"</span>,
  <span class="tok-key">standard</span>: <span class="tok-str">"UBL 2.1"</span>,
  <span class="tok-key">formats</span>: [<span class="tok-str">"XML"</span>, <span class="tok-str">"JSON"</span>],
  <span class="tok-key">validate</span>: <span class="tok-str">"IRBM schema + business rules"</span>,
  <span class="tok-key">response</span>: {
    <span class="tok-key">status</span>: <span class="tok-str">"Valid"</span>,
    <span class="tok-key">uuid</span>: <span class="tok-str">"A1B2-…-Z9"</span>,
    <span class="tok-key">qr</span>: <span class="tok-str">"verifiable link"</span>
  }
});
<span class="tok-cmt">// → Buyer notified · audit trail retained</span></code></pre>
        </div>

        <div class="syntax-footer">
          <span>Standard: <strong>UBL 2.1</strong></span>
          <span>Platform: <strong>MyInvois (IRBM)</strong></span>
          <span>Model: <strong>CTC</strong></span>
        </div>
      </div>

      <!-- Right: interactive doc types + field map -->
      <div class="lhdn-side">
        <div class="doc-types-card">
          <h3>Document type codes</h3>
          <p class="side-lead">Tap a type — Einvoicify maps your ERP / portal document to the correct IRBM code.</p>
          <div class="doc-type-list" id="doc-type-list">
            <button type="button" class="doc-type is-active" data-code="01" data-name="Invoice" data-desc="Standard supplier-issued commercial invoice submitted to MyInvois.">
              <span class="doc-code">01</span>
              <span class="doc-meta"><strong>Invoice</strong><small>Default commercial invoice</small></span>
            </button>
            <button type="button" class="doc-type" data-code="02" data-name="Credit Note" data-desc="Adjusts a previously validated invoice (returns, discounts, corrections).">
              <span class="doc-code">02</span>
              <span class="doc-meta"><strong>Credit Note</strong><small>Returns &amp; adjustments</small></span>
            </button>
            <button type="button" class="doc-type" data-code="03" data-name="Debit Note" data-desc="Increases amounts linked to a prior invoice when additional charges apply.">
              <span class="doc-code">03</span>
              <span class="doc-meta"><strong>Debit Note</strong><small>Additional charges</small></span>
            </button>
            <button type="button" class="doc-type" data-code="04" data-name="Refund Note" data-desc="Documents refunds in scenarios defined by IRBM guidelines.">
              <span class="doc-code">04</span>
              <span class="doc-meta"><strong>Refund Note</strong><small>Refund scenarios</small></span>
            </button>
            <button type="button" class="doc-type" data-code="11+" data-name="Self-billed" data-desc="Buyer-issued e-invoices where self-billing rules apply.">
              <span class="doc-code">11+</span>
              <span class="doc-meta"><strong>Self-billed</strong><small>Buyer-issued</small></span>
            </button>
          </div>
          <div class="doc-type-detail" id="doc-type-detail">
            <span class="doc-detail-code" id="doc-detail-code">01</span>
            <div>
              <p class="doc-detail-name" id="doc-detail-name">Invoice</p>
              <p class="doc-detail-desc" id="doc-detail-desc">Standard supplier-issued commercial invoice submitted to MyInvois.</p>
            </div>
          </div>
        </div>

        <div class="field-map-card">
          <h3>Core UBL elements</h3>
          <ul class="field-map">
            <li><code>cbc:ID</code> <span>e-Invoice number</span></li>
            <li><code>cbc:InvoiceTypeCode</code> <span>01 · 02 · 03 · 04…</span></li>
            <li><code>cac:AccountingSupplierParty</code> <span>Supplier TIN / BRN</span></li>
            <li><code>cac:AccountingCustomerParty</code> <span>Buyer TIN / BRN</span></li>
            <li><code>cac:TaxTotal</code> <span>SST / tax totals</span></li>
            <li><code>cac:InvoiceLine</code> <span>Lines &amp; classification</span></li>
          </ul>
          <a href="<?= h(base_url('compliance/')) ?>" class="btn btn-outline w-full">
            Full compliance guide <?= icon_arrow() ?>
          </a>
        </div>
      </div>
    </div>

    <!-- Spec chips -->
    <div class="lhdn-chips">
      <div class="lhdn-chip">
        <strong>UBL 2.1</strong>
        <span>OASIS standard used by MyInvois</span>
      </div>
      <div class="lhdn-chip">
        <strong>XML + JSON</strong>
        <span>Both formats when schema-correct</span>
      </div>
      <div class="lhdn-chip">
        <strong>CTC model</strong>
        <span>Near real-time tax reporting</span>
      </div>
      <div class="lhdn-chip">
        <strong>UUID · signed</strong>
        <span>IRBM validation response + QR</span>
      </div>
    </div>
  </div>
</section>
