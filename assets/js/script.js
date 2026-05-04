/* ============================================================
   MEGATRON INFORMÁTICA — JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ── Header: sombra no scroll ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Menu mobile ── */
  const menuToggle = document.getElementById('menuToggle');
  const nav        = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      nav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── Nav: link ativo por scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => activeObserver.observe(s));

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (i % 3) * 70;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Contadores animados ── */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimals, 10) || 0;
    const duration = 1600;
    let startTime  = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = eased * target;

      el.textContent = decimals > 0
        ? current.toFixed(decimals).replace('.', ',')
        : Math.floor(current).toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = decimals > 0
          ? target.toFixed(decimals).replace('.', ',')
          : target.toString();
      }
    }

    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ── Formulário → WhatsApp ── */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name    = (document.getElementById('name').value    || '').trim();
      const phone   = (document.getElementById('phone').value   || '').trim();
      const subject = (document.getElementById('subject').value || '').trim();
      const message = (document.getElementById('message').value || '').trim();

      if (!name) {
        document.getElementById('name').focus();
        return;
      }

      let text = `Olá! Meu nome é ${name}.`;
      if (phone)   text += ` Telefone: ${phone}.`;
      if (subject) text += ` Assunto: ${subject}.`;
      if (message) text += ` ${message}`;

      window.open(
        `https://wa.me/5581992789256?text=${encodeURIComponent(text)}`,
        '_blank', 'noopener,noreferrer'
      );
    });
  }

  /* ── Smooth scroll para âncoras ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
