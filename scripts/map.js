/*
  Robust Leaflet init:
  - waits for DOMContentLoaded
  - ensures Leaflet (L) is available
  - exposes window.LifeOnLandMap with addGBIFOccurrences API
*/
(function(){
  // init when DOM ready and Leaflet available
  function onReady(fn){
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function(){
    const maxAttempts = 50;
    let attempts = 0;
    const wait = setInterval(() => {
      if (typeof L !== 'undefined') {
        clearInterval(wait);
        try { initMap(); } catch (err) { console.error('map init error', err); }
      } else if (++attempts >= maxAttempts) {
        clearInterval(wait);
        console.error('Leaflet (L) did not load; cannot initialize map.');
      }
    }, 100);
  });

  let map;
  let markerClusterGroup;
  let currentMarkers = [];

  function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container not found');
      return;
    }

    map = L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 19
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 80,
      disableClusteringAtZoom: 15
    });
    map.addLayer(markerClusterGroup);

    addLegend();

    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    addSampleMarkers();
  }

  function addLegend() {
    const legend = L.control({ position: 'topleft' });

    legend.onAdd = function(map) {
      const div = L.DomUtil.create('div', 'legend');
      
      div.innerHTML = `
        <div class="legend-content">
          <h4>🎨 Legend</h4>
          
          <div class="legend-item">
            <span class="legend-color-circle" style="background:#0b6b3a;"></span>
            <input type="checkbox" id="legend-protected" checked />
            <label for="legend-protected">Protected areas</label>
          </div>

          <div class="legend-item">
            <span class="legend-color-circle" style="background:#dc2626;"></span>
            <input type="checkbox" id="legend-endangered" checked />
            <label for="legend-endangered">Endangered species</label>
          </div>

          <div class="legend-item">
            <span class="legend-color-circle" style="background:#f59e0b;"></span>
            <input type="checkbox" id="legend-vulnerable" checked />
            <label for="legend-vulnerable">Vulnerable</label>
          </div>

          <div class="legend-item">
            <span class="legend-color-circle" style="background:#22c55e;"></span>
            <input type="checkbox" id="legend-forest" checked />
            <label for="legend-forest">Forest cover</label>
          </div>

          <div class="legend-item">
            <span class="legend-color-circle" style="background:#8b5cf6;"></span>
            <input type="checkbox" id="legend-threat" checked />
            <label for="legend-threat">Threat zones</label>
          </div>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);

      const checkboxes = div.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateMarkers);
      });

      return div;
    };

    legend.addTo(map);
  }

  function addSampleMarkers() {
    const sampleData = [
      { lat: -0.23, lng: -51.93, name: 'Amazon Rainforest', type: 'forest', status: 'Critical' },
      { lat: -25.2744, lng: 133.7751, name: 'Great Desert', type: 'threat', status: 'Active' },
      { lat: 40.7128, lng: -74.0060, name: 'Protected Forest', type: 'protected', status: 'Protected' },
      { lat: -1.9536, lng: 29.8739, name: 'Mountain Gorilla Habitat', type: 'endangered', status: 'Endangered' },
      { lat: 48.8566, lng: 2.3522, name: 'European Wetlands', type: 'vulnerable', status: 'Vulnerable' },
      { lat: 35.6762, lng: 139.6503, name: 'Asian Biodiversity Hotspot', type: 'protected', status: 'Protected' },
      { lat: -10.3592, lng: 55.4829, name: 'Mauritian Forest', type: 'endangered', status: 'Critical' },
      { lat: 51.5074, lng: -0.1278, name: 'UK Conservation Area', type: 'protected', status: 'Active' }
    ];

    addMarkers(sampleData);
  }

  function addMarkers(data) {
    markerClusterGroup.clearLayers();
    currentMarkers = [];

    data.forEach(item => {
      const marker = L.circleMarker([item.lat, item.lng], {
        radius: 8,
        fillColor: getMarkerColor(item.type),
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      });

      marker.bindPopup(`
        <div style="font-size:13px;">
          <strong>${item.name}</strong><br/>
          Type: ${item.type}<br/>
          Status: ${item.status}
        </div>
      `);

      marker.data = { type: item.type };
      currentMarkers.push(marker);
      markerClusterGroup.addLayer(marker);
    });
  }

  function getMarkerColor(type) {
    const colors = {
      'protected': '#0b6b3a',
      'endangered': '#dc2626',
      'vulnerable': '#f59e0b',
      'forest': '#22c55e',
      'threat': '#8b5cf6'
    };
    return colors[type] || '#10b981';
  }

  function updateMarkers() {
    const filters = {
      protected: document.getElementById('legend-protected')?.checked ?? true,
      endangered: document.getElementById('legend-endangered')?.checked ?? true,
      vulnerable: document.getElementById('legend-vulnerable')?.checked ?? true,
      forest: document.getElementById('legend-forest')?.checked ?? true,
      threat: document.getElementById('legend-threat')?.checked ?? true
    };

    markerClusterGroup.clearLayers();

    currentMarkers.forEach(marker => {
      if (filters[marker.data.type]) {
        markerClusterGroup.addLayer(marker);
      }
    });
  }

  function searchSpecies(speciesName) {
    console.log('Searching for:', speciesName);
    
    const gbifUrl = `https://api.gbif.org/v1/occurrence/search?scientificName=${encodeURIComponent(speciesName)}&limit=50&hasCoordinate=true`;

    const resultsList = document.getElementById('species-results');
    if (resultsList) {
      resultsList.innerHTML = '<p style="color: #6b7280;">🔍 Searching GBIF...</p>';
    }

    fetch(gbifUrl)
      .then(response => response.json())
      .then(data => {
        console.log('GBIF response:', data);
        
        if (data.results && data.results.length > 0) {
          const markers = data.results.map(record => ({
            lat: record.decimalLatitude,
            lng: record.decimalLongitude,
            name: record.scientificName || 'Unknown',
            type: 'endangered',
            status: 'Observation'
          }));

          addMarkers(markers);

          if (currentMarkers.length > 0) {
            const group = new L.featureGroup(currentMarkers);
            map.fitBounds(group.getBounds().pad(0.1));
          }

          if (resultsList) {
            resultsList.innerHTML = `<p style="color: #0b6b3a; font-weight: 600;">✓ Found ${data.results.length} occurrences</p>`;
          }
        } else {
          if (resultsList) {
            resultsList.innerHTML = `<p style="color: #dc2626;">No results found for "${speciesName}"</p>`;
          }
        }
      })
      .catch(error => {
        console.error('Search error:', error);
        if (resultsList) {
          resultsList.innerHTML = `<p style="color: #dc2626;">Error searching. Please try again.</p>`;
        }
      });
  }

  // Initialize map when page loads
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing map...');
    initMap();

    // Setup search button
    const searchBtn = document.getElementById('search-btn');
    const speciesSearch = document.getElementById('species-search');
    
    console.log('Search button:', searchBtn);
    console.log('Species search input:', speciesSearch);

    if (searchBtn && speciesSearch) {
      searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Search button clicked');
        const species = speciesSearch.value.trim();
        console.log('Species value:', species);
        if (species) {
          searchSpecies(species);
        } else {
          alert('Please enter a species name');
        }
      });

      speciesSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          searchBtn.click();
        }
      });
    } else {
      console.warn('Search elements not found!');
    }

    // If page was opened with ?q=... run the search automatically
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || params.get('species');
    if (q && q.trim().length > 0) {
      // if species input exists, populate it for UX
      if (speciesSearch) speciesSearch.value = q;
      // run the search after a tiny delay to ensure map is ready
      setTimeout(() => {
        console.log('Auto-search from URL param:', q);
        searchSpecies(q);
      }, 250);
    }

    // expose search function so other scripts can call it
    window.searchSpecies = searchSpecies;
  });
})();