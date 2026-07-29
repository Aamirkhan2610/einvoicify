(function () {
  var cfg = window.EINVOICIFY || {};
  var apiBase = cfg.apiBase || "/api";
  var STORAGE_KEY = "einvoicify_chat_session";
  var root = document.getElementById("chat-root");
  if (!root) return;

  var topics = [
    "Pricing inquiry",
    "Portal access",
    "SFTP upload",
    "API / ePINTAR",
    "QAD integration",
    "LHDN compliance",
    "Product demo",
    "Other",
  ];

  var state = {
    open: false,
    step: "intro",
    loading: false,
    sending: false,
    error: null,
    sessionId: localStorage.getItem(STORAGE_KEY) || null,
    messages: [],
    form: {
      name: "",
      email: "",
      phone: "",
      company: "",
      topic: "Pricing inquiry",
      message: "",
    },
    reply: "",
  };

  var pollTimer = null;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    var html = '<div class="chat-launcher">';
    if (state.open) {
      html += '<div class="chat-panel">';
      html +=
        '<div class="chat-head gradient-brand">' +
        '<div class="chat-head-left">' +
        '<div class="chat-avatar"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></div>' +
        "<div><h3>Chat with Einvoicify</h3><p>Product · pricing · e-invoice help</p></div></div>" +
        '<div class="chat-head-actions">' +
        (state.step === "chat"
          ? '<button type="button" class="text-btn" data-action="new">New</button>'
          : "") +
        '<button type="button" data-action="close" aria-label="Minimize chat"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg></button>' +
        "</div></div>";

      if (state.step === "intro") {
        html +=
          '<form class="chat-body" id="chat-start-form">' +
          '<p class="intro">Ask about the product, pricing, ERP integration, or LHDN compliance. Our team will respond in this chat and in CRM.</p>' +
          '<div class="field"><label>Name *</label><input name="name" required value="' +
          esc(state.form.name) +
          '" /></div>' +
          '<div class="field"><label>Email *</label><input name="email" type="email" required value="' +
          esc(state.form.email) +
          '" /></div>' +
          '<div class="field"><label>Phone</label><input name="phone" value="' +
          esc(state.form.phone) +
          '" /></div>' +
          '<div class="field"><label>Company</label><input name="company" value="' +
          esc(state.form.company) +
          '" /></div>' +
          '<div class="field"><label>Topic</label><select name="topic">';
        topics.forEach(function (t) {
          html +=
            '<option value="' +
            esc(t) +
            '"' +
            (state.form.topic === t ? " selected" : "") +
            ">" +
            esc(t) +
            "</option>";
        });
        html +=
          "</select></div>" +
          '<div class="field"><label>Message *</label><textarea name="message" required rows="3">' +
          esc(state.form.message) +
          "</textarea></div>" +
          (state.error ? '<p class="chat-error">' + esc(state.error) + "</p>" : "") +
          '<button type="submit" class="btn btn-primary w-full" ' +
          (state.loading ? "disabled" : "") +
          ">" +
          (state.loading ? "Starting…" : "Start chat") +
          "</button></form>";
      } else {
        html += '<div class="chat-body" id="chat-messages">';
        state.messages.forEach(function (m) {
          var cls =
            m.sender === "CUSTOMER"
              ? "customer"
              : m.sender === "AGENT"
                ? "agent"
                : "system";
          var who =
            m.sender === "CUSTOMER"
              ? "You"
              : m.sender === "AGENT"
                ? m.agentName || "Agent"
                : "System";
          html +=
            '<div class="chat-msg ' +
            cls +
            '"><span class="meta">' +
            esc(who) +
            "</span>" +
            esc(m.body) +
            "</div>";
        });
        html += "</div>";
        if (state.error) html += '<p class="chat-error" style="padding:0 1rem">' + esc(state.error) + "</p>";
        html +=
          '<form class="chat-foot" id="chat-reply-form">' +
          '<input name="reply" placeholder="Type a message…" value="' +
          esc(state.reply) +
          '" ' +
          (state.sending ? "disabled" : "") +
          " />" +
          '<button type="submit" ' +
          (state.sending || !state.reply.trim() ? "disabled" : "") +
          ' aria-label="Send"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></form>';
      }
      html += "</div>";
    }

    html +=
      '<button type="button" class="chat-fab" data-action="toggle" aria-label="Open chat">' +
      (state.open
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>Chat</span>') +
      "</button></div>";

    root.innerHTML = html;
    bind();
    scrollBottom();
  }

  function bind() {
    root.querySelectorAll("[data-action]").forEach(function (el) {
      el.addEventListener("click", function () {
        var a = el.getAttribute("data-action");
        if (a === "toggle") {
          state.open = !state.open;
          if (state.open && state.sessionId) {
            state.step = "chat";
            loadMessages();
            startPoll();
          } else stopPoll();
          render();
        } else if (a === "close") {
          state.open = false;
          stopPoll();
          render();
        } else if (a === "new") {
          localStorage.removeItem(STORAGE_KEY);
          state.sessionId = null;
          state.messages = [];
          state.step = "intro";
          state.error = null;
          stopPoll();
          render();
        }
      });
    });

    var startForm = document.getElementById("chat-start-form");
    if (startForm) {
      startForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(startForm);
        state.form = {
          name: fd.get("name") || "",
          email: fd.get("email") || "",
          phone: fd.get("phone") || "",
          company: fd.get("company") || "",
          topic: fd.get("topic") || "Pricing inquiry",
          message: fd.get("message") || "",
        };
        startChat();
      });
    }

    var replyForm = document.getElementById("chat-reply-form");
    if (replyForm) {
      var input = replyForm.querySelector('input[name="reply"]');
      if (input) {
        input.addEventListener("input", function () {
          state.reply = input.value;
        });
      }
      replyForm.addEventListener("submit", function (e) {
        e.preventDefault();
        sendReply();
      });
    }
  }

  function scrollBottom() {
    var box = document.getElementById("chat-messages");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function startPoll() {
    stopPoll();
    if (!state.sessionId) return;
    pollTimer = setInterval(loadMessages, 5000);
  }

  function stopPoll() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function loadMessages() {
    if (!state.sessionId) return;
    fetch(apiBase + "/chat.php?sessionId=" + encodeURIComponent(state.sessionId))
      .then(function (r) {
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (data) {
        if (!data) return;
        state.messages = data.messages || [];
        state.step = "chat";
        render();
      })
      .catch(function () {});
  }

  function startChat() {
    state.loading = true;
    state.error = null;
    render();
    var body = Object.assign({}, state.form);
    if (state.sessionId) body.sessionId = state.sessionId;
    fetch(apiBase + "/chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        state.loading = false;
        if (!res.ok) {
          state.error = res.data.error || "Unable to start chat";
          render();
          return;
        }
        state.sessionId = res.data.sessionId;
        localStorage.setItem(STORAGE_KEY, state.sessionId);
        state.messages = res.data.messages || [];
        state.step = "chat";
        state.form.message = "";
        startPoll();
        render();
      })
      .catch(function () {
        state.loading = false;
        state.error =
          "Network error. Please try again or email " +
          (cfg.contactEmail || "info@einvoicify.my");
        render();
      });
  }

  function sendReply() {
    if (!state.sessionId || !state.reply.trim()) return;
    state.sending = true;
    state.error = null;
    var body = state.reply.trim();
    state.reply = "";
    render();
    fetch(apiBase + "/chat.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: state.sessionId, body: body }),
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        state.sending = false;
        if (!res.ok) {
          state.error = res.data.error || "Failed to send";
          state.reply = body;
          render();
          return;
        }
        return loadMessages();
      })
      .catch(function () {
        state.sending = false;
        state.error = "Failed to send message";
        state.reply = body;
        render();
      });
  }

  // Resume existing session quietly
  if (state.sessionId) {
    state.step = "chat";
  }

  render();
})();
