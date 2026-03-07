(function(){
  'use strict';

  const html = document.documentElement;
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ── Theme ── */
  const themeBtn  = document.getElementById('themeBtn');
  const iconMoon  = document.getElementById('icon-moon');
  const iconSun   = document.getElementById('icon-sun');

  function applyTheme(t){
    html.setAttribute('data-theme', t);
    if(t === 'dark'){ iconMoon.style.display='none'; iconSun.style.display='block'; }
    else            { iconMoon.style.display='block'; iconSun.style.display='none'; }
    localStorage.setItem('hm-theme', t);
  }

  const savedTheme = localStorage.getItem('hm-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ── Language ── */
  const langBtn = document.getElementById('langBtn');

  function applyLang(l){
    html.setAttribute('data-lang', l);
    html.setAttribute('lang', l);
    html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    langBtn.textContent = l === 'en' ? 'AR' : 'EN';
    localStorage.setItem('hm-lang', l);

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      const val = el.getAttribute('data-' + l);
      if(val !== null) el.innerHTML = val;
    });
  }

  const savedLang = localStorage.getItem('hm-lang') || 'en';
  applyLang(savedLang);

  langBtn.addEventListener('click', () => {
    applyLang(html.getAttribute('data-lang') === 'en' ? 'ar' : 'en');
  });

  /* ── Hamburger ── */
  const burger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');

  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ── Active nav on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveNav(){
    let current = '';
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navAnchors.forEach(a => {
      const active = a.getAttribute('href') === '#' + current;
      a.classList.toggle('active', active);
    });
  }

  window.addEventListener('scroll', updateActiveNav, {passive:true});
  updateActiveNav();

  /* ── Reveal on scroll ── */
  const reveals = document.querySelectorAll('.reveal');
  function showReveal(el){ el.classList.add('in'); }

  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){ showReveal(e.target); ro.unobserve(e.target); }
    });
  }, {rootMargin:'0px 0px -40px 0px', threshold: 0.05});

  reveals.forEach(r => ro.observe(r));

  // Fallback: force-show anything already in viewport after 400ms
  setTimeout(() => {
    reveals.forEach(r => {
      const rect = r.getBoundingClientRect();
      if(rect.top < window.innerHeight + 100) showReveal(r);
    });
  }, 400);

  // Also re-check on first scroll
  window.addEventListener('scroll', function onFirstScroll(){
    reveals.forEach(r => {
      const rect = r.getBoundingClientRect();
      if(rect.top < window.innerHeight + 100) showReveal(r);
    });
    window.removeEventListener('scroll', onFirstScroll);
  }, {passive:true});

})();