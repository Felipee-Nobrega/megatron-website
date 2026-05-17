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
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Recalcula posições após imagens carregarem */
  window.addEventListener('load', () => ScrollTrigger.refresh());

  /* ── Hero: entrada ao carregar ── */
  gsap.timeline({ delay: 0.15 })
    .fromTo('.hero-badge',    { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
    .fromTo('.hero-title',    { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.70, ease: 'power3.out' }, '-=0.35')
    .fromTo('.hero-subtitle', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.60, ease: 'power3.out' }, '-=0.30')
    .fromTo('.hero-actions',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.25');

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
      gsap.to(['.hero-content', '.hero-badge'], {
        x: 0, y: 0,
        duration: 1.2, ease: 'elastic.out(1, 0.6)', overwrite: 'auto'
      });
    });
  }

  /* ── Helper scroll animation ── */
  function scrollAnim(targets, fromVars, toVars, trigger, start) {
    gsap.fromTo(targets, fromVars, {
      ...toVars,
      scrollTrigger: { trigger, start: start || 'top bottom', once: true }
    });
  }

  /* ── Section headers ── */
  gsap.utils.toArray('.section-header').forEach(el => {
    scrollAnim(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, el);
  });

  /* ── Brands ── */
  scrollAnim('.brand-card-new',
    { opacity: 0, y: 36, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.15, ease: 'back.out(1.4)' },
    '.brands-cards'
  );

  scrollAnim('.brand-strip-item',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
    '.brands-strip'
  );

  /* ── Services ── */
  scrollAnim('.service-card',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out' },
    '.services-grid'
  );

  /* ── About ── */
  scrollAnim('.about-visual',
    { opacity: 0, x: -70 },
    { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
    '.about-inner'
  );
  scrollAnim('.about-content',
    { opacity: 0, x: 70 },
    { opacity: 1, x: 0, duration: 0.85, ease: 'power3.out' },
    '.about-inner'
  );

  /* ── Tronzinho ── */
  scrollAnim('.tronzinho-text',
    { opacity: 0, x: -60 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
    '.tronzinho-cols'
  );
  scrollAnim('.tronzinho-img-wrap',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
    '.tronzinho-cols'
  );

  /* ── Differentials ── */
  scrollAnim('.diff-item',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
    '.diff-grid'
  );

  /* ── Reviews ── */
  scrollAnim('.review-card',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.65, stagger: 0.15, ease: 'power3.out' },
    '.reviews-grid'
  );

  /* ── Location ── */
  scrollAnim('.location-info',
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
    '.location-inner'
  );
  scrollAnim('.location-map',
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' },
    '.location-inner'
  );

})();
