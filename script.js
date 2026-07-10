(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Splash ---------- */
  var splash = document.getElementById("splash");
  var body = document.body;
  body.classList.add("splash-active");

  var entered = false;
  function enterSite() {
    if (entered) return;
    entered = true;
    splash.classList.add("splash--leaving");
    window.setTimeout(function () {
      splash.style.display = "none";
      body.classList.remove("splash-active");
    }, reduceMotion ? 0 : 800);
  }

  splash.addEventListener("click", enterSite);
  splash.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") enterSite();
  });
  splash.addEventListener("wheel", enterSite, { passive: true });
  splash.addEventListener("touchmove", enterSite, { passive: true });
  window.setTimeout(enterSite, 16000);

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var menuClose = document.getElementById("menuClose");
  var navOverlay = document.getElementById("navOverlay");

  function openMenu() {
    navOverlay.classList.add("is-open");
    navOverlay.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    navOverlay.classList.remove("is-open");
    navOverlay.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  navOverlay.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
})();
