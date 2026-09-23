/* SRC Infraprojects — shared front-end behaviour (no build step, no dependencies) */
(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var ICONS = {
    crosshair: '<circle cx="12" cy="12" r="7"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    satellite: '<circle cx="12" cy="12" r="2.1"/><ellipse cx="12" cy="12" rx="9.2" ry="4" transform="rotate(35 12 12)"/><ellipse cx="12" cy="12" rx="9.2" ry="4" transform="rotate(-35 12 12)"/>',
    drone: '<circle cx="12" cy="12" r="2.3"/><line x1="12" y1="12" x2="5.2" y2="5.2"/><line x1="12" y1="12" x2="18.8" y2="5.2"/><line x1="12" y1="12" x2="5.2" y2="18.8"/><line x1="12" y1="12" x2="18.8" y2="18.8"/><circle cx="5.2" cy="5.2" r="2.1"/><circle cx="18.8" cy="5.2" r="2.1"/><circle cx="5.2" cy="18.8" r="2.1"/><circle cx="18.8" cy="18.8" r="2.1"/>',
    scan: '<path d="M4 12a8 8 0 0 1 16 0"/><path d="M7.3 12a4.7 4.7 0 0 1 9.4 0"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/><line x1="12" y1="12" x2="12" y2="21"/>',
    gis: '<path d="M9 4 4 6.2v13.8l5-2 6 2 5-2V4.2l-5 2-6-2Z"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6.2" x2="15" y2="20"/>',
    topo: '<path d="M2 16.5c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 11.3c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity=".45"/>',
    waves: '<path d="M2 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity=".5"/>',
    cube: '<path d="M12 3 20 7.4v9.2L12 21 4 16.6V7.4Z"/><path d="M12 3v18"/><path d="M4 7.4 12 12l8-4.6"/>',
    twincube: '<path d="M8 3 14 6.4v7L8 17 2 13.4v-7Z"/><path d="M8 3v14M2 6.4 8 10l6-3.6"/><path d="M16 7 22 10.4v7L16 21l-6-3.6v-7Z" opacity=".5"/>',
    doc: '<path d="M6 2h9l4 4v16H6Z"/><path d="M15 2v4h4"/><path d="M9 13l2 2 4-4"/>',
    layers: '<path d="M12 3 21 8 12 13 3 8Z"/><path d="M3 16.2l9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M8.5 7h1M8.5 11h1M8.5 15h1M14.5 7h1M14.5 11h1M14.5 15h1"/>',
    package: '<path d="M3 8 12 3l9 5-9 5-9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><line x1="8" y1="11.5" x2="16" y2="11.5"/><line x1="8" y1="15.5" x2="16" y2="15.5"/>',
    camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7 10 4h4l2 3"/><circle cx="12" cy="13.5" r="3.4"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.5 5.5l1.8 1.8M16.7 5.5l-1.8 1.8M5.5 18.5l1.8-1.8M16.7 18.5l-1.8-1.8"/>',
    send: '<path d="M3 12 20 4l-6 17-3-7-8-2Z"/>',
    search: '<circle cx="10.3" cy="10.3" r="6.3"/><line x1="19" y1="19" x2="14.8" y2="14.8"/>',
    database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    arrowRight: '<line x1="4" y1="12" x2="19" y2="12"/><path d="M13 6l7 6-7 6"/>',
    arrowUpRight: '<line x1="6" y1="18" x2="18" y2="6"/><path d="M9 6h9v9"/>',
    chevronRight: '<path d="M9 5l7 7-7 7"/>',
    chevronUp: '<path d="M5 15l7-7 7 7"/>',
    phone: '<path d="M4 4h4l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v4c0 1-1 2-2 2C10.5 22 2 13.5 2 6c0-1 1-2 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.4 8.3c.3-.6 1-1.1 1.6-.9.4.2.8 1.2 1 1.8.1.3 0 .6-.2.8l-.5.6c-.1.2-.1.3 0 .5.4.8 1.6 2 2.6 2.4.2.1.4.1.5-.1l.6-.6c.2-.2.5-.3.8-.1.5.2 1.3.7 1.8 1 .3.2.4.6.3.9-.3.8-1.4 1.4-2.2 1.4-1.7 0-4.6-1.5-6.2-4-.6-1-.8-2.1-1.1-3.7Z" fill="currentColor" stroke="none"/>',
    pin: '<path d="M12 21s7-7.2 7-12a7 7 0 0 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.3"/><path d="M12 7.2v5l3.4 2"/>',
    uploadCloud: '<path d="M7 18a4.5 4.5 0 0 1-1-8.9A6 6 0 0 1 17.6 9 4 4 0 0 1 17 18H7Z"/><path d="M12 11v7M9 14l3-3 3 3"/>',
    fileText: '<path d="M6 2h9l4 4v16H6Z"/><path d="M15 2v4h4"/><line x1="9" y1="12.2" x2="15" y2="12.2"/><line x1="9" y1="16.2" x2="15" y2="16.2"/>',
    shieldCheck: '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z"/><path d="M9 12l2 2 4-4"/>',
    alert: '<path d="M12 3 22 20H2Z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17.3" r=".4" fill="currentColor" stroke="none"/>',
    dot: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>'
  };

  function injectIcons() {
    $$("[data-icon]").forEach(function (el) {
      var name = el.getAttribute("data-icon");
      var inner = ICONS[name];
      if (!inner) return;
      el.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        inner +
        "</svg>";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectIcons();
    footerYear();
    topbarToggle();
    activeNavLink();
    revealOnScroll();
    animateCounters();
    subNavScrollSpy();
    faqAccordion();
    uploadBoxes();
    quoteForm();
    enquiryForm();
    backToTop();
    careersToggle();
    heroSlider();
    galleryFilters();
  });

  function footerYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  function topbarToggle() {
    var toggle = $(".topbar-toggle");
    var nav = $(".topbar-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  function activeNavLink() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    $$(".topbar-nav a[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });
  }

  function heroSlider() {
    var slides = $$(".hero-slide");
    if (slides.length < 2) return;
    var counterNum = $(".hero-count [data-slide-num]");
    var current = 0;
    var show = function (i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle("active", idx === current); });
      if (counterNum) counterNum.textContent = pad(current + 1, 2);
    };
    $$("[data-slide-prev]").forEach(function (b) { b.addEventListener("click", function () { show(current - 1); }); });
    $$("[data-slide-next]").forEach(function (b) { b.addEventListener("click", function () { show(current + 1); }); });
  }

  function galleryFilters() {
    var wrap = $(".gallery-filters");
    var grid = $(".gallery-grid");
    if (!wrap || !grid) return;
    var buttons = $$("button", wrap);
    var items = $$(".gallery-item", grid);
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-cat") === cat;
          it.classList.toggle("hidden", !show);
        });
      });
    });
  }

  function revealOnScroll() {
    var items = $$("[data-reveal]");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    // per-group stagger counter, drives the --i CSS var used for transition-delay
    var counters = new WeakMap();
    items.forEach(function (el) {
      var group = el.closest("[data-reveal-group]");
      if (group) {
        var n = counters.get(group) || 0;
        el.style.setProperty("--i", n);
        counters.set(group, n + 1);
      }
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  function animateCounters() {
    var stats = $$("[data-count]");
    if (!stats.length) return;
    var run = function (el) {
      var raw = el.getAttribute("data-count");
      var match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
      if (!match) { el.textContent = raw; return; }
      var target = parseFloat(match[1]);
      var suffix = match[2] || "";
      var isFloat = raw.indexOf(".") !== -1;
      var start = null;
      var duration = 1600;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) {
      stats.forEach(run);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    stats.forEach(function (el) { io.observe(el); });
  }

  function subNavScrollSpy() {
    var subnav = $(".subnav");
    if (!subnav) return;
    var links = $$("a", subnav);
    var sections = links
      .map(function (a) {
        var id = a.getAttribute("href").replace("#", "");
        return document.getElementById(id);
      })
      .filter(Boolean);
    if (!sections.length) return;

    var setActive = function (id) {
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
      });
      var activeLink = $('.subnav a[href="#' + id + '"]');
      if (activeLink) activeLink.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  function faqAccordion() {
    $$(".faq-item").forEach(function (item) {
      var q = $(".faq-q", item);
      var a = $(".faq-a", item);
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        item.closest(".faq-list") &&
          $$(".faq-item.open", item.closest(".faq-list")).forEach(function (other) {
            if (other !== item) {
              other.classList.remove("open");
              $(".faq-a", other).style.maxHeight = null;
            }
          });
        item.classList.toggle("open", !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
      });
    });
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function uploadBoxes() {
    $$(".upload-box").forEach(function (box) {
      var input = $("input[type=file]", box);
      var listId = box.getAttribute("data-file-list");
      var list = listId ? document.getElementById(listId) : null;
      if (!input) return;

      var render = function () {
        if (!list) return;
        list.innerHTML = "";
        Array.prototype.forEach.call(input.files, function (file, idx) {
          var chip = document.createElement("div");
          chip.className = "file-chip";
          chip.innerHTML =
            '<span>' + file.name + " · " + formatBytes(file.size) + "</span>";
          list.appendChild(chip);
        });
      };

      box.addEventListener("click", function (e) {
        if (e.target === input) return;
        input.click();
      });
      input.addEventListener("change", render);

      ["dragenter", "dragover"].forEach(function (evt) {
        box.addEventListener(evt, function (e) {
          e.preventDefault();
          box.classList.add("drag");
        });
      });
      ["dragleave", "drop"].forEach(function (evt) {
        box.addEventListener(evt, function (e) {
          e.preventDefault();
          box.classList.remove("drag");
        });
      });
      box.addEventListener("drop", function (e) {
        if (e.dataTransfer && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          render();
        }
      });
    });
  }

  function pad(num, len) {
    var s = String(num);
    while (s.length < len) s = "0" + s;
    return s;
  }

  function genId(prefix) {
    var year = new Date().getFullYear();
    var rand = pad(Math.floor(Math.random() * 999999), 6);
    return prefix + "-" + year + "-" + rand;
  }

  function handleFormSuccess(form, idPrefix, idTarget) {
    var successPanel = form.querySelector(".success-panel");
    var idEl = successPanel ? $(idTarget, successPanel) : null;
    var id = genId(idPrefix);
    if (idEl) idEl.textContent = id;
    form.classList.add("submitted");
    if (successPanel) successPanel.classList.add("show");
    successPanel && successPanel.scrollIntoView({ behavior: "smooth", block: "center" });
    return id;
  }

  function quoteForm() {
    var form = $("#quote-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      handleFormSuccess(form, "SRC-QRF", "[data-req-id]");
    });
  }

  function enquiryForm() {
    var form = $("#enquiry-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      handleFormSuccess(form, "SRC-ENQ", "[data-req-id]");
    });
  }

  function backToTop() {
    var btn = $(".to-top");
    if (!btn) return;
    window.addEventListener(
      "scroll",
      function () { btn.classList.toggle("show", window.scrollY > 700); },
      { passive: true }
    );
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function careersToggle() {
    var btn = $("[data-careers-toggle]");
    var panel = $("#careers-form-panel");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = panel.classList.toggle("open-panel");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
      if (open) panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    var form = $("#careers-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        handleFormSuccess(form, "SRC-APP", "[data-req-id]");
      });
    }
  }
})();
