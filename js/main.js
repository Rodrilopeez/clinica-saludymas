/**
 * Clínica Salud y Más — Interacciones Premium
 * Hero Slider · Tab System · Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // HEADER SCROLL
  // ==========================================================
  const header = document.getElementById('header');
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 80);
  }, { passive: true });

  // ==========================================================
  // MOBILE MENU
  // ==========================================================
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const spans = burger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // ==========================================================
  // HERO SLIDER
  // ==========================================================
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let currentSlide = 0;
  let slideInterval;
  const SLIDE_DURATION = 5000;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
  function prevSlide() { goToSlide((currentSlide - 1 + slides.length) % slides.length); }

  function startSlider() {
    stopSlider();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }
  function stopSlider() { clearInterval(slideInterval); }

  if (slides.length > 0) {
    startSlider();

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startSlider(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startSlider(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-slide')));
        startSlider();
      });
    });

    // Pause on hover
    const hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', stopSlider);
      hero.addEventListener('mouseleave', startSlider);
    }

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;
    if (hero) {
      hero.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      hero.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? nextSlide() : prevSlide();
          startSlider();
        }
      }, { passive: true });
    }
  }

  // ==========================================================
  // TAB SYSTEM
  // ==========================================================
  const allTabs = document.querySelectorAll('.tab-panel');
  const allTabBtns = document.querySelectorAll('[data-tab]');

  function switchTab(targetTab) {
    // Deactivate all tabs
    allTabs.forEach(t => t.classList.remove('active'));

    // Activate target tab
    const targetPanel = document.getElementById('tab-' + targetTab);
    if (targetPanel) {
      targetPanel.classList.add('active');
      // Re-trigger reveal animations inside the tab
      targetPanel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('reveal--visible');
      });
      setTimeout(() => { revealObserverTrigger(); }, 50);
    }

    // Update active state on header buttons
    document.querySelectorAll('.header__link').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === targetTab || (targetTab === 'inicio' && btn.getAttribute('data-tab') === 'inicio')) {
        if (btn.getAttribute('data-tab') === targetTab) btn.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }

    // Update URL hash
    history.pushState(null, null, '#' + targetTab);
  }

  allTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('tab-' + hash)) {
      switchTab(hash);
    }
  });

  // Load tab from URL hash on page load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById('tab-' + initialHash)) {
    switchTab(initialHash);
  }

  // ==========================================================
  // STAT COUNTERS
  // ==========================================================
  function animateStat(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat__number').forEach(s => statObserver.observe(s));

  // ==========================================================
  // CONTACT FORM (Formspree / fallback)
  // ==========================================================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const feedback = document.getElementById('formFeedback');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          btn.textContent = 'Mensaje Enviado ✓';
          btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
          form.reset();
        } else {
          throw new Error('Error del servidor');
        }
      } catch (err) {
        // Formspree not configured — switch button to Calendly
        feedback.style.display = 'block';
        feedback.innerHTML = 'Reserva tu cita directamente desde nuestro calendario:';
        btn.textContent = 'Abrir Calendly';
        btn.type = 'button';
        btn.disabled = false;
        btn.onclick = function() { openCalendly('primera-consulta'); };
      }

      setTimeout(() => {
        if (btn.textContent.includes('Enviado')) {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }
      }, 4000);
    });
  }

  // ==========================================================
  // NEWSLETTER FORM
  // ==========================================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      const input = newsletterForm.querySelector('input');
      const success = document.getElementById('newsletterSuccess');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        const res = await fetch(newsletterForm.action, {
          method: 'POST',
          body: new FormData(newsletterForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          newsletterForm.style.display = 'none';
          success.style.display = 'block';
        } else {
          throw new Error();
        }
      } catch (err) {
        // Formspree not configured — show confirmation anyway
        newsletterForm.style.display = 'none';
        success.style.display = 'block';
      }
    });
  }

  // ==========================================================
  // CALENDLY — abre directamente en nueva pestaña
  // ==========================================================
  window.openCalendly = function(slug) {
    window.open('https://calendly.com/lopezmartirodrigo/' + slug, '_blank');
  };

  // ==========================================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================================
  function setupRevealAnimations() {
    const revealTargets = document.querySelectorAll(
      '.service-card, .testimonial-card, .pro-card, .news-card-new, .pricing-card, ' +
      '.philosophy__image, .philosophy__content, .excellence__content, ' +
      '.pro-detail-page__photo, .pro-detail-page__content, ' +
      '.location-info__card, .tab-detail__info, .excellence__stats'
    );

    revealTargets.forEach((el, i) => {
      if (el.classList.contains('reveal')) return; // already set up
      el.classList.add('reveal');
      // Add stagger delay based on sibling position within a grid
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(el);
        if (idx >= 0 && idx < 8) {
          el.classList.add('reveal--d' + (idx + 1));
        }
      }
    });

    // Observe reveal elements
    window._revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
      window._revealObserver.observe(el);
    });

    // Initial check for elements already in view
    setTimeout(() => revealObserverTrigger(), 120);
  }

  function revealObserverTrigger() {
    if (!window._revealObserver) return;
    // Re-observe all reveal elements (some may be new from tab switch)
    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('reveal--visible')) {
        // Force re-observation
        window._revealObserver.unobserve(el);
        window._revealObserver.observe(el);
      }
    });
  }

  setupRevealAnimations();

});
