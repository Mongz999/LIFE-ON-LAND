// Chart.js visualizations: forest loss trend, biodiversity by region, threat assessment

(function(){
  // Config — update these selectors to match your HTML if different
  const containerSelector = '#forest-loss-chart-container'; // container where chart should be
  const canvasId = 'forest-loss-chart';
  const sliderSelectors = ['#forest-year-range','input[name="forest-year"]','.year-range']; // try multiple

  // Mock / sample data generator for 2000-2024 (replace with real data if available)
  function generateYearsData(){
    const years = [];
    const values = [];
    for(let y=2000;y<=2024;y++){
      years.push(String(y));
      // simple trend with noise — replace with real dataset
      const base = 12 - (y-2000)*0.18; // decreasing trend example
      const noise = (Math.sin(y) + Math.random()*0.6)*0.6;
      values.push(Math.max(0, +(base + noise).toFixed(2))); // millions hectares lost (example)
    }
    return { years, values };
  }

  // Ensure canvas exists in the container
  function ensureCanvas(){
    let canvas = document.getElementById(canvasId);
    if (canvas) return canvas;
    const container = document.querySelector(containerSelector) || document.querySelector('.progress-section') || document.querySelector('.container');
    if (!container) return null;
    canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.style.width = '100%';
    canvas.style.height = '260px';
    // place at top of container (change as needed)
    container.insertBefore(canvas, container.firstChild);
    return canvas;
  }

  // Chart plugin to draw vertical year marker
  const yearMarkerPlugin = {
    id: 'yearMarker',
    afterDraw: (chart) => {
      const idx = chart.__selectedYearIndex;
      if (idx == null) return;
      const meta = chart.getDatasetMeta(0);
      const point = meta.data[idx];
      if (!point) return;
      const ctx = chart.ctx;
      ctx.save();
      const x = point.x;
      const top = chart.chartArea.top;
      const bottom = chart.chartArea.bottom;
      // vertical line
      ctx.strokeStyle = '#0b6b3a';
      ctx.lineWidth = 2;
      ctx.setLineDash([6,4]);
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
      // circle marker at top of line
      ctx.fillStyle = '#0b6b3a';
      ctx.beginPath();
      ctx.arc(x, point.y, 5, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  };

  function createForestChart(canvas, data){
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (window.forestLossChart) {
      try { window.forestLossChart.destroy(); } catch(e){} 
      window.forestLossChart = null;
    }

    const cfg = {
      type: 'line',
      data: {
        labels: data.years,
        datasets: [{
          label: 'Forest loss (M ha/year) — example',
          data: data.values,
          borderColor: '#0b6b3a',
          backgroundColor: 'rgba(11,107,58,0.08)',
          fill: true,
          tension: 0.28,
          pointRadius: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        },
        scales: {
          x: { display: true, title: { display: true, text: 'Year' } },
          y: { display: true, title: { display: true, text: 'Million hectares lost per year (example)' } }
        }
      },
      plugins: [yearMarkerPlugin]
    };

    window.forestLossChart = new Chart(ctx, cfg);
    // default selected index = last year
    window.forestLossChart.__selectedYearIndex = data.years.length - 1;
    window.forestLossChart.update();
    return window.forestLossChart;
  }

  // Find slider element
  function findSlider(){
    for (const s of sliderSelectors){
      const el = document.querySelector(s);
      if (el) return el;
    }
    // fallback: first range input on page
    return document.querySelector('input[type="range"]');
  }

  // Hook slider -> chart
  function attachSlider(chart, data){
    const slider = findSlider();
    if (!slider || !chart) return;
    // ensure slider min/max/step/map to years
    slider.min = 2000;
    slider.max = 2024;
    slider.step = 1;
    // set initial value to last year if not present
    if (!slider.value) slider.value = 2024;

    function setMarkerForYear(y){
      const idx = data.years.indexOf(String(y));
      if (idx === -1) return;
      chart.__selectedYearIndex = idx;
      chart.update();
      // also update any UI text near slider if exists
      const label = document.querySelector('.forest-year-label');
      if (label) label.textContent = `Year: ${y}`;
    }

    // on input update marker
    slider.addEventListener('input', (e) => {
      setMarkerForYear(e.target.value);
    });

    // initialize position
    setMarkerForYear(slider.value);
  }

  // Observer to create chart when visible
  function observeAndInit(){
    const container = document.querySelector(containerSelector) || document.querySelector('.progress-section') || document.querySelector('.container');
    if (!container) return;
    const canvas = ensureCanvas();
    if (!canvas) return;

    const data = generateYearsData();

    // Wait until Chart is available
    const waitChart = setInterval(() => {
      if (typeof Chart !== 'undefined') {
        clearInterval(waitChart);
        // Create chart only when visible
        const io = new IntersectionObserver((entries, obs) => {
          for (const entry of entries){
            if (entry.isIntersecting) {
              createForestChart(canvas, data);
              attachSlider(window.forestLossChart, data);
              obs.disconnect();
              return;
            }
          }
        }, { threshold: 0.2 });
        io.observe(canvas);
      }
    }, 80);
    // safety timeout: if Chart never loads, create after 3s anyway
    setTimeout(() => {
      if (typeof Chart !== 'undefined' && !window.forestLossChart) {
        createForestChart(canvas, data);
        attachSlider(window.forestLossChart, data);
      }
    }, 3000);
  }

  if (document.readyState !== 'loading') observeAndInit(); else document.addEventListener('DOMContentLoaded', observeAndInit);

  // --- Additional code for redraw on visibility/resize ---

  function ensureRedraw(){
    const c = window.forestLossChart;
    const canvas = document.getElementById('forest-loss-chart');
    if (canvas) canvas.style.border = ''; // cleanup debug border
    if (!c) return;
    try { c.resize(); c.update(); } catch(e){ console.error('forest chart redraw error', e); }
  }

  function handleHeaderCanvas(canvas){
    if (!canvas) return;
    const hdr = canvas.closest('header');
    if (!hdr) return;

    // Ensure a usable height inside header if CSS left it small
    if (!canvas.style.height || canvas.style.height === '0px') {
      canvas.style.height = canvas.style.height || '220px';
    }

    // Redraw when header resizes (sticky header changes)
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => ensureRedraw());
      ro.observe(hdr);
    } else {
      window.addEventListener('resize', ensureRedraw);
    }

    // If header is initially outside viewport, redraw when it becomes visible
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) ensureRedraw(); });
      }, { threshold: 0.05 });
      io.observe(canvas);
    }

    // If header has animations / class toggles, observe mutated attributes
    const mo = new MutationObserver(() => ensureRedraw());
    mo.observe(hdr, { attributes: true, attributeFilter: ['class','style'] });
  }

  // run once DOM is ready
  function initHelpers(){
    const canvas = document.getElementById('forest-loss-chart');
    handleHeaderCanvas(canvas);

    // existing helpers: intersection observer, resize and slider hooks
    const existingCanvas = canvas || document.querySelector('canvas[data-chart="forest-loss"]');
    if (existingCanvas && window.forestLossChart) {
      // final safety redraw after short delay
      setTimeout(ensureRedraw, 200);
    }
  }

  if (document.readyState !== 'loading') initHelpers(); else document.addEventListener('DOMContentLoaded', initHelpers);

  // If the chart canvas ended up inside <header>, move it to the proper section and redraw.
  function moveForestChartIfInHeader() {
    const canvas = document.getElementById('forest-loss-chart');
    if (!canvas) return;

    // If not in header, nothing to do
    const hdr = canvas.closest('header');
    if (!hdr) return;

    // Prefer explicit container(s) for the forest chart
    const prefer = [
      document.querySelector('#forest-loss-chart-container'),
      document.querySelector('#progress'),
      document.querySelector('.progress-section'),
      document.querySelector('.progress-grid'),
      document.querySelector('main .container') // fallback
    ];
    const target = prefer.find(Boolean);
    if (!target) return;

    // Move canvas into target and ensure dimensions
    target.appendChild(canvas);
    canvas.style.width = '100%';
    // set a reasonable height if missing
    if (!canvas.style.height || canvas.style.height === '0px') canvas.style.height = '260px';

    // If Chart exists, force resize/redraw
    setTimeout(() => {
      try {
        if (window.forestLossChart) {
          window.forestLossChart.resize();
          window.forestLossChart.update();
        }
      } catch (e) { console.error('forest chart move redraw error', e); }
    }, 120);
  }

  if (document.readyState !== 'loading') moveForestChartIfInHeader(); else document.addEventListener('DOMContentLoaded', moveForestChartIfInHeader);

  // --- Biodiversity chart code ---

  (function(){
    // Ensure biodiversity chart is visible and redraws when visible
    function initBiodiversityChart(){
      const canvas = document.getElementById('biodiversityChart');
      if (!canvas) return;

      // If chart already exists globally, just redraw it
      if (window.biodiversityChart && typeof window.biodiversityChart.update === 'function') {
        try { 
          window.biodiversityChart.resize(); 
          window.biodiversityChart.update(); 
          console.log('biodiversity chart redrawn');
        } catch(e){ console.error('biodiversity chart redraw error', e); }
        return;
      }

      // If no chart exists, create a sample one
      if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet for biodiversity');
        return;
      }

      const ctx = canvas.getContext('2d');
      const sampleData = {
        labels: ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'],
        datasets: [{
          label: 'Species richness index (sample)',
          data: [8200, 9500, 3100, 4200, 7800, 2100],
          backgroundColor: [
            'rgba(11, 107, 58, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(34, 197, 94, 0.7)',
            'rgba(74, 222, 128, 0.7)',
            'rgba(134, 239, 172, 0.7)',
            'rgba(187, 247, 208, 0.7)'
          ],
          borderColor: '#0b6b3a',
          borderWidth: 1
        }]
      };

      window.biodiversityChart = new Chart(ctx, {
        type: 'bar',
        data: sampleData,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true, position: 'top' }
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Species richness' } }
          }
        }
      });
      console.log('biodiversity chart created');
    }

    // Observer: redraw when biodiversity chart becomes visible
    function observeBiodiversityChart(){
      const canvas = document.getElementById('biodiversityChart');
      if (!canvas || !('IntersectionObserver' in window)) return;

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && window.biodiversityChart) {
            try { window.biodiversityChart.resize(); window.biodiversityChart.update(); } catch(e){}
          }
        });
      }, { threshold: 0.2 });
      io.observe(canvas);
    }

    // Run both when DOM ready
    function init(){
      setTimeout(initBiodiversityChart, 100);
      observeBiodiversityChart();
    }

    if (document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
  })();
})();