const ctx = document.getElementById('graficoVentas');
const form = document.getElementById('formVentas');

let ventas = JSON.parse(localStorage.getItem('ventas')) || [];

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [11, 16, 7, 3, 14],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 205, 86)',
      'rgb(201, 203, 207)',
      'rgb(54, 162, 235)'
    ]
  }]
};

const chart = new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ventas.map(v => v.mes),
    datasets: [{
      label: 'Monto de Ventas ($)',
      data: ventas.map(v => v.monto),
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ]
    }]
  },
  options: { 
    responsive: true,
    scales: {
      r: {
        beginAtZero: true
      }
    }
  }
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