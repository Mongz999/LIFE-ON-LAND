document.addEventListener('DOMContentLoaded', function(){
      const canvas = document.getElementById('threatAssessmentChart');
      if (canvas && typeof Chart !== 'undefined') {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'],
            datasets: [{
              data: [12, 19, 27, 22, 20],
              backgroundColor: [
                '#d03a2b', // red
                '#f59e0b', // orange
                '#3b82f6', // blue
                '#10b981', // green
                '#6b7280'  // gray
              ],
              borderColor: '#fff',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { position: 'bottom', labels: { padding: 12 } },
              title: { display: true, text: 'IUCN Threat Status Distribution (Sample)', padding: 12 }
            }
          }
        });
      }
    });
// Initialize threat assessment chart on page load
(function(){
  function initThreatChart(){
    const canvas = document.getElementById('threatAssessmentChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'],
        datasets: [{
          data: [12, 19, 27, 22, 20],
          backgroundColor: [
            '#d03a2b', // red
            '#f59e0b', // orange
            '#3b82f6', // blue
            '#10b981', // green
            '#6b7280'  // gray
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom', labels: { padding: 12 } },
          title: { display: true, text: 'IUCN Threat Status Distribution (Sample)', padding: 12 }
        }
      }
    });
  }

  // Wait for Chart.js to load
  if (document.readyState !== 'loading') {
    initThreatChart();
  } else {
    document.addEventListener('DOMContentLoaded', initThreatChart);
  }
})();