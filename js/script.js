/**
 * Dr. Kristofor Kalvig — static site JavaScript
 *
 * Responsibilities:
 *  1. Mobile navigation toggle (hamburger menu)
 *  2. Contact form submission via Web3Forms
 *  3. Newsletter form submission via Web3Forms
 *
 * No frameworks, no build tools — plain vanilla JS (ES2017+).
 */

/* ─────────────────────────────────────────
   1. Mobile navigation toggle
   ───────────────────────────────────────── */
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.setAttribute('aria-label',    isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu when a nav link is clicked (single-page-style UX on mobile)
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
})();


/* ─────────────────────────────────────────
   2. Contact form — Web3Forms integration
   ─────────────────────────────────────────
   To activate:
     a) Sign up at https://web3forms.com and get a free Access Key.
     b) Replace "YOUR_WEB3FORMS_ACCESS_KEY" below with your key.
     c) The hidden <input name="access_key"> is already in the form markup.
   ───────────────────────────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // --- Web3Forms endpoint ---
  // Uncomment and set your access key to enable real submissions:
  // const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
  // const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  const successMsg = document.querySelector('.form-success');
  const errorMsg   = document.querySelector('.form-error');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data
    const data = new FormData(form);

    // ── Uncomment the block below to send via Web3Forms ──────────────
    // data.set('access_key', ACCESS_KEY);
    // try {
    //   const res  = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: data });
    //   const json = await res.json();
    //   if (json.success) {
    //     showMessage(successMsg);
    //     form.reset();
    //   } else {
    //     showMessage(errorMsg);
    //   }
    // } catch (err) {
    //   console.error('Form error:', err);
    //   showMessage(errorMsg);
    // }
    // ─────────────────────────────────────────────────────────────────

    // Placeholder feedback until Web3Forms is configured
    showMessage(successMsg);
    form.reset();
  });

  function showMessage(el) {
    if (!el) return;
    el.hidden = false;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(function () { el.hidden = true; }, 6000);
  }
})();


/* ─────────────────────────────────────────
   3. Newsletter form — Web3Forms integration
   ─────────────────────────────────────────
   Same setup as contact form above.
   Replace ACCESS_KEY and uncomment the fetch block to enable.
   ───────────────────────────────────────── */
(function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  // const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
  // const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  const feedback = document.querySelector('.newsletter-feedback');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    // ── Uncomment to send via Web3Forms ──────────────────────────────
    // data.set('access_key', ACCESS_KEY);
    // data.set('subject', 'Newsletter subscription');
    // try {
    //   const res  = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: data });
    //   const json = await res.json();
    //   if (json.success) {
    //     showFeedback('Thanks for subscribing!');
    //     form.reset();
    //   } else {
    //     showFeedback('Something went wrong. Please try again.');
    //   }
    // } catch (err) {
    //   console.error('Newsletter error:', err);
    //   showFeedback('Something went wrong. Please try again.');
    // }
    // ─────────────────────────────────────────────────────────────────

    // Placeholder feedback
    showFeedback('Thanks for subscribing!');
    form.reset();
  });

  function showFeedback(text) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.hidden = false;
    setTimeout(function () { feedback.hidden = true; }, 5000);
  }
})();
