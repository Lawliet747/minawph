/* Anthony Joseph Robles — script.js
   Four jobs: fill in the footer year, keep the top bar height up to date, highlight the nav link for the section in view,
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
  initNavHighlight();
  initContactForm();
})();
