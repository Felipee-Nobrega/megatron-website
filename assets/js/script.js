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

  /* ══════════════════════════════════════════════
     GSAP — ANIMAÇÕES
  ══════════════════════════════════════════════ */
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero: entrada ao carregar ── */
  gsap.timeline({ delay: 0.15 })
    .from('.hero-badge',    { opacity: 0, y: 28, duration: 0.65, ease: 'power3.out' })
    .from('.hero-title',    { opacity: 0, y: 36, duration: 0.70, ease: 'power3.out' }, '-=0.35')
    .from('.hero-subtitle', { opacity: 0, y: 24, duration: 0.60, ease: 'power3.out' }, '-=0.30')
    .from('.hero-actions',  { opacity: 0, y: 20, duration: 0.55, ease: 'power3.out' }, '-=0.25');

  /* ── Hero: parallax de mouse ── */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      gsap.to('.hero-content', {
        x: x * 22, y: y * 14,
        duration: 0.9, ease: 'power2.out', overwrite: 'auto'
      });

      gsap.to('.hero-badge', {
        x: x * 10, y: y * 6,
        duration: 1.1, ease: 'power2.out', overwrite: 'auto'
      });
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      gsap.to('.hero-content, .hero-badge', {
        x: 0, y: 0,
        duration: 1.2, ease: 'elastic.out(1, 0.6)', overwrite: 'auto'
      });
    });
  }

  /* ── Section headers ── */
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 32, duration: 0.7, ease: 'power3.out'
    });
  });

  /* ── Brands ── */
  gsap.from('.brand-card-new', {
    scrollTrigger: { trigger: '.brands-cards', start: 'top 85%' },
    opacity: 0, y: 36, scale: 0.96,
    duration: 0.65, stagger: 0.15, ease: 'back.out(1.4)'
  });

  gsap.from('.brand-strip-item', {
    scrollTrigger: { trigger: '.brands-strip', start: 'top 90%' },
    opacity: 0, x: -20,
    duration: 0.5, stagger: 0.1, ease: 'power3.out'
  });

  /* ── Services ── */
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 82%' },
    opacity: 0, y: 50,
    duration: 0.65, stagger: 0.09, ease: 'power3.out'
  });

  /* ── About ── */
  gsap.from('.about-visual', {
    scrollTrigger: { trigger: '.about-inner', start: 'top 78%' },
    opacity: 0, x: -70, duration: 0.85, ease: 'power3.out'
  });

  gsap.from('.about-content', {
    scrollTrigger: { trigger: '.about-inner', start: 'top 78%' },
    opacity: 0, x: 70, duration: 0.85, ease: 'power3.out'
  });

  /* ── Tronzinho ── */
  gsap.from('.tronzinho-text', {
    scrollTrigger: { trigger: '.tronzinho-cols', start: 'top 80%' },
    opacity: 0, x: -60, duration: 0.8, ease: 'power3.out'
  });

  gsap.from('.tronzinho-img-wrap', {
    scrollTrigger: { trigger: '.tronzinho-cols', start: 'top 80%' },
    opacity: 0, x: 60, duration: 0.8, ease: 'power3.out'
  });

  /* ── Differentials ── */
  gsap.from('.diff-item', {
    scrollTrigger: { trigger: '.diff-grid', start: 'top 82%' },
    opacity: 0, y: 40,
    duration: 0.6, stagger: 0.09, ease: 'power3.out'
  });

  /* ── Reviews ── */
  gsap.from('.review-card', {
    scrollTrigger: { trigger: '.reviews-grid', start: 'top 84%' },
    opacity: 0, y: 40,
    duration: 0.65, stagger: 0.15, ease: 'power3.out'
  });

  /* ── Location ── */
  gsap.from('.location-info', {
    scrollTrigger: { trigger: '.location-inner', start: 'top 82%' },
    opacity: 0, x: -50, duration: 0.75, ease: 'power3.out'
  });

  gsap.from('.location-map', {
    scrollTrigger: { trigger: '.location-inner', start: 'top 82%' },
    opacity: 0, x: 50, duration: 0.75, ease: 'power3.out'
  });

})();
