const ctx = document.getElementById('graficoVentas');
const form = document.getElementById('formVentas');

let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ventas.map(v => v.mes),
    datasets: [{
      label: 'Monto de Ventas ($)',
      data: ventas.map(v => v.monto),
      backgroundColor: '#2e86de'
    }]
  },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const mes = document.getElementById('mes').value.trim();
  const monto = parseFloat(document.getElementById('monto').value);

  if (mes && !isNaN(monto)) {
    ventas.push({ mes, monto });
    localStorage.setItem('ventas', JSON.stringify(ventas));
    chart.data.labels = ventas.map(v => v.mes);
    chart.data.datasets[0].data = ventas.map(v => v.monto);
    chart.update();
    form.reset();
  }
});