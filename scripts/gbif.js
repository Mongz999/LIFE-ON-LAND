/*
  GBIF integration:
  - safe: waits until window.LifeOnLandMap available
  - uses LifeOnLandMap.addGBIFOccurrences(...) when map is ready
*/
(function(){
  const searchBtn = document.getElementById('search-btn');
  const speciesSearch = document.getElementById('species-search');
  const downloadBtn = document.getElementById('download-btn');
  const speciesResults = document.getElementById('species-results');

  if (!searchBtn || !speciesSearch) return;

  function waitForMap(cb){
    const max = 50; let i = 0;
    const t = setInterval(() => {
      if (window.LifeOnLandMap && typeof window.LifeOnLandMap.addGBIFOccurrences === 'function') {
        clearInterval(t); cb(); return;
      }
      if (++i >= max) { clearInterval(t); console.warn('Map API not available for GBIF integration'); }
    }, 100);
  }

  searchBtn.addEventListener('click', () => doSearch());
  speciesSearch.addEventListener('keypress', (e) => { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } });

  async function doSearch(){
    const q = speciesSearch.value.trim();
    if (!q) return;
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';
    speciesResults.innerHTML = '<p style="color:var(--muted)">Fetching species from GBIF...</p>';
    try {
      const sres = await fetch(`https://api.gbif.org/v1/species/search?q=${encodeURIComponent(q)}&limit=5`);
      const sdata = await sres.json();
      const species = (sdata.results && sdata.results.length) ? sdata.results[0] : null;
      if (!species) {
        speciesResults.innerHTML = '<p style="color:var(--muted)">No species found.</p>';
        return;
      }
      // occurrences (limit safe)
      const occRes = await fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${species.key}&limit=300&hasCoordinate=true`);
      const occData = await occRes.json();
      const occurrences = occData.results || [];

      speciesResults.innerHTML = `
        <div class="gbif-result">
          <h5 style="margin:0">${species.scientificName || species.canonicalName}</h5>
          <p style="margin:6px 0;color:var(--muted)">${occurrences.length} occurrence records (showing up to 300)</p>
        </div>
      `;

      // Wait for map API then add occurrences
      waitForMap(() => {
        try {
          window.LifeOnLandMap.addGBIFOccurrences(occurrences);
        } catch(e) { console.error('Failed to add GBIF occurrences to map', e); }
      });
    } catch (err) {
      console.error('GBIF error', err);
      speciesResults.innerHTML = '<p style="color:#d03a2b">Error fetching GBIF data.</p>';
    } finally {
      searchBtn.disabled = false;
      searchBtn.textContent = 'Search';
    }
  }
})();