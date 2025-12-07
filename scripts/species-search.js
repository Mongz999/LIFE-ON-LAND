document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggle = document.getElementById('species-dropdown-toggle');
  const dropdown = document.getElementById('species-dropdown');
  const speciesInput = document.getElementById('species-search');
  const searchBtn = document.getElementById('search-btn');
  const inputWrapper = document.querySelector('.species-input-wrapper');

  if (!dropdownToggle || !dropdown || !speciesInput || !inputWrapper) {
    console.warn('Species search elements not found');
    return;
  }

  const dropdownItems = dropdown.querySelectorAll('.species-item');
  console.log('Species dropdown items found:', dropdownItems.length);

  // Function to position dropdown below input
  function positionDropdown() {
    const rect = inputWrapper.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.top = (rect.bottom + 8) + 'px';
    dropdown.style.left = rect.left + 'px';
    dropdown.style.width = rect.width + 'px';
  }

  // Toggle dropdown
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isHidden = dropdown.hidden;
    dropdown.hidden = !isHidden;
    dropdownToggle.setAttribute('aria-expanded', !isHidden);
    
    if (!isHidden) {
      setTimeout(() => positionDropdown(), 0);
    }
    console.log('Dropdown toggled, visible:', !isHidden);
  });

  // Handle dropdown item click
  dropdownItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const value = item.dataset.value;
      console.log('Species selected:', value);
      speciesInput.value = value;
      dropdown.hidden = true;
      dropdownToggle.setAttribute('aria-expanded', 'false');
      
      // Auto-search if searchSpecies is available
      if (typeof window.searchSpecies === 'function') {
        setTimeout(() => window.searchSpecies(value), 100);
      }
    });
  });

  // Reposition on scroll/resize
  window.addEventListener('scroll', () => {
    if (!dropdown.hidden) {
      positionDropdown();
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!dropdown.hidden) {
      positionDropdown();
    }
  }, { passive: true });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInside = e.target.closest('.species-input-wrapper') || 
                          e.target.closest('.species-dropdown-toggle') ||
                          e.target.closest('.species-dropdown');
    if (!isClickInside && !dropdown.hidden) {
      dropdown.hidden = true;
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Attach handlers for suggestion buttons
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.suggest-btn');
    if (!btn) return;
    
    const type = btn.dataset.type;
    const value = btn.dataset.value;
    console.log('Suggestion clicked:', type, value);
    
    if (type === 'species') {
      speciesInput.value = value;
      dropdown.hidden = true;
      if (typeof window.searchSpecies === 'function') {
        setTimeout(() => window.searchSpecies(value), 100);
      } else if (searchBtn) {
        searchBtn.click();
      }
    } else if (type === 'target') {
      const targetsSection = document.getElementById('targets');
      if (targetsSection) {
        targetsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetsSection.style.transition = 'box-shadow 0.3s';
        targetsSection.style.boxShadow = '0 0 0 4px rgba(11,107,58,0.12)';
        setTimeout(() => { targetsSection.style.boxShadow = ''; }, 1000);
      }
    }
  });
});