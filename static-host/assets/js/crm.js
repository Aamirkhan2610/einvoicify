(function () {
  var cfg = window.EINVOICIFY || {};
  var apiBase = (cfg.apiBase || "/api") + "/crm";
  var basePath = cfg.basePath || "";

  function url(path) {
    return (basePath || "") + path;
  }

  function api(path, options) {
    return fetch(apiBase + path, Object.assign({ credentials: "same-origin" }, options || {})).then(
      function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, status: r.status, data: d };
        });
      }
    );
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function fmtDate(s) {
    try {
      return new Date(s).toLocaleString("en-MY");
    } catch (e) {
      return s || "";
    }
  }

  async function logout() {
    await api("/logout.php", { method: "POST" });
    window.location.href = url("/crm/login.php");
  }

  window.EinvoicifyCrm = {
    api: api,
    logout: logout,
    esc: esc,
    fmtDate: fmtDate,
    url: url,
  };

  // Login page
  var loginForm = document.getElementById("crm-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("login-error");
      if (err) {
        err.classList.add("hidden");
        err.textContent = "";
      }
      var btn = loginForm.querySelector('[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Signing in…";
      }
      var fd = new FormData(loginForm);
      api("/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fd.get("email"),
          password: fd.get("password"),
        }),
      })
        .then(function (res) {
          if (!res.ok) {
            if (err) {
              err.classList.remove("hidden");
              err.textContent = res.data.error || "Invalid email or password";
            }
            if (btn) {
              btn.disabled = false;
              btn.textContent = "Sign in";
            }
            return;
          }
          window.location.href = url("/crm/");
        })
        .catch(function () {
          if (err) {
            err.classList.remove("hidden");
            err.textContent = "Network error. Please try again.";
          }
          if (btn) {
            btn.disabled = false;
            btn.textContent = "Sign in";
          }
        });
    });
  }

  // Bind logout buttons
  document.querySelectorAll("[data-crm-logout]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      logout();
    });
  });

  // Dashboard
  if (document.getElementById("crm-dashboard")) {
    api("/stats.php").then(function (res) {
      if (res.status === 401) {
        window.location.href = url("/crm/login.php");
        return;
      }
      if (!res.ok) return;
      var d = res.data;
      setText("stat-enquiries-new", d.enquiriesNew);
      setText("stat-enquiries-total", d.enquiriesTotal + " total");
      setText("stat-demos-new", d.demosNew);
      setText("stat-demos-total", d.demosTotal + " total");
      setText("stat-chats-open", d.chatsOpen);
      setText("stat-chats-total", d.chatsTotal + " conversations");
      setText("stat-messages-today", d.messagesToday);

      var leads = document.getElementById("recent-leads");
      if (leads) {
        if (!d.recentEnquiries || !d.recentEnquiries.length) {
          leads.innerHTML =
            '<li class="empty">No enquiries yet. They appear from the contact form or chat.</li>';
        } else {
          leads.innerHTML = d.recentEnquiries
            .map(function (e) {
              return (
                '<li><div class="row"><div style="min-width:0"><p class="name">' +
                esc(e.name) +
                (e.company ? ' <span style="font-weight:400;color:var(--slate-500)">· ' + esc(e.company) + "</span>" : "") +
                '</p><p class="meta">' +
                esc(e.email) +
                " · " +
                esc(e.type) +
                '</p><p class="snippet">' +
                esc(e.message) +
                '</p></div><span class="status-pill">' +
                esc(e.status) +
                "</span></div></li>"
              );
            })
            .join("");
        }
      }

      var chats = document.getElementById("recent-chats");
      if (chats) {
        if (!d.recentChats || !d.recentChats.length) {
          chats.innerHTML =
            '<li class="empty">No chats yet. Visitors use the chat widget on the website.</li>';
        } else {
          chats.innerHTML = d.recentChats
            .map(function (c) {
              var last =
                c.messages && c.messages[0] ? c.messages[0].body : "";
              return (
                '<li><a href="' +
                url("/crm/chats.php?id=" + encodeURIComponent(c.id)) +
                '" style="display:block"><div class="row"><div style="min-width:0"><p class="name">' +
                esc(c.visitorName || "Visitor") +
                (c.company ? ' <span style="font-weight:400;color:var(--slate-500)">· ' + esc(c.company) + "</span>" : "") +
                '</p><p class="meta">' +
                esc(c.topic || "General") +
                " · " +
                esc(c.visitorEmail) +
                '</p><p class="snippet">' +
                esc(last) +
                '</p></div><span class="status-pill blue">' +
                esc(c.status) +
                "</span></div></a></li>"
              );
            })
            .join("");
        }
      }
    });
  }

  // Leads
  if (document.getElementById("crm-leads")) {
    var statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "CLOSED"];
    var enquiries = [];
    var demos = [];
    var tab = "enquiries";

    function loadLeads() {
      var loading = document.getElementById("leads-loading");
      if (loading) loading.classList.remove("hidden");
      api("/leads.php").then(function (res) {
        if (res.status === 401) {
          window.location.href = url("/crm/login.php");
          return;
        }
        if (loading) loading.classList.add("hidden");
        enquiries = res.data.enquiries || [];
        demos = res.data.demos || [];
        document.getElementById("tab-enquiries-count").textContent = enquiries.length;
        document.getElementById("tab-demos-count").textContent = demos.length;
        renderLeads();
      });
    }

    function renderLeads() {
      var enqWrap = document.getElementById("enquiries-table");
      var demWrap = document.getElementById("demos-table");
      if (tab === "enquiries") {
        enqWrap.classList.remove("hidden");
        demWrap.classList.add("hidden");
        var body = document.getElementById("enquiries-body");
        if (!enquiries.length) {
          body.innerHTML =
            '<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--slate-500)">No enquiries yet.</td></tr>';
        } else {
          body.innerHTML = enquiries
            .map(function (e) {
              return (
                "<tr><td><p style='margin:0;font-weight:600;color:var(--brand-navy)'>" +
                esc(e.name) +
                "</p><p style='margin:0;font-size:.75rem;color:var(--slate-500)'>" +
                esc(e.email) +
                "</p>" +
                (e.company
                  ? "<p style='margin:0;font-size:.75rem;color:var(--slate-500)'>" +
                    esc(e.company) +
                    "</p>"
                  : "") +
                (e.phone
                  ? "<p style='margin:0;font-size:.75rem;color:var(--slate-500)'>" +
                    esc(e.phone) +
                    "</p>"
                  : "") +
                '</td><td><span class="type-pill">' +
                esc(e.type) +
                '</span><p style="margin:.25rem 0 0;font-size:.6875rem;color:var(--slate-400)">' +
                esc(e.source) +
                '</p></td><td style="max-width:16rem;font-size:.75rem;color:var(--slate-600);line-height:1.5">' +
                esc(e.message) +
                '</td><td><select data-kind="enquiry" data-id="' +
                esc(e.id) +
                '">' +
                statuses
                  .map(function (s) {
                    return (
                      '<option value="' +
                      s +
                      '"' +
                      (e.status === s ? " selected" : "") +
                      ">" +
                      s +
                      "</option>"
                    );
                  })
                  .join("") +
                '</select></td><td style="white-space:nowrap;font-size:.75rem;color:var(--slate-500)">' +
                esc(fmtDate(e.createdAt)) +
                "</td></tr>"
              );
            })
            .join("");
        }
      } else {
        enqWrap.classList.add("hidden");
        demWrap.classList.remove("hidden");
        var dbody = document.getElementById("demos-body");
        if (!demos.length) {
          dbody.innerHTML =
            '<tr><td colspan="4" style="text-align:center;padding:3rem;color:var(--slate-500)">No demo requests yet.</td></tr>';
        } else {
          dbody.innerHTML = demos
            .map(function (d) {
              return (
                "<tr><td><p style='margin:0;font-weight:600;color:var(--brand-navy)'>" +
                esc(d.name) +
                "</p><p style='margin:0;font-size:.75rem;color:var(--slate-500)'>" +
                esc(d.email) +
                "</p></td><td><p style='margin:0'>" +
                esc(d.company) +
                "</p><p style='margin:0;font-size:.75rem;color:var(--slate-500)'>" +
                esc(d.erpSystem || "ERP not specified") +
                '</p></td><td><select data-kind="demo" data-id="' +
                esc(d.id) +
                '">' +
                statuses
                  .map(function (s) {
                    return (
                      '<option value="' +
                      s +
                      '"' +
                      (d.status === s ? " selected" : "") +
                      ">" +
                      s +
                      "</option>"
                    );
                  })
                  .join("") +
                '</select></td><td style="white-space:nowrap;font-size:.75rem;color:var(--slate-500)">' +
                esc(fmtDate(d.createdAt)) +
                "</td></tr>"
              );
            })
            .join("");
        }
      }

      document.querySelectorAll("select[data-id]").forEach(function (sel) {
        sel.addEventListener("change", function () {
          api("/leads.php", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: sel.getAttribute("data-id"),
              kind: sel.getAttribute("data-kind"),
              status: sel.value,
            }),
          }).then(loadLeads);
        });
      });
    }

    document.querySelectorAll("[data-leads-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        tab = btn.getAttribute("data-leads-tab");
        document.querySelectorAll("[data-leads-tab]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        renderLeads();
      });
    });

    loadLeads();
  }

  // Chats
  if (document.getElementById("crm-chats")) {
    var selectedId = new URLSearchParams(window.location.search).get("id");
    var conversations = [];
    var active = null;
    var statusesC = ["OPEN", "PENDING", "RESOLVED", "CLOSED"];

    function loadList() {
      return api("/conversations.php").then(function (res) {
        if (res.status === 401) {
          window.location.href = url("/crm/login.php");
          return;
        }
        conversations = res.data.conversations || [];
        renderList();
      });
    }

    function loadOne(id) {
      return api("/conversations.php?id=" + encodeURIComponent(id)).then(
        function (res) {
          if (res.status === 401) {
            window.location.href = url("/crm/login.php");
            return;
          }
          if (!res.ok) return;
          active = res.data.conversation;
          renderThread();
        }
      );
    }

    function renderList() {
      var list = document.getElementById("chats-list");
      var loading = document.getElementById("chats-loading");
      if (loading) loading.classList.add("hidden");
      if (!conversations.length) {
        list.innerHTML =
          '<p style="padding:3rem 1rem;text-align:center;font-size:.875rem;color:var(--slate-500)">No conversations yet.</p>';
        return;
      }
      list.innerHTML = conversations
        .map(function (c) {
          return (
            '<button type="button" class="chat-item' +
            (selectedId === c.id ? " is-active" : "") +
            '" data-chat-id="' +
            esc(c.id) +
            '"><div class="row"><div style="min-width:0"><p class="name">' +
            esc(c.visitorName || "Visitor") +
            '</p><p class="meta">' +
            esc(c.topic || "General") +
            " · " +
            esc(c.visitorEmail) +
            '</p></div><span class="status-pill blue">' +
            esc(c.status) +
            "</span></div></button>"
          );
        })
        .join("");
      list.querySelectorAll("[data-chat-id]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          selectedId = btn.getAttribute("data-chat-id");
          history.replaceState(null, "", "?id=" + encodeURIComponent(selectedId));
          loadOne(selectedId);
          renderList();
        });
      });
    }

    function renderThread() {
      var empty = document.getElementById("chat-thread-empty");
      var thread = document.getElementById("chat-thread");
      if (!active) {
        empty.classList.remove("hidden");
        thread.classList.add("hidden");
        return;
      }
      empty.classList.add("hidden");
      thread.classList.remove("hidden");
      document.getElementById("thread-name").textContent =
        active.visitorName || "Visitor";
      document.getElementById("thread-meta").textContent =
        (active.topic || "General") +
        " · " +
        (active.visitorEmail || "") +
        (active.company ? " · " + active.company : "");
      var sel = document.getElementById("thread-status");
      sel.innerHTML = statusesC
        .map(function (s) {
          return (
            '<option value="' +
            s +
            '"' +
            (active.status === s ? " selected" : "") +
            ">" +
            s +
            "</option>"
          );
        })
        .join("");
      var msgs = document.getElementById("thread-messages");
      msgs.innerHTML = (active.messages || [])
        .map(function (m) {
          var cls =
            m.sender === "CUSTOMER"
              ? "customer"
              : m.sender === "AGENT"
                ? "agent"
                : "system";
          var who =
            m.sender === "CUSTOMER"
              ? "Customer"
              : m.sender === "AGENT"
                ? m.agentName || "Agent"
                : "System";
          return (
            '<div class="chat-msg ' +
            cls +
            '"><span class="meta">' +
            esc(who) +
            " · " +
            esc(fmtDate(m.createdAt)) +
            "</span>" +
            esc(m.body) +
            "</div>"
          );
        })
        .join("");
      msgs.scrollTop = msgs.scrollHeight;
    }

    document.getElementById("thread-status").addEventListener("change", function () {
      if (!active) return;
      api("/conversations.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: active.id, status: this.value }),
      }).then(function () {
        loadOne(active.id);
        loadList();
      });
    });

    document.getElementById("thread-reply-form").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!active) return;
      var input = document.getElementById("thread-reply");
      var body = input.value.trim();
      if (!body) return;
      var btn = e.target.querySelector('[type="submit"]');
      btn.disabled = true;
      api("/conversations.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: active.id, body: body }),
      }).then(function (res) {
        btn.disabled = false;
        if (res.ok) {
          input.value = "";
          loadOne(active.id);
          loadList();
        }
      });
    });

    loadList().then(function () {
      if (selectedId) loadOne(selectedId);
    });
    setInterval(function () {
      loadList();
      if (selectedId) loadOne(selectedId);
    }, 5000);
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // Auth gate for CRM pages that need session
  if (document.body.getAttribute("data-crm-auth") === "1") {
    api("/me.php").then(function (res) {
      if (res.status === 401) {
        window.location.href = url("/crm/login.php");
        return;
      }
      if (res.ok && res.data.admin) {
        document.querySelectorAll("[data-admin-name]").forEach(function (el) {
          el.textContent = res.data.admin.name;
        });
      }
    });
  }
})();
