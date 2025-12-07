// Smooth scroll anchor links
(function(){
  function smoothScroll(e){
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, null, href);
      }
    }
  }

  // Attach to all anchor links in the page
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
})();

// Track user actions (optional: log analytics)
(function(){
  function trackAction(action){
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: 'engagement',
        event_label: 'help_page'
      });
    }
  }

  // Track section visits via Intersection Observer
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('[id^="individual"], [id^="community"], [id^="donate"], [id^="policy"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackAction(`viewed_section_${entry.target.id}`);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => io.observe(section));
  }
})();