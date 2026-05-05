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
   2. Contact form — email backend integration
   ─────────────────────────────────────────
   The form POSTs to the Express server in /server.
   To run the backend:
     cd server && npm install && npm start
   Set EMAIL_USER, APPPASSWORD, and EMAIL_RECIPIENT in server/.env
   (copy server/.env.example to server/.env and fill in the values).

   Update API_URL below to your deployed server URL in production.
   ───────────────────────────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Change this to your deployed backend URL in production
  const API_URL = 'http://localhost:3001/contact';

  const successMsg = document.querySelector('.form-success');
  const errorMsg   = document.querySelector('.form-error');
  const submitBtn  = form.querySelector('.submit-button');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (submitBtn) submitBtn.disabled = true;

    const data = new FormData(form);
    const payload = {
      name:    data.get('name'),
      email:   data.get('email'),
      phone:   data.get('phone') || '',
      message: data.get('message'),
    };

    try {
      const res  = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showMessage(successMsg);
        form.reset();
      } else {
        console.error('Form submission error:', json.message);
        showMessage(errorMsg);
      }
    } catch (err) {
      console.error('Form error:', err);
      showMessage(errorMsg);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
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
