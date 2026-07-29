(function () {
  /* ---- LHDN syntax tabs ---- */
  var tabs = document.querySelectorAll("[data-syntax-tab]");
  var panes = document.querySelectorAll("[data-syntax-pane]");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var id = tab.getAttribute("data-syntax-tab");
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      panes.forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-syntax-pane") === id);
      });
    });
  });

  /* ---- Document type picker ---- */
  var docBtns = document.querySelectorAll(".doc-type");
  var codeEl = document.getElementById("doc-detail-code");
  var nameEl = document.getElementById("doc-detail-name");
  var descEl = document.getElementById("doc-detail-desc");
  docBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      docBtns.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      if (codeEl) codeEl.textContent = btn.getAttribute("data-code") || "";
      if (nameEl) nameEl.textContent = btn.getAttribute("data-name") || "";
      if (descEl) descEl.textContent = btn.getAttribute("data-desc") || "";
    });
  });

  /* ---- Animated pipeline ---- */
  var pipeSteps = document.querySelectorAll(".pipe-step");
  if (pipeSteps.length) {
    var pipeIdx = 0;
    setInterval(function () {
      pipeIdx = (pipeIdx + 1) % pipeSteps.length;
      pipeSteps.forEach(function (s, i) {
        s.classList.toggle("is-active", i === pipeIdx);
        s.classList.toggle("is-done", i < pipeIdx);
      });
    }, 2200);
  }

  /* ---- Impact case tabs ---- */
  function activateImpact(id) {
    document.querySelectorAll("[data-impact-tab]").forEach(function (t) {
      var on = t.getAttribute("data-impact-tab") === id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll("[data-impact-panel]").forEach(function (p) {
      var on = p.getAttribute("data-impact-panel") === id;
      p.classList.toggle("is-active", on);
      if (on) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "");
    });
    document.querySelectorAll("[data-impact-jump]").forEach(function (c) {
      c.classList.toggle("is-active", c.getAttribute("data-impact-jump") === id);
    });
  }

  document.querySelectorAll("[data-impact-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      activateImpact(tab.getAttribute("data-impact-tab"));
    });
  });
  document.querySelectorAll("[data-impact-jump]").forEach(function (card) {
    card.addEventListener("click", function () {
      var id = card.getAttribute("data-impact-jump");
      activateImpact(id);
      var panel = document.querySelector('[data-impact-panel="' + id + '"]');
      if (panel) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Mark first impact card active
  var firstJump = document.querySelector("[data-impact-jump]");
  if (firstJump) firstJump.classList.add("is-active");
})();
