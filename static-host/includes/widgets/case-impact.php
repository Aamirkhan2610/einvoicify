<?php
/**
 * Interactive case-study impact widget (CoAxn-style metrics + tags)
 * LHDN / e-invoice focused
 */
$impactCases = [
  [
    'id' => 'mfg',
    'tag' => 'Manufacturing · ERP · API',
    'title' => 'Weekend portal work → automatic e-invoices',
    'summary' => 'A Selangor manufacturer processing 4,000+ invoices monthly stopped re-keying into the government portal by connecting QAD through IOS e-invoice (API / hybrid).',
    'metrics' => [
      ['value' => '4k+', 'label' => 'invoices / month'],
      ['value' => 'High', 'label' => 'first-time accept'],
      ['value' => 'Mins', 'label' => 'to customer email'],
    ],
    'stack' => ['QAD', 'API', 'MyInvois', 'UBL 2.1', 'Einvoicify'],
    'points' => [
      'ERP line → validated UBL payload automatically',
      'IRBM UUID & status synced back to finance',
      'Email delivery after Valid response',
    ],
    'quote' => 'We stopped treating e-invoice as a separate project. It became part of normal month-end.',
    'role' => 'Finance Controller',
  ],
  [
    'id' => 'retail',
    'tag' => 'Retail · Multi-outlet · SFTP',
    'title' => '28 outlets covered — stores kept selling',
    'summary' => 'A Klang Valley retail group needed LHDN compliance without rewriting every POS. Nightly file uploads + clear consolidated vs individual rules.',
    'metrics' => [
      ['value' => '28', 'label' => 'outlets live'],
      ['value' => '0', 'label' => 'store disruption'],
      ['value' => '1', 'label' => 'finance dashboard'],
    ],
    'stack' => ['SFTP', 'CSV / XML', 'Portal', 'MyInvois', 'Head office'],
    'points' => [
      'Bulk file drop overnight — validated next morning',
      'Consolidated e-invoice rules where allowed',
      'Head-office visibility of every status',
    ],
    'quote' => 'Our stores kept selling. Head office finally had one view of every e-invoice status.',
    'role' => 'Head of Finance',
  ],
  [
    'id' => 'sme',
    'tag' => 'SME · Portal · Fast start',
    'title' => 'Live on e-invoice in ~2 weeks',
    'summary' => 'A KL professional services firm without a big ERP used the Einvoicify portal — partners issue compliant invoices the same day.',
    'metrics' => [
      ['value' => '~2w', 'label' => 'to go-live'],
      ['value' => '1', 'label' => 'training session'],
      ['value' => 'Auto', 'label' => 'client email'],
    ],
    'stack' => ['Portal', 'MyInvois', 'Email delivery', 'IOS support'],
    'points' => [
      'No six-month software programme',
      'Simple invoice entry + type codes 01/02',
      'Branded email after IRBM Valid',
    ],
    'quote' => 'We needed invoices our clients receive the same day — not a multi-month IT project.',
    'role' => 'Managing Partner',
  ],
  [
    'id' => 'health',
    'tag' => 'Healthcare · Integration · API',
    'title' => 'Clinical billing aligned with finance',
    'summary' => 'A private healthcare group reduced rejections by enriching buyer details and submitting corporate invoices with a clear audit trail.',
    'metrics' => [
      ['value' => '↓', 'label' => 'rejections'],
      ['value' => 'Faster', 'label' => 'billing cycle'],
      ['value' => 'Clear', 'label' => 'audit trail'],
    ],
    'stack' => ['API', 'Billing system', 'MyInvois', 'UBL', 'QR verify'],
    'points' => [
      'Buyer TIN / BRN enrichment before submit',
      'Credit notes linked to original UUID',
      'Collections team sees Valid / Rejected live',
    ],
    'quote' => 'Compliance stopped being a fire drill between operations and finance.',
    'role' => 'Group CFO',
  ],
];
?>
<section class="section section-muted widget-impact" id="impact-stories">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">Impact stories</p>
      <h2>LHDN e-invoice outcomes that matter</h2>
      <p>
        Real-world paths Malaysian teams take with IOS — portal, SFTP, or API — measured in time saved, fewer rejections, and cleaner month-end.
      </p>
    </div>

    <div class="impact-tabs" role="tablist" aria-label="Case study industries">
      <?php foreach ($impactCases as $i => $c): ?>
        <button
          type="button"
          class="impact-tab<?= $i === 0 ? ' is-active' : '' ?>"
          data-impact-tab="<?= h($c['id']) ?>"
          role="tab"
          aria-selected="<?= $i === 0 ? 'true' : 'false' ?>"
        ><?= h(explode(' · ', $c['tag'])[0]) ?></button>
      <?php endforeach; ?>
    </div>

    <?php foreach ($impactCases as $i => $c): ?>
      <article
        class="impact-panel<?= $i === 0 ? ' is-active' : '' ?>"
        data-impact-panel="<?= h($c['id']) ?>"
        role="tabpanel"
        <?= $i === 0 ? '' : 'hidden' ?>
      >
        <div class="impact-main">
          <p class="impact-tag"><?= h($c['tag']) ?></p>
          <h3><?= h($c['title']) ?></h3>
          <p class="impact-summary"><?= h($c['summary']) ?></p>

          <div class="impact-metrics">
            <?php foreach ($c['metrics'] as $m): ?>
              <div class="impact-metric">
                <p class="impact-value"><?= h($m['value']) ?></p>
                <p class="impact-label"><?= h($m['label']) ?></p>
              </div>
            <?php endforeach; ?>
          </div>

          <ul class="impact-points">
            <?php foreach ($c['points'] as $p): ?>
              <li><?= h($p) ?></li>
            <?php endforeach; ?>
          </ul>

          <div class="impact-stack">
            <?php foreach ($c['stack'] as $s): ?>
              <span><?= h($s) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <aside class="impact-aside">
          <blockquote>
            <p>“<?= h($c['quote']) ?>”</p>
            <footer>— <?= h($c['role']) ?></footer>
          </blockquote>
          <div class="impact-aside-actions">
            <a href="<?= h(base_url('case-studies/')) ?>" class="btn btn-outline">All case studies <?= icon_arrow() ?></a>
            <a href="<?= h(base_url('contact/')) ?>" class="btn btn-primary">Get a similar path</a>
          </div>
          <div class="impact-mini-flow" aria-hidden="true">
            <span>Source</span>
            <span class="flow-arrow">→</span>
            <span>UBL</span>
            <span class="flow-arrow">→</span>
            <span>MyInvois</span>
            <span class="flow-arrow">→</span>
            <span class="flow-ok">Valid</span>
          </div>
        </aside>
      </article>
    <?php endforeach; ?>

    <!-- Compact cards row for scanability -->
    <div class="impact-cards">
      <?php foreach ($impactCases as $c): ?>
        <button type="button" class="impact-card" data-impact-jump="<?= h($c['id']) ?>">
          <p class="impact-card-tag"><?= h(explode(' · ', $c['tag'])[0]) ?></p>
          <p class="impact-card-title"><?= h($c['title']) ?></p>
          <div class="impact-card-metrics">
            <?php foreach (array_slice($c['metrics'], 0, 2) as $m): ?>
              <span><strong><?= h($m['value']) ?></strong> <?= h($m['label']) ?></span>
            <?php endforeach; ?>
          </div>
        </button>
      <?php endforeach; ?>
    </div>
  </div>
</section>
