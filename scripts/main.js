document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // menu toggle (mobile)
  const toggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if(toggle && navList){
    toggle.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // reveal-on-scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.14});

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // lightweight focus-visible polyfill
  document.body.addEventListener('keyup', (e)=> {
    if(e.key === 'Tab') document.documentElement.classList.add('keyboard-nav');
  });

  // Lottie hook example: adjust speed on hover
  const lottie = document.getElementById('hero-lottie');
  if(lottie){
    lottie.addEventListener('mouseenter', ()=> lottie.setPlayerSpeed?.(1.4));
    lottie.addEventListener('mouseleave', ()=> lottie.setPlayerSpeed?.(1));
  }

  // Global header/site search: intercept and route to targets page or call map search if on targets
  const searchForm = document.querySelector('.search-form');
  const siteSearchInput = document.getElementById('site-search');

  if (searchForm && siteSearchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = siteSearchInput.value.trim();
      if (!q) {
        // fallback: no query — just navigate to targets page
        window.location.href = './targets.html';
        return;
      }

      // If already on targets page, call the map search function directly (if available)
      const onTargets = window.location.pathname.endsWith('/targets.html') || window.location.pathname.endsWith('targets.html');
      if (onTargets && typeof window.searchSpecies === 'function') {
        // also populate the species-search input if present
        const speciesInput = document.getElementById('species-search');
        if (speciesInput) speciesInput.value = q;
        window.searchSpecies(q);
      } else {
        // Navigate to targets page with query parameter
        const url = `./targets.html?q=${encodeURIComponent(q)}`;
        window.location.href = url;
      }
    });
  }
});