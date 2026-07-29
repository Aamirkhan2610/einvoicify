(function () {
  var cfg = window.EINVOICIFY || {};
  var apiBase = cfg.apiBase || "/api";
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var tabs = document.querySelectorAll("[data-form-tab]");
  var demoOnly = document.querySelectorAll("[data-demo-only]");
  var contactOnly = document.querySelectorAll("[data-contact-only]");
  var formTypeInput = form.querySelector('[name="formType"]');

  function setTab(type) {
    if (formTypeInput) formTypeInput.value = type;
    tabs.forEach(function (t) {
      t.classList.toggle("is-active", t.getAttribute("data-form-tab") === type);
    });
    demoOnly.forEach(function (el) {
      el.style.display = type === "demo" ? "" : "none";
      el.querySelectorAll("input,select,textarea").forEach(function (i) {
        if (type === "demo" && i.hasAttribute("data-required")) i.required = true;
        else i.required = false;
      });
    });
    contactOnly.forEach(function (el) {
      el.style.display = type === "contact" ? "" : "none";
    });
    var msg = form.querySelector('[name="message"]');
    if (msg && type === "demo" && !msg.value.trim()) {
      msg.value =
        "I would like to schedule a product demo and discuss LHDN e-invoice automation for our business.";
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      setTab(t.getAttribute("data-form-tab"));
    });
  });

  setTab(formTypeInput ? formTypeInput.value : "contact");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (statusEl) {
      statusEl.className = "form-msg";
      statusEl.textContent = "";
      statusEl.classList.add("hidden");
    }
    form.querySelectorAll(".field-error").forEach(function (n) {
      n.remove();
    });

    var fd = new FormData(form);
    var type = fd.get("formType") || "contact";
    var endpoint = type === "demo" ? "/demo.php" : "/contact.php";
    var payload =
      type === "demo"
        ? {
            name: fd.get("name"),
            email: fd.get("email"),
            phone: fd.get("phone"),
            company: fd.get("company"),
            jobTitle: fd.get("jobTitle"),
            erpSystem: fd.get("erpSystem"),
            monthlyInvoices: fd.get("monthlyInvoices"),
            turnoverBand: fd.get("turnoverBand"),
            notes: fd.get("notes") || fd.get("message"),
          }
        : {
            name: fd.get("name"),
            email: fd.get("email"),
            phone: fd.get("phone"),
            company: fd.get("company"),
            message: fd.get("message"),
            turnoverBand: fd.get("turnoverBand"),
            erpSystem: fd.get("erpSystem"),
            type: fd.get("enquiryType") || "GENERAL",
          };

    var btn = form.querySelector('[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending…";
    }

    fetch(apiBase + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, status: r.status, data: d };
        });
      })
      .then(function (res) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Send message";
        }
        if (!res.ok) {
          if (res.data.details) {
            Object.keys(res.data.details).forEach(function (key) {
              var field = form.querySelector('[name="' + key + '"]');
              if (!field) return;
              var err = document.createElement("div");
              err.className = "field-error";
              err.textContent = res.data.details[key][0] || "Invalid";
              field.parentNode.appendChild(err);
            });
          }
          if (statusEl) {
            statusEl.classList.remove("hidden");
            statusEl.className = "form-msg error";
            statusEl.textContent =
              res.data.error ||
              "Unable to send. Please email " + (cfg.contactEmail || "info@einvoicify.my");
          }
          return;
        }
        if (statusEl) {
          statusEl.classList.remove("hidden");
          statusEl.className = "form-msg success";
          statusEl.textContent =
            type === "demo"
              ? "Demo request received. Our team will contact you shortly."
              : "Thank you — your enquiry was received. We will get back to you soon.";
        }
        form.reset();
        if (formTypeInput) formTypeInput.value = type;
        setTab(type);
      })
      .catch(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Send message";
        }
        if (statusEl) {
          statusEl.classList.remove("hidden");
          statusEl.className = "form-msg error";
          statusEl.textContent =
            "Network error. Please email " + (cfg.contactEmail || "info@einvoicify.my");
        }
      });
  });
})();
