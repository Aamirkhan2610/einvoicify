(function () {
  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var mobile = document.getElementById("nav-mobile");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobile) {
    var menuIcon = toggle.querySelector(".icon-menu");
    var closeIcon = toggle.querySelector(".icon-close");

    toggle.addEventListener("click", function () {
      var open = !mobile.classList.contains("hidden");
      if (open) {
        mobile.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        if (menuIcon) menuIcon.classList.remove("hidden");
        if (closeIcon) closeIcon.classList.add("hidden");
        document.body.style.overflow = "";
      } else {
        mobile.classList.remove("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        if (menuIcon) menuIcon.classList.add("hidden");
        if (closeIcon) closeIcon.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      }
    });

    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.classList.add("hidden");
        document.body.style.overflow = "";
        if (menuIcon) menuIcon.classList.remove("hidden");
        if (closeIcon) closeIcon.classList.add("hidden");
      });
    });
  }
})();
