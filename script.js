/* Minaw — script.js
   Eight jobs: fill in the footer year, keep the top bar height up to date, fit the hero name on one line, run the music carousel, handle the song thumbnails, run the nav arrows, highlight the nav link for the section in view,
   and check and send the contact form. Everything sits inside one function so nothing
   leaks into the page. */
(() => {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Top bar height ---------- */
  // The hero is sized to "the first screen minus the top bar", and the bar is taller on phones
  // when its links wrap, so measure it instead of guessing. (CSS has a fallback value.)
  function trackTopbarHeight() {
    const bar = document.querySelector(".topbar");
    if (!bar) return;
    const apply = () =>
      document.documentElement.style.setProperty("--topbar-h", `${bar.offsetHeight}px`);
    apply();
    if ("ResizeObserver" in window) new ResizeObserver(apply).observe(bar);
    else window.addEventListener("resize", apply);
  }

  /* ---------- Hero name: one line, as large as the room allows ---------- */
  // The name must stay on a single line, so its size comes from its real width in whichever font
  // is showing (the web font, or a fallback while that loads) instead of a fixed guess. Width
  // grows in step with font size, so one measurement gives the exact size. CSS has a starting
  // estimate for the moment before this runs.
  function initHeroName() {
    const box = document.querySelector(".hero-copy");
    const name = box && box.querySelector("h1");
    if (!name) return;
    const MIN_PX = 16;
    const FILL = 0.97; // leave a little breathing room at the end of the line

    function fit() {
      name.style.fontSize = "var(--name-max)"; // the CSS ceiling, in px
      const maxPx = parseFloat(getComputedStyle(name).fontSize);
      name.style.fontSize = ""; // back to the CSS estimate, then measure
      const size = parseFloat(getComputedStyle(name).fontSize);
      const width = name.getBoundingClientRect().width; // the h1 is width: max-content
      const room = box.clientWidth;
      if (!width || !room) return;
      const next = Math.min(maxPx, Math.max(MIN_PX, (size * room * FILL) / width));
      name.style.fontSize = `${Math.floor(next * 10) / 10}px`;
      reportTextBottom();
    }

    // Tell the CSS where the name and tagline end, so the photo can start below them on portrait screens.
    function reportTextBottom() {
      const hero = box.closest(".hero");
      if (hero) hero.style.setProperty("--hero-text-bottom", `${box.offsetTop + box.offsetHeight + 12}px`);
    }

    fit();
    if (document.fonts) {
      document.fonts.ready.then(fit);
      document.fonts.addEventListener("loadingdone", fit); // re-fit once the web font arrives
    }
    let frame = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    });
  }

  /* ---------- Music carousel ---------- */
  // The cards sit in a row that scrolls sideways and snaps card by card. The arrows scroll by the cards
  // that are in view; swiping, a trackpad, and the arrow keys (with the row focused) work without them.
  function initCarousel() {
    const root = document.querySelector(".carousel");
    if (!root) return;
    const track = root.querySelector(".carousel-track");
    const controls = root.querySelector(".carousel-controls");
    const prev = root.querySelector('[data-dir="-1"]');
    const next = root.querySelector('[data-dir="1"]');
    const count = root.querySelector(".carousel-count");
    const cards = Array.from(track.children);
    if (cards.length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Distance from one card to the next (card width plus the gap)
    function step() {
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    }
    function visibleCount() {
      return Math.max(1, Math.round(track.clientWidth / step()));
    }
    function scrollByCards(n) {
      track.scrollBy({ left: n * step(), behavior: reduceMotion.matches ? "auto" : "smooth" });
    }

    function update() {
      const max = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= max - 2;
      controls.hidden = max <= 2; // everything fits: no arrows needed
      prev.disabled = atStart;
      next.disabled = atEnd;
      const visible = visibleCount();
      const first = atEnd ? Math.max(1, cards.length - visible + 1) : Math.round(track.scrollLeft / step()) + 1;
      const last = Math.min(cards.length, first + visible - 1);
      count.textContent = first + "\u2013" + last + " of " + cards.length;
    }

    prev.addEventListener("click", () => scrollByCards(-visibleCount()));
    next.addEventListener("click", () => scrollByCards(visibleCount()));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); scrollByCards(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); scrollByCards(-1); }
    });

    let frame = 0;
    const queueUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    update();
  }

  /* ---------- Song thumbnails from YouTube ---------- */
  // Each cover shows a YouTube thumbnail over the placeholder. If one cannot load, it is removed so the
  // placeholder shows instead. The banner asks for the large size first and falls back to the standard one
  // (YouTube answers a missing image with a tiny grey picture, so a width of 120 or less counts as missing).
  function initThumbs() {
    document.querySelectorAll(".cover .thumb").forEach((img) => {
      function fail() {
        const fallback = img.dataset.fallback;
        if (fallback) {
          delete img.dataset.fallback;
          img.src = fallback;
        } else {
          img.remove();
        }
      }
      img.addEventListener("error", fail);
      img.addEventListener("load", () => {
        if (img.naturalWidth <= 120) fail();
      });
    });
  }

  /* ---------- Scrollable nav (arrow buttons) ---------- */
  let centreLink = () => {}; // filled in below; the highlight code uses it to keep the current link in view

  function initNavScroller() {
    const scroller = document.querySelector(".nav-scroller");
    if (!scroller) return;
    const row = scroller.querySelector(".nav-links");
    const prev = scroller.querySelector(".nav-arrow--prev");
    const next = scroller.querySelector(".nav-arrow--next");
    if (!row || !prev || !next) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const behavior = () => (reduceMotion.matches ? "auto" : "smooth");

    function update() {
      const overflowing = row.scrollWidth > row.clientWidth + 1;
      prev.hidden = !overflowing; // arrows only appear when the links do not all fit
      next.hidden = !overflowing;
      if (!overflowing) {
        delete row.dataset.fade;
        return;
      }
      const atStart = row.scrollLeft <= 1;
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 1;
      prev.disabled = atStart;
      next.disabled = atEnd;
      // Soft fade on the side(s) where more links are hidden, so a link is never cut off mid-letter
      row.dataset.fade = atStart ? "end" : atEnd ? "start" : "both";
    }

    prev.addEventListener("click", () => row.scrollBy({ left: -row.clientWidth * 0.6, behavior: behavior() }));
    next.addEventListener("click", () => row.scrollBy({ left: row.clientWidth * 0.6, behavior: behavior() }));
    row.addEventListener("scroll", update, { passive: true });
    if ("ResizeObserver" in window) new ResizeObserver(update).observe(row);
    else window.addEventListener("resize", update);

    // Scroll the row (never the page) so the given link sits in the middle
    centreLink = (link) => {
      if (row.scrollWidth <= row.clientWidth + 1) return;
      row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: behavior() });
    };

    update();
  }

  /* ---------- Nav highlighting ---------- */
  function initNavHighlight() {
    if (!("IntersectionObserver" in window)) return; // feature detection: leave HOME highlighted

    const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const items = links
      .map((link) => ({ link, target: document.getElementById(link.getAttribute("href").slice(1)) }))
      .filter((item) => item.target);

    // SHOWS points at the panel inside the hero. Skip anything that sits inside another
    // watched section, so the hero keeps HOME highlighted instead of the two fighting.
    const watched = items.filter(
      (item) => !items.some((other) => other !== item && other.target.contains(item.target))
    );

    function setCurrent(current) {
      links.forEach((link) => {
        if (link === current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      if (current) centreLink(current);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = watched.find((item) => item.target === entry.target);
          if (match) setCurrent(match.link);
        });
      },
      // A thin band across the middle of the screen: whichever section crosses it is "current"
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    watched.forEach((item) => observer.observe(item.target));
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return; // guard clause: pages without the form do nothing

    const status = document.getElementById("form-status");
    const button = form.querySelector('button[type="submit"]');
    const fallbackEmail = form.dataset.fallbackEmail || "";
    const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const list = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

    function say(text, kind) {
      status.textContent = text; // textContent, never innerHTML, for anything shown from the form
      if (kind) status.dataset.kind = kind;
      else status.removeAttribute("data-kind");
    }

    function flag(field, bad) {
      if (bad) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }

    // Clear a field's warning as soon as the visitor starts fixing it
    form.addEventListener("input", (event) => flag(event.target, false));

    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // stop the page reloading; we send the message ourselves

      // Spam trap: real visitors never see or fill this field, so do nothing for bots
      if (form.elements["_gotcha"].value.trim() !== "") return;

      const nameField = form.elements["name"];
      const emailField = form.elements["email"];
      const messageField = form.elements["message"];
      const topic = form.elements["topic"].value;

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();

      const problems = [];
      const badFields = [];
      if (!name) { problems.push("your name"); badFields.push(nameField); }
      if (!emailShape.test(email)) { problems.push("a valid email address"); badFields.push(emailField); }
      if (!message) { problems.push("a message"); badFields.push(messageField); }

      [nameField, emailField, messageField].forEach((field) => flag(field, badFields.includes(field)));

      if (problems.length > 0) {
        say(`Please add ${list.format(problems)}.`, "error");
        badFields[0].focus();
        return;
      }

      const action = form.getAttribute("action") || "";

      // Fallback: the Formspree form ID has not been filled in yet, so open the visitor's email app
      if (!action || action.includes("YOUR_FORM_ID")) {
        if (!fallbackEmail) {
          say("The form is not set up yet. Please try again later.", "error");
          return;
        }
        const subject = `${topic}: message from ${name}`;
        const body = `${message}\n\n${name}\n${email}`;
        say("Opening your email app…", "ok");
        window.location.href =
          `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return;
      }

      // Normal path: send to Formspree
      button.disabled = true;
      const label = button.textContent;
      button.textContent = "Sending…";
      say("Sending your message…");

      try {
        const response = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Formspree responded with ${response.status}`);
        form.reset();
        say("Thank you! Your message was sent. I'll reply by email.", "ok");
      } catch (error) {
        say(
          fallbackEmail
            ? `Sorry, that did not send. Please email me directly at ${fallbackEmail}.`
            : "Sorry, that did not send. Please try again later.",
          "error"
        );
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  }

  trackTopbarHeight();
  initHeroName();
  initCarousel();
  initThumbs();
  initNavScroller();
  initNavHighlight();
  initContactForm();
})();
