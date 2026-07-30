document.addEventListener('DOMContentLoaded', () => {

  /* ===== Header scroll state ===== */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);

  /* ===== Mobile menu ===== */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== Reveal on scroll ===== */
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => revealObserver.observe(item));

  /* ===== Countdown timer (48h rolling offer) ===== */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    const OFFER_DURATION_MS = 48 * 60 * 60 * 1000;
    const storageKey = 'vikydixon_offer_deadline';
    let deadline = Number(localStorage.getItem(storageKey));
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + OFFER_DURATION_MS;
      localStorage.setItem(storageKey, String(deadline));
    }

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const pad = n => String(n).padStart(2, '0');

    const tick = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);

      if (remaining <= 0) {
        clearInterval(timer);
        localStorage.removeItem(storageKey);
      }
    };
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ===== FAQ accordion ===== */
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion__trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ===== Contact form (front-end only) ===== */
  const contactForm = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = '¡Gracias! Un asesor te contactará muy pronto para confirmar tu 50% de descuento.';
      contactForm.reset();
    });
  }

  /* ===== Back to top ===== */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== Footer year ===== */
  document.getElementById('year').textContent = new Date().getFullYear();

});
