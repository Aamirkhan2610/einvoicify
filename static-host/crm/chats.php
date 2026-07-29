<?php
$crmActive = 'chats';
$pageTitle = 'Chats | Einvoicify CRM';
require __DIR__ . '/includes/shell-start.php';
?>
<div id="crm-chats">
  <h1>Chats</h1>
  <p class="subtitle">Live website conversations — product questions, pricing, and support.</p>

  <div class="chats-layout">
    <div class="chats-list" id="chats-list">
      <div id="chats-loading" class="loading"><div class="spinner"></div></div>
    </div>
    <div class="chat-thread-pane">
      <div class="chat-thread-empty" id="chat-thread-empty">
        Select a conversation to reply
      </div>
      <div class="chat-thread hidden" id="chat-thread">
        <div class="chat-thread-head">
          <div>
            <p id="thread-name" style="margin:0;font-weight:700;color:var(--brand-navy)"></p>
            <p id="thread-meta" style="margin:.25rem 0 0;font-size:.75rem;color:var(--slate-500)"></p>
          </div>
          <select id="thread-status" style="border-radius:.5rem;border:1px solid var(--slate-200);padding:.25rem .5rem;font-size:.75rem;font-weight:500"></select>
        </div>
        <div class="chat-thread-msgs" id="thread-messages"></div>
        <form class="chat-thread-foot" id="thread-reply-form">
          <input id="thread-reply" type="text" placeholder="Reply as agent…" autocomplete="off" />
          <button type="submit" class="btn btn-primary btn-sm">Send</button>
        </form>
      </div>
    </div>
  </div>
</div>
<?php require __DIR__ . '/includes/shell-end.php'; ?>
