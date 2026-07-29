<?php
require_once dirname(__DIR__) . '/includes/config.php';
$pageTitle = 'Case studies | ' . SITE_NAME;
$pageDescription = 'Einvoicify and IOS customer stories — manufacturing, retail, professional services, and healthcare e-invoice projects in Malaysia.';
$activeNav = 'cases';
require dirname(__DIR__) . '/includes/head.php';
require dirname(__DIR__) . '/includes/header.php';

$cases = [
  [
    'industry' => 'Manufacturing',
    'company' => 'Mid-sized manufacturer · Selangor',
    'title' => 'From weekend portal work to automatic e-invoices',
    'summary' => 'A manufacturing team processing thousands of invoices monthly stopped re-typing into the government portal by connecting their ERP through IOS e-invoice solutions.',
    'challenge' => 'Finance staff spent many hours each week re-keying invoices. Errors caused delays and customer delivery lagged.',
    'solution' => 'We linked their ERP so invoices flow automatically, get checked, submitted, and emailed to customers.',
    'quote' => 'We stopped treating e-invoice as a separate project. It became part of normal month-end — quiet and reliable.',
    'role' => 'Finance Controller',
    'tags' => ['ERP link', 'High volume', 'Manufacturing'],
  ],
  [
    'industry' => 'Retail',
    'company' => 'Multi-outlet retail chain · Klang Valley',
    'title' => 'One process for 28 outlets — stores kept selling',
    'summary' => 'A retail group needed e-invoice compliance without changing every store’s day-to-day sales system.',
    'challenge' => 'Invoice data was scattered. Head office struggled to know what was submitted and what still needed attention.',
    'solution' => 'Nightly file uploads and clear rules for when to use individual vs consolidated e-invoices — managed from one place.',
    'quote' => 'Our stores kept selling. Head office finally had one view of every e-invoice status.',
    'role' => 'Head of Finance',
    'tags' => ['Retail', 'File upload', 'Multi-outlet'],
  ],
  [
    'industry' => 'Professional services',
    'company' => 'Advisory & consulting firm · KL',
    'title' => 'Live on e-invoice in days with the portal',
    'summary' => 'A growing firm without a big ERP used Einvoicify’s portal to issue compliant invoices quickly.',
    'challenge' => 'Word and spreadsheet invoices could not meet LHDN requirements. Partners needed something simple.',
    'solution' => 'Portal access with simple invoice entry, automatic submission, and branded email to clients.',
    'quote' => 'We did not need a six-month software programme. We needed invoices our clients receive the same day.',
    'role' => 'Managing Partner',
    'tags' => ['SME', 'Portal', 'Fast start'],
  ],
  [
    'industry' => 'Healthcare',
    'company' => 'Private healthcare group · Malaysia',
    'title' => 'Clinical billing and finance finally aligned',
    'summary' => 'A healthcare operator connected clinical billing with finance so corporate invoices met e-invoice rules without double entry.',
    'challenge' => 'Incomplete buyer details caused rejections and slowed corporate billing cycles.',
    'solution' => 'System connection to enrich data, submit e-invoices, and keep a clear trail for audit and collections.',
    'quote' => 'Compliance stopped being a fire drill between operations and finance.',
    'role' => 'Group CFO',
    'tags' => ['Healthcare', 'System link', 'API'],
  ],
];
?>
<section class="page-hero">
  <div class="bg-hero-glow">
    <div class="container page-hero-inner">
      <div class="section-heading center">
        <p class="eyebrow">Case studies</p>
        <h1>Real teams. Clearer e-invoice days.</h1>
        <p>Stories inspired by how Malaysian businesses use IOS e-invoice solutions — manufacturing, retail, services, and healthcare.</p>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/widgets/case-impact.php'; ?>

<section class="section section-white">
  <div class="container">
    <div class="section-heading center">
      <p class="eyebrow">In more detail</p>
      <h2>Challenge, solution &amp; outcome</h2>
    </div>
    <div class="cards-2 mt-8">
      <?php foreach ($cases as $c): ?>
        <article class="case-card">
          <p class="industry"><?= h($c['industry']) ?></p>
          <h3><?= h($c['title']) ?></h3>
          <p class="summary"><?= h($c['summary']) ?></p>
          <p class="desc mt-4"><strong>Challenge:</strong> <?= h($c['challenge']) ?></p>
          <p class="desc"><strong>Solution:</strong> <?= h($c['solution']) ?></p>
          <blockquote class="desc mt-4" style="border-left:3px solid var(--brand-blue);padding-left:1rem;font-style:italic;color:var(--slate-700)">
            “<?= h($c['quote']) ?>” — <?= h($c['role']) ?>
          </blockquote>
          <p class="case-meta"><?= h($c['company']) ?></p>
          <div class="case-tags">
            <?php foreach ($c['tags'] as $t): ?><span><?= h($t) ?></span><?php endforeach; ?>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<section class="cta-band">
  <div class="container">
    <div class="cta-box gradient-brand">
      <h2>Want a path like these teams?</h2>
      <p>Tell us your ERP, invoice volume, and timeline. We will recommend the simplest next step.</p>
      <div class="cta-actions">
        <a href="<?= h(base_url('contact/')) ?>" class="btn btn-white btn-lg">Talk to us</a>
        <a href="<?= h(PRODUCT_URL) ?>" class="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">Try the demo</a>
      </div>
    </div>
  </div>
</section>
<?php require dirname(__DIR__) . '/includes/footer.php'; ?>
