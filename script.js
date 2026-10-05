const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealTargets = document.querySelectorAll([
  '.intro > .section-label',
  '.intro-copy > *',
  '.section-top > *',
  '.work-card',
  '.work-footnote',
  '.page-continuation',
  '.approach-grid > *',
  '.footer > *',
  '.work-intro-top > *',
  '.work-title-row > *',
  '.work-toolbar > *',
  '.portfolio-card',
  '.portfolio-note',
  '.work-footer-callout > *',
  '.work-footer-bottom > *',
  '.contact-intro > *',
  '.contact-detail',
  '.contact-bottom > *',
  '.contact-footer > *',
].join(','));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('has-scroll-effects');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealTargets.forEach((target, index) => {
    target.dataset.scrollReveal = '';
    target.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const heroImage = document.querySelector('.hero-image');
if (heroImage && !prefersReducedMotion) {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const heroBounds = heroImage.parentElement.getBoundingClientRect();
      if (heroBounds.bottom > 0 && heroBounds.top < window.innerHeight) {
        const drift = Math.min(Math.max(-heroBounds.top * 0.035, -22), 22);
        heroImage.style.setProperty('--hero-drift', `${drift}px`);
      }
      ticking = false;
    });
  }, { passive: true });
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}
