// Stackly shared behaviour
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle (holds all header buttons on small screens)
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openNav = () => {
      nav.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 960) closeNav(); });
  }

  // Scroll reveal (staggered within each grid/row)
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const groups = new Map();
  revealEls.forEach(el => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach(list => list.forEach((el, i) => el.style.setProperty('--stagger', i)));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Timeline items reveal
  const tItems = document.querySelectorAll('.t-item');
  const tio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); tio.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  tItems.forEach(el => tio.observe(el));

  // Button glow follows cursor
  document.querySelectorAll('.btn-primary, .btn-gold').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', `${e.clientX - r.left}px`);
      btn.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) header.style.boxShadow = '0 8px 24px -18px rgba(20,80,62,.4)';
    else header.style.boxShadow = 'none';
  });

  // Contact form (demo only, no backend)
  const form = document.querySelector('#quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const original = btn.textContent;
      btn.textContent = 'Request sent ✓';
      form.reset();
      setTimeout(() => btn.textContent = original, 2600);
    });
  }
});